import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import post service.
import { PostService } from 'src/app/shared/services/post/post.service';
import { Post } from '../../../shared/services/models/post';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
	posts$!: Observable<Post[]>;

	constructor(
		private postService: PostService,
		public authService: AuthService
	) {}

	ngOnInit(): void {
		this.posts$ = this.postService.getPosts();
	}
}
