import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule as SharedModule } from '../common/common-module';
import { WorkshopsRoutingModule } from './workshops-routing-module';

import { WorkshopsList } from './workshops-list/workshops-list';
import { WorkshopDetails } from './workshop-details/workshop-details';
import { SessionsList } from './workshop-details/sessions-list/sessions-list';
import { AddSession } from './workshop-details/add-session/add-session';
import { Item as WorkshopsListItem } from './workshops-list/item/item';
import { Item as SessionsListItem } from './workshop-details/sessions-list/item/item';

@NgModule({
    declarations: [
        WorkshopsList,
        WorkshopDetails,
        SessionsList,
        AddSession,
        WorkshopsListItem,
        SessionsListItem,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        FontAwesomeModule,
        SharedModule,
        WorkshopsRoutingModule,
    ],
})
export class WorkshopsModule {}
