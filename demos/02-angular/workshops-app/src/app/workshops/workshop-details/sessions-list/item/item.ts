import { Component, Input, Output, EventEmitter } from '@angular/core';
import ISession from '../../../models/ISession';

@Component({
    selector: 'app-item',
    imports: [],
    templateUrl: './item.html',
    styleUrl: './item.scss',
})
export class Item {
    @Input()
    session!: ISession;
}
