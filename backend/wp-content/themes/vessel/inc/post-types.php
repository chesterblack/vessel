<?php

// Set up custom post types required for the site
function setup_post_types() {
	// Comic page
	register_post_type(
		'comic_page',
		[
			'labels' => [
				'name' => _x( 'Comic Pages', 'Post Type General Name', 'text_domain' ),
				'singular_name' => _x( 'Comic Page', 'Post Type Singular Name', 'text_domain' ),
				'menu_name' => __( 'Comic Pages', 'text_domain' ),
				'add_new_item' => __( 'Add New Comic Page' ),
			],
			'public' => true,
			'show_ui' => true,
			'show_in_rest' => true,
			'menu_icon' => 'dashicons-book-alt',
			'template' => [
				[ 'vessel/comic-page', [] ],
				[ 'core/paragraph', [] ],
			],
			'template_lock' => 'all',
			'supports' => [ 'title', 'editor', 'custom-fields' ],
		]
	);

	// Character
	register_post_type(
		'character',
		[
			'labels' => [
				'name' => _x( 'Characters', 'Post Type General Name', 'text_domain' ),
				'singular_name' => _x( 'Character', 'Post Type Singular Name', 'text_domain' ),
				'menu_name' => __( 'Characters', 'text_domain' ),
				'add_new_item' => __( 'Add New Character' ),
			],
			'public' => true,
			'show_ui' => true,
			'show_in_rest' => true,
			'menu_icon' => 'dashicons-universal-access',
			'template' => [ [ 'vessel/character-bio', [] ] ],
			'template_lock' => 'all',
			'supports' => [ 'title', 'editor', 'custom-fields' ],
		]
	);
}
add_action( 'init', 'setup_post_types' );

// Renames the default post type to blog posts
function rename_default_post_types( array $args, string $post_type ): array {
	if ( $post_type === 'post' ) {
		$args['labels'] = [
			'name' => _x( 'Blog Posts', 'Post Type General Name', 'text_domain' ),
			'singular_name' => _x( 'Blog Post', 'Post Type Singular Name', 'text_domain' ),
			'menu_name' => __( 'Blog Posts', 'text_domain' ),
			'add_new_item' => __( 'Add New Blog Post' ),
		];
	}

	if ( $post_type === 'page' ) {
		$args['labels'] = [
			'name' => _x( 'Web Pages', 'Post Type General Name', 'text_domain' ),
			'singular_name' => _x( 'Web Page', 'Post Type Singular Name', 'text_domain' ),
			'menu_name' => __( 'Web Pages', 'text_domain' ),
			'add_new_item' => __( 'Add New Web Page' ),
		];
	}

	return $args;
}
add_filter( 'register_post_type_args', 'rename_default_post_types', 0, 2 );

// Hides comments
function remove_comments( array $args, string $post_type ): array {
	if ( $post_type === 'comment' ) {
		$args['public']              = false;
		$args['show_ui']             = false;
		$args['show_in_menu']        = false;
		$args['show_in_admin_bar']   = false;
		$args['show_in_nav_menus']   = false;
		$args['can_export']          = false;
		$args['has_archive']         = false;
		$args['publicly_queryable']  = false;
		$args['show_in_rest']        = false;
		$args['exclude_from_search'] = true;
	}

	return $args;
}
add_filter( 'register_post_type_args', 'remove_comments', 0, 2 );
