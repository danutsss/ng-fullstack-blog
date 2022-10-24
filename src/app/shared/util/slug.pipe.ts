import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'slugPipe',
})
export class SlugPipe implements PipeTransform {
	transform(title: string) {
		const urlSlug = title.trim().toLowerCase().replace(/ /g, '-');
		return urlSlug;
	}
}
