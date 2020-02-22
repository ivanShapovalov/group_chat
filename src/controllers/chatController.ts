import { ChatEventApi, ChatEventConverter } from '../api';
import { MessagePostedEvent, ParticipantLeftEvent, ChatEvent } from '../model';

export class ChatController {
  constructor(private eventApi: ChatEventApi, private participant: string) {
  }
  
  sendMessage = (text: string) => {
    this.convertAndSend(MessagePostedEvent.new(this.participant, text));
  };
  
  leaveChat = () => {
    this.convertAndSend(ParticipantLeftEvent.new(this.participant));
  };

  private convertAndSend = (event: ChatEvent) => {
    const apiObject = ChatEventConverter.eventToApiObject(event);
    apiObject && this.eventApi.sendEvent(apiObject);
  };
}