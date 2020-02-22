import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/application/app';
import './index.css';
import { WindowMessagingBasedChatEventApi } from './api/windowMessagingBasedChatEventApi';


document.addEventListener('DOMContentLoaded', () => {
  let eventApi = new WindowMessagingBasedChatEventApi();
  ReactDOM.render(<App chatEventApi={ eventApi }/>, document.getElementById('root'));
});
