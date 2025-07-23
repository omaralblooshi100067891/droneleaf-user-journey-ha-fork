import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


export enum BusinessSteps {
  Info = 'business-info',
  Email = 'email-verification',
  Details = 'business-details',
  Company = 'company'
}
@Component({
  selector: 'app-business-register',
  templateUrl: './business-register.component.html',
  styleUrls: ['./business-register.component.scss'],
})
export class BusinessRegisterComponent  implements OnInit {
  step: BusinessSteps = BusinessSteps.Info;
  BusinessSteps = BusinessSteps;

  constructor(private route: ActivatedRoute, private router: Router) {}

ngOnInit(): void {
  this.route.queryParamMap.subscribe((params) => {
    const queryStep = params.get('step') as BusinessSteps;
    this.step = Object.values(BusinessSteps).includes(queryStep)
      ? queryStep
      : BusinessSteps.Info;
  });
}


  updateStep(step: BusinessSteps): void {
    this.step = step;
    this.router.navigate([], {
      queryParams: { step },
      queryParamsHandling: 'merge',
    });
  }

next(): void {
  console.log('Current step before update:', this.step);

  switch (this.step) {
    case BusinessSteps.Info:
      this.updateStep(BusinessSteps.Email);
      break;

    case BusinessSteps.Email:
      this.updateStep(BusinessSteps.Details);
      break;

    case BusinessSteps.Details:
      this.updateStep(BusinessSteps.Company);
      break;

    case BusinessSteps.Company:
      console.log('✅ Business Registration Completed!');
      break;

    default:
      console.warn('Unknown step:', this.step);
      break;
  }
}



  prev(): void {
    switch (this.step) {
      case BusinessSteps.Email:
        this.updateStep(BusinessSteps.Info);
        break;
      case BusinessSteps.Details:
        this.updateStep(BusinessSteps.Email);
        break;
      case BusinessSteps.Company:
        this.updateStep(BusinessSteps.Details);
        break;
    }
  }

}
