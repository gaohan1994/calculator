
import React, { Component } from 'react';
import { Layout, Spin } from 'antd';
import config, { mergeProps } from '../common/config';
import styles from './index.less';
import { Stores } from '../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { GetLoading } from '../store/status';

const { Header, Content } = Layout;

interface LayoutPageProps {
  loading?: boolean;
}

class LayoutPage extends Component<LayoutPageProps, {}> {
  render() {
    const { loading } = this.props;
    return (
      <div className={styles.container}>
        <Layout className={styles.container}>
          <Header style={{color: '#ffffff'}}>{config.CALCULATOR_DETAIL.name}</Header>
          <Content>
            <Spin 
              style={{height: document && document.documentElement && document.documentElement.clientHeight
                ? document && document.documentElement && document.documentElement.clientHeight - 64 : '100%'}} 
              size="large" 
              spinning={loading} 
            >
              {this.props.children}
            </Spin>
          </Content>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state: Stores) => ({
  loading: GetLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(LayoutPage);
