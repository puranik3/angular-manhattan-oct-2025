import { Component, Input, Output, EventEmitter } from '@angular/core';
import ISession from '../../../models/ISession';

@Component({
    standalone: false,
    selector: 'app-item',
    templateUrl: './item.html',
    styleUrl: './item.scss',
})
export class Item {
    @Input()
    session!: ISession;

    @Output()
    vote = new EventEmitter<number>();

    emitVote(by: number) {
        this.vote.emit(by);
    }
}
