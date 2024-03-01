export interface Rating {
    name: string;
    request: Request;
    total: number;
    records: {
      [date: string]: {
        bad: number;
        chats: number;
        good: number;
      };
    };
  }
  