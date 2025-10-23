import { Injectable } from '@angular/core';

interface IToast {
    message: string;
    className: string;
    duration: number;
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    // shared data - the list of toast messages
    private toasts: IToast[] = [];
    // You can also maintain event emitter object, Subject (rxjs) - BehaviorSubject etc.

    constructor() {}

    public getToasts() {
        return this.toasts;
    }

    public add(toast: IToast) {
        this.toasts.unshift(toast);
    }

    public remove(toast: IToast) {
        // filter() does not modify this.toasts, it only returns a new Array. So we need to reassign the result to this.toasts
        this.toasts = this.toasts.filter((t) => t !== toast);
    }

    public clear() {
        this.toasts = [];
    }
}
