import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken('WINDOW');

export function windowFactory() {
  return window;
}
