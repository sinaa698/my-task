export interface Transaction {
  trip_financials?: TripFinancial[];
  payments?: Payment[];
  misc_expenses?: MiscExpense[];
  concurrency_costs?: ConcurrencyCost[];
}

export interface ConcurrencyCost {
  id: number;
  created_at: Date;
  amount: number;
  start_date: Date;
  end_date: Date;
}

export interface MiscExpense {
  id: number;
  title: string;
  created_at: Date;
  amount: number;
}

export interface Payment {
  id: number;
  datetime: Date;
  amount: number;
  description: string;
}

export interface TripFinancial {
  id: number;
  request_datetime: Date;
  driver: string;
  final_price: number;
  source_title: string;
  hub: Hub;
}

export interface Hub {
  id: number;
  title: string;
}
