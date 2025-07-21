import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Country {
  name: string;
  dial_code: string;
  code: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryPhoneService {
  private countryJsonUrl = '../../../assets/country.json';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countryJsonUrl);
  }

  searchCountries(query: string): Observable<Country[]> {
    return this.getAllCountries().pipe(
      map(countries =>
        countries.filter(country =>
          country.name.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }
}
