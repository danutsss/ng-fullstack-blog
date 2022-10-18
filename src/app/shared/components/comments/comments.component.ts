import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

// Import Comments service.
import { CommentsService } from '../../services/comments/comments.service';

// Import Comments model.
import { Comment } from '../../services/models/comments';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
	comment: string = '';
	comments$!: Observable<Comment[]>;

	constructor(
		private commentService: CommentsService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.comments$ = this.getComments();
	}

	addComment() {
		const postId = this.route.snapshot.paramMap.get('id') as string;
		const userName = JSON.parse(localStorage.getItem('loggedUser')!) as any;
		const commentData = {
			content: this.comment,
			postId: postId,
			createdAt: new Date(),
			userName: userName['displayName'],
		};
		this.commentService.createComment(commentData);
		this.comment = '';
	}

	getComments() {
		const postId = this.route.snapshot.paramMap.get('id') as string;
		return this.commentService.getPostComments(postId);
	}
}
