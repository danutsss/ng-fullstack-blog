import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Firebase.
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Authentication components & services.
import { AuthService } from './shared/services/auth/auth.service';

// Layout components.
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CreatePostDialogComponent } from './shared/components/create-post-dialog/create-post-dialog.component';

// Import Angular Material components.
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
// Font Awesome 6.x
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent,
		NavbarComponent,
		HomeComponent,
		HeaderComponent,
		AboutComponent,
		ContactComponent,
		FooterComponent,
		CreatePostDialogComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		BrowserAnimationsModule,
		NgbModule,
		MatButtonModule,
		MatCardModule,
		MatChipsModule,
		FlexLayoutModule,
		FontAwesomeModule,
		MatIconModule,
		MatDialogModule,
	],
	providers: [AuthService],
	bootstrap: [AppComponent],
})
export class AppModule {}
