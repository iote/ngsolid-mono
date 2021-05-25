import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { TranslocoService, HashMap } from '@ngneat/transloco';
import { Intercom } from 'ng-intercom';

import { LocalPersistanceService } from '@s4y/state/data';

/**
 * Service in charge for translating of strings.
 *
 * Can be used inside other services/components and is the guiding logic of the translate pipe.
 */
@Injectable()
export class TranslateService
{
  private _lang: 'fr' | 'en' | 'nl';
  private _lang$: BehaviorSubject<'fr' | 'en' | 'nl'>;

  /** Use transloco as translator */
  constructor(private _transloco: TranslocoService,
              private _localPersistanceSrv: LocalPersistanceService,
              private _intercom: Intercom)
  {
    if(!this._lang)
    {
      this._lang = this._localPersistanceSrv.getConfig('lang');

      // Lang has never been set
      if(!this._lang)
        this._lang = this._getLangFromUser();
    }

    this.setLang(this._lang);
  }

  initialise()
  {
    if(!this._lang)
    {
      this._lang = this._localPersistanceSrv.getConfig('lang');

      // Lang has never been set
      if(!this._lang)
        this._lang = this._getLangFromUser();
    }

    this.setLang(this._lang);
    return this._lang;
  }

  /** Load the given language, and add it to the service.
    *  Fixes bug that translations are not found when using translateTo but lang is not loaded.
    *
    * @see https://ngneat.github.io/transloco/docs/language-api#load
    */
  loadLang(lang: 'en' | 'nl' | 'fr') : Observable<'en' | 'nl' | 'fr'>
  {
    return this._transloco.load(lang)
                    .pipe(map(() => lang),
                          take(1));
  }

  setLang(lang: 'en' | 'nl' | 'fr')
  {
    this._lang = lang;
    this._localPersistanceSrv.setConfig('lang', lang);
    this._transloco.setActiveLang(lang);

    if (this._lang$ === undefined)
      this._lang$ = new BehaviorSubject(lang);
    else
      this._lang$.next(lang);

    // Update language on intercom
    this._intercom.update({ language_override: lang });

    return lang;
  }

  getLang() {
    return this._lang;
  }

  getLang$() : Observable<'en' | 'nl' | 'fr'> {
    return this._lang$;
  }

  translate(code: string, params?: HashMap<any>)
  {
    return params ? this._transloco.translate(code, params)
                  : this._transloco.translate(code)
  }

  /**
   * Allows you to translate text to different languages regardless of the current language of the user
   *    this is useful when sending communications to multiple people who might speak different languages.
   *
   * @param code
   * @param lang
   * @warning Lang needs to be loaded before this will work.
   *          In case lang is not yet loaded, please load with @see loadLang before calling @see translateTo
   */
  translateTo(code: string, lang: 'nl' | 'fr' | 'en')
  {
    return this._transloco.translate(code, {}, lang);
  }

  private _getLangFromUser()
  {
    const defLang = (window && window.navigator && window.navigator.language)
                      || (navigator && navigator.language);

    if(defLang)
    {
                   // e.g. change en-US, en-GB to en, fr-FR to fr, ...
      const lang = defLang.split('-')[0].toLowerCase();

      if(lang === 'en' || lang === 'fr' || lang === 'nl')
        return this.setLang(lang);
    }

    // Return default
    return 'en';
  }
}
