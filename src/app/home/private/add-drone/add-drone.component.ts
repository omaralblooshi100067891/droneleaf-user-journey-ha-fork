import { Component, OnInit } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-add-drone',
  templateUrl: './add-drone.component.html',
  styleUrls: ['./add-drone.component.scss'],
})
export class AddDroneComponent  implements OnInit {
 currentStepIndex = 0;

  steps = [
    { title: 'Drone Type', completed: false },
    { title: 'Environment', completed: false },
    { title: 'Flight Range', completed: false },
    { title: 'Camera Setup', completed: false },
    { title: 'Insurance', completed: false },
    { title: 'Confirmation', completed: false }
  ];

  goToStep(index: number) {
    if (index > this.currentStepIndex) {
      this.steps[this.currentStepIndex].completed = true;
    }
    this.currentStepIndex = index;
  }

  ngOnInit() {}

}
