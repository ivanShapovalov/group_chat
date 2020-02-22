import { ChatEventApi, ChatEventConverter } from '../api';
import { AppState } from '../appState';
import { ParticipantJoinedEvent, ParticipantLeftEvent } from '../model';


export class AppController {

  private _chatEventsSubscription?: (event: any) => void;

  constructor(
    private eventApi: ChatEventApi,
    private getState: () => AppState,
    private updateState: (appState: AppState) => void
  ) {
  }

  subscribeToChatEvents = () => {
    if (this._chatEventsSubscription) {
      throw new Error('application is already subscribed to chat events');
    }

    this._chatEventsSubscription = this.eventApi.subscribeToChatEvents(this.processEventData);
  };

  unsubscribeFromChatEvents = () => {
    if (!this._chatEventsSubscription) {
      throw new Error('application is not yet subscribed to chat events');
    }
    this.eventApi.unsubscribeFromChatEvents(this._chatEventsSubscription);
  };

  addParticipant = (newParticipantNickname: string) => {
    const chatEvent = ParticipantJoinedEvent.new(newParticipantNickname);
    const apiObject = ChatEventConverter.eventToApiObject(chatEvent);
    apiObject && this.eventApi.sendEvent(apiObject);
  };

  private processEventData = (eventData: any) => {
    const event = ChatEventConverter.apiObjectToEvent(eventData);

    // Kind of micro reducer
    if (event) {
      const state = this.getState();
      const participants = state.chatParticipants;

      state.chatEvents.push(event);
      if (event instanceof ParticipantJoinedEvent) {
        participants.push(event.originator);
      } else if (event instanceof ParticipantLeftEvent) {
        state.chatParticipants = participants.filter(participant => participant !== event.originator);
      }

      this.updateState(state);
    }
  };
}