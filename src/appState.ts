import { ChatEvent } from './model';


export type AppState = {
  chatParticipants: string[];
  chatEvents: ChatEvent[];
}