import { Component, Input } from '@angular/core';

@Component({
    standalone: false,
    selector: 'app-error-alert',
    templateUrl: './error-alert.html',
    styleUrl: './error-alert.scss',
})
export class ErrorAlert {
    @Input('err')
    error!: Error;

    @Input()
    loading!: boolean;
}
