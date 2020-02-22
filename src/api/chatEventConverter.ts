import {
  ChatEvent, ChatEventType, MessagePostedEvent, ParticipantJoinedEvent, ParticipantLeftEvent
} from '../model';


/**
 * The purpose of this class is to convert domain entities to what api operates with and wise versa.
 */
export class ChatEventConverter {
  static eventToApiObject(chatEvent: ChatEvent): object | null {
    const apiObject = { type: chatEvent.type, originator: chatEvent.originator, timestamp: chatEvent.timestamp };

    if (chatEvent.type === ChatEventType.MESSAGE) {
      Object.assign(apiObject, { text: (chatEvent as MessagePostedEvent).messageText })
    }

    return apiObject;
  }

  static apiObjectToEvent(apiEventData: any): ChatEvent | null {
    if (!apiEventData) {
      return null;
    }

    let chatEvent = null;
    switch (apiEventData.type) {
      case ChatEventType.MESSAGE:
        chatEvent = MessagePostedEvent.new(apiEventData.originator, apiEventData.text, apiEventData.timestamp);
        break;
      case ChatEventType.PARTICIPANT_JOINED:
        chatEvent = ParticipantJoinedEvent.new(apiEventData.originator, apiEventData.timestamp);
        break;
      case ChatEventType.PARTICIPANT_LEFT:
        chatEvent = ParticipantLeftEvent.new(apiEventData.originator, apiEventData.timestamp);
        break;
    }
    return chatEvent;
  }
}