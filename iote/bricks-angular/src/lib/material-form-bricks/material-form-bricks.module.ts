import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MaterialDesignModule } from '../material-design/material-design.module';
import { AutocompleteActionFieldComponent } from './components/autocomplete-action-field/autocomplete-action-field.component';

/**
 * Base reusable form front end components and directives.
 *
 * @dependency Angular Material
 * @dependency Angular Forms
 */
@NgModule({
  imports: [
    CommonModule, FlexLayoutModule,
    MaterialDesignModule,
    FormsModule
  ],

  declarations: [
    AutocompleteActionFieldComponent
  ],

  providers: [],

  exports: [
    AutocompleteActionFieldComponent
  ]
})
export class MaterialFormBricksModule {}
