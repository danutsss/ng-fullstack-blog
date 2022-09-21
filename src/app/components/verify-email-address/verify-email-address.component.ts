import { Component, OnInit } from '@angular/core';

// Authentication services.
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
	selector: 'app-verify-email-address',
	templateUrl: './verify-email-address.component.html',
	styleUrls: ['./verify-email-address.component.scss'],
})
export class VerifyEmailAddressComponent implements OnInit {
	constructor(public authService: AuthService) {}

	ngOnInit(): void {}
}
