<?php

require_once( WP_PLUGIN_DIR . '/action-scheduler/action-scheduler.php' );

function setup_automation( $new_status, $old_status, $post ) {
	if ( ! as_has_scheduled_action( 'auto_release_' . $post->ID ) && $new_status === 'publish' ) {
		as_schedule_single_action(
			time() + 60,
			'auto_release_action',
			[ $post->ID ]
		);
	}
}

function auto_release( $post_id ) {
	wp_remove_object_terms( $post_id, '1447593084727726282', 'role_locks' );
}

add_action( 'auto_release_action', 'auto_release', 10, 1 );
add_action( 'transition_post_status', 'setup_automation', 10, 3 );
