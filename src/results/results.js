import React, { Component } from "react";

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    width: "100%",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    width: "100%",
  },
  teamSection: {
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  teamHeader: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#e3e7ff",
    borderBottom: "2px solid #ccc",
  },
  teamImage: {
    width: "60px",
    height: "60px",
    marginRight: "20px",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  teamImageHover: {
    transform: "scale(1.1)",
  },
  teamName: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#222",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#f0f0f0",
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
    fontSize: "16px",
    fontWeight: "600",
  },
  td: {
    padding: "12px",
    fontSize: "14px",
    color: "#444",
    borderBottom: "1px solid #eee",
  },
};

export default class Results extends Component {
  handleImageError = (e) => {
    e.currentTarget.src = "/images/default-team.png";
  };

  render() {
    const teams = JSON.parse(localStorage.getItem("teams") || "[]");
    const table = teams.map((team, teamIndex) => {
      const players = team.players.map((player, playerIndex) => (
        <tr key={playerIndex}>
          <td style={styles.td}>{player.name}</td>
        </tr>
      ));

      const imageUrl = `/images/team-img/${team.name.replace(/\s+/g, "")}.png`;

      return (
        <div key={teamIndex} style={styles.teamSection}>
          <div style={styles.teamHeader}>
            <img
              src={imageUrl}
              alt={`${team.name} logo`}
              style={styles.teamImage}
              onError={this.handleImageError}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
            <h2 style={styles.teamName}>{team.name}</h2>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Player</th>
              </tr>
            </thead>
            <tbody>{players}</tbody>
          </table>
        </div>
      );
    });

    return (
      <div style={styles.container}>
        <h1 style={styles.header}>Team Results</h1>
        {table.length > 0 ? (
          <div style={styles.gridContainer}>{table}</div>
        ) : (
          <p style={{ textAlign: "center", color: "#888", fontSize: "18px" }}>
            No teams found. Please add teams to view results.
          </p>
        )}
      </div>
    );
  }
}