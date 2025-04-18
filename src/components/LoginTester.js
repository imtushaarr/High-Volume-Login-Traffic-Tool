// src/components/LoginTester.js
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import users from "../mock/mockUsers"; // Array of 50 users { email, password }

const LoginTester = () => {
  const [results, setResults] = useState([]);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleTest = async () => {
    const testResults = [];

    for (const user of users) {
      const { email, password } = user;
      const startTime = performance.now();
      let status = "✅ Success";
      let mode = "🔄 Logged In";

      try {
        // Try to create user
        await createUserWithEmailAndPassword(auth, email, password);
        mode = "🆕 Created";
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          // Already exists, try logging in
          try {
            await signInWithEmailAndPassword(auth, email, password);
          } catch (loginErr) {
            status = "❌ Failed";
            mode = "⚠️ Login Failed";
          }
        } else {
          status = "❌ Failed";
          mode = "⚠️ Signup Failed";
        }
      }

      const latency = (performance.now() - startTime).toFixed(2);
      testResults.push({
        email,
        status,
        latency: `${latency} ms`,
        timestamp: new Date().toLocaleTimeString(),
        mode,
      });

      setResults([...testResults]);
      await delay(300); // Add delay to avoid Firebase rate limits
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2>🔐 EMS Login Test</h2>
      <button onClick={handleTest}>🚀 Start Login + Signup Test</button>
      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Latency</th>
            <th>Mode</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {results.map((res, index) => (
            <tr key={index}>
              <td>{res.email}</td>
              <td>{res.status}</td>
              <td>{res.latency}</td>
              <td>{res.mode}</td>
              <td>{res.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoginTester;