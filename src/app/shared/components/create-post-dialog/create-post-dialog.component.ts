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

import EditorJS from '@editorjs/editorjs';

const Header = require('@editorjs/header');
const List = require('@editorjs/list');
const Embed = require('@editorjs/embed');

@Component({
	selector: 'app-create-post-dialog',
	templateUrl: './create-post-dialog.component.html',
	styleUrls: ['./create-post-dialog.component.scss'],
})
export class CreatePostDialogComponent implements OnInit {
	content: any;
	image: string = '';
	title: string = '';
	categories: string = '';

	saving: string = 'Creeaza postare';

	downloadURL!: Observable<string>;
	uploadPercent?: Observable<number>;

	editor!: EditorJS;
	editorREADONLY!: EditorJS;
	editorState = {};

	constructor(
		private postService: PostService,
		public auth: AuthService,
		public afStore: AngularFirestore,
		public afStorage: AngularFireStorage
	) {}

	ngOnInit(): void {}

	ngAfterViewInit() {
		this.editor = new EditorJS({
			holder: 'editorjs',
			tools: {
				header: {
					class: Header,
					inlineToolbar: ['link', 'bold', 'italic'],
				},
				list: {
					class: List,
					inlineToolbar: ['link', 'bold'],
				},
				embed: {
					class: Embed,
					inlineToolbar: true,
					config: {
						services: {
							youtube: true,
							coub: true,
							facebook: true,
							instagram: true,
							twitter: true,
							vimeo: true,
							googledrive: {
								// https://drive.google.com/file/d/1DObhdcTDHI1W0_HMcOcmkWxATxSRfsBl/view?usp=share_link
								regex: /https:\/\/drive\.google\.com\/file\/d\/(.+)\/view\?usp=share_link/,
								height: 400,
								width: 600,
								embedUrl:
									'https://drive.google.com/file/d/<%= remote_id %>/preview',
								html: '<iframe height="400" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" style="width: 100%;"></iframe>',
								id: (groups: []) => groups.join('/embed/'),
							},
							googledocs: {
								// https://docs.google.com/document/d/1oW2b2AgBenOsBsPfw1CL0fIctwzdelG7656l9wcBrmw/edit?usp=share_link
								regex: /https:\/\/docs\.google\.com\/document\/d\/(.+)\/edit\?usp=share_link/,
								height: 400,
								width: 600,
								embedUrl:
									'https://docs.google.com/document/d/<%= remote_id %>/preview',
								html: '<iframe height="400" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" style="width: 100%;"></iframe>',
								id: (groups: []) => groups.join('/embed/'),
							},
						},
					},
				},
			},
		});
	}

	async createPost() {
		const categories = this.categories.split(',');

		await this.editor.save().then(async (outputData) => {
			this.content = outputData;
			outputData;
		});

		const id = this.afStore.createId();
		const postData = {
			id: id,
			content: this.content,
			backgroundImage: this.image || '',
			title: this.title,
			author: this.auth.userData.displayName || this.auth.userData.email,
			authorId: this.auth.userData.uid,
			published: new Date(),
			categories: categories,
		};

		this.postService.createPost(id, postData);

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
