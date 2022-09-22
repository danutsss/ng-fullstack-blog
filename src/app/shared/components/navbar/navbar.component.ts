import { Component, OnInit, HostListener } from '@angular/core';

// Import Authentification service.
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	public isCollapsed: boolean = true;

	constructor(public authService: AuthService) {}

	ngOnInit(): void {}

	@HostListener('window:scroll', ['$event'])
	onPageScroll = () => {
		let element = document.querySelector('.navbar') as HTMLElement;

		if (window.pageYOffset > element.clientHeight) {
			element.classList.add('navbar-inverse');
			element.classList.add('mat-elevation-z8');
		} else {
			element.classList.remove('navbar-inverse');
			element.classList.remove('mat-elevation-z8');
		}
	};
}
