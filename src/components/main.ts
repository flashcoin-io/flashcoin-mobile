import { riot } from './riot-ts';
import * as components from './components';

import store from '../model/store';
import * as actions from '../model/action-types';
import { userActions } from '../model/users/actions';
import UserService from '../model/users/user-service';

let currentAction = '';

components.initialize();

route((action) => {
    currentAction = action;

    if (action == 'login') {
        return riot.mount('#viewmain', 'mobile-login');
    }

    var state = store.getState();
    if (!state.userData.user && (action != 'reset_password' && action != 'account_created' && action != 'submit_email')) {
        return route('login');
    }

    switch (action) {
        case '':
        case 'home':
            return riot.mount('#viewmain', 'home-page');
        case 'reset_password':
            return riot.mount('#viewmain', 'security-questions');
        case 'account_created':
            return riot.mount('#viewmain', 'setuppassword');
        case 'submit_email':
            return riot.mount('#viewmain', 'submit-email');
        default:
            break;
    }
});

store.subscribe(() => {
    var state = store.getState();

    if (state.lastAction.type == actions.USERS.GET_PROFILE_SUCCESS) {
        route('');
    } else if (!state.userData.user && (currentAction !== 'reset_password' && currentAction != 'account_created' && currentAction != 'submit_email')) {
        route('login');
    }
});

route.start(true);
