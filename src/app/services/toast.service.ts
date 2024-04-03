import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  show = false;
  success = true;
  message = '';
  icon = 'faCircleCheck';
  bgColor = 'bg-[rgb(10,46,27)]';
  textColor = 'text-[rgb(132,223,174)]'

  invoke(success: boolean, message: string) {
    this.show = true;
    this.success = success;
    this.message = message;

    if (!success) {
      this.icon = 'faCircleXmark';
      this.bgColor = 'bg-[rgb(76,0,38)]';
      this.textColor = 'text-[rgb(219,198,209)]';
    }

    setTimeout(() => {
      this.show = false;
      this.success = true;
      this.message = '';
      this.icon = 'faCircleCheck';
      this.bgColor = 'bg-[rgb(10,46,27)]';
      this.textColor = 'text-[rgb(132,223,174)]';
    }, 5000);
  }
}
