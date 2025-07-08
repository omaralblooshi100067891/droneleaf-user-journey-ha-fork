import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent  {

@Input() label!: string;
@Input() placeholder: string = '';
@Input() type: string = 'text';
@Input() name!: string;

// For ngModel support
@Input() model: any;
@Output() modelChange = new EventEmitter<any>();

}
