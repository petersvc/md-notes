import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import { NoteComponent } from "./components/content/note.component";
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from "./services/toast.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, NoteComponent, ToastComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "notes";
  toast = inject(ToastService);

  constructor() {
    this.setTheme();
  }

  setTheme() {
    if (
      localStorage["theme"] === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Whenever the user explicitly chooses light mode
    localStorage["theme"] = "light";

    // Whenever the user explicitly chooses dark mode
    localStorage["theme"] = "dark";

    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem("theme");
  }
}
