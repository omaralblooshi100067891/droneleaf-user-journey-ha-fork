import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent  {

  @Input() type: 'button' | 'submit' = 'button';
  @Input() label: string = 'Click';
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = true;
  @Input() width: string = '37.5rem';

  @Output() clicked = new EventEmitter<void>();

}
