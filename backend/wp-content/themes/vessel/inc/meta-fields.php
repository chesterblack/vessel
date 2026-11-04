<?php

const VESSEL_IMAGE_SIZE_SCHEMA = [
	'type' => 'object',
	'properties' => [
		'height' => [ 'type' => 'number' ],
		'width' => [ 'type' => 'number' ],
		'url' => [ 'type' => 'string' ],
		'orientation' => [ 'type' => 'string' ],
	],
];

const VESSEL_IMAGE_SCHEMA = [
	'type' => 'object',
	'properties' => [
		'id' => [ 'type' => 'number' ],
		'url' => [ 'type' => 'string' ],
		'sizes' => [
			'type' => 'object',
			'properties' => [
				'thumbnail' => VESSEL_IMAGE_SIZE_SCHEMA,
				'medium' => VESSEL_IMAGE_SIZE_SCHEMA,
				'large' => VESSEL_IMAGE_SIZE_SCHEMA,
				'comic_page_mobile' => VESSEL_IMAGE_SIZE_SCHEMA,
				'comic_page_desktop' => VESSEL_IMAGE_SIZE_SCHEMA,
				'full' => VESSEL_IMAGE_SIZE_SCHEMA,
			],
		],
		'width' => [ 'type' => 'number' ],
		'height' => [ 'type' => 'number' ],
		'alt' => [ 'type' => 'string' ],
	],
];

const VESSEL_IMAGE_META = [
	'single' => true,
	'type' => 'object',
	'show_in_rest' => [
		'schema' => VESSEL_IMAGE_SCHEMA,
	],
];

function setup_comic_page_meta_fields() {
	register_post_meta(
		'comic_page',
		'comic_page_number',
		[
			'show_in_rest' => true,
			'single' => true,
			'type' => 'number',
		]
	);

	register_post_meta(
		'comic_page',
		'characters',
		[
			'single' => true,
			'type' => 'array',
			'default' => [],
			'show_in_rest' => [
				'schema' => [
					'type' => 'array',
					'items' => [
						'type' => 'integer',
					],
				],
			],
		],
	);
	
	register_post_meta(
		'comic_page',
		'background_gradient',
		[
			'single' => true,
			'type' => 'string',
			'show_in_rest' => true,
		],
	);

	register_post_meta(
		'comic_page',
		'background_image',
		VESSEL_IMAGE_META
	);
	
	register_post_meta(
		'comic_page',
		'page_image',
		VESSEL_IMAGE_META,
	);

	register_post_meta(
		'comic_page',
		'characters',
		[
			'single' => true,
			'type' => 'array',
			'show_in_rest' => [
				'schema' => [
					'type' => 'array',
					'items' => [
						'type' => 'integer',
					],
				],
			],
		],
	);
}

function setup_character_meta_fields() {
	register_post_meta(
		'character',
		'comic_pages',
		[
			'single' => true,
			'type' => 'array',
			'default' => [],
			'show_in_rest' => [
				'schema' => [
					'type' => 'array',
					'items' => [
						'type' => 'integer',
					],
				],
			],
		],
	);

	register_post_meta(
		'character',
		'chapters',
		[
			'single' => true,
			'type' => 'array',
			'show_in_rest' => [
				'schema' => [
					'type' => 'array',
					'items' => [
						'type' => 'object',
						'properties' => [
							'chapter' => [ 'type' => 'string' ],
							'name' => [ 'type' => 'string' ],
							'description' => [ 'type' => 'string' ],
							'portrait' => [
								'type' => 'object',
								'properties' => [
									'url' => [ 'type' => 'string' ],
									'width' => [ 'type' => 'number' ],
									'height' => [ 'type' => 'number' ],
									'alt' => [ 'type' => 'string' ],
								],
							],
							'pronouns' => [ 'type' => 'string' ],
						],
					],
				],
			],
		],
	);
}

function setup_fanart_meta_fields() {
	register_post_meta(
		'fanart',
		'page_image',
		VESSEL_IMAGE_META,
	);
	
	register_post_meta(
		'fanart',
		'credit_name',
		[
			'single' => true,
			'type' => 'string',
			'show_in_rest' => true,
		],
	);
	
	register_post_meta(
		'fanart',
		'credit_link',
		[
			'single' => true,
			'type' => 'string',
			'show_in_rest' => true,
		],
	);
}

function setup_meta_fields() {
	setup_comic_page_meta_fields();
	setup_character_meta_fields();
	setup_fanart_meta_fields();
};
add_action( 'init', 'setup_meta_fields' );


function set_character_comic_pages( int $post_id, WP_Post $post, bool $update ) {
	$characters_on_post = get_post_meta( $post_id, 'characters', true );

	$characters_on_post = $characters_on_post === '' ? [] : $characters_on_post;

	// New page, just whack the page onto every character
	if ( !$update ) {
		for ( $i = 0; $i < count( $characters_on_post ); $i++ ) {
			$character_id = $characters_on_post[$i];

			$value = [ $post_id ];

			$prev = get_post_meta( $character_id, 'comic_pages' );
			if ( $prev ) {
				$value = [ ...$prev, $post_id ];
			}

			$result = update_post_meta(
				$character_id,
				'comic_pages',
				array_unique( $value )
			);
		}

		return;
	}


	$all_characters = get_posts(
		[ 'post_type' => 'character', 'numberposts' => -1 ]
	);

	$characters_with_this_page = array_filter(
		$all_characters,
		function( $character ) {
			$comic_pages = get_post_meta( $character_id, 'comic_pages', true ) ?: [];
			return in_array( $post_id, $comic_pages );
		}
	);

	// All incorrect characters - some will need to have this page added, some removed
	$characters_to_change = array_diff(
		$characters_on_post,
		$characters_with_this_page
	);

	foreach ( $characters_to_change as $character_id ) {
		$character = array_filter(
			$all_characters,
			function( $c ) use ( $character_id ) {
				return $c->ID === (int)$character_id;
			}
		);

		if ( !$character ) {
			continue;
		}

		$comic_pages = get_post_meta( $character_id, 'comic_pages', true ) ?: [];

		$has_current_page = in_array(
			$post_id,
			$comic_pages
		);

		$page_removed = array_diff(
			$comic_pages,
			[ $post_id ]
		);

		$page_added = [ ...$comic_pages, $post_id ];

		$new_value = $has_current_page ? $page_removed : $page_added;

		update_post_meta(
			$character_id,
			'comic_pages',
			array_unique( $new_value )
		);
	}
}
add_action( 'save_post_comic_page', 'set_character_comic_pages', 10, 3 );