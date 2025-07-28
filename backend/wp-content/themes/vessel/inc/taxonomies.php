<?php
/**
 * Set up custom taxonomies required for the site
 */

function setup_taxonomies() {
	// Adds Chapters
	register_taxonomy(
		'chapters',
		[ 'comic_page' ],
		[
			'description' => 'Please only select one per comic page',
			'labels' => [
				'name' => _x( 'Chapters', 'Taxonomy General Name', 'text_domain' ),
				'singular_name' => _x( 'Chapter', 'Taxonomy Singular Name', 'text_domain' ),
				'menu_name' => __( 'Chapters', 'text_domain' ),
				'add_new_item' => __( 'Add New Chapter' ),
			], 
			'hierarchical' => true,
			'public' => true,
			'show_in_rest' => true,
			'show_admin_column' => true,
		],
	);

	// Adds Backgrounds
	register_taxonomy(
		'backgrounds',
		[ 'comic_page', 'character' ],
		[
			'description' => 'Set the background that should be used for this page',
			'labels' => [
				'name' => _x( 'Backgrounds', 'Taxonomy General Name', 'text_domain' ),
				'singular_name' => _x( 'Background', 'Taxonomy Singular Name', 'text_domain' ),
				'menu_name' => __( 'Backgrounds', 'text_domain' ),
				'add_new_item' => __( 'Add New Background' ),
			],
			'hierarchical' => true,
			'public' => true,
			'show_in_rest' => true,
			'show_admin_column' => false,
			'default_term' => [
				'Percy',
				'percy',
				'',
			],
		],
	);

	// Removes default taxonomies
	register_taxonomy( 'category', [] );
	register_taxonomy( 'post_tag', [] );
}
add_action( 'init', 'setup_taxonomies' );
