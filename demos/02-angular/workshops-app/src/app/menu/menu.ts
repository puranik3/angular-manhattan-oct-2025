import { Component } from '@angular/core';

// importing the module for simplicity - better to import components and other building blocks indicidually
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [NgbModule],
    templateUrl: './menu.html',
    styleUrl: './menu.scss',
})
export class Menu {
    isNavbarCollapsed = false;
}
