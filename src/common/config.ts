import history from '../history';
/**
 * created by Ghan 9.3
 * @todo 设置常用的配置信息并根据环境变量导出
 */

/**
 * @param FETCH_ENTRY -- 统一访问入口
 */
export type InterfaceConfig = {
  FETCH_ENTRY: string;
} & DefaultCommonConfig;

/**
 * @todo 配置不会因为环境改变的数据项
 * @export
 * @interface DefaultCommonConfig
 */
export interface DefaultCommonConfig {
  DEFAULT_DOCUMENT_TITLE: string;
  CALCULATOR_DETAIL: any;
  DEFAULT_FETCH_COMPUTE: string;
  DEFAULT_FETCH_METHOD: 'POST' | 'GET' | 'post' | 'get';
}

const defaultCommonConfig: DefaultCommonConfig = {
  DEFAULT_DOCUMENT_TITLE: '汇率计算器',
  DEFAULT_FETCH_METHOD: 'get',
  DEFAULT_FETCH_COMPUTE: '人民币',
  CALCULATOR_DETAIL: {
    name: '汇率计算器'
  },
};

// 测试环境 http://202.101.149.132:7680/BKMS_HMS/GateWayAction.do
const devConfig: InterfaceConfig = {
  ...defaultCommonConfig,
  FETCH_ENTRY: 'http://202.101.149.132:7680/BKMS_HMS/GateWayAction.do',
};

const proConfig: InterfaceConfig = {
  ...defaultCommonConfig,
  FETCH_ENTRY: 'http://202.101.149.132:7680/BKMS_HMS/GateWayAction.do',
};

interface ProcessChoiceFilterFunc<T> {
  (arg1: T, arg2: T): T;
}

const processChoiceFilter: ProcessChoiceFilterFunc<InterfaceConfig> = (devConfig, proConfig) => {
  if (process.env.NODE_ENV === 'production') {
    return proConfig;
  } else {
    return devConfig;
  }
};

/**
 * connect 需要用到的merge工具
 * @param stateProps 
 * @param dispatchProps 
 * @param ownProps 
 */
const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

const formatOrderTime = (time: string): string => {
  if (!time || typeof (time) !== 'string' || time.length !== 14) {
    return '非法时间格式';
  }
  const year = time.substr(0, 4);
  const month = time.substr(4, 2);
  const day = time.substr(6, 2);
  const hour = time.substr(8, 2);
  const min = time.substr(10, 2);
  const sec = time.substr(12, 2);

  const formatDate = `${year}-${month}-${day} ${hour}:${min}:${sec}`;

  return formatDate;
};

const isArrayFn = (value: any): boolean => {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
};

/**
 * len: 需要字符串的长度
 *
 * @export
 * @param {*} len
 * @returns
 */
export function randomString(len: number): string {
  const length = len || 32;
  /**
   * @param { $chars 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1 }
   * @param { $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' }
   */
  const $chars = '0123456789';
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < length; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

/**
 * @todo 跳转函数
 * @param { url: string 要跳转的路由 }
 * @param { rest: 其他参数待补充 } 
 */

class Navigate {

  static navto = (url: string, ...rest: any[]) => {
    history.push(url);
  } 
}

export { 
  devConfig, 
  proConfig,
  mergeProps,
  formatOrderTime,
  isArrayFn,
  Navigate,
};

export default processChoiceFilter(devConfig, proConfig);