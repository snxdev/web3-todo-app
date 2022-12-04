import { useContext } from "react";
import Header from "./views/Header";
import { EthContext } from "./providers";
import TodosList from "./views/TodosList";
import TodoInput from "./views/TodoInput";
import TransactionStatus from "./views/TransactionStatus";

function App() {
  const { walletAddress } = useContext(EthContext);

  return (
    <div>
      <Header />
      <div className="container d-flex flex-column align-items-center justify-content-center">
        {walletAddress !== "" ? (
          <>
            <TransactionStatus />
            <div className="card p-3 w-100">
              <TodoInput />
              <TodosList />
            </div>
          </>
        ) : (
          <div className="alert alert-danger my-3" role="alert">
            Connect Your Wallet
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
