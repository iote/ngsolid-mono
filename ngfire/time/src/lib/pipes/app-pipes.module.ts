import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FDatePipe } from './date.pipe';

/**
 * Pipes Module
 * 
 * Contains: App-wide pipes
 */
@NgModule({
  imports: [CommonModule],
  declarations: [FDatePipe],
  exports: [FDatePipe]
})
export class AppPipesModule { }
