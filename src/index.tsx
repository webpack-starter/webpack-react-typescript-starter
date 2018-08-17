import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';

interface H {
  p: string,
  f: () => (boolean | string | number)[],
}
let o: H = {
  p: '1234',
  f() {
    return [true, false, 123, '123']
  }
}

const App = () => {
  return (
    <div className={styles.main}>
      go - {o.p}
      <div className={styles.info}>run...</div>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
