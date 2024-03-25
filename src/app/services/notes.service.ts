import { Injectable, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { HttpClient } from "@angular/common/http";
import { Note } from "../models/note";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  http = inject(HttpClient);
  endpoint = "http://localhost:9090/api/notes";
  notes = toSignal(this.http.get<Note[]>(this.endpoint), {
    initialValue: [],
  });
  folders = computed(
    () =>
      new Set(
        this.notes().map(
          (note) => note.folder.charAt(0).toUpperCase() + note.folder.slice(1)
        )
      )
  );

  getNoteById(id: string): Note {
    const note = this.notes().find((note) => note.id === id);
    if (note) {
      return note;
    } else {
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
}
