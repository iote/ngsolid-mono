import { Injectable } from "@angular/core";

import { Router } from "@angular/router";

import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";

import { User, UserProfile, Roles, } from "@iote/bricks";

import { Observable, of, from, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Logger, ToastService } from '@iote/bricks-angular';

/**
 * Authentication Service
 *
 * @see https://angularfirebase.com/lessons/google-user-auth-with-firestore-custom-data/
 */
@Injectable({ providedIn: 'root' })
export class AuthAsAdminService {

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private _logger: Logger,
              private _toastService: ToastService)
  { }

  public createUserWithEmailAndPassword(displayName: string, email: string, password: string, userProfile: UserProfile, roles: Roles, creatingUser?: firebase.User)
  {
    this._logger.log(() => `AuthService.createUserWithEmailAndPassword: Creating a user with Email and Password.`);

    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password))
            // tslint:disable-next-line:max-line-length
            .pipe(switchMap((res) => creatingUser ? from(this.afAuth.auth.updateCurrentUser(creatingUser)).pipe(switchMap(_ => this._updateUserData(res.user, displayName, userProfile, roles, creatingUser.uid)))
                                                  : this._updateUserData(res.user, displayName, userProfile, roles)),
                  catchError(e => throwError(this._throwError(e))));
  }

  public loginWithEmailAndPassword(email: string, password: string)
  {
    this._logger.log(() => `AuthService.loginWithEmailAndPassword: Logging in a user with Email and Password.`);

    return new Promise((resolve, reject) => {

      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          this._logger.log(() => `AuthService.signInWithEmailAndPassword: Successfully logged user in with Email and Password.`);

          resolve();
        })
        .catch((error) => {
          this._throwError();

          reject(error);
        });
    });
  }

  public loadGoogleLogin() {
    this._logger.log(() => `AuthService.loadGoogleLogin: Logging in User via Google.`);

    const provider = new auth.GoogleAuthProvider();
    return this._oAuthLogin(provider);
  }

  public loadFacebookLogin() {
    this._logger.log(() => `AuthService.loadFacebookLogin: Logging in User via Facebook.`);

    const provider = new auth.FacebookAuthProvider();
    return this._oAuthLogin(provider);
  }

  public loadMicrosoftLogin() {
    this._logger.log(() => `AuthService.loadMicrosoftLogin: Logging in User via Microsoft.`);

    const provider = new auth.OAuthProvider('microsoft.com');
    return this._oAuthLogin(provider);
  }

  private _oAuthLogin(provider: auth.AuthProvider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then((credential) => {
        this._logger.log(() => "Successful firebase user sign in");

        this._updateUserData(credential.user);
      })
      .catch(() => {
        this._throwError();
      });
  }

  private _updateUserData(user: firebase.User | null, inputDisplayName?: string, userProfile?: UserProfile, roles?: Roles, createdBy?: string): Observable<User | null>
  {
    if (!user)
      // tslint:disable-next-line:no-string-throw
      throw "Unable to save new user. User Registration failed.";

    this._logger.log(() => `AuthService._updateUserData: Getting DB User Ref for uid ${user.uid}.`);
    // Get user collection
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    // Check if initial user build has already been created
    return userRef.get()
                  .pipe(switchMap(uDoc => this._updateUserFirebase(user, userRef, uDoc, inputDisplayName, userProfile, roles, createdBy)),
                   catchError((e => { this._logger.error((() => e.message)); throw e; })));
  }

  // tslint:disable-next-line:max-line-length
  private _updateUserFirebase(user: firebase.User, userRef: AngularFirestoreDocument<User>, userDoc: firebase.firestore.DocumentSnapshot, inputDisplayName?: string, userProfile?: UserProfile, roles?: Roles, createdBy?: string)
    : Observable<User | null>
  {
    // If this is the first time the user logs in, create an initial firestore record for the user.
    if (!userDoc.exists)
    {
      this._logger.log(() => `AuthService._updateUserFirebase: User Ref is empty/does not yet exist. Creating DB User for uid ${user.uid}.`);
      const data: any = {}; // Actual Type: User

      if (user.email) data.email = user.email;
      if (user.photoURL) data.photoUrl = user.photoURL;
      if (user.phoneNumber) data.phoneNumber = user.phoneNumber;

      user.displayName ? data.displayName = user.displayName : data.displayName = inputDisplayName;

      data.profile = userProfile ? userProfile : {};
      data.roles = roles ? roles : { access: true, app: true  };

      data.uid = user.uid;
      data.id = user.uid;

      data.createdOn = new Date();
      data.createdBy = createdBy ? createdBy : 'AuthService';
      data.isNew = false;

      // Add new user to collection. Set isNew hook for projects to build on.
      return from(userRef.set(data))
              .pipe(map(_ => {
                this._logger.log(() => `AuthService._updateUserFirebase: DB User for uid ${user.uid} created. Returning User.`);
                return data;
              }));
    }
    else
      return of(null);
  }


  private _throwError(e?: any)
  {
    this._logger.error(() => e);
    this._toastService.doSimpleToast(e ? 'Error occured when creating account.' : 'Login failed. Please try again. If this error persists, contact support', 3000);
    return e;
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
