import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'react-redux';

import store from './store';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Home from './home';

const container = document.getElementById('container');

function renderComponent(component) {
  ReactDOM.render(
    <div className="app">
      <Header />
      <Provider store={store}>{component}</Provider>
      <Footer />
    </div>
  , container,
  );
}

// if (process.env.NODE_ENV !== 'development' && window.ga) {
//   window.ga('send', 'pageview', location.pathname);
// }

function updateData(base) {
  return fetch(`http://api.fixer.io/latest?base=${base}`, {
    method: 'get',
  }).then(response => (
    response.json()
  ));
}

function getData() {
  return fetch('http://api.fixer.io/latest?base=GBP', {
    method: 'get',
  }).then(response => (
    response.json()
  )).then(data => <Home update={updateData} data={data} />);
}

function render() {
  getData().then(renderComponent);
}

render();
FastClick.attach(document.body);

