<?php
/**
 * Set up custom post types required for the site
 */

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
			'template' => [ [ 'vessel/comic-page', [] ] ],
			'template_lock' => 'all',
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
		]
	);
}
add_action( 'init', 'setup_post_types' );

// Hides default post type
function remove_default_post_type( $args, $post_type ) {
	if ( in_array( $post_type, [ 'post', 'comment' ] ) ) {
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
add_filter( 'register_post_type_args', 'remove_default_post_type', 0, 2 );

// Redirect any user trying to access comments page
add_action('admin_init', function () {
	global $pagenow;
	
	if ($pagenow === 'edit-comments.php') {
		wp_redirect(admin_url());
		exit;
	}
	
	// Remove comments metabox from dashboard
	remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
	
	// Disable support for comments and trackbacks in post types
	foreach (get_post_types() as $post_type) {
		if (post_type_supports($post_type, 'comments')) {
			remove_post_type_support($post_type, 'comments');
			remove_post_type_support($post_type, 'trackbacks');
		}
	}
});

// Close comments on the front-end
add_filter('comments_open', '__return_false', 20, 2);
add_filter('pings_open', '__return_false', 20, 2);

// Hide existing comments
add_filter('comments_array', '__return_empty_array', 10, 2);

// Remove comments page in menu
add_action('admin_menu', function () {
	remove_menu_page('edit-comments.php');
});

// Remove comments links from admin bar
add_action('init', function () {
	if (is_admin_bar_showing()) {
		remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
	}
});