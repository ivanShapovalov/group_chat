import { ChatEvent } from './chatEvent';
import { ChatEventType } from './chatEventType';

export class ParticipantLeftEvent extends ChatEvent {

  static new(originator: string, timestamp?: number): ParticipantLeftEvent {
    const time = timestamp || new Date().getTime();
    return new ParticipantLeftEvent(originator, time, ChatEventType.PARTICIPANT_LEFT);
  }

}