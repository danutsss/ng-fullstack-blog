import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

// Import Authentification service.
import { AuthService } from '../../../shared/services/auth/auth.service';

// Import Angular Material Dialog component.
import { MatDialog } from '@angular/material/dialog';

// Import Create Post Dialog component.
import { CreatePostDialogComponent } from '../create-post-dialog/create-post-dialog.component';
@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	public isCollapsed: boolean = true;

	constructor(
		public authService: AuthService,
		public route: Router,
		public dialog: MatDialog
	) {}

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

	openDialog() {
		const dialogRef = this.dialog.open(CreatePostDialogComponent);

		dialogRef.afterClosed().subscribe((result) => {
			console.log(`Dialog result: ${result}`);
		});
	}
}
