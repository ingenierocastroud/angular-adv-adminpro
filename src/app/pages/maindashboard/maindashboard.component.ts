import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

declare function customInitFunctions():any ;

@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styles: [
  ]
})
export class MaindashboardComponent implements OnInit {


  constructor(private settingsService:SettingsService) { }

  ngOnInit(): void {
      customInitFunctions(); 
  }
}
