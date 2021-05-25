import { TranslocoLoader, Translation } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CustomLanguageLoader implements TranslocoLoader
{

  constructor(@Inject('ENVIRONMENT') private _environment: any,
              private _http: HttpClient,
              private _afs: AngularFirestore)
  { }

  getTranslation(lang: string): Observable<Translation>
  {
    // return this._environment.production ? this._http.get(`./assets/i18n/${lang}.json`)
    //                                     : this._afs.doc<any>(`langs/${lang}`).valueChanges();
    return this._afs.doc<any>(`langs/${lang}`).valueChanges();
  }
}

// export const customLoader = {
//   provide: TRANSLOCO_LOADER,
//   useClass: CustomLanguageLoader
// }
