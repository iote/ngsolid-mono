import {Injector} from "@angular/core";
/*
    That will easily allow you to get any service and use it in your parent classes without having to inject them via their children.
 */
export class ServiceLocator {
    static injector: Injector;
}