import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss'],
})
export class PersonalInfoFormComponent implements OnInit {
  personalInfoForm!: FormGroup;
@Output() formSubmitted = new EventEmitter<void>();
   constructor(private fb: FormBuilder) {
    this.personalInfoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      marketing: [false]
    }, { validator: this.passwordMatchValidator });
  }
passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }
  ngOnInit() {

  }

  get firstName() { return this.personalInfoForm.get('firstName'); }
  get lastName() { return this.personalInfoForm.get('lastName'); }
  get phone() { return this.personalInfoForm.get('phone'); }
  get email() { return this.personalInfoForm.get('email'); }
  get password() { return this.personalInfoForm.get('password'); }
  get confirmPassword() { return this.personalInfoForm.get('confirmPassword'); }
  get terms() { return this.personalInfoForm.get('terms'); }

  countries = [
    {
      name: 'UAE',
      code: '+971',
      img: 'assets/uae-flag.png',
      flag: '🇦🇪',
    },
    {
      name: 'USA',
      code: '+1',
      img: 'assets/usa-flag.png',
      flag: '🇺🇸',
    },
    {
      name: 'Germany',
      code: '+49',
      img: 'assets/germany-flag.png',
      flag: '🇩🇪',
    },
    {
      name: 'France',
      code: '+33',
      img: 'assets/france-flag.png',
      flag: '🇫🇷',
    },
    {
      name: 'Spain',
      code: '+34',
      img: 'assets/spain-flag.png',
      flag: '🇪🇸',
    },
    {
      name: 'Italy',
      code: '+39',
      img: 'assets/italy-flag.png',
      flag: '🇮🇹',
    },
    {
      name: 'Netherlands',
      code: '+31',
      img: 'assets/netherlands-flag.png',
      flag: '🇳🇱',
    },
    {
      name: 'Sweden',
      code: '+46',
      img: 'assets/sweden-flag.png',
      flag: '🇸🇪',
    },
  ];

  selectedCountry = this.countries[0]; // Default to UAE

  onCountryChange(event: any) {
    this.selectedCountry = event;
    console.log('Selected Country:', this.selectedCountry);
  }

onSubmit() {
  if (this.personalInfoForm.valid) {
    this.formSubmitted.emit();
  } else {
    this.personalInfoForm.markAllAsTouched();
  }
}
}
