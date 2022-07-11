import { ServiceLocator } from 'libs/utils/iote/analytics/src/lib/services/locator.service';
import { AnalyticsService } from '../services/analytics.service';

import { TrackEvent } from '../models/event.interface';


/**
 * @target  - Class constructor or current object's prototype
 * @propertyKey - Name of the decorated method
 * @descriptor - Property descriptor of the method modify class or method..
 * 
 */

export const Log = (event: TrackEvent): any => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {

    // Load service 
    const serviceLoader = ServiceLocator.injector.get(AnalyticsService)

    const isProduction = serviceLoader.isProduction();

    // Save a reference to the original method
    const originalMethod = descriptor.value;

    // Rewrite original method with try/catch wrapper
    descriptor.value = function (...args: any[]) {
      // If in production mode start logging events

      try {
        const result = originalMethod.apply(this, args);
        // Check if method is asynchronous
        if (result && result instanceof Promise) {
          // Return promise
          return result.catch((error: any) => {
            // handle error here 
            if (isProduction) {
              const ev = { ...event, success: false, info: { description: `[error] ${error}`, data: JSON.stringify(args) } }
              serviceLoader.logEvent(ev);
            }
          });
        }

        if (isProduction) {
          const trackeEvent = { ...event, success: true, info: { description: `[success] ${event.name}`, data: JSON.stringify(args) } }
          serviceLoader.logEvent(trackeEvent);
        }

        // Return actual result
        return result;
      } catch (error) {
        if (isProduction) {
          const ev = { ...event, success: false, info: { description: `[error] ${error}`, data: JSON.stringify(args) } }
          serviceLoader.logEvent(ev);
        }
      }

    };
    return descriptor;
  };
};

