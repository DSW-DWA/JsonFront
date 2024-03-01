export interface TotalChats {
    name: string;
    request: Request;
    total: number;
    records: {
      [date: string]: {
        total: number;
      };
    };
  }
  