import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-existing-and-new-template-step',
  templateUrl: './existing-and-new-template-step.component.html',
  styleUrls: ['./existing-and-new-template-step.component.scss'],
})
export class ExistingAndNewTemplateStepComponent  implements OnInit {
  cancelModalVisible = false;
  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  @Output() next = new EventEmitter<'existing' | 'new'>();

  @Output() back = new EventEmitter<void>(); // if needed

  selectedOption: 'existing' | 'new' | null = null;

  selectOption(option: 'existing' | 'new') {
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
