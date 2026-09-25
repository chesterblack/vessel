<?php
// Allows comic_pages to be sorted by the comic_page_number meta
add_filter(
	'rest_comic_page_collection_params',
	function( $params ) {
			$params['orderby']['enum'][] = 'comic_page_number';
			return $params;
	},
	10,
	1
);

add_filter(
	'rest_comic_page_query',
	function ( $args, $request ) {
			$order_by = $request->get_param( 'orderby' );
			if ( isset( $order_by ) && 'comic_page_number' === $order_by ) {
					$args['meta_key'] = $order_by;
					$args['orderby']  = 'meta_value_num';
			}
			return $args;
	},
	10,
	2
);

function post_meta_request_params( $args, $request ) {
	$args += [
		'meta_key'   => $request['meta_key'],
		'meta_value' => $request['meta_value'],
		'meta_query' => $request['meta_query'],
	];

	return $args;
}
add_filter( 'rest_comic_page_query', 'post_meta_request_params', 99, 2 );

/**
 * Set up custom endpoints
 */
function setup_endpoints() {
	// Site icon
	register_rest_route(
		'vessel/v1',
		'/icon',
		[
			'methods' => 'GET',
			'callback' => fn() => get_site_icon_url(),
			'permission_callback' => '__return_true'
		]
	);

	// Page names and numbers
	register_rest_route(
		'vessel/v1',
		'/page-indexes',
		[
			'methods' => 'GET',
			'callback' => 'get_page_indexes',
			'permission_callback' => '__return_true',
		]
	);

	// Everything you need for a page read
	register_rest_route(
		'vessel/v1',
		'/read-page(?:/(?P<page_number>\d+))?',
		[
			'methods' => 'GET',
			'callback' => 'get_page_read',
			'permission_callback' => '__return_true',
		]
	);
}

function get_page_read( $data ) {
	$chapter = $data->get_param( 'chapter' );
	$unlocked_only = filter_var($data->get_param( 'unlocked_only' ), FILTER_VALIDATE_BOOLEAN);

	$latest = get_latest_comic_page( false );
	$latest_unlocked = get_latest_comic_page( true );

	$page_number = $data->get_param( 'page_number' ) ?: (
		$unlocked_only ? $latest_unlocked['page_number'] : $latest['page_number']
	);

	$current = get_current_comic_page( (int)$page_number );
	$indexes = get_comic_page_indexes( (int)$page_number, $chapter );

	$response = [
		'current' => $current,
		'latest' => $latest,
		'indexes' => $indexes,
	];

	return $response;
}

function build_page_index( WP_Post $post ) {
	$post_object = [];

	$post_page_number = (int)$post->__get( 'comic_page_number' );
	$post_object['slug'] = $post->post_name;
	$post_object['title'] = $post->post_title;
	$post_object['page_number'] = $post_page_number;
	$post_object['role_locks'] = array_map(
		fn($role_lock) => $role_lock->slug,
		get_the_terms( $post, 'role_locks' ) ?: []
	);

	return $post_object;
}

function get_latest_comic_page( bool $unlocked_only ) {
	$query_options = [
		'per_page' => 1,
		'post_type' => 'comic_page',
		'meta_key' => 'comic_page_number',
		'orderby' => 'meta_value_num',
		'order' => 'DESC',
	];

	if ( $unlocked_only ) {
		$query_options['tax_query'] = [[
			'taxonomy' => 'role_locks',
			'field' => 'slug',
			'terms' => '1447593084727726282',
			'operator' => 'NOT IN',
		]];
	}

	$posts = new WP_Query( $query_options );

	while ( $posts->have_posts( $posts ) ) {
		$posts->the_post();
		return build_page_index( $posts->post );
	}
}

function get_comic_page_indexes( int $page_number, string $chapter = null ) {
	$query_options = [
		'post_type' => 'comic_page',
		'posts_per_page' => 20,
		'offset' => $page_number > 10 ? $page_number - 10 : 0,
		'order' => 'ASC',
		'meta_key' => 'comic_page_number',
		'orderby' => 'meta_value_num',
	];

	if ( $chapter ) {
		$query_options['tax_query'] = [[
			'taxonomy' => 'chapters',
			'field' => 'slug',
			'terms' => $chapter,
		]];
	}

	$response = [];
	$posts = new WP_Query( $query_options );
	while ($posts->have_posts($posts)) {
		$posts->the_post();
		$response[] = build_page_index($posts->post);
	}

	return $response;
}

