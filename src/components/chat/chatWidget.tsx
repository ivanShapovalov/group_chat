import React from 'react';

import { ChatEvent } from '../../model';
import { ChatController } from '../../controllers/chatController';
import './chat.css';
import { ChatEventWidget } from './chatEventWidget';
import { ChatEventApi } from '../../api';

type Props = {
  chatEventEpi: ChatEventApi,
  currentParticipant: string;
  chatEvents: ChatEvent[];
};

export class ChatWidget extends React.Component<Props> {

  chatEventsWrapperElement?: HTMLDivElement;
  chatController: ChatController;
  
  constructor(props: Props) {
    super(props);
    this.chatController = new ChatController(props.chatEventEpi, props.currentParticipant);
  }

  handleMessageInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey) {
      e.preventDefault();
      this.chatController.sendMessage(e.currentTarget.value);
      e.currentTarget.value = '';
    }
  };

  renderSingleChatEvent = (chatEvent: ChatEvent) => {
    const { currentParticipant } = this.props;
    return <ChatEventWidget key={ chatEvent.timestamp + '_'+ chatEvent.originator }
                            ownEvent={ currentParticipant === chatEvent.originator }
                            chatEvent={ chatEvent }/>
  };

  setRef = (element: HTMLDivElement) => {
    if (element) {
      this.chatEventsWrapperElement = element;
    }
  };

  scrollToBottom = () => {
    if (this.chatEventsWrapperElement) {
      this.chatEventsWrapperElement.scrollTop = this.chatEventsWrapperElement.scrollHeight;
    }
  };

  componentDidMount() {
    setTimeout(this.scrollToBottom, 0);
  }

  componentDidUpdate() {
    setTimeout(this.scrollToBottom, 0);
  }

  render() {
    const { chatEvents, currentParticipant } = this.props;

    return (
      <div className="chatWrapper">
        <div className="chatInnerContainer">
          <div className="chatHeader">
            <div>Team chat: { currentParticipant }</div>
            <button onClick={ this.chatController.leaveChat }>Leave</button>
          </div>
          <div ref={ this.setRef } className="chatEventsWrapper">
            { chatEvents.map(this.renderSingleChatEvent) }
          </div>
          <div className="messageInputWrapper">
            <textarea onKeyDown={ this.handleMessageInputKeyDown }
                      className="messageInput"
                      placeholder="Type message and press Shift+Enter to send"
                      autoFocus={ true }
            />
          </div>
        </div>
      </div>
    )
  }
}

