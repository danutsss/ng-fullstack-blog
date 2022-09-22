import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Authentication components & guards.
import { AuthGuard } from './shared/guard/auth.guard';

// Layout components.
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

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
		path: 'about',
		component: AboutComponent, // About route.
	},
	{
		path: 'contact',
		component: ContactComponent, // Contact route.
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
