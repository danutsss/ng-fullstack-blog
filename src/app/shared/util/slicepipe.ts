import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'slicePipe' })
export class SlicePipe implements PipeTransform {
	transform(value: string, start: number, end: number): string {
		if (value.length > end) {
			return value.slice(start, end) + '...';
		}
		return value;
	}
}
