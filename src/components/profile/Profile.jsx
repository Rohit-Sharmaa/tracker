import React, { useState } from "react";
import "./profile.css";

function Profile() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFetchUserData = async () => {
    if (!username) {
      alert("Please enter a username");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://lichess.org/api/user/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-input-box">
        <label className="input-label">Username:</label>
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          className="input-field"
          placeholder="Enter your username"
        />
      </div>
      <button onClick={handleFetchUserData} className="fetch-button">
        Fetch User Data
      </button>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {userData && (
        <div className="user-data">
          <h3>User Data:</h3>
          <div className="card">
            <h4>Username: {userData.username}</h4>
            <p>
              <strong>Total Games Played:</strong> {userData.count.all}
            </p>
          </div>

          {/* Blitz, Rapid, and Classical Card */}
          <div className="game-stats-cards">
            {["blitz", "rapid", "classical"].map((gameType) => {
              const game = userData.perfs[gameType];
              return (
                <div key={gameType} className="card">
                  <h5>
                    {gameType.charAt(0).toUpperCase() + gameType.slice(1)}:
                  </h5>
                  <p>
                    <strong>Games Played:</strong> {game.games}
                  </p>
                  <p>
                    <strong>Rating:</strong> {game.rating}
                  </p>
                </div>
              );
            })}
          </div>

          <p>
            <strong>Profile URL:</strong>{" "}
            <a href={userData.url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default Profile;
