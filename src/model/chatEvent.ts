import { ChatEventType } from './chatEventType';

export abstract class ChatEvent {

  protected constructor(
    private readonly _originator: string,
    private readonly _timestamp: number,
    private readonly _type: ChatEventType
  ) {
  }

  get originator(): string {
    return this._originator;
  }

  get timestamp(): number {
    return this._timestamp;
  }

  get type(): ChatEventType {
    return this._type;
  }
}