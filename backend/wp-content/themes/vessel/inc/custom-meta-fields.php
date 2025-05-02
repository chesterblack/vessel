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
}

add_action( 'init', 'setup_meta_fields' );
