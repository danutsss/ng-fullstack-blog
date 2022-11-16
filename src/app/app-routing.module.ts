import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Home module.
import { HomeModule } from './components/home/home.module';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => HomeModule,
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			initialNavigation: 'enabledBlocking',
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
