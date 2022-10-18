import { Component, OnInit, Input } from '@angular/core';

import { CommentsService } from '../../services/comments/comments.service';

@Component({
	selector: 'app-avatar-photo',
	templateUrl: './avatar-photo.component.html',
	styleUrls: ['./avatar-photo.component.scss'],
})
export class AvatarPhotoComponent implements OnInit {
	@Input() public name!: string;
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
	constructor(private commentService: CommentsService) {}

	ngOnInit(): void {
		this.createInitials();
		const randomColor = Math.floor(
			Math.random() * Math.floor(this.circleColors.length)
		);
		this.circleColor = this.circleColors[randomColor];
	}

	private createInitials(): void {
		let initials = '';

		for (let i = 0; i < this.name.length; i++) {
			if (this.name.charAt(i) === ' ') continue;

			if (this.name.charAt(i) === this.name.charAt(i).toUpperCase()) {
				initials += this.name.charAt(i);

				if (initials.length == 2) break;
			}
		}

		this.initials = initials;
	}
}
