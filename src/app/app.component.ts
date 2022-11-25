import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Inject Auth service.
import { AuthService } from './shared/services/auth/auth.service';

// Inject rxjs BehaviorSubject.
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	static isBrowser = new BehaviorSubject<boolean>(false);

	constructor(
		public authService: AuthService,
		@Inject(PLATFORM_ID) private platformId: any
	) {
		AppComponent.isBrowser.next(isPlatformBrowser(platformId));
	}
}
