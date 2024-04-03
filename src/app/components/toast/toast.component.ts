import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastService } from './../../services/toast.service';
import { Component, inject } from '@angular/core';
import { FontAwesomeService } from '../../services/font-awesome.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  toast = inject(ToastService);
  fontAwesome = inject(FontAwesomeService);
  regular = this.fontAwesome.regular;
	solid = this.fontAwesome.solid;
}
