import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-create-new-template-form-step',
  templateUrl: './create-new-template-form-step.component.html',
  styleUrls: ['./create-new-template-form-step.component.scss'],
})
export class CreateNewTemplateFormStepComponent  implements OnInit {
    @Output() cancel = new EventEmitter<void>();
    @Output() next = new EventEmitter<void>();
    @Output() back = new EventEmitter<void>();
  cancelModalVisible = false;
      @Input() steps!: Step[];
      @Input() currentStepIndex!: number;
      selectedOption: string | null = null;
 powerSystemForm!: FormGroup;

  batteryManufacturers = ['Acehe', 'Bonka Power', 'CNHL (China Hobby Line)','Desire Power','Dinogy','E-Flite','Floureon'];
  batteryChemistries = ['LiPo', 'Li-ion', 'NiMH'];
  escManufacturers = ['Hobbywing', 'DJI', 'T-Motor'];
  escVoltages = ['6V', '12V', '24V', '48V'];
  escFirmwares = ['BLHeli', 'SimonK', 'Custom'];
  escInterfaces = ['PWM', 'OneShot', 'DShot'];
  motorManufacturers = ['T-Motor', 'SunnySky', 'EMAX'];
  propellerManufacturers = ['APC', 'Gemfan', 'HQProp'];


constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.powerSystemForm = this.fb.group({
      batteryManufacturer: ['', Validators.required],
      batteryChemistry: ['', Validators.required],
      batteryPacks: ['', Validators.required],
      cellsInSeries: ['', Validators.required],
      batteryCapacity: ['', Validators.required],
      maxDischargeCurrent: ['', Validators.required],
      batteryWeight: ['', Validators.required],

      escManufacturer: ['', Validators.required],
      escModel: ['', Validators.required],
      escCurrentRating: ['', Validators.required],
      escMinVoltage: ['', Validators.required],
      escMaxVoltage: ['', Validators.required],
      escFirmware: ['', Validators.required],
      escInterface: ['', Validators.required],

      motorManufacturer: ['', Validators.required],
      motorModel: ['', Validators.required],
      motorKv: ['', Validators.required],

      propellerManufacturer: ['', Validators.required],
      propellerModel: ['', Validators.required],
      propellerBlades: ['', Validators.required],
      propellerDiameter: ['', Validators.required],
      propellerPitch: ['', Validators.required],
    });
  }

  continue() {
    if (this.powerSystemForm.valid ) {
      console.log('Form Data:', this.powerSystemForm.value);
      this.next.emit();
    } else {
      this.powerSystemForm.markAllAsTouched();
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
