import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CacheService } from '../../../../../ngfi/angular/src';
import { RouteUtilitiesService } from './route-utilities.service';
import { SegmentService } from './segment.service';

@Injectable({
  providedIn: 'root'
})
export class BackendLoggerService {

  constructor(
    @Inject('ENVIRONMENT') private _env: any,
    private _logger: SegmentService,
    private _cacheService: CacheService,
    private _routeUtils: RouteUtilitiesService,
  ) { }


  public errorLogger(error: any, cloudFuncName: string, params: any) {
    if (this._env.production) {
      const _error = new HttpErrorResponse({ error: error })
      const page = this._routeUtils.getCurrentPage();

      // Use this function if you are tracking property id and name if you don't need to track the values add your values.
      const extraTrackedData = this._getCachedProperty();

      const event = {
        name: `${cloudFuncName} cloud function triggered`,
        properties: {
          ...extraTrackedData, // comment this out if you don't need to track property values ( you can add your custion data as object here)
          func: cloudFuncName,
          stacktrace: JSON.stringify(error),
          componentName: this._routeUtils.getCurrentComponent(),
          params: JSON.stringify(params),
          error: {
            status: _error.status,
            msg: _error.message,
          },
          page: {
            name: page.name,
            title: page.title,
            path: page.path,
            url: page.url
          }
        }
      }

      this._logger.track(event.name, event.properties)

    }
  }

  /**
   * 
   * @returns cached property 
   */
  private _getCachedProperty() {
    const cachedProp = {
      propId: this._cacheService.getValueByKey('currentPropId'),
      propName: this._cacheService.getValueByKey('currentPropName')
    }

    return cachedProp
  }
}