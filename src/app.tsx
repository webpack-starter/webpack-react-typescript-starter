import React, { PureComponent } from 'react';
import styles from './app.less';


type PageOwnProps = {}

type PageState = {}


export default class App extends PureComponent<PageOwnProps, PageState> {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.info}>run...</div>
      </div>
    );
  }
}
