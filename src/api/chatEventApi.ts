/**
 * NOTE! The are no dependencies to domain models by design in interface methods signatures.
 */
export interface ChatEventApi {
  sendEvent(event: object): void;
  subscribeToChatEvents(eventHandler: (data: object) => void): (event: any) => void;
  unsubscribeFromChatEvents(subscription: (event: any) => void): void;
}