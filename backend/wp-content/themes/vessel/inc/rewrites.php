<?php

function post_rewrites( $link, $post ) {
	$rewrites = [
		'comic_page' => get_home_url() . '/page/' . get_metadata( 'post', $post->ID, 'comic_page_number', true ),
		'character' => get_home_url() . '/characters/' . $post->post_name,
	];

	return isset( $rewrites[ $post->post_type ] ) ? $rewrites[ $post->post_type ] : $link;
}
add_filter( 'post_type_link', 'post_rewrites', 10, 2 );



function taxonomy_rewrites( $link, $term ) {
	$rewrites = [
		'chapters' => get_home_url() . '/archive/' . $term->slug,
	];

	return isset( $rewrites[ $term->taxonomy ] ) ? $rewrites[ $term->taxonomy ] : $link;
}
add_filter( 'term_link', 'taxonomy_rewrites', 10, 2 );
