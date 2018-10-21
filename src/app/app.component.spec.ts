import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherService } from './weather/weather.service';
import { WeatherServiceFake } from './weather/weather.service.fake';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AppComponent', () => {
  beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent, CurrentWeatherComponent ],
        providers: [{ provide: WeatherService, useClass: WeatherServiceFake }],
        imports: [],
      }).compileComponents();
    }));


  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('LocalCast');
  }));
});
