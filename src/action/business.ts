
import BusinessService from '../service/business';
import { DispatchAbstract, RECEIVE_EXCHANGE, RECEIVE_COMPUTE } from './constants';
import Dialog from '../component/Dialog';

export interface GetComputeParam {
  name: string;
  compute: string;
}

class BusinessController {
  public GetExchangeResult = async (param: DispatchAbstract) => {
    const result = await BusinessService.GetExchangeResult();
    if (result.code === 10000) {
      const { dispatch } = param;

      dispatch({
        type: RECEIVE_EXCHANGE,
        payload: { data: result.data },
      });
    } else {
      Dialog.toastFail('请求接口失败');
    }
  }

  public GetCompute = async (params: DispatchAbstract<GetComputeParam>) => {
    const { dispatch, param } = params;
    const result = await BusinessService.GetCompute(param);
    if (result.code === 10000) {

      const payload = {
        result: result.data,
        name: param.name
      };
      dispatch({
        type: RECEIVE_COMPUTE,
        payload,
      });
    } else {
      Dialog.toastFail(result.msg || '请求接口失败');
    }
  }
}

export default new BusinessController();