import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import EditorJS from '@editorjs/editorjs';

// Import post service.
import { PostService } from 'src/app/shared/services/post/post.service';
import { Post } from 'src/app/shared/services/models/post';
import { AuthService } from '../../services/auth/auth.service';

const Header = require('@editorjs/header');
const List = require('@editorjs/list');
const Embed = require('@editorjs/embed');
const Delimiter = require('@editorjs/delimiter');
const Paragraph = require('@editorjs/paragraph');
const alignmentTuneTool = require('editorjs-text-alignment-blocktune');
const Underline = require('@editorjs/underline');

@Component({
	selector: 'app-post-content',
	templateUrl: './post-content.component.html',
	styleUrls: ['./post-content.component.scss'],
})
export class PostContentComponent implements OnInit {
	post!: Post;
	editorREADONLY!: EditorJS;
	editor!: EditorJS;
	editing: boolean = false;
	title: string = '';
	content: any;
	id = this.route.snapshot.paramMap.get('id') as string;
	constructor(
		private postService: PostService,
		private route: ActivatedRoute,
		public authService: AuthService
	) {}

	ngOnInit(): void {
		this.getPost();
	}

	ngAfterViewInit() {
		this.editorREADONLY = new EditorJS({
			holder: 'editorjsReadonly',
			readOnly: true,
			tools: {
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
								height: 600,
								width: 750,
								embedUrl:
									'https://drive.google.com/file/d/<%= remote_id %>/preview',
								html: '<iframe style="width: 750px !important;" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>',
								id: (groups: []) => groups.join('/embed/'),
							},
							googledocs: {
								// https://docs.google.com/document/d/1oW2b2AgBenOsBsPfw1CL0fIctwzdelG7656l9wcBrmw/edit?usp=share_link
								regex: /https:\/\/docs\.google\.com\/document\/d\/(.+)\/edit\?usp=share_link/,
								height: 600,
								width: 750,
								embedUrl:
									'https://docs.google.com/document/d/<%= remote_id %>/preview',
								html: '<iframe style="width: 750px !important;" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>',
								id: (groups: []) => groups.join('/embed/'),
							},
						},
					},
				},
			},
		});
	}

	getPost() {
		this.postService.getPostData(this.id).subscribe((post) => {
			this.post = post as Post;
			this.editorREADONLY.isReady
				.then(() => {
					this.editorREADONLY.render(this.post.content);
				})
				.catch((error) => {
					throw new Error(error);
				});
		});
	}

	deletePost(id: string) {
		this.postService
			.deletePost(id)
			.then(() => {
				window.location.href = '/';
			})
			.catch((error) => {
				throw new Error(error);
			});
	}

	displayEditor() {
		this.editor = new EditorJS({
			holder: 'editorjs',
			tools: {
				header: {
					class: Header,
					config: {
						levels: [1, 2, 3, 4, 5, 6],
						defaultLevel: 3,
						defaultAlignment: 'left',
					},
					inlineToolbar: true,
					tunes: ['alignmentTune'],
				},
				paragraph: {
					class: Paragraph,
					inlineToolbar: true,
					tunes: ['alignmentTune'],
				},
				list: {
					class: List,
					inlineToolbar: true,
					tunes: ['alignmentTune'],
				},
				delimiter: {
					class: Delimiter,
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
				alignmentTune: {
					class: alignmentTuneTool,
				},
				underline: Underline,
			},
		});

		this.postService.getPostData(this.id).subscribe((post) => {
			this.post = post as Post;
			this.editor.isReady
				?.then(() => {
					this.editor.render(this.post.content);
				})
				.catch((error) => {
					throw new Error(error);
				});
		});
	}

	async updatePost() {
		await this.editor
			.save()
			.then(async (outputData) => {
				this.content = outputData;
				outputData;
			})
			.catch((error) => {
				throw new Error(error);
			});
		const postData = {
			title: this.title,
			content: this.content,
			backgroundImage: this.post.backgroundImage,
			author: this.post.author,
			authorId: this.post.authorId,
			published: this.post.published,
			categories: this.post.categories,
		};

		this.postService.updatePost(this.id, postData);

		this.editing = false;
		this.editor.destroy();
	}
}
