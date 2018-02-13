import { NgModule, Optional, SkipSelf } from '@angular/core';

import { WINDOW, windowFactory } from './window';
import { ScrollService } from './scroll.service';

@NgModule({
  imports: [
  ],

  providers: [
    { provide: WINDOW, useFactory: windowFactory },
    ScrollService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() coreModule: CoreModule) {
    if (coreModule) {
      throw new Error('CoreModule should only be imported once');
    }
  }
}
