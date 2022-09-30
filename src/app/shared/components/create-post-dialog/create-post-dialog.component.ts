import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Angular Firestore.
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

// Import post & auth service.
import { PostService } from '../../../shared/services/post/post.service';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
	selector: 'app-create-post-dialog',
	templateUrl: './create-post-dialog.component.html',
	styleUrls: ['./create-post-dialog.component.scss'],
})
export class CreatePostDialogComponent implements OnInit {
	content!: string;
	image!: string;
	title!: string;

	saving = 'Creeaza postare';

	constructor(
		private postService: PostService,
		public auth: AuthService,
		public afStore: AngularFirestore
	) {}

	ngOnInit(): void {}

	createPost() {
		let newSlug = this.title
			.toLowerCase()
			.replace(/ /g, '-')
			.replace(/[^\w-]+/g, '');

		const postData = {
			content: this.content,
			title: this.title,
			author: this.auth.userData.displayName || this.auth.userData.email,
			authorId: this.auth.userData.uid,
			published: new Date(),
			slug: newSlug,
		};
		this.postService.createPost(postData);
		this.title = '';
		this.content = '';
		this.image = '';

		this.saving = 'Postarea a fost salvata.';
		setTimeout(() => (this.saving = 'Creeaza postare'), 3000);
	}
}
