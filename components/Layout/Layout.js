import React, { PropTypes } from 'react';
import cx from 'classnames';
import { TweenMax } from 'gsap';
import s from './Layout.css';

class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    const { ...props } = this.props;

    return (
      <div className="layout">
        <div {...props} className={cx(s.content, this.props.className)} />
      </div>
    );
  }
}

export default Layout;
