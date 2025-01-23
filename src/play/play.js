import React, { Component } from "react";

import Player from './player';
import Team from './team';
import TeamButton from './team-button';
import { FaArrowRight, FaDollar, FaArrowLeft } from 'react-icons/lib/fa';
// import { FasUndo } from 'react-icons/fas'
import background from './background.png';

import './play.css'

export default class Play extends Component {
	constructor(props){
		super(props);
		this.state = {
			"playerId": 0,
			"biddingTeam": 4,
			"teams": [
				{"name": "Manchester United", "image":"/images/teams/manchesterunited.png", "amount":500, "players": []},
				{"name": "FC Barcelona", "image":"/images/teams/fcbarcelona.png", "amount":500, "players": []},
				{"name": "Chelsea", "image":"/images/teams/chelsea.png", "amount":500, "players": []},
				{"name": "Real Madrid", "image":"/images/teams/realmadrid.png", "amount":500, "players": []},
			],
			"players": [{
				"id": 49,
				"name": "Marek Hamsik",
				"pic": "images/hamsik.jpg",
				"basePrice": 25,
				"height": "6.0",
				"position": "MF",
				"rank": 41
			}],
			"currentBid": 25,
			"length": 0
		};
		if(!(localStorage.getItem('started'))){
			localStorage.setItem('playerId', this.state.playerId);
			localStorage.setItem('biddingTeam', this.state.biddingTeam);
			localStorage.setItem('current-bid', this.state.currentBid);
			localStorage.setItem('teams', JSON.stringify(this.state.teams));
			localStorage.setItem('players', JSON.stringify(this.state.players));
			localStorage.setItem('length', JSON.stringify(this.state.length));
			localStorage.setItem('started', 'true');
		}
		else{
			this.state = {
				"playerId": localStorage.getItem('playerId'),
				"biddingTeam": localStorage.getItem('biddingTeam'),
				"currentBid": localStorage.getItem('current-bid'),
				"teams": JSON.parse(localStorage.getItem('teams')),
				"players": JSON.parse(localStorage.getItem('players')),
				"length": localStorage.getItem('length')
			};
		}
	}

	componentWillMount() {
		let players = JSON.parse(localStorage.getItem('players'));
		let length = players.length;
		if(length==1){
			fetch('/player_data.json').then(response => response.json()).then(data => {
				let players = data;
				//players.sort(function(a,b){return 0.5 - Math.random()});
				console.log(players);
				this.setState({"players": players, "length": players.length});
			});
		}
	}

	changeTeam(i){
		this.setState({"biddingTeam": i});
	}

	buyPlayer(){
		let teams = this.state.teams;
		let players = this.state.players;
		let bid = this.state.currentBid;
		let team = this.state.biddingTeam;
		if( team>=0 && team<4 ){
			let amount = teams[team].amount - bid;
			players[this.state.playerId].sellingPrice = bid;
			teams[team].amount = amount;
			teams[team].players.push(players[this.state.playerId]);
			this.setState({"teams": teams, "players": players});
		}
	}

	changeBid(event){
		console.log(event.target.value);
		this.setState({"currentBid": event.target.value, "biddingTeam": 4});
	}

	nextPlayer(){
		let players = this.state.players;
		let playerId = parseInt(this.state.playerId);
		if(players[playerId].sellingPrice>0){
			players.splice(this.state.playerId, 1);
			playerId = (playerId) % (players.length);
			let currentBid = (players[playerId]).basePrice;
			this.setState({"playerId": playerId, "players": players, "currentBid": currentBid, biddingTeam: 4});
		}
		else{
			playerId = (playerId + 1)%this.state.players.length;
			console.log(playerId);
			let currentBid = (this.state.players[playerId]).basePrice;
			this.setState({"playerId": playerId, "currentBid": currentBid, "biddingTeam": 4});
		}

	}

