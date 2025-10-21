import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IWorkshop from './models/IWorkshop';

@Injectable({
    providedIn: 'root',
})
export class Workshops {
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

        return this.http.get<IWorkshop[]>(`https://workshops-server.onrender.com/workshops`, {
            // params: params,
            params,
        });
    }
}
