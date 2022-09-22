import { Component, OnInit } from '@angular/core';

// Authentication services.
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
	constructor(public authService: AuthService) {}

	ngOnInit(): void {}
}
