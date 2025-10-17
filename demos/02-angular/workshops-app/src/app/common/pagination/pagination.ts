import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-pagination',
    imports: [],
    templateUrl: './pagination.html',
    styleUrl: './pagination.scss',
})
export class Pagination {
    @Input()
    page!: number;

    changePage(by: number) {}
}
