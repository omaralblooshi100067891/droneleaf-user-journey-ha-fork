import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExistingAndNewTemplateStepComponent } from './existing-and-new-template-step.component';

describe('ExistingAndNewTemplateStepComponent', () => {
  let component: ExistingAndNewTemplateStepComponent;
  let fixture: ComponentFixture<ExistingAndNewTemplateStepComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingAndNewTemplateStepComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExistingAndNewTemplateStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
