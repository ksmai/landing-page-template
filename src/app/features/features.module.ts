import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FeaturesComponent } from './features.component';

@NgModule({
  imports: [
    SharedModule,
  ],

  declarations: [
    FeaturesComponent,
  ],

  exports: [
    FeaturesComponent,
  ],
})
export class FeaturesModule {
}
