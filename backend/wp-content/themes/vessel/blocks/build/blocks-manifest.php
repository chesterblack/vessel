<?php
// This file is generated. Do not modify it manually.
return array(
	'character-bio-v2' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'vessel/character-bio-v2',
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
		'textdomain' => 'character-bio-v2',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'attributes' => array(
			'chapters' => array(
				'type' => 'string'
			)
		),
		'usesContext' => array(
			'postId',
			'postType'
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
			'html' => false,
			'multiple' => false
		),
		'textdomain' => 'comic-page',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'attributes' => array(
			'pageImage' => array(
				'type' => 'object'
			),
			'characters' => array(
				'type' => 'array'
			),
			'backgroundGradient' => array(
				'type' => 'string'
			),
			'backgroundImage' => array(
				'type' => 'object'
			)
		),
		'usesContext' => array(
			'postId',
			'postType'
		)
	),
	'fanart' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'vessel/fanart',
		'version' => '0.1.0',
		'title' => 'Fanart',
		'category' => 'widgets',
		'icon' => 'admin-customizer',
		'description' => 'Fanart.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'fanart',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'attributes' => array(
			'pageImage' => array(
				'type' => 'object'
			),
			'creditName' => array(
				'type' => 'string'
			),
			'creditLink' => array(
				'type' => 'string'
			),
			'characters' => array(
				'type' => 'array'
			)
		)
	)
);
