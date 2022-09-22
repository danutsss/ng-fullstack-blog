import { Component, OnInit } from '@angular/core';

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
}
