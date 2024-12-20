import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import TodoApp from "./Todo";
import Login from "./logins/login";
import Register from "./logins/register";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<TodoApp /> } />
      </Routes>
    </Router>
  );
}

export default App;
