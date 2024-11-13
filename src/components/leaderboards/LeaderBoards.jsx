import React, { useState, useEffect } from "react";
import "./leaderboard.css";

function LeaderBoards() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://lichess.org/api/top/players?nb=10"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
        const data = await response.json();
        setLeaders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboards();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Top Players Leaderboard</h2>

      {loading && <p>Loading leaderboard...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="leaderboard-cards">
        {leaders.map((leader) => (
          <div key={leader.id} className="leaderboard-card">
            <h3>{leader.username}</h3>
            <p>
              <strong>Title:</strong> {leader.title || "N/A"}
            </p>

            <div className="leaderboard-ratings">
              {leader.perfs && (
                <>
                  <div className="rating-card">
                    <h4>Blitz</h4>
                    <p>
                      <strong>Rating:</strong>{" "}
                      {leader.perfs.blitz ? leader.perfs.blitz.rating : "N/A"}
                    </p>
                  </div>
                  <div className="rating-card">
                    <h4>Rapid</h4>
                    <p>
                      <strong>Rating:</strong>{" "}
                      {leader.perfs.rapid ? leader.perfs.rapid.rating : "N/A"}
                    </p>
                  </div>
                  <div className="rating-card">
                    <h4>Classical</h4>
                    <p>
                      <strong>Rating:</strong>{" "}
                      {leader.perfs.classical
                        ? leader.perfs.classical.rating
                        : "N/A"}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderBoards;