	prevPlayer(){
		let players = this.state.players;
		let playerId = parseInt(this.state.playerId);
		if(players[playerId].sellingPrice>0){
			players.splice(this.state.playerId, 1);
			playerId = (players.length + playerId-1) % (players.length);
			let currentBid = (players[playerId]).basePrice;
			this.setState({"playerId": playerId, "players": players, "currentBid": currentBid, biddingTeam: 4});
		}
		else{
			playerId = (this.state.players.length + playerId - 1)%this.state.players.length;
			console.log(playerId);
			let currentBid = (this.state.players[playerId]).basePrice;
			this.setState({"playerId": playerId, "currentBid": currentBid, "biddingTeam": 4});
		}

	}

	render() {
		localStorage.setItem('playerId', this.state.playerId);
		localStorage.setItem('biddingTeam', this.state.biddingTeam);
		localStorage.setItem('current-bid', this.state.currentBid);
		localStorage.setItem('teams', JSON.stringify(this.state.teams));
		localStorage.setItem('players', JSON.stringify(this.state.players));
		localStorage.setItem('length', this.state.length);
		let bought = "BUY";
		let buyFunction = this.buyPlayer.bind(this);
		if( this.state.players[this.state.playerId].sellingPrice > 0 ){
			bought = "SOLD";
			buyFunction = function(){};
		}
		let length = this.state.players.length
		var comp = this
		var l = this.state.players.length
		let players = this.state.players.map((x, i)=>{
			var k = (i - parseInt(comp.state.playerId) + l) % length
			k = k==length-1?6:k>4?5:k
			var translate = (100 - (45 * (k/5)))+"px"
			var scale = 1 - (0.5*(k/10))
			var op = 1;
			var z = 5-k;
			if(k>=5){
				op = 0;
			}
			if(k==6){
				op = 0;
				z = 5;
				var translate = (100 - (45 * (-1/5)))+"px"
				var scale = 1 - (0.5*(-1/10))
			}
			return (<Player player={x} index={i} style={{transform: "translate(-50%, "+translate+") scale("+scale+") ", zIndex:z, opacity: op}}/>)
		})
		return (
			<div>
				<div className="play" style={{background:"url('"+background+"')", backgroundSize: "cover"}}>
					<div className="header">THE GAME PLAN {l}/{this.state["length"]}</div>
					<link href="https://fonts.googleapis.com/css?family=Open+Sans|Raleway" rel="stylesheet"/>
					<link href="/bootstrap.min.css" rel="stylesheet"/>
					<div className="left-panel">
						{players}
						{/* <Player player={this.state.players[this.state.playerId]} /> */}
						<div className="control-panel">
							<TeamButton bid={this.state.currentBid} state={this.state.biddingTeam==0?"active":"inactive"} team={this.state.teams[0]} click="0" func={this.changeTeam.bind(this)}/>
							<TeamButton bid={this.state.currentBid} state={this.state.biddingTeam==1?"active":"inactive"} team={this.state.teams[1]} click="1" func={this.changeTeam.bind(this)}/>
							<TeamButton bid={this.state.currentBid} state={this.state.biddingTeam==2?"active":"inactive"} team={this.state.teams[2]} click="2" func={this.changeTeam.bind(this)}/>
							<TeamButton bid={this.state.currentBid} state={this.state.biddingTeam==3?"active":"inactive"} team={this.state.teams[3]} click="3" func={this.changeTeam.bind(this)}/>

							<input id="price-tag" value={this.state.currentBid} onChange={this.changeBid.bind(this)}></input>
							<span className="button" onClick={this.prevPlayer.bind(this)}>
								<span className="symbol"><FaArrowLeft /></span>
								<span className="text">PREV</span>
							</span>
							<span className="button" onClick={buyFunction}>
								<span className="symbol"><FaDollar /></span>
								<span className="text">{bought}</span>
							</span>
							<span className="button" onClick={this.nextPlayer.bind(this)}>
								<span className="text">NEXT</span>
								<span className="symbol"><FaArrowRight /></span>
							</span>
						</div>
					</div>
					<div className="right-panel">
						<Team team={this.state.teams[0]}/>
						<Team team={this.state.teams[1]}/>
						<Team team={this.state.teams[2]}/>
						<Team team={this.state.teams[3]}/>

					</div>
					<script src="/bootstrap.js" />
				</div>
			</div>
		);
	}
}
