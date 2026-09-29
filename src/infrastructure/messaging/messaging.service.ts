export interface EventMessage<T = unknown> {
  topic: string;
  payload: T;
  timestamp: Date;
}

export class MessagingService {
  async publish<T>(topic: string, payload: T): Promise<void> {
    console.log(`[Messaging] Published event to ${topic}:`, payload);
  }

  async subscribe(topic: string, _handler: (data: unknown) => void): Promise<void> {
    console.log(`[Messaging] Subscribed to ${topic}`);
  }
}
