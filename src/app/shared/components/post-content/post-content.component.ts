import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import EditorJS from '@editorjs/editorjs';
const Embed = require('@editorjs/embed');

// Import post service.
import { PostService } from 'src/app/shared/services/post/post.service';
import { Post } from 'src/app/shared/services/models/post';

@Component({
	selector: 'app-post-content',
	templateUrl: './post-content.component.html',
	styleUrls: ['./post-content.component.scss'],
})
export class PostContentComponent implements OnInit {
	post!: Post;
	editorREADONLY!: EditorJS;
	constructor(
		private postService: PostService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.getPost();
	}

	ngAfterViewInit() {
		this.editorREADONLY = new EditorJS({
			holder: 'editorjs',
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
		const id = this.route.snapshot.paramMap.get('id') as string;
		this.postService.getPostData(id).subscribe((post) => {
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
}
