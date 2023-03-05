// 定义食物类
class Food {
  element: HTMLElement
  constructor() {
    this.element = document.getElementById('food')!;
  }
  get X() {
    return this.element.offsetLeft;
  }
  get Y() {
    return this.element.offsetTop
  }
  // 变换食物坐标
  change() {
    // 随机生成横坐标
    const left = Math.floor(Math.random() * 29) * 10
    const top = Math.floor(Math.random() * 29) * 10
    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }
}
export default Food;
