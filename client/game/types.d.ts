export type RenderContext = {
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  input: InputQueue,
  gameState: GameState,
};

export type InputQueue = {
  pressedKeys: Map<Key, boolean>,
  inputQueue: string[],
  mouseX: readonly number,
  mouseY: readonly number,
};

export type Renderable = {
  render: (context: RenderContext) => void
};

export type UIElement = {
  x: number,
  y: number,
  width: number,
  height: number,
};

export type ButtonOptions = {
  text: string,
  x: number,
  y: number,
  width: number,
  height: number,
};

export type TextInputOptions = {
  label: string,
  x: number,
  y: number,
  width: number,
  height: number,
};

export type CurrentState = 'menu' | 'playing' | 'paused' | 'gameover';

export type GameState = {
  player: Player,
  state: CurrentState,
  server: GameServer,
};

export type GameServer = {
  joinGame: (playerName: string) => void;
  sendState: (playerState: PlayerState) => void;
};

export type Ref<T> = {
  value: T,
};

export type PlayerState = {
  x: number;
  y: number;
  rotation: number;
};
