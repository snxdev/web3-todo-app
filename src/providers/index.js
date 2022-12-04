import { ethers } from "ethers";
import { contractAddress, abi } from "../constants";
import { useState, useEffect, createContext } from "react";

export const EthContext = createContext();

const ethereum = window?.ethereum;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const TodoContract = new ethers.Contract(contractAddress, abi, signer);

const EthProvider = (props) => {
  const [pending, setPending] = useState([]);
  const [todos, setTodos] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const count = await TodoContract.taskCount();
      let todoItems = [];
      for (let i = 1; i <= count; i++) {
        const task = await TodoContract.tasks(i);
        todoItems.push({
          id: task[0].toNumber(),
          content: task[1],
          completed: task[2],
        });
      }
      setTodos(todoItems);
    };

    // FIXME code repeat ?
    const connectWallet = async () => {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
      if (todos.length < 1) getTodos();
    };

    if (walletAddress === "") connectWallet();
    getTodos();

    TodoContract.on("TaskCreated", () => {
      getTodos();
      setPending("");
    });

    TodoContract.on("TaskCompleted", () => {
      getTodos();
      setPending("");
    });

    return () => {
      TodoContract.off("TaskCreated");
      TodoContract.off("TaskCompleted");
    };
  }, []);

  // FIXME code repeat ?
  const connectWalletHandler = async () => {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts) {
      const count = await TodoContract.taskCount();
      let todoItems = [];
      for (var i = 1; i <= count; i++) {
        const task = await TodoContract.tasks(i);
        todoItems.push({
          id: task[0].toNumber(),
          content: task[1],
          completed: task[2],
        });
      }
      setTodos(todoItems);
    }
    setWalletAddress(accounts[0]);
  };

  const createTodoHandler = async (content) => {
    const transaction = await TodoContract?.createTask(content);
    setPending(transaction?.hash);
  };

  const toggleCompleteHandler = async (id) => {
    const transaction = await TodoContract.toggleCompleted(id);
    setPending(transaction?.hash);
  };

  const value = {
    walletAddress: walletAddress,
    todos: todos,
    pending: pending,
    connectWallet: connectWalletHandler,
    createTodo: createTodoHandler,
    toggleComplete: toggleCompleteHandler,
  };

  return (
    <EthContext.Provider value={value}>{props.children}</EthContext.Provider>
  );
};

export default EthProvider;
