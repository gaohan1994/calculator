/**
 * created by Ghan 9.13
 * 
 * 首页
 * @todo 展示各个模块的入口
 */
import * as React from 'react';
import styles from './index.less';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { mergeProps } from '../common/config';
import { Stores } from '../store/index';
import history from '../history';
import { Input, Tooltip, Select, Table } from 'antd';
import { GetCompute, GetSelectedName } from '../store/home';
import { DispatchAbstract } from '../action/constants';
import BusinessController from '../action/business';
import { GetComputeParam } from '../action/business';
import config from '../common/config';
import { ColumnProps } from 'antd/lib/table';
import numeral from 'numeral';
import types from '../common/types';

const { Group, Search } = Input;
const { Option } = Select;

function formatNumber(value: any) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

class NumericInput extends React.Component<any, any> {
  onChange = (e: any) => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  }

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      onChange({ value: value.slice(0, -1) });
    }
    if (onBlur) {
      onBlur();
    }
  }

  render() {
    const { value } = this.props;
    const title = value ? (
      <span className="numeric-input-title">
        {value !== '-' ? formatNumber(value) : '-'}
      </span>
    ) : 'Input a number';
    return (
      <Tooltip
        trigger="focus"
        title={title}
        placement="topLeft"
        overlayClassName="numeric-input"
      >
        <Search
          onSearch={value => console.log(value)}
          enterButton={true}
          {...this.props}
          onChange={this.onChange}
          onBlur={this.onBlur}
          placeholder="Input a number"
          maxLength={25}
        />
      </Tooltip>
    );
  }
}

interface AppProps {
  dispatch: Dispatch;
  currentCompute: any;
  selectedName: string;
}

interface AppState {
  value: string;
}

class App extends React.Component<AppProps, AppState> {
  state = {
    value: '',
  };

  componentDidMount = () => {
    // this.fetchExchange();  
    this.fetchCompute(config.DEFAULT_FETCH_COMPUTE);
  }

  fetchExchange = async () => {
    const { dispatch } = this.props;
    const params: DispatchAbstract = { dispatch, param: {} };
    BusinessController.GetExchangeResult(params);
  }

  fetchCompute = async (name: string) => {
    const { dispatch } = this.props;
    const params: DispatchAbstract<GetComputeParam> = { dispatch, param: { name, compute: '1' } };
    BusinessController.GetCompute(params);
  }
  
  /**
   * @todo 跳转函数
   * @param { route } string
   *
   * @memberof App
   */
  public onNavHandle = (route: string) => {
    history.push(`${route}`);
  }

  public onChange = (value: string) => {
    this.setState({ value });
  }

  public changeSelected = (name: string) => {
    this.fetchCompute(`${name}`);
  }

  public render() {
    const { value } = this.state;
    const { selectedName, currentCompute } = this.props;
    console.log('currentCompute: ', currentCompute);
    console.log('selectedName: ', selectedName);

    const columns: ColumnProps<any>[] = [
      {
        title: '币种',
        dataIndex: 'name',
        // className: styles.header,
      },
      {
        title: '汇率',
        dataIndex: 'number',
        // className: styles.header,
      },
      {
        title: '计算后的金额（保留两位小数）',
        render: (item: any) => {
          return (<div>{numeral(item.number * numeral(value).value()).format('0.00')}</div>);
        }
      },
      {
        title: '查询时间',
        render: (item: any) => {
          return (<div>{`${item.date} ${item.time}`}</div>);
        }
      }
    ];
    return (
      <div className={styles.containerApp}>
        <div className={styles.input}>
          <Group compact={true} className={styles.group}>
            <Select value={selectedName} onChange={this.changeSelected}>
              {
                types && types.length > 0 ? (
                  types.map((type: any, key: number) => {
                    return (<Option key={`${key}`} value={type}>{type}</Option>);
                  })
                ) : ''
              }
            </Select>
            <NumericInput style={{ width: 400 }} value={this.state.value} onChange={this.onChange} />
          </Group>
        </div>
        <Table
          className={styles.table}
          columns={columns} 
          dataSource={currentCompute} 
          rowKey={(cumpute: any) => cumpute.name}
          // loading={loading}
          pagination={{ pageSize: 7 }}
          // onChange={this.onChangeHandle}
          size="middle"
        />
      </div>
    );
  }
}

const mapStateToProps = (state: Stores) => ({
  currentCompute: GetCompute(state),
  selectedName: GetSelectedName(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);
