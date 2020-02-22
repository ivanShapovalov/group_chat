import React from 'react';
import { ChatEvent, MessagePostedEvent, ParticipantJoinedEvent, ParticipantLeftEvent } from '../../model';


type Props = {
  chatEvent: ChatEvent;
  ownEvent: boolean;
};

const formDateAndTimeString = (timestamp: number): string => {
  const dateAndTime = new Date(timestamp);
  const minutes = dateAndTime.getMinutes();
  return `${dateAndTime.getHours()}:${minutes < 10 ? ('0' + minutes) : minutes}`
};

function MessageWidget(props: Props) {
  const chatEvent = props.chatEvent as MessagePostedEvent;
  const dateAndTimeString = formDateAndTimeString(chatEvent.timestamp);
  const className = props.ownEvent ? "ownMessage" : "othersMessage";

  return (
    <div className={ className }>
      <div className="chatEvent">
        <div>
          <b>{ chatEvent.originator }</b> &nbsp;&nbsp; <i>{ dateAndTimeString }</i>
        </div>
        <div>{ chatEvent.messageText }</div>
      </div>
    </div>
  );
}
function ParticipantJoinedWidget(props: Props) {
  const chatEvent = props.chatEvent;
  return <div className="joinedEventWrapper">{ chatEvent.originator } joined</div>;
}
function ParticipantLeftWidget(props: Props) {
  const chatEvent = props.chatEvent;
  return <div className="leftEventWrapper">{ chatEvent.originator } left</div>;
}

export function ChatEventWidget(props: Props) {
  const chatEvent = props.chatEvent;

  let chatEventWidget = null;
  if (chatEvent instanceof MessagePostedEvent) {
    chatEventWidget = <MessageWidget { ...props }/>;
  } else if (chatEvent instanceof ParticipantJoinedEvent) {
    chatEventWidget = <ParticipantJoinedWidget { ...props }/>;
  } else if (chatEvent instanceof ParticipantLeftEvent) {
    chatEventWidget = <ParticipantLeftWidget { ...props }/>;
  }
  return chatEventWidget;
}