import { Observable, BehaviorSubject, of } from 'rxjs';
import { IWeatherService} from './weather.service';
import { ICurrentWeather } from '../interfaces';
import { HttpClientTestingModule } from '@angular/common/http/testing';

export class WeatherServiceFake implements IWeatherService {

  private fakeWeather: ICurrentWeather = {
    city: 'TimBuck Two',
    country: 'RU',
    date: 1485789600,
    image: '',
    temperature: 280.32,
    description: 'light rain with drizzle'
  };

  currentWeather = new BehaviorSubject<ICurrentWeather>(this.fakeWeather);

  public getCurrentWeather(city: string, country: string): Observable <ICurrentWeather> {
    return of(this.fakeWeather);
  }

  public getCurrentWeatherByCoords( coords: Coordinates): Observable <ICurrentWeather> {
    return of(this.fakeWeather);
  }

}

