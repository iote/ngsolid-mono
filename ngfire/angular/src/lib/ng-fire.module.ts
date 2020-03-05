import { NgModule } from '@angular/core';

import { AuthService } from './auth/services/auth.service';
import { BackendService } from './backend/backend.service';
import { AuthAsAdminService } from './auth/services/auth-as-admin.service';

/**
 * NgFire Module
 *
 * Contains: Interactions with backend, Authentication.
 */
@NgModule({
  imports: [],
  providers: [AuthService, AuthAsAdminService, BackendService],
  exports: []
})
export class NgFireModule { }
