import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Inject Auth service.
import { AuthService } from './shared/services/auth/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'ng-fullstack-blog';
	constructor(public authService: AuthService, private router: Router) {}

	isDashboardRoute() {
		return this.router.url === '/dashboard';
	}

	isContactRoute() {
		return this.router.url === '/contact';
	}

	isAboutRoute() {
		return this.router.url === '/about';
	}
}
