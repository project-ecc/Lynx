import React, { Component } from 'react';
import $ from 'jquery';
import Sidebar from '../containers/Sidebar';
import BalanceBanner from '../containers/BalanceBanner';


const event = require('../utils/eventhandler');
//const splash = require('../../resources/images/splash-image.jpg');
const splash = require('../../resources/images/lynx_logo_large.png');

let lasttype = 'hide';


event.on('show', (message) => {
  if (lasttype === 'hide') {
    $('#snackMsg').text(message);
    $('.snack').css({ bottom: '-10px' });
    lasttype = 'show';
  }
});

event.on('hide', () => {
  if (lasttype === 'show') {
    $('#snackMsg').text('');
    $('.snack').css({ bottom: '-100px' });
    lasttype = 'hide';
  }
});

event.on('animate', (message) => {
  lasttype = 'animate';
  $('#snackMsg').text(message);

  $('.snack').stop().animate({
    bottom: '-10px'
  }, 500, () => {
    setTimeout(() => {
      $('.snack').stop().animate({
        bottom: '-100px'
      }, 500, () => {
        lasttype = 'hide';
      });
    }, 3500);
  });
});

export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      splash: true
    };
  }
  componentDidMount() {
    const self = this;
    setTimeout(() => {
      self.setState({ splash: false });
    }, 3000);
  }
  componentWillReceiveProps() {
  }
  render() {
    return (
      <div id="boot-override">
        <div className={`splash-image-container${this.state.splash ? '' : ' -disappear'}`}>
          <img className="splash-image" src={splash} />
        </div>
        <Sidebar route={this.props.route} />
        <BalanceBanner route={this.props.route} />
        <div className="my_wrapper">
          {this.props.children}
        </div>
        <div className="snack">
          <p id="snackMsg" />
        </div>
      </div>
    );
  }
}

