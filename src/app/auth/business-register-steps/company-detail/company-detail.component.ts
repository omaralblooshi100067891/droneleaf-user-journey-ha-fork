import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent implements OnInit {
  @Output() submitted = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<void>();

  finalForm!: FormGroup;

  constructor(private fb: FormBuilder, private location: Location,private router: Router,private authService:AuthService) {}

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.finalForm = this.fb.group({
      organizationName: ['', Validators.required],
      primaryUse: ['', Validators.required],
      collaborators: ['', Validators.required],
      experienceLevel: [''],
      otherPrimaryUse: [''],
      pilots: [''],
    });

    this.finalForm.get('primaryUse')?.valueChanges.subscribe((val) => {
      const otherCtrl = this.finalForm.get('otherPrimaryUse');
      if (val === 'Other') {
        otherCtrl?.setValidators([Validators.required]);
      } else {
        otherCtrl?.clearValidators();
      }
      otherCtrl?.updateValueAndValidity();
    });
  }

  get f() {
    return this.finalForm.controls;
  }

goToBusniessDashboard() {
  // ✅ Assume business registered successfully
  this.authService.login('business'); // 🔥 Login & set role properly
  this.router.navigate(['/business-dashboard']);
}



  goToLogin(){
   this.router.navigate(['auth/login']);

  }

  onSubmit(): void {
    if (this.finalForm.valid) {
      this.formSubmitted.emit();
    } else {
      this.finalForm.markAllAsTouched();
    }
  }

  primaryUseOptions = [
    'Research & Development',
    'Academia',
    'Surveillance',
    'Tech',
    'Warehousing',
    'Other',
  ];
}
