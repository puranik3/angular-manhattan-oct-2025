import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Menu } from './menu/menu';
import { RouterModule } from '@angular/router';

import { WorkshopsModule } from './workshops/workshops-module';
import { AppRoutingModule } from './app-routing-module';

import { App } from './app';

@NgModule({
    declarations: [App, Menu],
    bootstrap: [App],
    imports: [BrowserModule, RouterModule, NgbModule, WorkshopsModule, AppRoutingModule],
})
export class AppModule {}
