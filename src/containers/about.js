import React, { PureComponent } from 'react';
import { Btn } from 'components';
import { request, config } from 'utils';
const { apis } = config;

export default class About extends PureComponent {
  state = {
    list: [],
    error: '',
  }
  componentDidMount() {
    request(apis.exam)
    .then(res => {
      this.setState({
        list: res.data
      })
    })
    .catch(error => {
      this.setState({
        error: error.statusText,
      })
    })
  }
  render() {
    const { error, list } = this.state;
    return (
      <div>
        {
          error
          ? <div>== 报错了 ==</div>
          : (
            <div>
              关于我组件
              <Btn />
              ---------------------------
              {
                  list.map(item => <p key={item.questionId}>{item.questionContent}</p>)
              }
              ---------------------------
            </div>
          )
        }
      </div>
    )
  }
}
