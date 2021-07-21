import { NgModule, ModuleWithProviders } from '@angular/core';

import { TranslateService } from './services/translate.service';
import { LocalPersistanceModule } from '@iote/local-persistance';

import { TRANSLOCO_LOADER, TRANSLOCO_CONFIG, translocoConfig, TranslocoModule} from '@ngneat/transloco';

import { TranslocoHttpLoader } from './config/http-loader.service';
import { CustomLanguageLoader } from './config/files-transloco-loader.service';

/**
 * Translate Module.
 *
 * Contains the translate service and modules to enable translation.
 *
 * @TODO: Ideally would contain a custom translate pipe as well, but transloco does not expose its API adequatly enough to
 *        fully shade its transloco pipe (some needed DI injection tokens are shaded).
 *
 *        For now,use the transloco pipe in HTML templates. */
@NgModule({
  imports:[TranslocoModule, LocalPersistanceModule],
  providers: [],
        // Export -so that translate implementation remains isolated
        //   yet translate pipe remains accessible.
  exports: [TranslocoModule]
})
export class MultiLangFiles
{
  static forRoot(loadHttp: boolean): ModuleWithProviders<MultiLangFiles>
  {
    return {
      ngModule: MultiLangFiles,
      providers: [
        TranslateService,
        {
          provide: TRANSLOCO_CONFIG,
          useValue: translocoConfig({
            availableLangs: ['en', 'fr', 'nl'],
            defaultLang: 'en',
            fallbackLang: 'en',
            reRenderOnLangChange: true,
            prodMode: true
          })
        },
        (loadHttp ? { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
                  : { provide: TRANSLOCO_LOADER, useClass: CustomLanguageLoader })
      ].filter(a => a != null)
    };
  }
}
