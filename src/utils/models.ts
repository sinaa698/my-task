export type Transaction = {
  trip_financials?: TripFinancial[];
  payments?: Payment[];
  misc_expenses?: MiscExpense[];
  concurrency_costs?: ConcurrencyCost[];
};

export type ConcurrencyCost = {
  id: number;
  created_at: Date;
  amount: number;
  start_date: Date;
  end_date: Date;
};

export type MiscExpense = {
  id: number;
  title: string;
  created_at: Date;
  amount: number;
};

export type Payment = {
  id: number;
  datetime: Date;
  amount: number;
  description: string;
};

export type TripFinancial = {
  id: number;
  request_datetime: Date;
  driver: string;
  final_price: number;
  source_title: string;
  hub: Hub;
};

export type Hub = {
  id: number;
  title: string;
};
