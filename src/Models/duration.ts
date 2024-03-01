export interface Duration {
    name: string;
    request: Request;
    total: number;
    records: {
      [date: string]: {
        agentsChattingDuration: number;
        count: number;
        duration: number;
      };
    };
  }