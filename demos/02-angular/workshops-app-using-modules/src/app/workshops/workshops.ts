import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IWorkshop from './models/IWorkshop';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class Workshops {
    private apiUrl = environment.apiUrl;
    // private http: HttpClient;

    constructor(private http: HttpClient) {
        // this.http = http;
    }

    getWorkshops(page: number = 1, category: string = '') {
        const params: { _page: number; category?: string } = {
            _page: page,
        };

        if (category !== '') {
            params.category = category;
        }

        return this.http.get<IWorkshop[]>(`${this.apiUrl}/workshops`, {
            // params: params,
            params,
        });
    }

    getWorkshopById(workshopId: number) {
        return this.http.get<IWorkshop>(`${this.apiUrl}/workshops/${workshopId}`);
    }
}
