import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopWhenScrolledDirective } from './pop-when-scrolled.directive';

@NgModule({
  imports: [
    CommonModule,
  ],

  declarations: [
    PopWhenScrolledDirective,
  ],

  exports: [
    CommonModule,

    PopWhenScrolledDirective,
  ],
})
export class SharedModule {
}
