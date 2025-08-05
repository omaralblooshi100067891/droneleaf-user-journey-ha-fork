import { Component, OnInit } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-add-drone',
  templateUrl: './add-drone.component.html',
  styleUrls: ['./add-drone.component.scss'],
})
export class AddDroneComponent  implements OnInit {
 currentStepIndex = 0;
 selectedDroneOption: 'yes' | 'no' | null = null;
  steps = [
    { title: 'Drone Type', completed: false },
    { title: 'Environment', completed: false },
    { title: 'Flight Range', completed: false },
    { title: 'Camera Setup', completed: false },
    { title: 'Insurance', completed: false },
    { title: 'Confirmation', completed: false }
  ];

 // parent.component.ts
goToStep(stepIndex: number, droneOption?: 'yes' | 'no') {
  // Mark current step as completed if moving forward
  if (stepIndex > this.currentStepIndex) {
    this.steps[this.currentStepIndex].completed = true;
  }

  // Update current step index
  this.currentStepIndex = stepIndex;

  // Save drone option if available
  if (droneOption) {
    this.selectedDroneOption = droneOption;
  }
}



  ngOnInit() {}

}
