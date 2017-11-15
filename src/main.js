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

const array = [1, 2, [3, [[4], 5]], 6];
const object = { hello: 1, world: [2, 3, { foo: [[4]] }] };
function flatten(obj) {
  if (typeof obj === 'object') {
    let asArray = [];

    Object.keys(obj).forEach((key) => {
      const flat = flatten(obj[key]);

      if (flat.length) {
        asArray = asArray.concat(flat);
      } else {
        asArray.push(flat);
      }
    });
    return asArray;
  } else if (obj.length) {
    const flatArray = obj.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
    return flatArray;
  }

  return obj;
}

console.log(flatten(array));

render();
FastClick.attach(document.body);

