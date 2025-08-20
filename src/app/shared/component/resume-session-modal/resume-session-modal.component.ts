import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-resume-session-modal',
  templateUrl: './resume-session-modal.component.html',
  styleUrls: ['./resume-session-modal.component.scss'],
})
export class ResumeSessionModalComponent  implements OnInit {
  @Input() show = false;
  @Output() resume = new EventEmitter<void>();
  @Output() discard = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {}

}
