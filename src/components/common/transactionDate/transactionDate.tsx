import "./transactionDate.css";
type Props = {
  date: string;
};

const TransactionDate = ({ date }: Props) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const d = new Date(date);
  return (
    <div className="date">
      <span>{`${d.toLocaleDateString("fa-IR", {
        weekday: "long",
      })} ${d.toLocaleDateString("fa-IR", {
        day: "numeric",
      })} ${d.toLocaleDateString("fa-IR", {
        month: "short",
      })} ${d.toLocaleDateString("fa-IR", { year: "numeric" })}`}</span>
    </div>
  );
};

export default TransactionDate;
