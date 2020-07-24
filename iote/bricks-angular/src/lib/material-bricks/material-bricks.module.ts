import { NgModule, ModuleWithProviders } from '@angular/core';

import { MaterialDesignModule } from '../material-design/material-design.module';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';
import { PageComponent } from './components/page/page.component';
import { FrameComponent } from './components/frame/frame.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { ToastService } from "./services/toast.service";
import { DialogService } from "./services/dialog.service";
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '../flex-layout/flex-layout.module';
import { ActionTileComponent } from './components/action-tile/action-tile.component';
import { AppHighlightComponent } from './components/highlight-section/highlight-section.component';
import { ItemCardRowComponent } from './components/item-card-row/item-card-row.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModuleCardComponent } from './components/module-card/module-card.component';
import { ThemingService } from './services/theming.service';
import { CalendarComponent } from './components/calendar/calendar.component';

/**
 * Base reusable dumb front end components and directives.
 *
 * The components and directives in this module are dependent on Angular Material.
 */
@NgModule({
  imports: [CommonModule, MaterialDesignModule, FlexLayoutModule, RouterModule],

  declarations: [
    NavbarComponent,
    PageComponent,
    FrameComponent,
    SpinnerComponent,
    BreadcrumbsComponent,
    ActionTileComponent,
    AppHighlightComponent,
    ModuleCardComponent,

    ItemCardRowComponent,
    DataTableComponent,
    CalendarComponent
  ],

  exports: [
    NavbarComponent,
    PageComponent,
    FrameComponent,
    SpinnerComponent,
    BreadcrumbsComponent,
    ActionTileComponent,
    AppHighlightComponent,
    ModuleCardComponent,

    ItemCardRowComponent,
    DataTableComponent,
    CalendarComponent
  ]
})
export class MaterialBricksModule {

  static forRoot(): ModuleWithProviders
  {
    return {
      ngModule: MaterialBricksModule,
      providers: [
        ToastService,
        DialogService,
        ThemingService
      ]
    };
  }
}
