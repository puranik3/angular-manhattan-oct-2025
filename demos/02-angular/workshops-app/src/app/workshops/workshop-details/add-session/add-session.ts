import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Sessions } from '../../sessions';
import ISession from '../../models/ISession';

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
                alert(`Added session with id = ${addedSession.id}`);

                // You can also use navigateByUrl()
                this.router.navigate(['/workshops', id]);
            },
            // error: (error) => {

            // }
        });
    }
}
