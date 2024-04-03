//import { toSignal } from "@angular/core/rxjs-interop";
import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Note } from "../models/note";
import { EMPTY, Observable, catchError, tap } from "rxjs";
import { ToastService } from "./toast.service";

@Injectable({
  providedIn: "root",
})
export class NotesService {
	toast = inject(ToastService);
  http = inject(HttpClient);
  endpoint = "http://localhost:9090/api/notes";
  notes = signal<Note[]>([]);
  folders = signal<Set<string>>(new Set());

  getNotes(): Observable<Note[]> {
		return this.http
			.get<Note[]>(this.endpoint)
			.pipe(
				tap((notes) => {
					this.notes.set(notes)
					this.folders.set(new Set(this.notes().map((note) => this.capitalizeFirstLetter(note.folder))));
					this.toast.invoke(true, "Notas carregadas com sucesso");
				}),
				catchError((error) => {
					console.error(error);
					this.toast.invoke(false, "Falha ao carregar as notas");
					return EMPTY;
				})
			);
  }

  getNoteById(id: string): Note {
    const note = this.notes().find((note) => note.id === id);
    if (note) {
			//this.toast.invoke(true, "Nota carregada com sucesso");
      return note;
    } else {
			this.toast.invoke(false, "Falha ao carregar a nota");
      return {
        id: "",
        title: "",
        subtitle: "",
        content: "",
        date: "",
        folder: "",
      };
    }
  }

  updateNote(updatedNote: Note): Observable<Note> {
    return this.http
      .put<Note>(`${this.endpoint}/${updatedNote.id}`, updatedNote)
      .pipe(
				tap((note) => {
					this.revalidateNotes(note)
					this.toast.invoke(true, "Nota atualizada com sucesso");
				}),
				catchError((error) => {
					console.error(error);
					this.toast.invoke(false, "Falha ao atualizar a nota");
					return EMPTY;
				})
			);
  }

	revalidateNotes(note: Note) {
		const index = this.notes().findIndex((n) => n.id === note.id) as number;
		this.notes.update((notes) => {
			notes.splice(index, 1, note);
			console.log(notes[index])
			return notes;
		});
	}

	createNote(note: Note) {
		this.http.post(this.endpoint, note).subscribe();
	}

  deleteNoteById(id: string) {
    this.http.delete(`${this.endpoint}/${id}`).subscribe();
  }

	capitalizeFirstLetter(word: string) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}
}


// .subscribe((notes) => {
// 	setTimeout(() => {
// 		this.notes.set(notes);
// 		this.folders.set(new Set(this.notes().map((note) => note.folder)));
// 	}, 1000)
// });