import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Workshops } from '../workshops';
import IWorkshop from '../models/IWorkshop';

@Component({
    selector: 'app-workshops-list',
    imports: [CommonModule, NgbAlert],
    templateUrl: './workshops-list.html',
    styleUrl: './workshops-list.scss',
})
export class WorkshopsList implements OnInit {
    workshops!: IWorkshop[];
    error!: Error;
    loading = true;

    constructor(private w: Workshops) {}

    ngOnInit() {
        this.loading = true;

        this.w.getWorkshops().subscribe({
            next: (workshops) => {
                this.workshops = workshops;
                this.loading = false;
            },
            error: (error) => {
                this.error = error;
                this.loading = false;
            },
        });
    }
}
