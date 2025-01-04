export type RenderContext = {
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  input: InputQueue,
};

export type InputQueue = {
  keys: Map<string, boolean>,
  mouseX: number,
  mouseY: number,
};

export type Renderable = {
  render: (context: RenderContext) => void
};

export type ButtonOptions = {
  text: string,
  x: number,
  y: number,
  width: number,
  height: number,
};
