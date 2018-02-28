import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ShowcaseComponent } from './showcase.component';

@NgModule({
  imports: [
    SharedModule,
  ],

  declarations: [
    ShowcaseComponent,
  ],

  exports: [
    ShowcaseComponent,
  ],
})
export class ShowcaseModule {
}
