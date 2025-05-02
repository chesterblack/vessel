<?php

// Allows meta queries in rest api calls
function post_meta_request_params( $args, $request ) {
	$args += [
		'meta_key'   => $request['meta_key'],
		'meta_value' => $request['meta_value'],
		'meta_query' => $request['meta_query'],
	];

	return $args;
}

add_filter( 'rest_comic_page_query', 'post_meta_request_params', 99, 2 );
