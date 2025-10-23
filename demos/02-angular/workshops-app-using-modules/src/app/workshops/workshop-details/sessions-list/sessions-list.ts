import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sessions } from '../../sessions';
import ISession from '../../models/ISession';

@Component({
    standalone: false,
    selector: 'app-sessions-list',
    templateUrl: './sessions-list.html',
    styleUrl: './sessions-list.scss',
})
export class SessionsList implements OnInit {
    loading = true;
    error: Error | null = null;
    workshopId!: number;
    sessions!: ISession[];

    constructor(
        private readonly sessionsService: Sessions,
        private readonly activatedRoute: ActivatedRoute
    ) {}

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

    updateVote(session: ISession, by: number) {
        this.sessionsService
            .voteForSession(session.id, by === 1 ? 'upvote' : 'downvote')
            .subscribe({
                next: (updatedSession) => {
                    session.upvoteCount = updatedSession.upvoteCount;
                },
                // @todo handle error
            });
    }
}
