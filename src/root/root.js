import React, { Component } from "react"
import { Link } from "react-router-dom"

import "./root.css"

export default class Root extends Component {
  render() {
    return (
      <div className="about-container">
        <img src="/images/game-plan.png" alt="Game Plan" className="logo" />
        <h2 className="tagline">Ready to make your best bid?</h2>
        <Link to="/play">
          <span className="enter-button">Enter Auction</span>
        </Link>
      </div>
    )
  }
}

