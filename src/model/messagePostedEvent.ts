import { ChatEvent } from './chatEvent';
import { ChatEventType } from './chatEventType';

export class MessagePostedEvent extends ChatEvent {

  private constructor(
    originator: string,
    timestamp: number,
    private readonly _messageText: string
  ) {
    super(originator, timestamp, ChatEventType.MESSAGE);
  }

  get messageText(): string {
    return this._messageText;
  }

  static new(author: string, messageText: string, timestamp?: number): MessagePostedEvent {
    const time = timestamp || new Date().getTime();
    return new MessagePostedEvent(author, time, messageText);
  }
}