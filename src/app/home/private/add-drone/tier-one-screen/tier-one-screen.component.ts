import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-tier-one-screen',
  templateUrl: './tier-one-screen.component.html',
  styleUrls: ['./tier-one-screen.component.scss'],
})
export class TierOneScreenComponent  implements OnInit {
  @Input() steps: Step[] = [];
  @Input() currentStepIndex: number = 0;

  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  ip: string = '';
  constructor() { }

  ngOnInit() {}

}
