import { Router, ActivatedRoute, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { ROUTE_KEYWORDS } from '../data/route-keywords';

@Injectable({
    providedIn: 'root'
})
export class RouteUtilitiesService {


    constructor(private _router: Router, private _route: ActivatedRoute) {
        this.printpath('', this._router.config, ROUTE_KEYWORDS);
    }


    getCurrentPage() {
        const currentUrl = this._router.url;
        const pageName = this.formatRoute(currentUrl).split('/').filter(item => item)[0].toLocaleUpperCase();

        const analyticsUrl = this.getAnalyticsUrl(currentUrl);

        const payload = {
            name: pageName,
            path: this.formatRoute(analyticsUrl),
            url: analyticsUrl,
            title: pageName,
            referrer: ''
        };

        return payload;

    }


    getAnalyticsUrl(url: string) {
        const splitUrl = url.split('/');
        const arr = splitUrl.filter(item => item);
        // for specific pages 
        let count = 0;
        arr.forEach(item => {
            const index = arr.indexOf(item);
            if (!ROUTE_KEYWORDS.includes(item)) {
                count += 1
                if (count == 1) {
                    arr[index] = '{propId}'; // replace this with something else the point is  to have a constant value replaces url: property/877/ to url property/{propId}/
                }
                if (count == 2) {
                    arr[index] = '{gAId}'; // replace this with something else the point is  to have a constant value.
                }

            }
        })

        const analyticsUrl = arr.join('/');
        return analyticsUrl;
    }


    /** list all routes in @Routes**/
    printpath(parent: string, config: Route[], pages: string[]) {
        for (let i = 0; i < config.length; i++) {
            const route = config[i];
            const x = parent.replace(/\//g, "");
            const r = route.path as string;
            pages.push(x, r);

            if (route.children) {
                const currentPath = route.path ? parent + '/' + route.path : parent;
                this.printpath(currentPath, route.children, []);
            }
        }
    }

    /**
   * @description Function formats the current url
   */
    formatRoute(route: string) {
        return route.replace(/^\/+|\/+$/g, '').replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
    }

    getCurrentComponent() {
        return JSON.stringify(this._route.routeConfig?.component);
    }


}
