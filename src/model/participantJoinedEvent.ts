import { ChatEvent } from './chatEvent';
import { ChatEventType } from './chatEventType';

export class ParticipantJoinedEvent extends ChatEvent {

  static new(originator: string, timestamp?: number): ParticipantJoinedEvent {
    const time = timestamp || new Date().getTime();
    return new ParticipantJoinedEvent(originator, time, ChatEventType.PARTICIPANT_JOINED);
  }

}