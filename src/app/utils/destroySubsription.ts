import { Subscription } from 'rxjs';
export interface DestroySubscription {
    subscriptions: { [key: string]: Subscription }
    unsubscribeOnDestroy?(): void;
}