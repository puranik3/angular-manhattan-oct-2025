import { Component, ViewEncapsulation } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Menu } from './menu/menu';
import { RouterOutlet } from '@angular/router';
import { Toast } from './common/toast/toast';

@Component({
    selector: 'app-root',
    // encapsulation: ViewEncapsulation.Emulated,
    standalone: true,
    imports: [NgbAlert, Menu, RouterOutlet, Toast],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    // title = 'Workshops App';
    // changeTitle(newTitle: string) {
    //     this.title = newTitle;
    // }
}

export const x = 100;
