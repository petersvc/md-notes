import { Routes } from "@angular/router";
import { NoteComponent } from "./components/content/note.component";

export const routes: Routes = [
  {
    path: "note/:id",
    component: NoteComponent,
  },
];
