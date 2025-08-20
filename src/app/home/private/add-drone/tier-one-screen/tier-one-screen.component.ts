import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Step } from 'src/app/core/models/add-drone-stepper.model';
import { AddDroneWizardStateService } from 'src/app/core/services/add-drone-wizard-state.service';

@Component({
  selector: 'app-tier-one-screen',
  templateUrl: './tier-one-screen.component.html',
  styleUrls: ['./tier-one-screen.component.scss'],
})
export class TierOneScreenComponent implements OnInit {
  @Input() steps: Step[] = [];
  @Input() currentStepIndex: number = 0;
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  cancelModalVisible = false;

  constructor(private stateService: AddDroneWizardStateService) {}

  ngOnInit() {
    this.form = new FormGroup({
      ip: new FormControl('', [Validators.required]),
      machineId: new FormControl('', [Validators.required]),
      apiKey: new FormControl('', [Validators.required]),
    });
  }

  generateApiKey() {
    const key = 'API-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    this.form.get('apiKey')?.setValue(key);
  }

  get ipControl(): FormControl {
    return this.form.get('ip')! as FormControl;
  }

  get machineIdControl(): FormControl {
    return this.form.get('machineId')! as FormControl;
  }

  get apiKeyControl(): FormControl {
    return this.form.get('apiKey')! as FormControl;
  }

  copyApiKey(input: HTMLInputElement) {
    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value).then(() => {
      console.log('API Key copied:', input.value);
    });
    input.classList.add('bg-white');
  }

  openDashboard() {
    const ip = this.form.get('ip')?.value;
    if (ip) {
      const url = `http://${ip}`;
      window.open(url, '_blank');
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.next.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }

  // ✅ Cancel modal logic
  onCancelClick() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    this.stateService.clear(); // ✅ clear local storage
    this.cancel.emit();
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }
}
