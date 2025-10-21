import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { LoadingSpinner } from '../../common/loading-spinner/loading-spinner';
import { ErrorAlert } from '../../common/error-alert/error-alert';
import { LocationPipe } from '../../common/location-pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// this gives the individual icons we want to use
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

import { Workshops } from '../workshops';
import IWorkshop from '../models/IWorkshop';

@Component({
    selector: 'app-workshop-details',
    imports: [
        DatePipe,
        LoadingSpinner,
        ErrorAlert,
        LocationPipe,
        FontAwesomeModule,
        CommonModule,
        RouterModule,
    ],
    templateUrl: './workshop-details.html',
    styleUrl: './workshop-details.scss',
})
export class WorkshopDetails implements OnInit {
    loading = true;
    error: Error | null = null;
    workshop!: IWorkshop;

    workshopId!: number;

    icons = {
        // The below is just ES2015+ short for faCheckCircle: faCheckCircle,
        // faCheckCircle: faCheckCircle,
        faCheckCircle,
        faTimesCircle,
    };

    constructor(private activatedRoute: ActivatedRoute, private workshopsService: Workshops) {}

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe({
            next: (params) => {
                const idStr = params.get('id');
                this.workshopId = +(idStr as string);

                this.workshopsService.getWorkshopById(this.workshopId).subscribe({
                    next: (workshop) => {
                        this.workshop = workshop;
                        this.loading = false;
                    },
                    error: (error) => {
                        this.error = error;
                        this.loading = false;
                    },
                });
            },
        });
    }
}
