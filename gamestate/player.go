package gamestate

type Player struct {
  Id string `json:"id"`
  X int64 `json:"x"`
  Y int64 `json:"y"`
}

func CreatePlayer(x, y int64, id string) *Player {
  player := Player{X: x, Y: y, Id: id}
  return &player
}
