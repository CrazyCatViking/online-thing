package gamestate

type Player struct {
  PlayerName string `json:"playerName"`
  X int64 `json:"x"`
  Y int64 `json:"y"`
}

func CreatePlayer(x, y int64, playerName string) *Player {
  player := Player{X: x, Y: y, PlayerName: playerName}
  return &player
}
