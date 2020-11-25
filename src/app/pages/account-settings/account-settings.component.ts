import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  private elementos!: NodeListOf<Element>;
  constructor(private settingsService:SettingsService) { }

  ngOnInit(): void {
    this.elementos =  document.querySelectorAll(".selector");
    this.settingsService.checkCurrentTheme(this.elementos);
  }

  changeTheme(theme:string){
    this.settingsService.changeTheme(theme,this.elementos);
  }


}
