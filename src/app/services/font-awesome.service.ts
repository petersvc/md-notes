import { Injectable } from '@angular/core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Injectable({
	providedIn: 'root'
})
export class FontAwesomeService {
	regular = far;
	solid = fas;
}
