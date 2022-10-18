import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-avatar-photo',
	templateUrl: './avatar-photo.component.html',
	styleUrls: ['./avatar-photo.component.scss'],
})
export class AvatarPhotoComponent implements OnInit {
	public showInitials: boolean = true;
	public initials!: string;
	public circleColor!: string;
	private circleColors = [
		'#FFC107',
		'#FF5722',
		'#E91E63',
		'#9C27B0',
		'#673AB7',
		'#3F51B5',
		'#2196F3',
		'#009688',
		'#4CAF50',
		'#8BC34A',
		'#CDDC39',
		'#FFEB3B',
	];
	constructor() {}

	ngOnInit(): void {
		this.createInitials();
		const randomColor = Math.floor(
			Math.random() * Math.floor(this.circleColors.length)
		);
		this.circleColor = this.circleColors[randomColor];
	}

	private createInitials(): void {
		const name = JSON.parse(localStorage.getItem('loggedUser')!) as any;
		const displayName = name.displayName;
		let initials = '';

		for (let i = 0; i < displayName.length; i++) {
			if (displayName.charAt(i) === ' ') continue;

			if (displayName.charAt(i) === displayName.charAt(i).toUpperCase()) {
				initials += displayName.charAt(i);

				if (initials.length == 2) break;
			}
		}

		this.initials = initials;
	}
}
