import { Component, OnInit } from '@angular/core';

// Import Angular Firestore.
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

// Import post & auth service.
import { PostService } from '../../../shared/services/post/post.service';
import { AuthService } from '../../../shared/services/auth/auth.service';

// Import rxjs.
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-create-post-dialog',
	templateUrl: './create-post-dialog.component.html',
	styleUrls: ['./create-post-dialog.component.scss'],
})
export class CreatePostDialogComponent implements OnInit {
	content: string = '';
	image: string = '';
	title: string = '';
	categories: string = '';

	saving: string = 'Creeaza postare';

	downloadURL!: Observable<string>;
	uploadPercent?: Observable<number>;

	constructor(
		private postService: PostService,
		public auth: AuthService,
		public afStore: AngularFirestore,
		public afStorage: AngularFireStorage
	) {}

	ngOnInit(): void {}

	createPost() {
		const categories = this.categories.split(',');
		const postData = {
			content: this.content,
			backgroundImage: this.image || '',
			title: this.title,
			author: this.auth.userData.displayName || this.auth.userData.email,
			authorId: this.auth.userData.uid,
			published: new Date(),
			categories: categories,
		};
		this.postService.createPost(postData);
		this.title = '';
		this.content = '';
		this.image = '';
		this.categories = '';

		this.saving = 'Postarea a fost salvata.';
		setTimeout(() => (this.saving = 'Creeaza postare'), 3000);
	}

	uploadImage(event: any) {
		const file = event.target.files[0];
		const filePath = `posts/${file.name}`;
		const fileRef = this.afStorage.ref(filePath);
		const task = this.afStorage.upload(filePath, file);

		if (file.type.split('/')[0] !== 'image') {
			return alert('Only images are allowed!');
		} else {
			// observe percentage changes
			this.uploadPercent = task.percentageChanges() as Observable<number>;
			// get notified when the download URL is available
			task.snapshotChanges()
				.pipe(
					finalize(() => {
						this.downloadURL = fileRef.getDownloadURL();
						this.downloadURL.subscribe((url) => {
							this.image = url;
						});
					})
				)
				.subscribe();
		}
	}
}
