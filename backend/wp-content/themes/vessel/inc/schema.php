<?php
include_once ABSPATH . 'wp-admin/includes/plugin.php';

if ( ! is_plugin_active( 'wordpress-seo' ) ) {
	return;
}

use Yoast\WP\SEO\Generators\Schema\Abstract_Schema_Piece;

class ComicStory extends Abstract_Schema_Piece
{
	public $context;

	public function __construct( WPSEO_Schema_Context $context ) {
		$this->context = $context;
	}

	public function is_needed() {
		$valid = get_post_type() === 'comic_page';
		return $valid;
	}

	public function generate() {
		$post_id = YoastSEO()->meta->for_current_page()->id;

		$page_number = get_post_meta( $post_id, 'comic_page_number', true );
		$canonical = get_site_url() . '/page/' . $page_number;

		// Set the type.
		$data['@type'] = 'ComicStory';

		// Give it a unique ID, based on the URL and the Post ID.
		$data['@id'] = $canonical . '#/comic/' . $post_id;

		// Give it a name.
		$data['name'] = the_title_attribute( array( 'echo' => false ) );

		// Make it the main entity of the webpage we're on.
		$data['mainEntityOfPage'] = [ '@id' => $canonical ];

		// Add the author
		$data['author'] = [ '@id' => 'https://www.vesselcomic.com/#organization' ];

		return $data;
	}
}


function add_comic_piece( $pieces, $context ) {
	$pieces[] = new ComicStory( $context );
	return $pieces;
}
add_filter( 'wpseo_schema_graph_pieces', 'add_comic_piece', 11, 2 );

add_filter( 'yoast_seo_development_mode', '__return_true' );