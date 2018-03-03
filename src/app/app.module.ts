import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'font-awesome/scss/font-awesome.scss';

import '../styles/styles.scss';
import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { SplashModule } from './splash/splash.module';
import { IntroductionModule } from './introduction/introduction.module';
import { FeaturesModule } from './features/features.module';
import { ShowcaseModule } from './showcase/showcase.module';
import { ContactModule } from './contact/contact.module';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    NavbarModule,
    SplashModule,
    IntroductionModule,
    FeaturesModule,
    ShowcaseModule,
    ContactModule,
    CoreModule,
  ],

  declarations: [
    AppComponent,
  ],

  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
