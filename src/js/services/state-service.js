import {
  startWith, scan, Subject, share,
} from 'rxjs';

const Actions = {
  Online: 'Server available',
  Offline: 'Server is unavailable',
};

function reduce(state, action) {
  switch (action.type) {
    case Actions.Online: {
      return { ...state, online: true };
    }
    case Actions.Offline: {
      return { ...state, online: false };
    }
    default:
      return state;
  }
}

export default class StateService {
  constructor() {
    this.actions$ = new Subject();
    this.state$ = this.actions$.asObservable().pipe(
      startWith({ type: 'INIT' }),
      scan((state, action) => reduce(state, action), { online: undefined }),
      share(),
    );
  }

  dispatch(type) {
    this.actions$.next({ type });
  }

  switchStateToOnline() {
    this.dispatch(Actions.Online);
  }

  switchStateToOffline() {
    this.dispatch(Actions.Offline);
  }
}
