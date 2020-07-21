import { Injectable } from "@angular/core";

import { Router } from "@angular/router";

import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";

import { User, UserProfile, Roles, } from "@iote/bricks";
import { ToastService, Logger } from '@iote/bricks-angular';

/**
 * Authentication Service
 *
 * @see https://angularfirebase.com/lessons/google-user-auth-with-firestore-custom-data/
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private _logger: Logger,
              private _toastService: ToastService)
  { }

  public createUserWithEmailAndPassword(displayName: string, email: string, password: string, userProfile: UserProfile, roles: Roles) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this._updateUserData(res.user, displayName, userProfile, roles);
        return <User> <unknown> res.user;
      })
      .catch((error) => {
        this._throwError();
      });
  }

  public loginWithEmailAndPassword(email: string, password: string) {

    return new Promise((resolve, reject) => {

      this.afAuth.signInWithEmailAndPassword(email, password)
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
    return this.afAuth
      .signInWithPopup(provider)
      .then((credential) => {
        this._logger.log(() => "Successful firebase user sign in");

        this._updateUserData(credential.user);
      })
      .catch(() => {
        this._throwError();
      });
  }

  private _updateUserData(user: firebase.User | null, inputDisplayName?: string, userProfile?: UserProfile, roles?: Roles) : void {
    if (!user)
      // tslint:disable-next-line:no-string-throw
      throw "Unable to save new user. User Registration failed.";

    this._logger.log(() => `AuthService._updateUserData: Getting DB User Ref for uid ${user.uid}.`);
    // Get user collection
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    // Check if initial user build has already been created
    userRef.get().subscribe(u => {

      // If this is the first time the user logs in, create an initial firestore record for the user.
      if (!u.exists) {
        const data: any = {}; // Actual Type: User

        if (user.email) data.email = user.email;
        if (user.photoURL) data.photoUrl = user.photoURL;
        if (user.phoneNumber) data.phoneNumber = user.phoneNumber;

        user.displayName ? data.displayName = user.displayName : data.displayName = inputDisplayName;

        data.profile = userProfile ? userProfile : {};
        data.roles = roles ? roles : { access: true, app: true };

        data.uid = user.uid;
        data.id = user.uid;

        data.createdOn = new Date();
        data.createdBy = 'AuthService';
        data.isNew = true;

        // Add new user to collection. Set isNew hook for projects to build on.
        userRef.set(data);
      }
    });
  }

  private _throwError() {
    const errorMsg = 'Login failed. Please try again. If this error persists, contact support';

    this._toastService.doSimpleToast(errorMsg, 3000);
  }

  signOut(route?: string)
  {
    return this.afAuth.signOut().then(() => {
      this.router.navigate([route ?? '/']);
    });
  }
}
