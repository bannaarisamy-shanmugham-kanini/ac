import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { AppRouter } from "./app/router";
import { rehydrateStore } from "./store/rehydrate";
import { initZustandPersistence } from "./store/persistToIndexedDB";

function App() {
  const [count, setCount] = useState(0);
  // useEffect(() => {
  //   rehydrateStore();
  //   initZustandPersistence();
  // }, []);

  return <AppRouter />;
}

export default App;
