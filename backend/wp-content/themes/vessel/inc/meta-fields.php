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
}

add_action( 'init', 'setup_meta_fields' );
