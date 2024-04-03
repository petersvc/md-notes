import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontAwesomeService } from '../../services/font-awesome.service';
import { NotesService } from '../../services/notes.service';
import { RouterLink } from '@angular/router';
import { take } from 'rxjs';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [FontAwesomeModule, RouterLink],
	templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
	notesService = inject(NotesService);
	FontAwesomeService = inject(FontAwesomeService);
	regular = this.FontAwesomeService.regular;
	solid = this.FontAwesomeService.solid;

	get notes() {
		return this.notesService.notes;
	}

	get folders() {
		return this.notesService.folders;
	}

	ngOnInit() {
		this.notesService.getNotes().pipe(take(1)).subscribe();
	}

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
