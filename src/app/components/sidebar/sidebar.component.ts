import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontAwesomeService } from '../../services/font-awesome.service';
import { NotesService } from '../../services/notes.service';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [FontAwesomeModule],
	templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
	FontAwesomeService = inject(FontAwesomeService);
	regular = this.FontAwesomeService.regular;
	solid = this.FontAwesomeService.solid;

	notesService = inject(NotesService);
	notes = this.notesService.notes;
	folders = this.notesService.folders;

	getNotesByFolder(folder: string) {
		return this.notes().filter(note => note.folder === folder.toLowerCase());
	}

	themeToggle() {
		document.documentElement.classList.toggle('dark');
	}
	// folders = [
	// 	'Inbox',
	// 	'Drafts',
	// 	'Sent',
	// 	'Trash',
	// 	'Daily',
	// 	'Significant',
	// 	'Work',
	// 	'Personal',
	// 	'Studies',
	// 	'Projects',
	// 	'Travel',
	// 	'Meetings',
	// 	'Ideas',
	// 	'Recipes'
	// ];
}
