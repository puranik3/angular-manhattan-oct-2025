import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    standalone: false,
    selector: 'app-root',
    // encapsulation: ViewEncapsulation.Emulated,
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
