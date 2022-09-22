import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Authentication components & guards.
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailAddressComponent } from './components/verify-email-address/verify-email-address.component';
import { AuthGuard } from './shared/guard/auth.guard';

// Layout components.
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'dashboard',
		component: DashboardComponent, // Dashboard route.
		canActivate: [AuthGuard],
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
