import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Weather } from './models/weather';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'httpclient';
  WEATHER_API_KEY = "476e23fe1116f4e69d2a3e68672604e1"
  model = new Weather(null,0,0,0,'',0,0);
  image ="https://www.nea.gov.sg/assets/images/map/base-853.png";
  imgDict = [
    {city: 'Singapore', img: "https://www.nea.gov.sg/assets/images/map/base-853.png"},
    {city: 'Beijing', img: 'https://www.google.com/maps/vt/data=r--8QL2G2r45ERI-MNlFbeupFOlt9WJWWzBYMNzEPv1SxSWDA_KGX3Ka8ipoC74iaEZEGiYJuymiyzf4OatEOHRTBU7rFUZVa1ptztuhfBgmUwaL6dhIVOk1XLdxvEqAw_1MWQeKkqC8OS2QPQOTkcUDgMszuTKS8mO6KvAcqbJ1ol7B97RJmzztTgn4Zc88LwFK_lWhjhh1fpXIHPUdhnsW8pOYxCU'},
    {city: 'London', img: 'https://www.google.com/maps/vt/data=IR6zYoWDFjj5xPnfOC-VaLyl7edcBIlh55Hl8Fe0Twb-Ps5zcK89F08QarQcHBz4hphuCvNmC3WworGspC5WqLBOmvg4BJH5FDN9SW2X4eWSwwBZ4nc'},
  ]
  constructor(private weatherSvc: WeatherService){

  }

  ngOnInit(){
    console.log("retrieve weather !")
    this.weatherSvc.getWeather("Singapore", this.WEATHER_API_KEY).then((result)=>{
      console.log(result);
      console.log(result.main);
      this.model = new Weather(result.name,result.main.temp,result.main.pressure,result.main.humidity,result.weather[0].description,result.wind.deg,result.wind.speed);
      
      //console.log()
    }).catch((error)=>{
      console.log(error);
    })
  }

  switchy(value: number){
    this.image = this.imgDict[value].img;
    this.weatherSvc.getWeather(this.imgDict[value].city, this.WEATHER_API_KEY).then((result)=>{
      console.log(result);
      console.log(result.main);
      this.model = new Weather(result.name,result.main.temp,result.main.pressure,result.main.humidity,result.weather[0].description,result.wind.deg,result.wind.speed);
      
      //console.log()
    }).catch((error)=>{
      console.log(error);
    })
  }


}
