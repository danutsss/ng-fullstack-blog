import { Injectable } from '@angular/core';

// Import Angular Firestore.
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

// Import Comment model.
import { Comment } from '../models/comments';

// Import rxJs map operator.
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class CommentsService {
	commentsCollection: AngularFirestoreCollection<Comment>;
	commentDoc!: AngularFirestoreDocument<Comment>;
	constructor(private afStore: AngularFirestore) {
		this.commentsCollection = this.afStore.collection('comments', (ref) => {
			return ref.orderBy('createdAt', 'desc');
		});
	}

	/**
	 * Get all post comments.
	 * @param postId - Post ID.
	 */
	getPostComments(postId: string) {
		return this.afStore
			.collection('comments', (ref) => ref.where('postId', '==', postId))
			.snapshotChanges()
			.pipe(
				map((actions: any) =>
					actions.map((a: any) => {
						const data = a.payload.doc.data() as Comment;
						const id = a.payload.doc.id;
						return { id, ...data };
					})
				)
			);
	}

	/**
	 * Create new comment.
	 * @param comment - Comment data.
	 */
	createComment(comment: Comment) {
		return this.commentsCollection.add(comment);
	}

	/**
	 * Delete comment.
	 * @param commentId - Comment ID.
	 */
	deleteComment(commentId: string) {
		return this.afStore.doc(`comments/${commentId}`).delete();
	}
}
