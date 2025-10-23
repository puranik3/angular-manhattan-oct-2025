import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Sessions } from '../../sessions';
import ISession from '../../models/ISession';
import { ToastService } from '../../../common/toast';

@Component({
    selector: 'app-add-session',
    imports: [RouterLink, FormsModule, JsonPipe],
    templateUrl: './add-session.html',
    styleUrl: './add-session.scss',
})
export class AddSession {
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router);
    private sessionsService = inject(Sessions);
    private toastService = inject(ToastService);

    addSession(addSessionForm: NgForm) {
        const id = +(this.activatedRoute.snapshot.parent?.paramMap.get('id') as string);

        const newSession = {
            ...addSessionForm.value,
            workshopId: id,
            upvoteCount: 0,
            sequenceId: +addSessionForm.value.sequenceId,
            duration: +addSessionForm.value.duration,
        } as Omit<ISession, 'id'>;

        console.log(newSession);

        this.sessionsService.addSession(newSession).subscribe({
            next: (addedSession) => {
                this.toastService.add({
                    message: `Added session with id = ${addedSession.id}`,
                    className: 'bg-success text-light',
                    duration: 5000,
                });

                // You can also use navigateByUrl()
                this.router.navigate(['/workshops', id]);
            },
            error: (error) => {
                this.toastService.add({
                    message: `Unable to add the session - ${error.message}`,
                    className: 'bg-danger text-light',
                    duration: 5000,
                });
            },
        });
    }
}