function get_current_comic_page(int $page_number) {
	$url = "https://admin.vesselcomic.com/wp-json/wp/v2/comic_page?meta_key=comic_page_number&meta_value=$page_number&_embed=wp%3Aterm";

	$current_response = wp_remote_get( $url );

	if (
		is_wp_error( $current_response ) ||
		$current_response['response']['code'] !== 200 ||
		$current_response['body'] === '[]'
	) {
		return [];
	}

	$current = json_decode($current_response['body']);

	return $current[0];
}

function get_page_indexes( $data ) {
	$current = $data->get_param( 'current' );
	$chapter = $data->get_param( 'chapter' );

	$query_options = [
		'post_type' => 'comic_page',
		'posts_per_page' => 20,
		'offset' => (int)$current > 10 ? (int)$current - 10 : 0,
		'order' => 'ASC',
		'meta_key' => 'comic_page_number',
		'orderby' => 'meta_value_num',
	];

	if ( $chapter ) {
		$query_options['tax_query'] = [[
			'taxonomy' => 'chapters',
			'field' => 'slug',
			'terms' => $chapter,
		]];
	}

	$posts = new WP_Query( $query_options );

	$response = [];

	while ($posts->have_posts($posts)) {
		$posts->the_post();
		$post_object = [];
		$post_object['slug'] = $posts->post->post_name;
		$post_object['title'] = $posts->post->post_title;
		$post_object['page_number'] = (int)$posts->post->__get( 'comic_page_number' );
		$post_object['role_locks'] = array_map(
			fn($rl) => $rl->slug,
			get_the_terms( $posts->post, 'role_locks' ) ?: []
		);

		$response[] = $post_object;
	}

	return $response;
}

add_action( 'rest_api_init', 'setup_endpoints' );


// Add block data to REST API
function add_custom_fields() {
	register_rest_field(
		[ 'comic_page', 'character', 'fanart' ],
		'content_blocks',
		[ 'get_callback' => 'get_custom_fields' ]
	);
}

function get_custom_fields( $post, $attr, $request, $object_type ) {
	if ( ! isset( $post['content']['raw'] ) ) {
		return [];
	}

	$content = $post['content']['raw'];
	$blocks = parse_blocks( $content );
	$blocks = array_filter( $blocks, fn( $block ) => $block[ 'blockName' ] );
	return $blocks;
}
add_action( 'rest_api_init', 'add_custom_fields' );
// ---

function add_role_locks() {
	register_rest_field(
		[ 'comic_page', 'page', 'post' ],
		'locked_to_ids',
		[ 'get_callback' => 'get_role_locks' ]
	);
}

function get_role_locks( $post, $attr, $request, $object_type ) {
	$role_locks = get_the_terms( $post[ 'id' ], 'role_locks' ) ?: [];
	return array_map( fn( $role_lock ) => $role_lock->slug, $role_locks );
}
add_action( 'rest_api_init', 'add_role_locks' );

function add_auto_unlock_endpoint() {
	register_rest_route(
		'vessel/v1',
		'/check-unlocks',
		[
			'methods' => 'GET',
			'callback' => 'check_unlocks',
		]
	);
}

function check_unlocks( WP_REST_Request $request ) {
	$posts = get_posts( [
		'post_type' => 'comic_page',
		'posts_per_page' => -1,
		'tax_query' => [
			[
				'taxonomy' => 'role_locks',
				'field' => 'slug',
				'terms' => '1447593084727726282',
				'operator' => 'IN',
			],
		],
	] );
	$early_reader_role = get_term_by( 'slug', '1447593084727726282', 'role_locks' );

	$response = [];

	$a_month_ago = new DateTime( '1 month ago' );
	foreach ( $posts as $post ) {
		if (
			new DateTime( $post->post_date ) < $a_month_ago &&
			has_term( $early_reader_role->term_id, 'role_locks', $post->ID )
		) {
			wp_remove_object_terms( $post->ID, $early_reader_role->term_id, 'role_locks' );
			$response[] = "Removed $post->ID from Early Readers";
		}
	}

	return $response;
}
add_action( 'rest_api_init', 'add_auto_unlock_endpoint' );


// Removes htmlentities from blog post titles
function decode_title( $response, $post, $request ) {
	if ( isset( $post ) ) {
		$response->data['title']['rendered'] = html_entity_decode( $response->data['title']['rendered'] );
	}

	return $response;
}

foreach ( [ 'post', 'fanart' ] as $post_type ) {
	// add_filter( 'rest_prepare_' . $post_type, 'decode_title', 20, 3 );
}