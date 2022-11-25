import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Import Angular Material components.
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

// Import components.
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CommentsComponent } from '../../shared/components/comments/comments.component';
import { AvatarPhotoComponent } from 'src/app/shared/components/avatar-photo/avatar-photo.component';
import { CategoriesComponent } from 'src/app/shared/components/categories/categories.component';
import { PostContentComponent } from 'src/app/shared/components/post-content/post-content.component';

// Import post service.
import { PostService } from 'src/app/shared/services/post/post.service';

// Import custom pipes.
import { NoSanitizePipe } from 'src/app/shared/util/nosanitizer.pipe';
import { TruncatePipe } from 'src/app/shared/util/truncate.pipe';
import { SlugPipe } from 'src/app/shared/util/slug.pipe';

// Import Ngx Pagination module.
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
	{
		path: '',
		// pathMatch: 'full',
		component: PostListComponent,
	},
	{
		path: ':id/:slug',
		component: PostDetailComponent,
	},
];

@NgModule({
	declarations: [
		PostListComponent,
		PostDetailComponent,
		CommentsComponent,
		AvatarPhotoComponent,
		CategoriesComponent,
		NoSanitizePipe,
		TruncatePipe,
		SlugPipe,
		PostContentComponent,
	],
	imports: [
		CommonModule,
		MatButtonModule,
		MatCardModule,
		MatChipsModule,
		MatIconModule,
		MatDialogModule,
		MatFormFieldModule,
		MatSelectModule,
		FormsModule,
		RouterModule.forChild(routes),
		MatDividerModule,
		NgxPaginationModule,
	],
	providers: [PostService],
})
export class HomeModule {}
