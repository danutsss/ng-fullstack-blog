import { Injectable } from '@angular/core';
// Import Angular Firestore.
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

// Import Post model.
import { Post } from '../models/post';

// Import rxJs map operator.
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class PostService {
	postsCollection: AngularFirestoreCollection<Post>;
	postDoc!: AngularFirestoreDocument<Post>;

	constructor(private afs: AngularFirestore) {
		this.postsCollection = this.afs.collection('posts', (ref) =>
			ref.orderBy('published', 'desc')
		);
	}

	/**
	 * Get all posts.
	 */
	getPosts() {
		return this.postsCollection.snapshotChanges().pipe(
			map((actions: any) =>
				actions.map((a: any) => {
					const data = a.payload.doc.data() as Post;
					const id = a.payload.doc.id;
					return { id, ...data };
				})
			)
		);
	}

	/**
	 * Search through all posts by search query
	 * @param collection - Collection name.
	 * @param getParam - Search parameter (title, content, etc.).
	 * @param searchParam - Search query.
	 * @returns - search results.
	 */

	searchPosts(collection: string, getParam: string, searchParam: string) {
		return this.afs
			.collection(collection, (ref) =>
				ref
					.where(getParam, '>=', searchParam)
					.where(getParam, '<=', `${searchParam}\uf8ff`)
					.limit(5)
			)
			.valueChanges();
	}

	/**
	 * Get post data by id.
	 * @param id - Post ID.
	 */
	getPostData(id: string) {
		this.postDoc = this.afs.doc<Post>(`posts/${id}`);
		return this.postDoc.valueChanges();
	}

	/**
	 * Get post by id.
	 * @param id - Post ID.
	 */
	getPost(id: string) {
		return this.afs.doc<Post>(`posts/${id}`);
	}

	/**
	 * Get categories from posts.
	 */
	getCategories() {
		return this.afs
			.collection('posts', (ref) => ref.orderBy('published', 'desc'))
			.valueChanges()
			.pipe(
				map((actions: any) =>
					actions.map((a: any) => {
						const data = a.categories;
						return data;
					})
				)
			);
	}

	/**
	 * Create new post.
	 * @param data - Post data.
	 */
	createPost(id: string, data: Post) {
		return this.afs.doc(`posts/${id}`).set(data);
	}

	/**
	 * Delete post.
	 * @param id - Post ID.
	 */
	deletePost(id: string) {
		return this.getPost(id).delete();
	}

	/**
	 * Update post.
	 * @param id - Post ID.
	 * @param data - Post data.
	 */
	updatePost(id: string, data: Post) {
		return this.getPost(id).update(data);
	}
}
