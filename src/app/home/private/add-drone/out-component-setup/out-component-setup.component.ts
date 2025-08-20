import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Step } from 'src/app/core/models/add-drone-stepper.model';
import { AddDroneWizardStateService } from 'src/app/core/services/add-drone-wizard-state.service';

@Component({
  selector: 'app-out-component-setup',
  templateUrl: './out-component-setup.component.html',
  styleUrls: ['./out-component-setup.component.scss'],
})
export class OutComponentSetupComponent implements OnInit {
  cancelModalVisible = false;

  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;

  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  axisX = '0.0';
  axisY = '0.0';
  axisZ = '0.0';

  rtkStations = ['Base Station 1', 'Base Station 2', 'Base Station 3'];
  gpsModules = ['Ublox M8N', 'Ublox ZED-F9P', 'Other'];
  distanceSensors = ['LidarLite v3', 'TFMini Plus', 'Other'];

  constructor(
    private fb: FormBuilder,
    private wizardStateService: AddDroneWizardStateService
  ) {
    this.form = this.fb.group({
      environmentName: ['', Validators.required],
      rtkBaseStation: ['', Validators.required],
      gpsModuleModel: ['', Validators.required],
      gpsOffsetX: [0],
      gpsOffsetY: [0],
      gpsOffsetZ: [0],
      distanceSensorModel: ['', Validators.required],
      distanceOffsetX: [0],
      distanceOffsetY: [0],
      distanceOffsetZ: [0],
    });
  }

  ngOnInit() {
    // 🟢 Restore saved form if available
    const saved = this.wizardStateService.getStepData(this.currentStepIndex);
    if (saved) {
      this.form.patchValue(saved);
    }

    // 🟢 Auto-save on changes
    this.form.valueChanges.subscribe((val) => {
      this.wizardStateService.saveStepData(this.currentStepIndex, val);
    });
  }

  // -------- Cancel Flow --------
  showCancelModal() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    this.wizardStateService.clear(); // ✅ saara wizard state clear
    console.log('Cancelled + State Cleared');
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }

  // -------- Navigation --------
  goBack() {
    this.back.emit();
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onContinue() {
    if (this.form.valid) {
      // ✅ latest save ensure
      this.wizardStateService.saveStepData(
        this.currentStepIndex,
        this.form.value
      );
      this.next.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
