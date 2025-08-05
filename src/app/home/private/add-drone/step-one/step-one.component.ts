import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent implements OnInit {
   cancelModalVisible = false;
  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  @Output() next = new EventEmitter<'yes' | 'no'>();

  @Output() back = new EventEmitter<void>(); // if needed

  selectedOption: 'yes' | 'no' | null = null;

  selectOption(option: 'yes' | 'no') {
    this.selectedOption = option;
  }


  continue() {
    if (this.selectedOption) {
      this.next.emit(this.selectedOption);
    }
  }

    showCancelModal() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;

    // 🔥 Place your cancel logic here
    // e.g. navigate, reset form, etc
    console.log('Cancelled');
    this.router.navigate(['/dashboard']); // Or whatever route
  }

  // Called when user closes the modal
  cancelDismissed() {
    this.cancelModalVisible = false;
  }

 constructor(private router: Router) {}

  ngOnInit() {}
}
