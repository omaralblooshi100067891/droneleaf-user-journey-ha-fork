import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-custom-drone-details',
  templateUrl: './custom-drone-details.component.html',
  styleUrls: ['./custom-drone-details.component.scss'],
})
export class CustomDroneDetailsComponent implements OnInit {
  @Output() submitted = new EventEmitter<void>();

  finalForm!: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) {}

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.finalForm = this.fb.group({
      customDroneCount: ['', Validators.required],
      primaryUse: ['', Validators.required],
      howDidYouHear: ['', Validators.required],
      experienceLevel: [''],
      reason: [''],
    });
  }

  get f() {
    return this.finalForm.controls;
  }

  onSubmit() {
    if (this.finalForm.valid) {
      console.log('✅ Final form submitted:', this.finalForm.value);
      this.submitted.emit();
    } else {
      this.finalForm.markAllAsTouched();
    }
  }

  primaryUseOptions = ['Inspection', 'Monitoring ', 'Surveillance'];

  hearOptions = [
    'Social Media',
    'Friend',
    'YouTube',
    'Google Search',
    'Event / Conference',
    'Other',
  ];

  experienceOptions = [
    'Just starting',
    'Hobbyist',
    'Professional',
    'Commercial operator',
  ];
}
