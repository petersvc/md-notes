import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, SidebarComponent, HeaderComponent, ContentComponent],
	templateUrl: './app.component.html'
})
export class AppComponent {
	title = 'notes';

	constructor() {
		this.setTheme();
	}

	setTheme() {
		if (
			localStorage['theme'] === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		// Whenever the user explicitly chooses light mode
		localStorage['theme'] = 'light';

		// Whenever the user explicitly chooses dark mode
		localStorage['theme'] = 'dark';

		// Whenever the user explicitly chooses to respect the OS preference
		localStorage.removeItem('theme');
	}
}
