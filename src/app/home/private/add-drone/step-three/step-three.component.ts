import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
})
export class StepThreeComponent implements OnInit {
  cancelModalVisible = false;
  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  @Output() next = new EventEmitter<'new_template' | 'existing_template'>();

  @Output() back = new EventEmitter<void>(); // if needed


  selectedOption: 'new_template' | 'existing_template' | null = null;
  selectOption(option: 'new_template' | 'existing_template') {
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
    console.log('Cancelled');
    this.router.navigate(['/dashboard']); // Or whatever route
  }

  // Called when user closes the modal
  cancelDismissed() {
    this.cancelModalVisible = false;
  }

  @Output() cancel = new EventEmitter<void>();

  onCancelClick() {
    this.cancel.emit();
  }

  constructor(private router: Router) {}

  ngOnInit() {}
}
