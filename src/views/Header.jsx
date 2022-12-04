import { useContext } from "react";
import { EthContext } from "../providers";

const Header = () => {
  const { connectWallet, walletAddress } = useContext(EthContext);

  const connectWalletHandler = () => {
    connectWallet();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">D-TODO</span>
        <div className="d-flex">
          {walletAddress !== "" ? (
            <span className="badge bg-success">
              Wallet Connected: {walletAddress}
            </span>
          ) : (
            <button
              className="btn btn-primary"
              type="submit"
              onClick={connectWalletHandler}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
