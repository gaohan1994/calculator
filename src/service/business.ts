import request from '../common/request';

class BusinessService {
  public GetExchangeResult = async () => {
    return request(
      'http://59.111.53.180:8080/exchange/getExchageResult',
      'GET',
    );
  }

  public GetCompute = async (param: any) => {
    return request(
      'http://59.111.53.180:8080/exchange/compute',
      'POST',
      {
        ...param
      }
    );
  }
}

export default new BusinessService();