import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { ICurrentWeather } from '../interfaces';
import { map } from 'rxjs/operators';


interface ICurrentWeatherData {
  weather: [{
    description: string;
    icon: string;
  }];
  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  name: string;
}

export interface IWeatherService {
  getCurrentWeather(search: string | number, country?: string): Observable<ICurrentWeather>;
  getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather>;
}

@Injectable({
  providedIn: 'root'
})

export class WeatherService implements IWeatherService {

//  currentWeather: Subject<ICurrentWeather>;
  currentWeather = new BehaviorSubject<ICurrentWeather>({
    city: '--',
    country: '--',
    date: Date.now(),
    image: '',
    temperature: 0,
    description: ''
  });

  constructor(private httpClient: HttpClient) { }

  private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return ( {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png' ,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description
    } );
  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return kelvin * 9 / 5 - 459.67;
  }


  private getCurrentWeatherHelper (uriParms: string): Observable <ICurrentWeather> {
    console.log('getCurrentWeatherHelper Parms: ' + uriParms );
    return  (this.httpClient
          .get<ICurrentWeatherData>(
          `http://api.openweathermap.org/data/2.5/weather?`    +
          `${uriParms}&appid=9d55b4df41366eac950246edc74f19e5`
          ).pipe(
            map(data => this.transformToICurrentWeather(data))
          ) );
    }

  getCurrentWeather( search: string | number, country: string ): Observable <ICurrentWeather> {
    let uriParms = '';

    if ( typeof search === 'string' ) {
      uriParms = `q=${search}`;
    } else {
      uriParms = `zip=${search}`;
    }

    if (country) {
        uriParms = `${uriParms},${country}`;
      }

    console.log('getCurrentWeather Parms: ' + uriParms );
    return  this.getCurrentWeatherHelper(uriParms);
  }

  getCurrentWeatherByCoords( coords: Coordinates): Observable <ICurrentWeather> {
      const uriParms = `lat=${coords.latitude}&lon=${coords.longitude}`;

      return  this.getCurrentWeatherHelper(uriParms);
  }

}

