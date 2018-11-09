
import { RECEIVE_EXCHANGE, RECEIVE_COMPUTE } from '../action/constants';
import { isArrayFn } from 'src/common/config';
import { Stores } from './index';

export type Home = {
  exchange: any;
  compute: any;
  selectedName: string;
};

export const initState = {
  exchange: [],
  compute: {},
  selectedName: '',
};

export default function home (state: Home = initState, action: any): Home {
  switch (action.type) {
    case RECEIVE_EXCHANGE:
      const { payload: { data } } = action;
      let exchange: any[] = [];
  
      if (isArrayFn(data) !== true) {
        exchange = data.resultDataBeanList;
      } else {
        exchange = data;
      }

      return {
        ...state,
        exchange,
      };

    case RECEIVE_COMPUTE:
      const { payload: { name, result } } = action;

      return {
        ...state,
        compute: {
          ...state.compute,
          [name]: result,
        },
        selectedName: name,
      };

    default: return state;
  }
}

export const GetExchange = (state: Stores) => state.home.exchange;

export const GetCompute = (state: Stores) => {
  return state.home.compute[state.home.selectedName];
};

export const GetSelectedName = (state: Stores) => state.home.selectedName;

export const checkInside = (state: Stores, name: string): boolean => {
  if (state.home.compute && state.home.compute[name] && state.home.compute[name].length > 0) {
    return true;
  } else {
    return false;
  }
};