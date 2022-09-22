import { Component, OnInit } from '@angular/core';

// Authentication services.
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
	constructor(public authService: AuthService) {}

	ngOnInit(): void {}
}
