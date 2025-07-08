import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss'],
})
export class PersonalInfoFormComponent  implements OnInit {

  constructor() { }

formData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: ''
};


  ngOnInit() {}

countries = [
  {
    name: 'UAE',
    code: '+971',
    img: 'assets/uae-flag.png',
    flag: '🇦🇪'
  },
  {
    name: 'USA',
    code: '+1',
    img: 'assets/usa-flag.png',
    flag: '🇺🇸'
  },
  {
    name: 'Germany',
    code: '+49',
    img: 'assets/germany-flag.png',
    flag: '🇩🇪'
  },
  {
    name: 'France',
    code: '+33',
    img: 'assets/france-flag.png',
    flag: '🇫🇷'
  },
  {
    name: 'Spain',
    code: '+34',
    img: 'assets/spain-flag.png',
    flag: '🇪🇸'
  },
  {
    name: 'Italy',
    code: '+39',
    img: 'assets/italy-flag.png',
    flag: '🇮🇹'
  },
  {
    name: 'Netherlands',
    code: '+31',
    img: 'assets/netherlands-flag.png',
    flag: '🇳🇱'
  },
  {
    name: 'Sweden',
    code: '+46',
    img: 'assets/sweden-flag.png',
    flag: '🇸🇪'
  }
];


  selectedCountry = this.countries[0]; // Default to UAE

  onCountryChange() {
    // You could do extra logic here if needed
    console.log('Selected Country:', this.selectedCountry);
  }

}
