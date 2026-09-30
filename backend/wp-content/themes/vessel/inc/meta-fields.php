<?php

function setup_meta_fields() {
	register_post_meta(
		'comic_page',
		'comic_page_number',
		[
			'show_in_rest' => true,
			'single' => true,
			'type' => 'number',
			'default' => 0,
		]
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

	register_post_meta(
		'comic_page',
		'background_gradient',
		[
			'single' => true,
			'type' => 'string',
			'show_in_rest' => true,
		],
	);

	$image_size_schema = [
		'type' => 'object',
		'properties' => [
			'height' => [ 'type' => 'number' ],
			'width' => [ 'type' => 'number' ],
			'url' => [ 'type' => 'string' ],
			'orientation' => [ 'type' => 'string' ],
		],
	];

	$image_schema = [
		'type' => 'object',
		'properties' => [
			'id' => [ 'type' => 'number' ],
			'url' => [ 'type' => 'string' ],
			'sizes' => [
				'type' => 'object',
				'properties' => [
					'thumbnail' => $image_size_schema,
					'medium' => $image_size_schema,
					'large' => $image_size_schema,
					'comic_page_mobile' => $image_size_schema,
					'comic_page_desktop' => $image_size_schema,
					'full' => $image_size_schema,
				],
			],
			'width' => [ 'type' => 'number' ],
			'height' => [ 'type' => 'number' ],
			'alt' => [ 'type' => 'string' ],
		],
	];

	register_post_meta(
		'comic_page',
		'background_image',
		[
			'single' => true,
			'type' => 'object',
			'show_in_rest' => [
				'schema' => $image_schema,
			],
		],
	);

	register_post_meta(
		'comic_page',
		'page_image',
		[
			'single' => true,
			'type' => 'object',
			'show_in_rest' => [
				'schema' => $image_schema
			],
		],
	);
};

add_action( 'init', 'setup_meta_fields' );
