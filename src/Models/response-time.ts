export interface ResponseTime {
    name: string;
    request: Request;
    total: number;
    records: {
        [date: string]: {
        count: number;
        responseTime: number;
        };
    };
}
  