/**
 * btn组件
 * @author ronffy
 */
import React, { PureComponent } from 'react';
import styles from './index.less';

export default class Btn extends PureComponent {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.btn}>
          我是btn1组件
        </div>
      </div>
    )
  }
}