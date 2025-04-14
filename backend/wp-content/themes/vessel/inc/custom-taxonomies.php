<?php
/**
 * Set up custom taxonomies required for the site
 */

add_action( 'init', 'on_init' );

function on_init() {
	// Adds Chapters
	register_taxonomy(
		'chapters',
		[ 'post' ],
		[
			'labels' => [
				'name' => _x( 'Chapters', 'Taxonomy General Name', 'text_domain' ),
				'singular_name' => _x( 'Chapter', 'Taxonomy Singular Name', 'text_domain' ),
				'menu_name' => __( 'Chapters', 'text_domain' ),
				'add_new_item' => __( 'Add New Chapter' ),
			], 
			'hierarchical' => false,
			'public' => true,
			'show_in_rest' => true,
			'show_admin_column' => true,
		]
	);

	// Removes default taxonomies
	register_taxonomy( 'category', [] );
	register_taxonomy( 'post_tag', [] );
}
