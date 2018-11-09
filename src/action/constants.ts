import { ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';

export const CHANGE_LOADING = 'CHANGE_LOADING';
export type CHANGE_LOADING = typeof CHANGE_LOADING;

export const RECEIVE_EXCHANGE = 'RECEIVE_EXCHANGE';
export type RECEIVE_EXCHANGE = typeof RECEIVE_EXCHANGE;

export const RECEIVE_COMPUTE = 'RECEIVE_COMPUTE';
export type RECEIVE_COMPUTE = typeof RECEIVE_COMPUTE;

export interface CalActionAbstractInterface {
  type: CHANGE_LOADING | RECEIVE_EXCHANGE | RECEIVE_COMPUTE;
  payload: any;
}

type EosActions = CalActionAbstractInterface;

export type MyDispatch = ThunkDispatch<any, any, any> | Dispatch<EosActions>;

export interface DispatchAbstract<T extends Object = {}> {
  param: T;
  dispatch: MyDispatch;
}

export interface AbstractInterfaceParam<T extends Object> {
  result?: T;
  success: boolean;
}

export default EosActions;