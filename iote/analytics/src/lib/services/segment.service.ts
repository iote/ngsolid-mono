import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WindowWrapper } from '../window-wrapper';
import { DEFAULT_CONFIG, SegmentConfig, SEGMENT_CONFIG } from '../config/segment-analytics.config';


declare global {
  interface Window { analytics: any; }
}

@Injectable({
  providedIn: 'root'
})

export class SegmentService {
  private readonly _config: SegmentConfig;
  /**
 * @param _w Browser window
 * @param _doc Browser DOM
 * @param userConfig Segment configuration
 */
  constructor(
    @Inject(WindowWrapper) private _w: WindowWrapper,
    @Inject(DOCUMENT) private _doc: any,
    @Inject(SEGMENT_CONFIG) userConfig: SegmentConfig) {
    this._config = { ...DEFAULT_CONFIG, ...userConfig };
    const segmentUri = this._config.segmentUri as string;
    const apiKey = this._config.apiKey as string;

    if (this._config.loadOnInitialization && (typeof this._config.apiKey === 'undefined' || this._config.apiKey === '')) {
      console.error('The API Key cannot be an empty string if Segment must be loaded on initialization.');
      return;
    }

    if (
      typeof this._w.analytics === 'undefined' || typeof this._w.analytics.initialize === 'undefined' || this._w.analytics.initialize === false
    ) {
      if (typeof this._w.analytics !== 'undefined' && this._w.analytics.invoked === true) {
        // log this error to the console if the script was already loaded
        console.error('Segment snippet included twice.');
        return;
      }

      if (this._config.debug) {
        console.log('Segment initialization...');
      }

      this._w.analytics = [];
      this._w.analytics.invoked = true;

      this._w.analytics.methods = [
        'trackSubmit',
        'trackClick',
        'trackLink',
        'trackForm',
        'pageview',
        'identify',
        'reset',
        'group',
        'track',
        'ready',
        'alias',
        'debug',
        'page',
        'once',
        'off',
        'on',
        'addSourceMiddleware',
        'addIntegrationMiddleware',
        'setAnonymousId',
        'addDestinationMiddleware',
      ];

      this._w.analytics.factory = (method: string) => {
        return (...args: string[]) => {
          args.unshift(method);
          this._w.analytics.push(args);
          return this._w.analytics;
        };
      };

      this._w.analytics.methods.forEach((method: string) => {
        this._w.analytics[method] = this._w.analytics.factory(method);
      });

      this._w.analytics.load = (key: string, options: { integrations: { [key: string]: boolean } }) => {
        const script = this._doc.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://' + this._config.segmentHost + segmentUri.replace('$API_KEY$', key);

        const first = this._doc.getElementsByTagName('script')[0];
        first.parentNode.insertBefore(script, first);
        this._w.analytics._loadOptions = options;
      };

      this._w.analytics._writeKey = this._config.apiKey;
      this._w.analytics.SNIPPET_VERSION = '4.13.2';
      if (this._config.loadOnInitialization) {
        this.load(apiKey);
      }
    }

  }

  /**
   * Load Segment configuration.
   *
   * @param apiKey Write API Key
   * @param options Optional parameters
   */
  public load(apiKey: string, options?: any): void {
    this._w.analytics.load(apiKey, options);
    if (this._config.debug) {
      console.log('Segment initialized');
    }
    this.debug(this._config.debug);
  }


  /**
   * Turn on/off debug mode, logging helpful messages to the console.
   *
   * @param enabled Enable or not the debug mode
   */
  public debug(enabled?: boolean): void {
    this._w.analytics.debug(enabled);

  }


  /**
 * The identify method is how you associate your users and their actions to a recognizable userId and traits.
 *
 * @param userId The database ID for the user.
 * @param traits A dictionary of traits you know about the user, like their email or name
 * @param options A dictionary of options.
 *
 * @returns
 */
  public identify(userId?: string, traits?: any, options?: any): Promise<SegmentService> {
    return new Promise((resolve) => {
      this._w.analytics.identify(userId, traits, options, _ => resolve(this));
    });
  }


  /**
   * The track method lets you record any actions your users perform.
   *
   * @param event The name of the event you’re tracking.
   * @param properties A dictionary of properties for the event.
   * @param options A dictionary of options.
   *
   * @returns
   */
  public track(event: string, properties?: any, options?: any): Promise<SegmentService> {
    return new Promise((resolve) => {
      this._w.analytics.track(event, properties, options, _ => resolve(this));
    });
  }


