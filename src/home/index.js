import React, { PropTypes } from 'react';
import cx from 'classnames';
import { TweenMax } from 'gsap';

import Layout from '../../components/Layout';
import s from './styles.css';

class HomePage extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      base: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      rates: PropTypes.objectOf(PropTypes.number).isRequired,
    }),
    update: PropTypes.func,
  };

  state = {
    data: this.props.data,
    base: this.props.data.base,
    target: '',
    amount: '',
    result: '',
  }

  setTarget(e) {
    const value = e.target.value;
    this.setState({ target: value }, () => {
      if (this.state.amount) this.displayAmount();
    });
  }

  setBase(e) {
    const value = e.target.value;
    this.props.update(value).then((newData) => {
      this.setState({
        data: newData,
        base: newData.base,
      });
    });
  }

  clear(e) {
    e.preventDefault();

    TweenMax.to(`.${s.buttonClear}`, 0.4, { opacity: 0 });
    TweenMax.to(`.${s.ratesList}`, 0.4, { opacity: 1 });

    this.setState({
      result: '',
      amount: '',
    });
  }

  switchCurrency(e) {
    e.preventDefault();

    if (!this.state.target) return;

    const newBase = this.state.target;
    const newTarget = this.state.base;

    this.props.update(newBase).then((newData) => {
      this.setState({
        data: newData,
        base: newData.base,
        target: newTarget,
      });

      if (this.state.amount) this.displayAmount();
    });
  }

  updateAmount(e) {
    const value = e.target.value;

    if (isNaN(value) || value > 100000000000) return;

    if (!this.state.target) {
      TweenMax.to(`.${s.selectTarget}`, 0.4, { borderColor: '#ee2e5b', borderWidth: 2 });
      return;
    }

    const opacityVal = (value > 0) ? 0.2 : 1;

    TweenMax.to(`.${s.buttonClear}`, 0.4, { opacity: 1 });
    TweenMax.to(`.${s.selectTarget}`, 0.4, { borderColor: '#444444', borderWidth: 1 });
    TweenMax.to(`.${s.ratesList}`, 0.4, { opacity: opacityVal });

    this.setState({ amount: value });
    this.displayAmount();
  }

  displayAmount() {
    const targetValue = this.state.data.rates[this.state.target];

    let culcAmount = this.state.amount * targetValue;
    culcAmount = Math.floor(culcAmount * (10 ** 2)) / (10 ** 2);

    // add currency symbol
    culcAmount = culcAmount.toLocaleString(undefined, { style: 'currency', currency: this.state.target });

    this.setState({
      result: culcAmount,
    });
  }

  render() {
    const data = this.state.data;
    return (
      <Layout className={s.content}>
        <main className={s.main} id="main" role="main">
          <p className={s.date}>{data.date.replace(/-/g, '.')}</p>

          <article className={s.content} id="content">
            <form className={s.form}>

              <div className={s.base}>
                <p className={cx(s.contentHead, s.contentHeadBase)}>Base currency</p>
                <select
                  className={s.selectBase}
                  value={this.state.base}
                  onChange={e => this.setBase(e)}
                >
                  <option value={this.state.base}>{this.state.base}</option>,
                  {Object.keys(data.rates).map(key =>
                    <option value={key} key={key.toLowerCase()}>{key}</option>,
                  )}
                </select>
              </div>


              <button
                className={cx(s.switch, this.state.target ? s.switchActive : null)}
                onClick={e => this.switchCurrency(e)}
              >
                Switch
              </button>


              <div className={s.target}>
                <p className={s.contentHead}>Target currency</p>
                <select
                  className={s.selectTarget}
                  value={this.state.target}
                  onChange={e => this.setTarget(e)}
                >
                  <option value={''}>---</option>,
                  {Object.keys(data.rates).map(key =>
                    <option value={key} key={key.toLowerCase()}>{key}</option>,
                  )}
                </select>
              </div>


              <div className={s.amount}>
                <span className={s.baseAmount}>{this.state.base}</span>
                <input
                  className={s.inputAmount}
                  type="text"
                  value={this.state.amount}
                  placeholder="enter the amount"
                  onChange={e => this.updateAmount(e)}
                />


                <button className={s.buttonClear} onClick={e => this.clear(e)}>Clear</button>
              </div>

              <p className={s.result}>{this.state.result}</p>
            </form>


            <div className={s.ratesList}>
              {Object.keys(data.rates).map(key =>
                <div
                  className={cx(s.ratesItem, this.state.target === key ? s.ratesItemActive : null)}
                  key={key.toLowerCase()}
                >
                  <p className={s.country}>{key}</p>
                  <p className={s.rate}>{this.state.data.rates[key]}</p>
                </div>,
              )}
            </div>

          </article>
        </main>
      </Layout>
    );
  }

}

export default HomePage;
