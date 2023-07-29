import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'siren-matrix-demo';
  constructor(private translate : TranslateService){
    this.translate.setDefaultLang('ar');
    document.dir = 'rtl'
  }
}
