import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, map, switchMap, catchError, of } from 'rxjs';

// this gives the individual icons we want to use
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

import { Workshops } from '../workshops';
import IWorkshop from '../models/IWorkshop';

@Component({
    standalone: false,
    selector: 'app-workshop-details',
    templateUrl: './workshop-details.html',
    styleUrl: './workshop-details.scss',
})
export class WorkshopDetails implements OnInit {
    // loading = true;
    error!: Error;
    // workshop!: IWorkshop;

    // workshopId!: number;

    icons = {
        // The below is just ES2015+ short for faCheckCircle: faCheckCircle,
        // faCheckCircle: faCheckCircle,
        faCheckCircle,
        faTimesCircle,
    };

    // Main observable stream: fetch workshop by ID from route param
    workshop$!: Observable<IWorkshop | null>;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly workshopsService: Workshops
    ) {}

    ngOnInit() {
        // this.activatedRoute.paramMap.subscribe({
        //     next: (params) => {
        //         const idStr = params.get('id');
        //         this.workshopId = +(idStr as string);

        //         this.workshopsService.getWorkshopById(this.workshopId).subscribe({
        //             next: (workshop) => {
        //                 this.workshop = workshop;
        //                 this.loading = false;
        //             },
        //             error: (error) => {
        //                 this.error = error;
        //                 this.loading = false;
        //             },
        //         });
        //     },
        // });

        // Main observable stream: fetch workshop by ID from route param
        this.workshop$ = this.activatedRoute.paramMap.pipe(
            map((params) => +(params.get('id') ?? '0')),
            switchMap((id) =>
                this.workshopsService.getWorkshopById(id).pipe(
                    catchError((err) => {
                        this.error = err;
                        return of(null); // emit null so template can handle gracefully
                    })
                )
            )
        );
    }
}
