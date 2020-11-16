import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Config } from '../../shared/config.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  configURL = 'https://panjs.com/ywc18.json';
  config: Config;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig() {
    this.http.get(this.configURL)
      .pipe(
        take(1)
      ).subscribe((data: Config) => {
        this.config = data;
      }, (err) => console.log(err));
  }

}