import { Component, OnInit } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-add-drone',
  templateUrl: './add-drone.component.html',
  styleUrls: ['./add-drone.component.scss'],
})
export class AddDroneComponent  implements OnInit {
  // add-drone.component.ts
selectedOption: 'yes' | 'no' | null = null;

selectOption(option: 'yes' | 'no') {
  this.selectedOption = option;
}


  constructor() { }
steps: Step[] = [
  { title: 'Drone Details', completed: true },
  { title: 'Camera Setup', completed: false },
  { title: 'Flight Range', completed: false },
  { title: 'Regulations', completed: false },
  { title: 'Insurance', completed: false },
  { title: 'Confirmation', completed: false }
];


  currentStep = 0;

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.steps[this.currentStep].completed = true;
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.steps[this.currentStep].completed = false;
      this.currentStep--;
    }
  }

  ngOnInit() {}

}
