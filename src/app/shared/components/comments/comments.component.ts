import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

// Import Comments service.
import { CommentsService } from '../../services/comments/comments.service';

// Import Auth service.
import { AuthService } from '../../services/auth/auth.service';

// Import Comments model.
import { Comment } from '../../services/models/comments';

// Import local storage service.
import { LocalstorageService } from '../../services/localstorage/localstorage.service';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
	comment: string = '';
	comments$!: Observable<Comment[]>;
	postId = this.route.snapshot.paramMap.get('id') as string;

	constructor(
		private commentService: CommentsService,
		private route: ActivatedRoute,
		public authService: AuthService,
		private localStorageService: LocalstorageService
	) {}

	ngOnInit(): void {
		this.comments$ = this.getComments();
	}

	addComment() {
		const userName = JSON.parse(
			this.localStorageService.getItem('loggedUser')!
		) as any;
		const commentData = {
			content: this.comment,
			postId: this.postId,
			createdAt: new Date(),
			userName: userName['displayName'],
			authorId: userName['uid'],
		};
		this.commentService.createComment(commentData);
		this.comment = '';
	}

	getComments() {
		return this.commentService.getPostComments(this.postId);
	}

	deleteComment(commentId: string) {
		this.commentService.deleteComment(commentId);
	}

	userIsAuthor(authorId: string) {
		const user = JSON.parse(
			this.localStorageService.getItem('loggedUser')!
		) as any;
		return user['uid'] === authorId;
	}
}
