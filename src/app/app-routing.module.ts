import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Authentication components & guards.
import { AuthGuard } from './shared/guard/auth.guard';

// Layout components.
import { DashboardComponent } from './components/dashboard/dashboard.component';

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
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
	exports: [RouterModule],
})
export class AppRoutingModule {}
