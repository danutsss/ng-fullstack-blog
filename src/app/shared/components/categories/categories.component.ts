import { Component, OnInit } from '@angular/core';

// Import Post service & model.
import { PostService } from '../../services/post/post.service';
import { Post } from '../../services/models/post';

// Import Observable.
import { Observable } from 'rxjs';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
	posts$!: Observable<Post[]>;

	constructor(private postService: PostService) {}

	ngOnInit(): void {
		this.posts$ = this.postService.getPosts();
	}
}
