export type RenderContext = {
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  input: InputQueue,
  gameState: GameState,
};

export type InputQueue = {
  keys: Map<Key, boolean>,
  mouseX: number,
  mouseY: number,
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
};

export type Ref<T> = {
  value: T,
};
