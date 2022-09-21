import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Authentication components.
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailAddressComponent } from './components/verify-email-address/verify-email-address.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign-in',
		pathMatch: 'full', // Default route.
	},
	{
		path: 'dashboard',
		component: DashboardComponent, // Dashboard route.
	},
	{
		path: 'forgot-password',
		component: ForgotPasswordComponent, // Forgot password route.
	},
	{
		path: 'sign-in',
		component: SignInComponent, // Sign in route.
	},
	{
		path: 'sign-up',
		component: SignUpComponent, // Sign up route.
	},
	{
		path: 'verify-email',
		component: VerifyEmailAddressComponent, // Verify email address route.
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
