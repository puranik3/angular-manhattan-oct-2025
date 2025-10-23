import { Component, Input } from '@angular/core';
import IWorkshop from '../../models/IWorkshop';

@Component({
    standalone: false,
    selector: 'app-workshops-list-item',
    // components, directives, modules, pipes
    templateUrl: './item.html',
    styleUrl: './item.scss',
})
export class Item {
    @Input()
    workshop!: IWorkshop;
}
