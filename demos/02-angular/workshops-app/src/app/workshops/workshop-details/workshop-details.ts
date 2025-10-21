import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LoadingSpinner } from '../../common/loading-spinner/loading-spinner';
import { ErrorAlert } from '../../common/error-alert/error-alert';
import { LocationPipe } from '../../common/location-pipe';

import { Workshops } from '../workshops';
import IWorkshop from '../models/IWorkshop';

@Component({
    selector: 'app-workshop-details',
    imports: [DatePipe, LoadingSpinner, ErrorAlert, LocationPipe],
    templateUrl: './workshop-details.html',
    styleUrl: './workshop-details.scss',
})
export class WorkshopDetails implements OnInit {
    loading = true;
    error: Error | null = null;
    workshop!: IWorkshop;

    workshopId!: number;

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
