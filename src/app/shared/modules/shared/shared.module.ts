import { ModuleWithProviders, NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { ServicesModule } from '../services/services.module';




@NgModule({
  declarations: [],
  imports: [
    ComponentsModule,
  ],
  exports: [
    ComponentsModule,
  ],
  providers: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        ServicesModule.forShared(),
   
      ]
    };
  }
}


