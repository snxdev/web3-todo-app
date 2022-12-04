import { useContext } from "react";
import { EthContext } from "../providers";

const TransactionStatus = () => {
  const { pending } = useContext(EthContext);

  if (pending !== "")
    return (
      <div className="alert alert-primary w-100 my-2" role="alert">
        Pending Transaction: {pending}
      </div>
    );

  return null;
};

export default TransactionStatus;
