import { Component, OnInit } from '@angular/core';
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
	public isDialogOpened: boolean = false;
	public dialogRef: any;

	constructor(
		public authService: AuthService,
		public route: Router,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {}

	openDialog() {
		if (this.isDialogOpened) {
			return;
		}

		this.isDialogOpened = true;

		this.dialogRef = this.dialog.open(CreatePostDialogComponent, {
			width: '1600px',
			height: '750px',
		});

		this.dialogRef.afterClosed().subscribe((result: any) => {
			this.isDialogOpened = false;
		});
	}
}
