import { NgModule } from '@angular/core';

import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ErrorAlert } from './error-alert/error-alert';
import { LoadingSpinner } from './loading-spinner/loading-spinner';
import { Pagination } from './pagination/pagination';
import { VotingWidget } from './voting-widget/voting-widget';

import { LocationPipe } from './location-pipe';

@NgModule({
    declarations: [ErrorAlert, LoadingSpinner, Pagination, VotingWidget, LocationPipe],
    imports: [AngularCommonModule, NgbModule, FontAwesomeModule],
    exports: [ErrorAlert, LoadingSpinner, Pagination, VotingWidget, LocationPipe],
})
export class CommonModule {}
