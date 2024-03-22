import { Component, computed, signal } from '@angular/core';
import { Note } from './../../models/note';
import { marked } from 'marked';

@Component({
	selector: 'app-content',
	standalone: true,
	imports: [],
	templateUrl: './content.component.html'
})
export class ContentComponent {
	noteContent = signal(``);
	mdContent = computed(() => marked(this.noteContent()));
	note = signal<Note>({
		id: crypto.randomUUID(),
		title: 'Developing a Angular 17 App',
		subtitle: "A guide to develop an Angular app in it's most recent version.",
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		date: '2022-01-01T00:00:00.000Z',
		folder: 'studies'
	});

	handleOnChange(event: Event) {
		this.noteContent.set((event.target as HTMLTextAreaElement).value);
	}
}
