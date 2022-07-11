import { ModuleWithProviders, NgModule, Optional, PLATFORM_ID, SkipSelf, Injector } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { SEGMENT_CONFIG, SegmentConfig } from './config/segment-analytics.config';
import { WindowWrapper } from './window-wrapper';

import { SegmentService } from './services/segment.service';
import { ServiceLocator } from './services/locator.service';

/**
 * Window Provider for Angular AOT
 * @returns Browser Window instance
 */
export function getWindow(platformId: any) {
    return isPlatformBrowser(platformId) ? window : {};
}

/**
 * EventLogControl Module
 */
@NgModule({
    imports: [CommonModule],
    providers: [{ provide: WindowWrapper, useFactory: getWindow, deps: [PLATFORM_ID] }],
})

export class AnalyticsModule {
    /**
   * EventLogControl Module Initialisation
   *
   * @param config Segment Configuration
   * @returns Segment Module
   */
    public static forRoot(config?: SegmentConfig): ModuleWithProviders<AnalyticsModule> {
        return {
            ngModule: AnalyticsModule,
            providers: [
                { provide: SEGMENT_CONFIG, useValue: config },
                SegmentService,
            ],
        };
    }

    /**
     * Segment Module Constructor
     *
     * @param parentModule Must be null
     */
    constructor(@Optional() @SkipSelf() parentModule: AnalyticsModule, private injector: Injector) {
        if (parentModule) {
            throw new Error('SegmentModule is already loaded. Import it in the AppModule only');
        }
        ServiceLocator.injector = this.injector;
    }
}
