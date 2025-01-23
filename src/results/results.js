import React, { Component } from "react";

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    maxWidth: "900px",
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
  teamSection: {
    borderRadius: "10px",
    marginBottom: "30px",
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
  totalRow: {
    fontWeight: "bold",
    backgroundColor: "#f7f7f7",
    color: "#222",
  },
  tooltip: {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
  },
  tooltipText: {
    visibility: "hidden",
    width: "120px",
    backgroundColor: "#555",
    color: "#fff",
    textAlign: "center",
    borderRadius: "5px",
    padding: "5px 0",
    position: "absolute",
    zIndex: "1",
    bottom: "125%",
    left: "50%",
    marginLeft: "-60px",
    opacity: 0,
    transition: "opacity 0.3s",
  },
  tooltipTextVisible: {
    visibility: "visible",
    opacity: 1,
  },
};

export default class Results extends Component {
  handleImageError = (e) => {
    e.currentTarget.src = "/images/default-team.png";
  };

  render() {
    const teams = JSON.parse(localStorage.getItem("teams") || "[]");
    const table = teams.map((team, teamIndex) => {
      let total = 0;
      const players = team.players.map((player, playerIndex) => {
        total += player.sellingPrice * player.rank;
        return (
          <tr key={playerIndex}>
            <td style={styles.td}>{player.name}</td>
            <td style={styles.td}>
              {player.rank} * {player.sellingPrice}
            </td>
            <td style={styles.td}>{player.rank * player.sellingPrice}</td>
          </tr>
        );
      });

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
                <th style={styles.th}>Calculation</th>
                <th style={styles.th}>Score</th>
              </tr>
            </thead>
            <tbody>
              {players}
              <tr style={styles.totalRow}>
                <td style={styles.td} colSpan={2}>
                  Total:
                </td>
                <td style={styles.td}>{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });

    return (
      <div style={styles.container}>
        <h1 style={styles.header}>Team Results</h1>
        {table.length > 0 ? (
          table
        ) : (
          <p style={{ textAlign: "center", color: "#888", fontSize: "18px" }}>
            No teams found. Please add teams to view results.
          </p>
        )}
      </div>
    );
  }
}
