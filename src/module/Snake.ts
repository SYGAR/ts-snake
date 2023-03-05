class Snake {
  // 表示蛇头的元素
  head: HTMLElement;
  // 蛇的身体
  bodies: HTMLCollection;
  element: HTMLElement;
  constructor() {
    this.element = document.getElementById('snake')!;

    this.head = document.querySelector('#snake>div') as
      HTMLElement;
    this.bodies = this.element.getElementsByTagName('div');
  }
  // 获取蛇的坐标
  get X() {
    return this.head.offsetLeft
  }
  // 获取蛇的Y轴坐标
  get Y() {
    return this.head.offsetTop
  }
  // 设置蛇头的坐标
  set X(value: number) {
    // 如果新值和旧值一样，就不需要改
    if (value === this.X) {
      return;
    }
    // 超出墙，蛇死
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了')
    }
    // 禁止掉头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      if (value > this.X) {
        value = this.X - 10
      } else {
        value = this.X + 10
      }
    }
    this.moveBody();
    this.head.style.left = value + 'px';
    this.checkHeadBody();
  }

  set Y(value: number) {
    if (value === this.Y) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了')
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10
      } else {
        value = this.Y + 10
      }
    }
    this.moveBody();
    this.head.style.top = value + 'px';
    this.checkHeadBody();
  }
  // 蛇增加身体的方法
  addBody() {
    // 向element中加入一个div元素
    this.element.insertAdjacentHTML('beforeend', '<div></div>');
  }
  moveBody() {
    // 从后往前移动身体，后一个移动到前一个的位置
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前一个身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }
  // 检查有没有撞到自己
  checkHeadBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error('撞到自己了');
      }
    }
  }
}
export default Snake;