  /**
   * The page method lets you record page views on your website, along with optional extra information about the page being viewed.
   *
   * @param name The name of the page.
   * @param properties A dictionary of properties of the page.
   * @param options A dictionary of options.
   *
   * @returns
   */
  public page(name?: string, properties?: any, options?: any): Promise<SegmentService>;

  /**
   * The page method lets you record page views on your website, along with optional extra information about the page being viewed.
   *
   * @param category The category of the page.
   * @param name The name of the page.
   * @param properties A dictionary of properties of the page.
   * @param options A dictionary of options.
   *
   * @returns
   */
  public page(category: string, name: string, properties?: any, options?: any): Promise<SegmentService>;

  /**
   * The page method lets you record page views on your website, along with optional extra information about the page being viewed.
   *
   * @param category The category of the page.
   * @param name The name of the page.
   * @param properties A dictionary of properties of the page.
   * @param options A dictionary of options.
   *
   * @returns
   */
  public page(category?: string, name?: string, properties?: any, options?: any): Promise<SegmentService> {
    return new Promise((resolve) => {
      this._w.analytics.page(category, name, properties, options, _ => resolve(this));
    });
  }
  

  /**
   * The group method associates an identified user with a company, organization, project, workspace, team, tribe, platoon,
   * assemblage, cluster, troop, gang, party, society or any other name you came up with for the same concept.
   *
   * @param groupId The Group ID to associate with the current user.
   * @param traits A dictionary of traits for the group.
   *
   * @returns
   */
  public group(groupId: string, traits?: any): Promise<SegmentService> {
    return new Promise((resolve) => {
      this._w.analytics.group(groupId, traits, _ => resolve(this));
    });
  }

  /**
   * The alias method combines two previously unassociated user identities.
   *
   * @param userId The new user ID you want to associate with the user.
   * @param previousId The previous ID that the user was recognized by. This defaults to the currently identified user’s ID.
   * @param options A dictionary of options.
   *
   * @returns
   */
  public alias(userId: string, previousId?: string, options?: any): Promise<SegmentService> {
    return new Promise((resolve) => {
      this._w.analytics.alias(userId, previousId, options, _ => resolve(this));
    });
  }

  /**
   * The ready method allows you execute a promise that will be called as soon as all of your enabled destinations have loaded
   * and analytics.js has completed initialization.
   *
   * @returns
   */
  public ready(): Promise<SegmentService> {
    return new Promise((resolve) => {
      this._w.analytics.ready(_ => resolve(this));
    });
  }

  /**
   * Return informations about the currently identified user
   *
   * @returns Informations about the currently identified user
   */
  public user(): any {
    return this._w.analytics.user();
  }

  /**
   * Return identifier about the currently identified user
   *
   * @returns Identifier about the currently identified user
   */
  public id(): string | null {
    return this._w.analytics.id();
  }

  /**
   * Override the default Anonymous ID
   *
   * @param anonymousId New anonymous ID
   */
  public setAnonymousId(anonymousId: string): void {
    this._w.analytics.setAnonymousId(anonymousId);
  }

  /**
   * Return traits about the currently identified user
   *
   * @returns Traits about the currently identified user
   */
  public traits(): any {
    return this._w.analytics.user().traits();
  }

  /**
   * Reset the id, including anonymousId, and clear traits for the currently identified user and group.
   */
  public reset(): void {
    this._w.analytics.reset();
  }


  /**
   * Set listeners for these events and run your own custom code.
   *
   * @param method Name of the method to listen for
   * @param callback A function to execute after each the emitted method
   */
  public on(method: string, callback: (event?: string, properties?: any, options?: any) => any): void {
    this._w.analytics.on(method, callback);
  }

  /**
   * Attaches the `track` call as a handler to a link
   *
   * @param elements DOM element or an array of DOM elements to be bound with track method.
   * @param event The name of the event, passed to the `track` method or a function that returns a string to be used
   *              as the name of the track event.
   * @param properties A dictionary of properties to pass with the `track` method.
   */
  public trackLink(elements: HTMLElement | HTMLElement[], event: string, properties?: any): void {
    this._w.analytics.trackLink(elements, event, properties);
  }

  /**
   * Binds a `track` call to a form submission.
   *
   * @param forms The form element to track or an array of form
   * @param event The name of the event, passed to the `track` method.
   * @param properties A dictionary of properties to pass with the `track` method.
   */
  public trackForm(forms: HTMLElement | HTMLElement[], event: string, properties?: any): void {
    this._w.analytics.trackForm(forms, event, properties);
  }

  /**
   * Set the length (in milliseconds) of the callbacks and helper functions
   *
   * @param timeout Number of milliseconds
   */
  public timeout(timeout: number): void {
    this._w.analytics.timeout(timeout);
  }

}