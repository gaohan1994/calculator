import { 
  CHANGE_LOADING, 
} from '../action/constants';
import { Stores } from './index';
import { merge } from 'lodash';

export type Status = {
    loading: boolean;
};

export const initState = {
    loading: false,
};

/**
 * status 仓库
 *
 * @export
 * @param {Status} [state=initState]
 * @param {*} action
 * @returns {Status}
 */
export default function status ( state: Status = initState,  action: any ): Status {
  switch (action.type) {

    case CHANGE_LOADING:
      const { loading } = action;
      state.loading = loading;
      return merge({}, state, {});

    default: return state;
  }
}

export const GetLoading = (state: Stores) => state.status.loading;
