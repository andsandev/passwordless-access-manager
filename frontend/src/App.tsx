import React, { useState } from "react";
import Login from "./components/Login";
import AccessHistory from "./components/AccessHistory";

const App: React.FC = () => {
  const [status, setStatus] = useState<string>("");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Passwordless Access Manager</h1>
      <Login onStatus={setStatus} />
      {status && <p>Estado: {status}</p>}
      <AccessHistory />
    </div>
  );
};

export default App;
