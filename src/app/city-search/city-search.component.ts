import { WeatherService } from '../weather/weather.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})

export class CitySearchComponent implements OnInit {

  search = new FormControl('', [Validators.required, Validators.minLength(2) ]);

  constructor(private weatherService: WeatherService) { }

  getErrorMessage() {
    return this.search.hasError('minlength') ? 'Type more than one chracter to search' : '';
  }

    ngOnInit() {
    this.search.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((searchValue: string) => {
        if (!this.search.invalid) {
          const userInput = searchValue.split(',').map(s => s.trim());

          console.log('1:' + userInput[0] +  ' -- 2:' + userInput[1] )

          this.weatherService.getCurrentWeather(userInput[0], userInput.length > 1 ? userInput[1] : undefined)
          .subscribe(data => this.weatherService.currentWeather.next(data));
        }
    });
  }
}
