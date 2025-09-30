import React, { useEffect, useState } from "react";
import { getLogs } from "../api";

interface Log {
  address: string;
  timestamp: string;
  status: string;
  event: string;
}

const AccessHistory: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const logsData = await getLogs();
      setLogs(logsData);
    };
    fetchLogs();
  }, []);

  return (
    <div>
      <h3>Historial de Accesos</h3>
      <ul>
        {logs.map((log, idx) => (
          <li key={idx}>
            {log.timestamp} - {log.address} - {log.status} ({log.event})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccessHistory;
