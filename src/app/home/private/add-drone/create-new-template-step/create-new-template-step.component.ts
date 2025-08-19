import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

interface GeometryOption {
  name: string;
  image: string;
}

@Component({
  selector: 'app-create-new-template-step',
  templateUrl: './create-new-template-step.component.html',
  styleUrls: ['./create-new-template-step.component.scss'],
})
export class CreateNewTemplateStepComponent implements OnInit {
  @Output() cancel = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();



  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  selectedGeometry: string | null = null;
  geometryOptions: GeometryOption[] = [
    { name: 'Quadrotor', image: '../../../../../assets/svgs/private/Quadrotor.svg' },
    { name: 'Hexarotor', image: '../../../../../assets/svgs/private/Hexarotor.svg' },
    { name: 'Octorotor', image: '../../../../../assets/svgs/private/Octorotor.svg' },
    { name: 'Octorotor Coaxial', image: '../../../../../assets/svgs/private/Octorotor Coaxial .svg' },
  ];

  selectedOption: string | null = null; // ✅ for button disable state
  form: FormGroup;
  cancelModalVisible = false; // ✅ for modal

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      geometry: [null, Validators.required],
      motorDistance: [null, Validators.required],
      propellerGroundDistance: [null, Validators.required],
      imuOffset: [null],
    });
  }

  ngOnInit() {}

selectGeometry(option: GeometryOption) {
  this.selectedGeometry = option.name;   // 👈 active card ke liye
  this.selectedOption = option.name;     // 👈 button ke liye
  this.form.patchValue({ geometry: option.name });
}


  continue() {
    if (this.form.valid && this.selectedOption) {
      console.log('Form Data:', this.form.value);
      this.next.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancelClick() {
    this.cancelModalVisible = true;
  }


  cancelConfirmed() {
    this.cancelModalVisible = false;
    this.cancel.emit();
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }
}
