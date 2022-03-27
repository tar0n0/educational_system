import { BehaviorSubject } from 'rxjs';

class ModalsControllerService {
    constructor() {
        this.modalsProps = {};
        this._modal = new BehaviorSubject([]);
    }

    openModal(modalKey = '', meta = {}) {
        this.modalsProps[modalKey] = meta;
        this._modal.next([modalKey, true]);
    }

    closeModal(modalKey = '') {
        delete this.modalsProps[modalKey];
        this._modal.next([modalKey, false]);
    }

    get modal() {
        return this._modal;
    }
}

export default new ModalsControllerService();
