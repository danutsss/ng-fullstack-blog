import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Import post service.
import { PostService } from 'src/app/shared/services/post/post.service';
import { Post } from 'src/app/shared/services/models/post';

@Component({
	selector: 'app-post-detail',
	templateUrl: './post-detail.component.html',
	styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
	post!: Post;
	constructor(
		private postService: PostService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.getPost();
	}

	getPost() {
		const id = this.route.snapshot.paramMap.get('id') as string;
		this.postService.getPostData(id).subscribe((post) => {
			this.post = post as Post;
		});
	}
}
