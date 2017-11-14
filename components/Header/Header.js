import React, { PropTypes } from 'react';
import s from './Header.css';

class Header extends React.Component {

  render() {
    return (
      <header className={s.header} id="header" role="banner">
        <h1 className={s.headerTitle}>Wicked Currency Converter</h1>
      </header>
    );
  }

}

export default Header;
