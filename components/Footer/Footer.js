import React from 'react';
import s from './Footer.css';

function Footer() {
  return (
    <footer className={s.footer} role="contentinfo">
      <span className={s.copyright}>© Wicked currency converter</span>
    </footer>
  );
}

export default Footer;
