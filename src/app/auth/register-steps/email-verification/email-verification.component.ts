import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent implements OnInit {
  @Output() verified = new EventEmitter<void>();
  @Output() goBack = new EventEmitter<void>();
  otpForm!: FormGroup;
  @Input() step: number = 2;           // default for private
@Input() totalSteps: number = 3;     // default for private
@Input() context: 'private' | 'business' = 'private';

  @ViewChildren('otpInput') otpInputs!: QueryList<IonInput>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      code: this.fb.array(
        Array(6)
          .fill('')
          .map(() =>
            this.fb.control('', [
              Validators.required,
              Validators.pattern(/^[0-9]$/),
            ])
          )
      ),
    });
  }

  get codeArray(): FormArray {
    return this.otpForm.get('code') as FormArray;
  }

  get codeFormControls(): FormControl[] {
    return this.codeArray.controls as FormControl[];
  }

  goBackHandler(): void {
    this.goBack.emit();
  }

  allowOnlyNumbers(event: any): void {
    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }
  focusedIndex: number | null = null;

  onOtpFocus(index: number): void {
    this.focusedIndex = index;
    // When focusing on a field, select its content for easy replacement
    const input = this.otpInputs.get(index);
    if (input) {
      setTimeout(() => {
        input.getInputElement().then((nativeInput) => {
          nativeInput.select();
        });
      }, 0);
    }
  }

  onOtpBlur(index: number): void {
    this.focusedIndex = null;
}

onOtpIonInput(event: any, index: number): void {
  const input = event.target as HTMLInputElement;
  let value = input.value;

  // Block non-numeric input completely
  if (!/^\d*$/.test(value)) {
    this.codeArray.at(index).setValue('');
    input.value = '';
    return;
  }

  // If user pasted or entered multiple digits, take only the first one
  if (value.length > 1) {
    value = value.charAt(0);
    this.codeArray.at(index).setValue(value);
    input.value = value;
  }

  // Update the form control
  this.codeArray.at(index).setValue(value);
  this.codeArray.at(index).markAsTouched();

  // Move to next field if current field has a value
  if (value && index < this.codeArray.length - 1) {
    setTimeout(() => {
      this.otpInputs.get(index + 1)?.setFocus();
    }, 10);
  }
}

  onVerify() {
    if (this.otpForm.valid) {
      this.verified.emit();
    } else {
      this.otpForm.markAllAsTouched();
      // Focus on the first empty field
      const firstEmptyIndex = this.codeFormControls.findIndex(ctrl => !ctrl.value);
      if (firstEmptyIndex >= 0) {
        this.otpInputs.get(firstEmptyIndex)?.setFocus();
      }
    }
  }
}
