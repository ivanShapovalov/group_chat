import React from 'react';

import { ChatEventApi } from '../../api';
import { AppController } from '../../controllers/appController';
import { AppState } from '../../appState';
import { AddParticipant } from './addParticipant';
import { ChatWidget } from '../chat/chatWidget';

import './app.css';


type Props = {
  chatEventApi: ChatEventApi
};

export class App extends React.Component<Props, AppState> {

  appController: AppController;
  state: AppState = {
    chatParticipants: [],
    chatEvents: []
  };

  constructor(props: Props) {
    super(props);
    this.appController = new AppController(
      props.chatEventApi, () => this.state, (newState: AppState) => this.setState({ ...newState })
    );
  }

  componentDidMount(): void {
    this.appController.subscribeToChatEvents();
  }

  componentWillUnmount(): void {
    this.appController.unsubscribeFromChatEvents();
  }

  renderParticipantView = (participant: string) => {
    return <ChatWidget key={ participant }
                       chatEventEpi={ this.props.chatEventApi }
                       currentParticipant={ participant }
                       chatEvents={ this.state.chatEvents }/>;
  };

  render() {
    const { chatParticipants } = this.state;

    return (
      <div className="app">
        <div className="appHeader">
          <div className="welcomeMessage">Welcome to the chat!</div>

          <AddParticipant
            participants={ chatParticipants }
            addParticipantToChat={ this.appController.addParticipant }
          />
        </div>

        {
          chatParticipants.length
            ? <div className="chatsWrapper">{ chatParticipants.map(this.renderParticipantView) }</div>
            : null
        }
      </div>
    );
  }
}

export default App;
