import { FontAwesomeService } from './../../services/font-awesome.service';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [FontAwesomeModule],
	templateUrl: './header.component.html'
})
export class HeaderComponent {
	FontAwesomeService = inject(FontAwesomeService);
	regular = this.FontAwesomeService.regular;
	solid = this.FontAwesomeService.solid;
}
