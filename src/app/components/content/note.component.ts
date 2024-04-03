import { Component, Signal, computed, inject, signal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { marked } from "marked";
import { FontAwesomeService } from "../../services/font-awesome.service";
import { NotesService } from "./../../services/notes.service";
import { Note } from "../../models/note";
import { take } from "rxjs";
import { ToastService } from "../../services/toast.service";

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
  toast = inject(ToastService);

  regular = this.FontAwesomeService.regular;
  solid = this.FontAwesomeService.solid;

  note = signal<Note>({} as Note);
	mdContent!: Signal<string | Promise<string>>;

  noteForm!: FormGroup<{
    title: FormControl<string | null>;
    subtitle: FormControl<string | null>;
    content: FormControl<string | null>;
	}>;

  isEditing = false;

  ngOnInit() {		
    this.activatedRoute.paramMap.subscribe((params) => {
      const noteId = params.get("id") as string;
      this.note.set(this.notesService.getNoteById(noteId));
			this.noteForm = new FormGroup({
				title: new FormControl(this.note().title, Validators.required),
				subtitle: new FormControl(this.note().subtitle),
				content: new FormControl(this.note().content, Validators.required),
			});
			this.mdContent = computed(() => marked(this.note().content));
    });
  }

  toggleEditting() {
    this.isEditing = !this.isEditing;
  }

  handleOnChange(event: Event) {
    this.mdContent = computed(() =>
      marked((event.target as HTMLTextAreaElement).value)
    );
  }

  saveOrUpdateNote() {
    if (this.noteForm.invalid) {
      console.error("Invalid form");
      return;
    }

    if (this.note().id === "") {
			console.log(this.noteForm.value);
    } else {
			const updatedNote = {
				...this.note(), ...this.noteForm.value as Note
			};
			this.notesService.updateNote(updatedNote)
				.pipe(take(1))
				.subscribe(() => {
    			this.toggleEditting();
				});
    };
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
