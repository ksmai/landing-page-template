import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { IntroductionComponent } from './introduction.component';

@NgModule({
  imports: [
    SharedModule,
  ],

  declarations: [
    IntroductionComponent,
  ],

  exports: [
    IntroductionComponent,
  ],
})
export class IntroductionModule {
}
