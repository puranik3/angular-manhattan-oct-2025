import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { PageNotFound } from './page-not-found/page-not-found';

const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Workshops App',
    },
    {
        path: '**',
        component: PageNotFound,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
