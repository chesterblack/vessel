<?php

require_once( __DIR__ . '/inc/custom-taxonomies.php' );
require_once( __DIR__ . '/inc/custom-post-types.php' );
require_once( __DIR__ . '/inc/custom-endpoints.php' );
require_once( __DIR__ . '/inc/custom-meta-fields.php' );
require_once( __DIR__ . '/blocks/custom-blocks.php' );
require_once( __DIR__ . '/inc/remove-comments.php' );

// Add block data to REST API
function add_custom_fields() {
	register_rest_field(
		[ 'comic_page', 'character' ],
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
