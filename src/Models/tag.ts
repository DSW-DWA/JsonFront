export interface Tag {
    name: string;
    request: Request;
    total: number;
    records: {
      [date: string]: {
        [tag: string]: string;
      };
    };
  }
  