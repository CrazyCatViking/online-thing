  /**
   * @param {number} mouseX
   * @param {number} mouseY
   * @param {import('../types.d.ts').UIElement} element
   */
  export const checkIsHovered = (mouseX, mouseY, element) => {
    return mouseX >= element.x && 
      mouseY >= element.y && 
      mouseX <= element.x + element.width && 
      mouseY <= element.y + element.height;
  }
