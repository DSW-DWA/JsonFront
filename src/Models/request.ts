export interface request {
    distribution: string;
      filters: {
        from: string;
        to: string;
        groups: {
          values: number[];
        };
    };
}