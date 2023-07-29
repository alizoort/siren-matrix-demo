import { NgModule, Provider } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ThirdPartiesModule } from '../third-parties/third-parties.module';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', `.json?v=${new Date().getTime()}`);
}

@NgModule({
  declarations: [],
  imports: [
  ]
})
export class ServicesModule { 
  static forShared(): Provider[] {
    return [
    ThirdPartiesModule.forServices(),
     TranslateModule.forRoot({
       loader: {
         provide: TranslateLoader,
         useFactory: (createTranslateLoader),
         deps: [HttpClient]
       }
     }).providers,

     TranslateService,

    ];
  }
}
