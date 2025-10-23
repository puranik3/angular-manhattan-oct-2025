import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ISession } from '../ISession';
import { WorkshopsService } from '../workshops.service';

@Component({
    selector: 'app-add-session',
    templateUrl: './add-session.component.html',
    styleUrls: ['./add-session.component.scss']
})
export class AddSessionComponent implements OnInit {
    @ViewChild( 'addSession' )
    addSession : FormGroup = new FormGroup({});

    id: number = -1;
    maxValues = 3;

    // @ViewChildren( '.form-control' )
    // formGroups: any[] = [];

    constructor( private ar : ActivatedRoute, private ws : WorkshopsService ) { }

    ngOnInit(): void {
        this.id = +( ( this.ar.snapshot.parent?.paramMap.get( 'id' ) as unknown ) as number );
    }

    isInvalid(control: FormControl) {
        return control.invalid && (control.dirty || control.touched);
    }

    addNewSession( event : Event ) {
        event.preventDefault();

        const session : ISession = this.addSession.value as ISession;
        session.sequenceId = +session.sequenceId;
        session.workshopId = this.id;

        this.ws.addSession( session ).subscribe(
            session => alert( `A session with id= ${session.id} has been added` ),
            error => alert( error.message )
        );
    }
}
