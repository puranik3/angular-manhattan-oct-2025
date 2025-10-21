import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sessions } from '../../sessions';
import ISession from '../../models/ISession';

import { LoadingSpinner } from '../../../common/loading-spinner/loading-spinner';
import { ErrorAlert } from '../../../common/error-alert/error-alert';
import { Item } from './item/item';

@Component({
    selector: 'app-sessions-list',
    standalone: true,
    imports: [LoadingSpinner, ErrorAlert, Item],
    templateUrl: './sessions-list.html',
    styleUrl: './sessions-list.scss',
})
export class SessionsList implements OnInit {
    loading = true;
    error: Error | null = null;
    workshopId!: number;
    sessions!: ISession[];

    private toastService = inject(ToastService);

    constructor(private sessionsService: Sessions, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        // this.activatedRoute.snapshot.paramMap is NOT an observable unlike this.activatedRoute.paramMap which is an observable
        const idStr = this.activatedRoute.snapshot.paramMap.get('id');
        this.workshopId = +(idStr as string);

        this.loading = true;
        this.sessionsService.getSessionsForWorkshop(this.workshopId).subscribe({
            next: (sessions) => {
                this.sessions = sessions;
                this.loading = false;
            },
            error: (err) => {
                this.error = err;
                this.loading = false;
            },
        });
    }
}
