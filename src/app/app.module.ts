import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Firebase.
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Authentication components & services.
import { AuthService } from './shared/services/auth/auth.service';

// Layout components.
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CreatePostDialogComponent } from './shared/components/create-post-dialog/create-post-dialog.component';

// Import Comments component.
import { CommentsComponent } from './shared/components/comments/comments.component';

// Import Angular Material components.
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Font Awesome 6.x
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Import Quill Module.
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';
import QuillResizeModule from '@botom/quill-resize-module';

// Register the Quill Resize Module.
Quill.register('modules/resize', QuillResizeModule);

@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent,
		NavbarComponent,
		HeaderComponent,
		FooterComponent,
		CreatePostDialogComponent,
		CommentsComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireStorageModule,
		BrowserAnimationsModule,
		NgbModule,
		MatButtonModule,
		MatCardModule,
		MatProgressBarModule,
		MatChipsModule,
		FontAwesomeModule,
		MatIconModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		CommonModule,
		QuillModule.forRoot({
			modules: {
				resize: {
					locale: {},
				},
			},
		}),
	],
	providers: [AuthService],
	bootstrap: [AppComponent],
})
export class AppModule {}
