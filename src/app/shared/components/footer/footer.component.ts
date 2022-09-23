import { Component, OnInit } from '@angular/core';
import {
	faLinkedin,
	faGithub,
	faFacebook,
	faTwitter,
	faGoogle,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
	public faLinkedin: any = faLinkedin;
	public faGithub: any = faGithub;
	public faFacebook: any = faFacebook;
	public faTwitter: any = faTwitter;
	public faGoogle: any = faGoogle;
	public faInstagram: any = faInstagram;
	constructor() {}

	ngOnInit(): void {}
}
