// const newPlayerUrl = "http://localhost:3000/api/v1/players"
// const newGameUrl = "http://localhost:3000/api/v1/games"
const newPlayerUrl = "https://chibi-jump-backend.herokuapp.com/api/v1/players"
const newGameUrl = "https://chibi-jump-backend.herokuapp.com/api/v1/games"

const adapter = {
	createPlayer: playerName => {
		return fetch(newPlayerUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({ name: playerName })
		}).then(res => res.json())
	}, //end of the create Player


	createGame: (playerId, timer) => {
			return fetch(newGameUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify({
					player_id: playerId,
					timer: timer
				})
			})
				.then(res => res.json())
				.then(console.log)
		},

		getGames: () => {
			return fetch(newGameUrl)
			.then(res => res.json())
		}
}// end of the Adapter
