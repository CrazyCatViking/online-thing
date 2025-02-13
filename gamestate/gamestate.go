package gamestate

import (
	"maps"
	"sync"

	"github.com/CrazyCatViking/online-thing/utils"
)

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

func (gs *GameState) GetEnemies(playerId string) []*Player {
  gs.mu.Lock()

  defer gs.mu.Unlock()

  playerPredicate := func (p *Player) bool { return p.PlayerId != playerId }
  players := maps.Values(gs.Players);

  return utils.Filter(players, playerPredicate)
}

func (gs *GameState) AddPlayer(playerId string, playerName string) {
  gs.mu.Lock()
  
  defer gs.mu.Unlock()

  gs.Players[playerId] = CreatePlayer(300, 200, playerName, playerId) 
}

func (gs *GameState) UpdatePlayer(playerId string, x, y int64, rotation float64) {
  gs.mu.Lock()

  defer gs.mu.Unlock()

  player := gs.Players[playerId]
  player.X = x
  player.Y = y
  player.Rotation = rotation
}
