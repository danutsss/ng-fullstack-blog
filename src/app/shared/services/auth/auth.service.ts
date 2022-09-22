import { Injectable, NgZone } from '@angular/core';

// Firebase authentication.
import * as firebaseAuth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

// Angular router.
import { Router } from '@angular/router';

// User service.
import { User } from '../models/user';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	userData: any; // Save logged in user data.
	constructor(
		public ngZone: NgZone, // Inject NgZone to remove outside scope warning.
		public afStore: AngularFirestore, // Inject Firestore service.
		public afAuth: AngularFireAuth, // Inject Firebase Auth service.
		public router: Router // Inject Angular router service.
	) {
		/**
		 * Saving user data into localStorage when
		 * logged in and remove it when logged out.
		 */
		this.afAuth.authState.subscribe((user) => {
			if (user) {
				this.userData = user;
				localStorage.setItem('loggedUser', JSON.stringify(this.userData));
				JSON.parse(localStorage.getItem('loggedUser')!);
			} else {
				localStorage.removeItem('loggedUser');
			}
		});
	}

	/**
	 * Sign in with e-mail and password.
	 * @param email - @string
	 * @param password - @string
	 */
	async signIn(email: string, password: string) {
		try {
			const result = await this.afAuth.signInWithEmailAndPassword(email, password);

			this.setUserData(result.user);
			this.afAuth.authState.subscribe((user) => {
				if (user) {
					this.ngZone.run(() => {
						this.router.navigate(['dashboard']);
					});
				}
			});
		} catch (error: any) {
			alert(error.message);
		}
	}

	/**
	 * Sign up with e-mail and password.
	 * @param email - @string
	 * @param password - @string
	 */
	async signUp(email: string, password: string) {
		try {
			const result = await this.afAuth.createUserWithEmailAndPassword(
				email,
				password
			);

			/* Call the sendVerificationEmail() function when new user sign up and returns promise */
			this.sendVerificationEmail();
			this.setUserData(result.user);
		} catch (error: any) {
			alert(error.message);
		}
	}

	/**
	 * Forgot password option.
	 * @param passwordResetEmail - @string
	 */
	async forgotPassword(passwordResetEmail: string) {
		try {
			const result = await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
			alert('Password reset email sent, check your inbox or spam folder.');
		} catch (error: any) {
			alert(error.message);
		}
	}

	/**
	 * Returns true when user is logged in and email is verified.
	 */
	get isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem('loggedUser')!);
		return user !== null && user.emailVerified !== false ? true : false;
	}

	/**
	 * Google authenticaion provider.
	 */
	async googleAuth() {
		try {
			const result = await this.afAuth.signInWithPopup(
				new firebaseAuth.GoogleAuthProvider()
			);
			this.ngZone.run(() => {
				this.router.navigate(['dashboard']);
			});
			this.setUserData(result.user);
		} catch (error: any) {
			alert(error.message);
		}
	}

	/**
	 * Authentication logic for authentication providers.
	 */
	async authLogin(provider: any) {
		const result = await this.afAuth.signInWithPopup(provider);
		this.ngZone.run(() => {
			this.router.navigate(['dashboard']);
		});
		this.setUserData(result.user);
	}

	/**
	 * Sign out option.
	 */
	async signOut() {
		await this.afAuth.signOut();
		localStorage.removeItem('loggedUser');
		this.router.navigate(['sign-in']);
	}

	/**
	 * Send email verification when new user sign up.
	 *
	 */
	async sendVerificationEmail() {
		return await this.afAuth.currentUser.then((u: any) => {
			u.sendEmailVerification().then(() => {
				this.router.navigate(['verify-email']);
			});
		});
	}

	/**
	 * Setting up user data when sign in with username/password,
	 * sign up with username/password and sign in with social auth
	 * provider in Firestore database using AngularFirestore + AngularFirestoreDocument service
	 */
	setUserData(user: any) {
		const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
			`users/${user.uid}`
		);

		const userData: User = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			emailVerified: user.emailVerified,
			isAdmin: false,
		};

		return userRef.set(userData, { merge: true });
	}
}
