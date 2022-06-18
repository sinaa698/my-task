import { ReactFC } from "../../../utils/types";
import "./transaction.css";

const Transaction: ReactFC<{}> = () => {
  return (
    <div className="transaction-container">
      <span className="transaction-container__price">10</span>
      <div className="description">
        <span className="description__date">1400/2</span>
        <span className="description__type">خسارت</span>
      </div>
    </div>
  );
};

export default Transaction;
