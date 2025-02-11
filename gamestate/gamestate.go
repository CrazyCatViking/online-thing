package gamestate

import "sync"

type GameState struct {
  mu sync.Mutex
  Players map[string]*Player
}

func InitGameState() *GameState {
  gameState := GameState{
    Players: make(map[string]*Player),
  }

  return &gameState
}

func (gs *GameState) GetPlayers() map[string]*Player {
  gs.mu.Lock()

  defer gs.mu.Unlock()

  return gs.Players
}

func (gs *GameState) AddPlayer(playerId string, playerName string) {
  gs.mu.Lock()
  
  defer gs.mu.Unlock()

  gs.Players[playerId] = CreatePlayer(300, 200, playerName) 
}

func (gs *GameState) UpdatePlayer(playerId string, dx, dy int64) {
  gs.mu.Lock()

  defer gs.mu.Unlock()

  player := gs.Players[playerId]
  player.X += dx
  player.Y += dy
}
