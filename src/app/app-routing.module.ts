import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Authentication components & guards.
import { AuthGuard } from './shared/guard/auth.guard';

// Layout components.
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

// Import Home module.
import { HomeModule } from './components/home/home.module';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'blog',
		pathMatch: 'full',
	},
	{
		path: '',
		loadChildren: () => HomeModule,
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
