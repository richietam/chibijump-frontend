let timer = 0
// console.log('hello world')

document.addEventListener('DOMContentLoaded', function () {
  let canvas = document.getElementById("canvas")
  let jump_sound = document.getElementById("#jump")
  let p_width = canvas.width
  let p_height = canvas.height
  let width = canvas.width
  let height = canvas.height
  let ctx = canvas.getContext("2d")
  // let instance = M.Sidenav.getInstance(elem)
  let modal = document.querySelector(".modalNEW")

  ctx.fillStyle = "red"

// sleep time expects milliseconds
  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  function showForm() {
    let modal = document.querySelector(".modalNEW")
    modal.classList.toggle("show-modalNEW")
    form_active = true
  }

  //
  // document.addEventListener('click', function(e) {
  //   if (event.target == modal) {
  //     form_active = false;
  //     modal.style.display = "none";
  //     console.log('after modal exit form active is:', game_end)
  // }
  // })

//*****************working projectile loop code*************
  //
  // let state = {
  //   p_x: p_width,
  //   p_y: p_height
  // }
  //
  // function update () {
  //   state.p_x -= 10
  //   if (state.p_x < 0) {
  //
  //       state.p_x += p_width
  //
  //   }
  // }
  //
  // function draw_projectile() {
  //   ctx.clearRect(0, 0, width, height)
  //   ctx.fillRect(state.p_x, state.p_y, 25, 25)
  // }
  //
  // function loop() {
  //   // let progress = timestamp - lastRender
  //   update()
  //   draw_projectile()
  //   // window.requestAnimationFrame(loop)
  // }
  //
  // lastRender = 0
  // window.requestAnimationFrame(loop)

//*****************projectile code begins*************

//*************GAME STATE****************

  let state = {
    projectile_position: {
      x: p_width,
      y: 425
    },

    jumpman_position: {
      x: 60,
      y: 400
    }
  }

  let collision = false
  let projectile_active = true
  let jumping = false
  let game_end = false
  let demoState = true
  let gameSpeed = 15
  let form_active = false



  function checkCollision() {

    if (state.projectile_position.x <= 150 && state.projectile_position.x >= 50 && jumping == false) {

      // drawEnd()
      // showForm()

      collision = true
      // showForm()
    }

    if (collision == true) {
      game_end = true
      // showform()
    }
  }


//*********CHANGE OF STATE**********

  function checkGameSpeed () {

    if (timer < 500){
      gameSpeed = 20

    } else if (timer >= 500 && timer < 1500) {
      gameSpeed = 25

    } else if (timer >= 1500 && timer < 3000)  {
      gameSpeed = 30

    } else if (timer >= 3000 && timer < 4500) {
      gameSpeed = 35

    } else if (timer >= 4500 && timer < 6000){
      gameSpeed = 40

    } else if (timer >= 6000 && timer < 7500){
      gameSpeed = 45

    } else if (timer >= 7500 && timer < 99999999999){
      gameSpeed = 55
    }
  }

  function projectile_update() {

    let myArray = [400, 500, 1000, 1200, 2000, 2500]
    let rand = myArray[Math.floor(Math.random() * myArray.length)]

    if (state.projectile_position.x < -100) {
      if (projectile_active) {

        projectile_active = false
        timer +=  250

        sleep(rand).then(function() {
          state.projectile_position.x = p_width
          // draw_projectile()
          projectile_active = true
        })
      }

    } else {
      if (projectile_active == true) {
        state.projectile_position.x -= gameSpeed
      }
    }
  }

  function projectile_demo() {
    let myArray = [400, 500, 1000, 1200, 2000, 2500, 2500, 2500]
    let rand = myArray[Math.floor(Math.random() * myArray.length)]

    if (state.projectile_position.x < -55) {
      if (projectile_active) {
        projectile_active = false
        timer += 100
        sleep(rand).then(function() {
          state.projectile_position.x = 650
          // draw_projectile()
          projectile_active = true
        })
      }

    } else {
      if (projectile_active == true) {
        state.projectile_position.x -= 10
      }
    }
  }

  function jump_up() {
    if(!jumping) {
      jumping = true
      state.jumpman_position.y -= 100
      setTimeout(land, 230)
    }
  }

  function land() {
    if(jumping){
      state.jumpman_position.y += 100
      jumping=false
    }
  }

//*********EVENT LISTENERS**************


  document.addEventListener("keyup", ev => {

    let keyPressed = ev.keyCode

    if (keyPressed === 74 && !game_end) {
     jump_up()
     canvas.innerHTML += '<audio src="./src/images/jump.wav" autoplay="autoplay">'
   }
 })

  document.addEventListener("keydown", ev => {
   let keyPressed = ev.keyCode
   if (keyPressed === 78 && game_end && !form_active) {
     ctx.clearRect(0, 0, width, height)
    location.reload()
   }
  })

  document.addEventListener("keydown", ev => {
    let keyPressed = ev.keyCode
    if (keyPressed === 13 && !form_active) {
      console.log('key down detected, demoState is', demoState)
      state.projectile_position.x = p_width
     demoState = false
   }
  })

  document.addEventListener("keydown", ev => {
    let keyPressed = ev.keyCode
    if (keyPressed === 83 && game_end && !form_active) {
      showForm()
      console.log('showing form')
     demoState = false
   }
  })

  window.onclick = function(event) {
  if (event.target == modal) {
    form_active = false;
    modal.style.display = "none";
    location.reload()
  }
}
  //
  // document.addEventListener("keydown", ev => {
  //   let keyPressed = ev.keyCode
  //   if (keyPressed === 77 && game_end && !form_active) {
  //     showForm()
  //     console.log('showing form')
  //    demoState = false
  //  }
  // })
  //
  // document.addEventListener("keydown", ev => {
  //   let keyPressed = ev.keyCode
  //   if (keyPressed === 77 && game_end) {
  //     form_active = true
  //     console.log('showing form, form_active is', form_active)
  //
  //       showForm()


     // demoState = false
    //  }
    // })



  //*********DRAW FUNCTIONS**************

 //  function draw_projectile() {
 //    // ctx.fillRect(state.projectile_position.x, state.projectile_position.y, 15, 15)
 //    ctx.drawImage(document.getElementById("dragon"),state.projectile_position.x, state.projectile_position.y, 75, 75)
 //  }
 //
 //  function draw_background() {
 //    ctx.drawImage(document.getElementById("background"),-9, 0, p_width+20, p_height)
 //  }
 //
 //  function draw_jumpman() {
 //     //  ctx.fillStyle = "blue"
 //     // thing2 = ctx.fillRect(state.jumpman_position.x, state.jumpman_position.y, 50, 50)
 //     ctx.drawImage(document.getElementById("chibi"),state.jumpman_position.x, state.jumpman_position.y, 100, 100)
 //  }
 //
 //  function drawInstructions(){
 //   ctx.drawImage(document.getElementById("text"),200, 100, 600, 300)
 //  }
 //
 //  function drawGameOver(){
 //   ctx.drawImage(document.getElementById("gameover"),200, 100, 600, 300)
 //  }
 //
 //  function drawEnd() {
 //      ctx.font = "16px Arial"
 //      ctx.fillStyle = "#0095DD"
 //      ctx.fillText("YOU LOSE SUCKER", 300, 150)
 //  }
 //
 // function drawScore() {
 //     ctx.font = "24px Arial"
 //     ctx.fillStyle = "#BC3429"
 //     ctx.fillText("Score: " + timer, 10, 30)
 // }


  // // ************GAME LOOP BEGIN**************
  // function loop() {
  //   console.log('gamespeed is', gameSpeed)
  //   ctx.clearRect(0, 0, width, height)
  //   checkGameSpeed()
  //   draw_background()
  //   draw_jumpman()
  //   draw_projectile()
  //   checkCollision()
  //   drawScore()
  //   projectile_update()
  //     if (!game_end){
  //     window.requestAnimationFrame(loop)
  //   } else if (game_end) {
  //     demoState = true
  //     drawGameOver()
  //     // location.reload()
  //     //animate losing frame
  //     // gameStartCountDown()
  //     console.log('demoState is', demoState)
  //   }
  // }

  //
	// document.addEventListener("keydown", ev => {
	// 	let keyPressed = ev.keyCode
	// 	if (keyPressed === 83 && game_end) {
	// 		showForm()
	// 		console.log("showing form")
	// 		demoState = false
	// 	}
	// })

	// document.addEventListener("keydown", ev => {
	// 	let keyPressed = ev.keyCode
	// 	if (keyPressed === 77 && game_end) {
	// 		showForm()
	// 		console.log("showing form")
	// 		demoState = false
	// 	}
	// })

	// document.addEventListener("keydown", ev => {
	// 	let keyPressed = ev.keyCode
	// 	if (keyPressed === 77 && game_end) {
	// 		showForm()
	// 		console.log("showing form")
	// 		demoState = false
	// 	}
	// })

	//*********DRAW FUNCTIONS**************

	function draw_projectile() {
		// ctx.fillRect(state.projectile_position.x, state.projectile_position.y, 15, 15)
		ctx.drawImage(
			document.getElementById("dragon"),
			state.projectile_position.x,
			state.projectile_position.y,
			75,
			75
		)
	}

	function draw_background() {
		ctx.drawImage(
			document.getElementById("background"),
			-9,
			0,
			p_width + 20,
			p_height
		)
	}

	function draw_jumpman() {
		//  ctx.fillStyle = "blue"
		// thing2 = ctx.fillRect(state.jumpman_position.x, state.jumpman_position.y, 50, 50)
		ctx.drawImage(
			document.getElementById("chibi"),
			state.jumpman_position.x,
			state.jumpman_position.y,
			100,
			100
		)
	}

	function drawInstructions() {
		ctx.drawImage(document.getElementById("text"), 200, 100, 600, 300)
	}

	function drawGameOver() {
		ctx.drawImage(document.getElementById("gameover"), 200, 100, 600, 300)
	}

	function drawEnd() {
		ctx.font = "16px Arial"
		ctx.fillStyle = "#0095DD"
		ctx.fillText("YOU LOSE SUCKER", 300, 150)
	}

	function drawScore() {
		ctx.font = "24px Arial"
		ctx.fillStyle = "#BC3429"
		ctx.fillText("Score: " + timer, 10, 30)
	}

	// ************GAME LOOP BEGIN**************
	function loop() {
		console.log("gamespeed is", gameSpeed)
		ctx.clearRect(0, 0, width, height)
		checkGameSpeed()
		draw_background()
		draw_jumpman()
		draw_projectile()
		checkCollision()
		drawScore()
		projectile_update()
		if (!game_end) {
			window.requestAnimationFrame(loop)
		} else if (game_end) {
			demoState = true
			drawGameOver()
			// location.reload()
			//animate losing frame
			// gameStartCountDown()
			console.log("demoState is", demoState)
		}
	}

	function gameStartCountDown() {
		game_end = false
		ctx.clearRect(0, 0, width, height)
		draw_background()
		draw_jumpman()
		drawInstructions()
		// draw_projectile()
		projectile_update()
		//  console.log('inside loop demostate is:', demoState)
		if (demoState) {
			window.requestAnimationFrame(gameStartCountDown)
		}

		if (!demoState) {
			timer = 0
			ctx.clearRect(0, 0, width, height)
			window.requestAnimationFrame(loop)
		}
	}

	function gameDemoStart() {
		window.requestAnimationFrame(gameStartCountDown)
	}
	//**********************GAME INIT***********************

	// window.requestAnimationFrame(loop)
	gameDemoStart()

  adapter.getGames().then(games => {
		console.log(games)
    gamesArr = games
    gamesArr.sort(function(a,b){
      return b.timer - a.timer;
    })
		// render the games to the table
		const table = document.querySelector("#table-info")
		gamesArr.slice(0,10).forEach(game => {
			table.innerHTML += ` <td>${game.player.name}</td>
			  <td>${game.timer}</td>`
		})
	})

  })


//******************form code********

const formField = document.querySelector("form")

formField.addEventListener("submit", ev => {
	ev.preventDefault()
	// const modal = document.querySelector(".modal")
	const playerName = document.querySelector("#player-name").value

	function renderPlayerName(player) {
		const playerId = player.id
		formField.innerHTML = `<h2 id= data-id="${player.id}">
		${player.name} </h2>
		<h3 id="modal-title-text">Let it be known! Your score is: ${timer}</h3><br>
		`
		adapter.createGame(playerId, timer)
	}
	adapter.createPlayer(playerName).then(player => {
		renderPlayerName(player)
    form_active = false
	})
}) // end of the submit action
