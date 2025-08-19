import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateNewTemplateFormStepComponent } from './create-new-template-form-step.component';

describe('CreateNewTemplateFormStepComponent', () => {
  let component: CreateNewTemplateFormStepComponent;
  let fixture: ComponentFixture<CreateNewTemplateFormStepComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewTemplateFormStepComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNewTemplateFormStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
