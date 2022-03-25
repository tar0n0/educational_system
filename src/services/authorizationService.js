import { BehaviorSubject } from 'rxjs';
import { getStorageItem, removeStorageItem } from '../storage';

class AuthorizationService {
    constructor() {
        this._isUserStatus = new BehaviorSubject(false);
        this.initApp();
    }

    initApp() {
        if (getStorageItem('user')) {
            this._isUserStatus.next(true);
        } else {
            this._isUserStatus.next(false);
        }
    }

    logOut() {
        removeStorageItem('user');
        this._isUserStatus.next(false);
    }

    get isUserStatus() {
        return this._isUserStatus;
    }
}

export default new AuthorizationService();
