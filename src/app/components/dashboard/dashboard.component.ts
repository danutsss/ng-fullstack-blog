import { Component, OnInit } from '@angular/core';

// Authentication services.
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	constructor(public authService: AuthService) {}

	ngOnInit(): void {}
}
