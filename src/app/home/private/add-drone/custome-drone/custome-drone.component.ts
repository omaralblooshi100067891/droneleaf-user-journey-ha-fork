import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-custome-drone',
  templateUrl: './custome-drone.component.html',
  styleUrls: ['./custome-drone.component.scss'],
})
export class CustomeDroneComponent  implements OnInit {
@Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
@Input() steps: Step[] = [];
@Input() currentStepIndex!: number;

  form!: FormGroup;

  applicationOptions: string[] = ['Agri', 'Survey'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      templateName: ['', Validators.required],
      application: ['', Validators.required],
      description: ['']
    });
  }

  cancel(){}

  submit(): void {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
      this.next.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }

}
