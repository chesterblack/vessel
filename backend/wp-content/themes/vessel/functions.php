<?php

require_once( __DIR__ . '/inc/custom-taxonomies.php' );
require_once( __DIR__ . '/inc/custom-post-types.php' );
require_once( __DIR__ . '/inc/custom-rest-api.php' );
require_once( __DIR__ . '/inc/custom-meta-fields.php' );
require_once( __DIR__ . '/blocks/custom-blocks.php' );
require_once( __DIR__ . '/inc/remove-comments.php' );


function register_image_sizes() {
	add_image_size( 'comic_page_desktop', 1600, 9999 );
	add_image_size( 'comic_page_mobile', 800, 9999 );
}
add_action( 'after_setup_theme', 'register_image_sizes' );


function register_image_size_nicenames( $sizes ) {
	return array_merge( $sizes, [
		'comic_page_desktop' => __( 'Desktop Comic Page' ),
		'comic_page_mobile' => __( 'Mobile Comic Page' ),
	] );
}
add_filter( 'image_size_names_choose', 'register_image_size_nicenames' );


function add_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style();
}
add_action( 'after_setup_theme', 'add_styles' );


// Change WordPress API to use backend URL
function home_url_as_api_url( $url ) {
	$url = str_replace( home_url(), site_url() , $url );
	return $url;
}
add_filter('rest_url', 'home_url_as_api_url');