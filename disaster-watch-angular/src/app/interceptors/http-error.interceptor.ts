import { inject, Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    private readonly messageService = inject(MessageService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                const userMessage = this.getUserFriendlyMessage(error);

                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: userMessage,
                });

                return throwError(() => error);
            })
        );
    }

    private getUserFriendlyMessage(error: HttpErrorResponse): string {
        if (error.status === 0) {
            return 'Network error: Please check your internet connection, or the connected service is offline';
        }

        if (error.status === 404) {
            return 'Resource not found.';
        }

        if (error.status === 500) {
            return 'Server error: Please try again later.';
        }

        return error.error?.message || 'An unexpected error occurred.';
    }
}
