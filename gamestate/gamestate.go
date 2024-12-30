package gamestate

type GameState struct {
  Players map[string]*Player
}

func InitGameState() *GameState {
  gameState := GameState{
    Players: make(map[string]*Player),
  }

  return &gameState
}

func (gs *GameState) AddPlayer(playerId string) {
  gs.Players[playerId] = CreatePlayer(300, 200, playerId) 
}

func (gs *GameState) UpdatePlayer(playerId string, dx, dy int64) {
  player := gs.Players[playerId]
  player.X += dx
  player.Y += dy
}
