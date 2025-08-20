import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Step } from 'src/app/core/models/add-drone-stepper.model';
import { AddDroneWizardStateService } from 'src/app/core/services/add-drone-wizard-state.service';

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
  selectedOption: string | null = null;

  geometryOptions: GeometryOption[] = [
    { name: 'Quadrotor', image: '../../../../../assets/svgs/private/Quadrotor.svg' },
    { name: 'Hexarotor', image: '../../../../../assets/svgs/private/Hexarotor.svg' },
    { name: 'Octorotor', image: '../../../../../assets/svgs/private/Octorotor.svg' },
    { name: 'Octorotor Coaxial', image: '../../../../../assets/svgs/private/Octorotor Coaxial .svg' },
  ];

  form: FormGroup;
  cancelModalVisible = false;

  constructor(
    private fb: FormBuilder,
    private wizardStateService: AddDroneWizardStateService
  ) {
    this.form = this.fb.group({
      geometry: [null, Validators.required],
      motorDistance: [null, Validators.required],
      propellerGroundDistance: [null, Validators.required],
      imuOffset: [null],
    });
  }

  ngOnInit() {
    // 🟢 Restore state if available
    const saved = this.wizardStateService.getStepData(this.currentStepIndex);
    if (saved) {
      this.form.patchValue(saved);

      if (saved.geometry) {
        this.selectedGeometry = saved.geometry;
        this.selectedOption = saved.geometry;
      }
    }

    // 🟢 Auto-save on form changes
    this.form.valueChanges.subscribe((val) => {
      this.wizardStateService.saveStepData(this.currentStepIndex, val);
    });
  }

  selectGeometry(option: GeometryOption) {
    this.selectedGeometry = option.name;
    this.selectedOption = option.name;
    this.form.patchValue({ geometry: option.name });

    // 🟢 Save immediately
    this.wizardStateService.saveStepData(this.currentStepIndex, this.form.value);
  }

  continue() {
    if (this.form.valid && this.selectedOption) {
      this.wizardStateService.saveStepData(this.currentStepIndex, this.form.value);
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
    this.wizardStateService.clear(); // 🟢 full wizard reset
    this.cancel.emit();
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }
}
