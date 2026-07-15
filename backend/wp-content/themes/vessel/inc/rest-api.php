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