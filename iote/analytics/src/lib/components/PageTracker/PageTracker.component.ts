import { Component, OnInit, OnDestroy } from '@angular/core';

import { combineLatest, fromEvent, Observable } from 'rxjs';
import { debounceTime, startWith, take } from 'rxjs/operators';
import { SubSink } from 'subsink';

import { AnalyticsService } from './../../services/analytics.service';
import { ServiceLocator } from '../../services/locator.service';
import { RouteUtilitiesService } from './../../services/route-utilities.service';

import { CacheService } from '../../../../../../ngfi/angular/src/lib/cache/cache.service';


@Component({
  selector: 'app-PageTracker',
  templateUrl: './PageTracker.component.html',
  styleUrls: ['./PageTracker.component.css']
})
export abstract class PageTrackerComponent implements OnInit, OnDestroy {

  protected pageTitle: string;
  protected anonymousUserID: string;
  protected _subSink = new SubSink();
  protected _routeUtilities = ServiceLocator.injector.get(RouteUtilitiesService)
  protected _analytics = ServiceLocator.injector.get(AnalyticsService);
  protected _cacheService = ServiceLocator.injector.get(CacheService);
  protected _isProd = this._analytics.isProduction();

  openTime: Date;
  closeTime: Date;
  // Add more events to the event log check 
  scroll$: Observable<any> = fromEvent(document, 'touchmove');
  click$: Observable<any> = fromEvent(document, 'touchstart');
  mouseHover$: Observable<any> = fromEvent(document, 'mouseover');


  constructor() {
    if (this._isProd) {
      this.subscribeToDOMEventsAndIdleEvents();
      this.pageTitle = this._routeUtilities.getCurrentPage().title;
      this.anonymousUserID = this._analytics.getSegmentAnonymousUserID() as string;
    }
  }

  ngOnInit(): void {
    // Do analytics when in production

    this._analytics.identifyUser();
    this._analytics.logPage(this.constructor.name)
    this.initializeOpenDateTime();


  }
  /**
   * @description Log entry to view time opened
   */
  initializeOpenDateTime() {
    this.openTime = new Date();
  }

  /**
   * @description Log events on leaving view
   */

  viewDidLeave() {
    this.closeTime = new Date();

    const event = {
      name: `${this.constructor.name}.Opened-${this.pageTitle}`,
      function: "viewDidLeave",
      componentName: this.constructor.name,
      success: true,
      info: {
        description: `Opened ${this.pageTitle}`,
        data: {
          startTime: this.openTime,
          closeTime: this.closeTime,
          page: this._routeUtilities.getCurrentPage().title,
          url: this._routeUtilities.getCurrentPage().url,
          path: this._routeUtilities.getCurrentPage().path,
        }
      }
    }
    this._analytics.logEvent(event);
    this._subSink.unsubscribe()
  }


  /**
   * @description Subscribes to DOM Events and logs a timed out session after 10 mins of inactivity on a single page.
   */
  subscribeToDOMEventsAndIdleEvents() {
    this._subSink.sink = combineLatest([this.scroll$, this.click$]).pipe(
      startWith(new Date()),
      debounceTime(600000), // session times out after ten minutes
      take(1)
    ).subscribe(() => {
      this.closeTime = new Date();
      const event = {
        name: `${this.constructor.name}TimedOutOn-${this.pageTitle}`,
        function: "_subscribeToDOMEventsAndIdleEvents",
        componentName: this.constructor.name,
        success: true,
        info: {
          description: `Timed out on ${this.pageTitle}`,
          data: {
            startTime: this.openTime,
            closeTime: this.closeTime,
            timeOut: this.closeTime,
            page: this._routeUtilities.getCurrentPage().title,
            url: this._routeUtilities.getCurrentPage().url,
            path: this._routeUtilities.getCurrentPage().path
          }
        }
      }
      this._analytics.logEvent(event)
    })
  }


  ngOnDestroy(): void {
    if (this._isProd) {
      this.viewDidLeave();
    }
    this._subSink.unsubscribe();
  }

}
