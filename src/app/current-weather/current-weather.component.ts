import { Component, OnInit } from '@angular/core';
import { ICurrentWeather} from '../interfaces';

@Component({
  selector: 'app-current-weather',
 templateUrl: './current-weather.component.html',
 //template: `<p> current WeAtHeR WorKS`,
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather;

  constructor() { 
    this.current = {
      city: 'Amarillo',
      country: 'USA',
      date: new Date(),
      image: 'assets/img/test.jpg',
      temperature: 81,
      description: 'Raining Outside',
      } as ICurrentWeather;

  }

  ngOnInit() {
  }

}
