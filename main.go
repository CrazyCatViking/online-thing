package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/CrazyCatViking/online-thing/gamestate"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

var (
  upgrader = websocket.Upgrader{}
  gameState = gamestate.InitGameState()
)

type Message struct {
  Type string `json:"type"`
  PlayerId string `json:"playerId"`
  X int64 `json:"x"`
  Y int64 `json:"y"`
}

func main() {
  upgrader.CheckOrigin = func(r *http.Request) bool {
    return true
  }

  server := echo.New()

  server.GET("check", func(ctx echo.Context) error {
    return ctx.String(http.StatusOK, "Hello World!")
  })

  server.GET("/ws", initWSConnection)

  server.Static("/", "client")

  server.Start(":4000")
}

func initWSConnection(ctx echo.Context) error {
  ws, err := upgrader.Upgrade(ctx.Response(), ctx.Request(), nil)

  if err != nil {
		fmt.Println(err)
  }

  defer ws.Close()

  go sendServerState(ws)

  for {
		// Read
    message := Message{}

		err := ws.ReadJSON(&message)
		if err != nil {
			fmt.Println(err)
      return nil
		}

    switch message.Type {
    case "join":
      fmt.Println("Joining player", message.PlayerId)
      gameState.AddPlayer(message.PlayerId)
      break
    case "update":
      gameState.UpdatePlayer(message.PlayerId, message.X, message.Y)
      break
    }
  }
}

func sendServerState(ws *websocket.Conn) error {
  for {
    // Write
		err := ws.WriteJSON(gameState.GetPlayers())
		if err != nil {
			fmt.Println(err)
      return nil
		}

    // Sleep
    time.Sleep(10 * time.Millisecond)
  }
}
