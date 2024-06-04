export interface Session {
    _id: string;
    userId: string;
    messages: Message[];
  }
  
  export interface Message {
    _id: string;
    content: string;
    type: 'user' | 'bot';
    timestamp: Date;
  }