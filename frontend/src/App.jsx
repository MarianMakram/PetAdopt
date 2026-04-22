import { useState } from "react";
import Layout from "./components/Login"; 

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <Layout
      activePage={activePage}
      setActivePage={setActivePage}
    />
  );
}

export default App;
