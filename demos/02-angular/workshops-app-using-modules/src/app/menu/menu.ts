import { Component } from '@angular/core';

@Component({
    standalone: false,
    selector: 'app-menu',
    templateUrl: './menu.html',
    styleUrl: './menu.scss',
})
export class Menu {
    isNavbarCollapsed = false;
}
