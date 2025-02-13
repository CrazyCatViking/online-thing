package gamestate

type Player struct {
  PlayerId string `json:"playerId"`
  PlayerName string `json:"playerName"`
  X int64 `json:"x"`
  Y int64 `json:"y"`
  Rotation float64 `json:"rotation"`
}

func CreatePlayer(x, y int64, playerName string, playerId string) *Player {
  player := Player{X: x, Y: y, Rotation: 0, PlayerName: playerName, PlayerId: playerId}
  return &player
}
