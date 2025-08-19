import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

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
    input.select(); // Select the text
    input.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard
      .writeText(input.value)
      .then(() => {
        console.log('API Key copied:', input.value);
        // Optional: show a toast/alert
      })
      .catch((err) => console.error('Failed to copy:', err));

    input.classList.add('bg-white'); // Ensure background stays white
  }

  openDashboard() {
    const ip = this.form.get('ip')?.value;
    if (ip) {
      const url = `http://${ip}`; // You can change this if port/path needed
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
}
