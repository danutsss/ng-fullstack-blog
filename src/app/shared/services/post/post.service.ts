import { Injectable } from '@angular/core';

// Import Angular Firestore.
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

// Import Post model.
import { Post } from '../models/post';

@Injectable({
	providedIn: 'root',
})
export class PostService {
	postsCollection: AngularFirestoreCollection<Post>;
	postDoc: AngularFirestoreDocument<Post>;
	constructor(private afs: AngularFirestore) {
		this.postsCollection = this.afs.collection('posts', (ref) =>
			ref.orderBy('date', 'desc')
		);
	}

	/**
	 * Get all posts.
	 */
	getPosts() {
		return this.postsCollection.snapshotChanges().map((actions: any) => {
			return actions.map((action: any) => {
				const data = action.payload.doc.data() as Post;
				const id = action.payload.doc.id;
				return { id, ...data };
			});
		});
	}

	/**
	 * Get post data by id.
	 * @param id - Post ID.
	 */
	getPost(id: string) {
		this.postDoc = this.afs.doc<Post>(`posts/${id}`);
		return this.postDoc.valueChanges();
	}
}
