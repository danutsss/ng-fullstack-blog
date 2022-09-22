import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Firebase.
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Authentication components & services.
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailAddressComponent } from './components/verify-email-address/verify-email-address.component';
import { AuthService } from './shared/services/auth/auth.service';

// Layout components.
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent,
		ForgotPasswordComponent,
		SignInComponent,
		SignUpComponent,
		VerifyEmailAddressComponent,
		NavbarComponent,
		HomeComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		BrowserAnimationsModule,
		NgbModule,
	],
	providers: [AuthService],
	bootstrap: [AppComponent],
})
export class AppModule {}
