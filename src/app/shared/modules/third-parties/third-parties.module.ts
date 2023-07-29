
import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material.module';



@NgModule({
    imports: [],
    exports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        RouterModule,
      
    ],
    providers: []
})
export class ThirdPartiesModule {
    static forServices(): Provider[] {
        return [
            MaterialModule.forServices(), 
        ];
    }
}
