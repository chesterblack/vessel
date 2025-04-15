<?php
// This file is generated. Do not modify it manually.
return array(
	'character-bio' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'vessel/character-bio',
		'version' => '0.1.0',
		'title' => 'Character Bio',
		'category' => 'widgets',
		'icon' => 'universal-access',
		'description' => 'Info panel for a character.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'character-bio',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'attributes' => array(
			'portrait' => array(
				'type' => 'object'
			),
			'descriptions' => array(
				'type' => 'object'
			)
		)
	),
	'comic-page' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'vessel/comic-page',
		'version' => '0.1.0',
		'title' => 'Comic Page',
		'category' => 'widgets',
		'icon' => 'welcome-add-page',
		'description' => 'A comic page.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'comic-page',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'attributes' => array(
			'pageImage' => array(
				'type' => 'object',
				'default' => array(
					
				)
			)
		)
	)
);
