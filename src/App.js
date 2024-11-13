import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navBar/Navbar";
import Profile from "./components/profile/Profile";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LeaderBoards from "./components/leaderboards/LeaderBoards";
import Tournaments from "./components/tournaments/Tournaments";

function App() {
  return (
    <>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboards" element={<LeaderBoards />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/" element={<Profile />} /> {/* Default route */}
        </Routes>
      </div>
    </>
  );
}

export default App;
