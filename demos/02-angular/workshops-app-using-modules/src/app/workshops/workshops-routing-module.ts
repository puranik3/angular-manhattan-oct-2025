import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkshopsList } from './workshops-list/workshops-list';
import { AddWorkshop } from './add-workshop/add-workshop';
import { Favorites } from './favorites/favorites';
import { WorkshopDetails } from './workshop-details/workshop-details';
import { SessionsList } from './workshop-details/sessions-list/sessions-list';
import { AddSession } from './workshop-details/add-session/add-session';

const routes: Routes = [
    {
        path: 'workshops',
        component: WorkshopsList,
        title: 'List of workshops',
    },
    {
        path: 'workshops/add',
        component: AddWorkshop,
        title: 'Add a workshop',
    },
    {
        path: 'workshops/favorites',
        component: Favorites,
        title: 'Favorite workshops',
    },
    {
        path: 'workshops/:id',
        component: WorkshopDetails,
        // title: 'Set dynamically using Title service if needed',
        children: [
            {
                path: '',
                component: SessionsList,
            },
            {
                path: 'add',
                component: AddSession,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WorkshopsRoutingModule {}
