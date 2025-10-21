import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingSpinner } from '../../common/loading-spinner/loading-spinner';
import { ErrorAlert } from '../../common/error-alert/error-alert';
import { Item } from './item/item';
import { Workshops } from '../workshops';
import IWorkshop from '../models/IWorkshop';
import { Pagination } from '../../common/pagination/pagination';

@Component({
    selector: 'app-workshops-list',
    imports: [CommonModule, LoadingSpinner, ErrorAlert, Item, Pagination ],
    templateUrl: './workshops-list.html',
    styleUrl: './workshops-list.scss',
})
export class WorkshopsList implements OnInit {
    workshops!: IWorkshop[];
    error!: Error;
    loading = true;

    page = 1;

    constructor(
        private w: Workshops,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    getWorkshops() {
        this.loading = true;

        this.w.getWorkshops(this.page).subscribe({
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

    ngOnInit() {
        this.activatedRoute.queryParamMap.subscribe({
            next: ( queryParams ) => {
                const queryStr = queryParams.get('page');

                // when the page loads for the first time, there is no `page` query string parameter -> so we set page to 1. Later on there is some `page` value
                if (queryStr === null) {
                    this.page = 1;
                } else {
                    this.page = +queryStr; // convert `page` from string type to number
                }

                this.getWorkshops(); // page has changed -> get fresh data
            }
        });
        // this.getWorkshops();
    }

    changePage(by: number) {
        if (this.page == 1 && by < 0) {
            return;
        }

        this.page += by;

        // this.getWorkshops();

        // set the query string in the route
        this.router.navigate(['/workshops'], {
            queryParams: {
                page: this.page,
            },
        });
    }
}
