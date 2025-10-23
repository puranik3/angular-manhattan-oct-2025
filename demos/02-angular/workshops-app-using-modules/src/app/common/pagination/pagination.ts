import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    standalone: false,
    selector: 'app-pagination',
    templateUrl: './pagination.html',
    styleUrl: './pagination.scss',
})
export class Pagination {
    @Input()
    page!: number;

    @Output()
    pageChange = new EventEmitter<number>();

    changePage(by: number) {
        this.pageChange.emit(by); // pass on info to the parent component
    }
}
