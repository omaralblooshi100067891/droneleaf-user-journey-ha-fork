import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-out-component-setup',
  templateUrl: './out-component-setup.component.html',
  styleUrls: ['./out-component-setup.component.scss'],
})
export class OutComponentSetupComponent implements OnInit {
  cancelModalVisible = false;

  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  form: FormGroup;
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  environmentName: string = '';
  rtkBaseStation: string = '';
  gpsModuleModel: string = '';
  distanceSensorModel: string = '';

  gpsOffset = { x: 0, y: 0, z: 0 };
  distanceOffset = { x: 0, y: 0, z: 0 };

  rtkStations = ['Base Station 1', 'Base Station 2', 'Base Station 3'];
  gpsModules = ['Ublox M8N', 'Ublox ZED-F9P', 'Other'];
  distanceSensors = ['LidarLite v3', 'TFMini Plus', 'Other'];
 constructor(private fb: FormBuilder) {
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

  ngOnInit() {}

  showCancelModal() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    console.log('Cancelled');
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }

  goBack() {
    this.back.emit();
  }

  onCancelClick() {
    this.cancel.emit();
  }
}
