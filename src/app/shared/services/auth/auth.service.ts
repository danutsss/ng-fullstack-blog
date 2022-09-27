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

// User model.
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
	 * Returns true when user is logged in and email is verified.
	 */
	get isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem('loggedUser')!);
		return user !== null && user.emailVerified !== false ? true : false;
	}

	/**
	 * Returns true when user is admin.
	 */
	get isAdmin(): boolean {
		const user = JSON.parse(localStorage.getItem('isAdmin')!);
		return user !== null && user === true ? true : false;
	}

	/**
	 * Google authenticaion provider.
	 */
	async googleAuth() {
		try {
			const result = await this.afAuth.signInWithPopup(
				new firebaseAuth.GoogleAuthProvider()
			);

			// Set user data in localStorage.
			this.setUserData(result.user);

			// Insert `isAdmin` into localStorage.
			this.afStore
				.doc(`users/${result.user?.uid}`)
				.valueChanges()
				.subscribe((res: any) => {
					localStorage.setItem('isAdmin', JSON.stringify(res.isAdmin));
				});
		} catch (error: any) {
			alert(error.message);
		}
	}

	/**
	 * Authentication logic for authentication providers.
	 */
	async authLogin(provider: any) {
		const result = await this.afAuth.signInWithPopup(provider);
		this.setUserData(result.user);
	}

	/**
	 * Sign out option.
	 */
	async signOut() {
		await this.afAuth.signOut();
		localStorage.removeItem('loggedUser');
		this.router.navigate(['']);
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
			isAdmin: (user.isAdmin = false),
		};

		return userRef.set(userData, { merge: true });
	}
}
