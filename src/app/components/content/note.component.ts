import { Component, computed, inject, signal } from "@angular/core";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontAwesomeService } from '../../services/font-awesome.service';
import { marked } from "marked";
import { NotesService } from './../../services/notes.service';
import { Note } from "../../models/note";

@Component({
  selector: "app-note",
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: "./note.component.html",
})
export class NoteComponent {
	activatedRoute = inject(ActivatedRoute);
	notesService = inject(NotesService);
	FontAwesomeService = inject(FontAwesomeService);
	regular = this.FontAwesomeService.regular;
	solid = this.FontAwesomeService.solid;
	note = signal<Note>({} as Note);
  mdContent = computed(() => marked(this.note().content));
	noteForm = new FormGroup({
		title: new FormControl('', Validators.required),
		subtitle: new FormControl('', Validators.required),
		content: new FormControl('', Validators.required),
		date: new FormControl('', Validators.required),
		folder: new FormControl('', Validators.required)
	});
	isEditing = false;

	ngOnInit() {
		this.activatedRoute.paramMap.subscribe(params => {
			const noteId = params.get('id') as string;
			this.note.set({...this.notesService.getNoteById(noteId)});
		});
	}

	toggleEditting() {
		this.isEditing = !this.isEditing;
	}

  handleOnChange(event: Event) {
  	this.mdContent = computed(() => marked((event.target as HTMLTextAreaElement).value));
  }

	saveNote() {
		//this.notesService.updateNote(this.note());
		this.toggleEditting();
	}
}



  // note = signal<Note>({
  //   id: crypto.randomUUID(),
  //   title: "Developing an Angular 17 App",
  //   subtitle: "A guide to develop an Angular app in it's most recent version.",
  //   content:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   date: "2022-01-01T00:00:00.000Z",
  //   folder: "studies",
  // });