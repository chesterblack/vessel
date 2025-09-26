import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class MyPlugin extends Plugin {
	async onload() {
		// This creates an icon in the left ribbon.
		this.addRibbonIcon( 'square-plus', 'Add new', ( _evt: MouseEvent ) => {
			this.createNewTemplatedNote();
		} );

		this.addCommand( {
			id: 'create-new-templated-note',
			name: 'Create new templated note',
			callback: () => this.createNewTemplatedNote()
		} );
	}

	onunload() {}

	createNewTemplatedNote() {
		this.app.commands.executeCommandById('file-explorer:new-file');
		this.app.commands.executeCommandById('insert-template');
	}
}
