import { ChatEventApi } from './chatEventApi';


export class WindowMessagingBasedChatEventApi implements ChatEventApi {
  static TARGET_ORIGIN = window.location.origin;

  sendEvent(event: object | null) {
    if (event) {
      this.sendEventToOrigin(event, WindowMessagingBasedChatEventApi.TARGET_ORIGIN);
    }
  }

  subscribeToChatEvents(eventHandler: (data: object) => void): (event: any) => void {
    const subscription = (event: MessageEvent) => {
      if (event.origin === WindowMessagingBasedChatEventApi.TARGET_ORIGIN) {
        eventHandler(event.data);
      }
    };

    window.addEventListener('message', subscription);
    return subscription;
  }

  unsubscribeFromChatEvents(subscription: (event: any) => void) {
    window.removeEventListener('message', subscription);
  }

  sendEventToOrigin(event: object, origin: string) {
    window.postMessage(event, origin);
  }
}
