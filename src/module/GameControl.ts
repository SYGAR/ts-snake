// 引入类
import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./scorePanel";
// 定义游戏控制器
class GameControl {
  food: Food;
  snake: Snake;
  scorePanel: ScorePanel;
  // 创建一个属性用来存储蛇的移动方向
  direction: string = '';
  // 判断游戏是否结束
  isLive = true;
  constructor() {

    this.food = new Food();
    this.snake = new Snake();
    this.scorePanel = new ScorePanel(10,2);
    this.init();

  }
  // 初始化游戏
  init() {
    // 绑定键盘按下的事件
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
    this.run();
  }
  // 键盘按下的处理事件
  keyDownHandler(event: KeyboardEvent) {
    console.log(this);
    // 判断用户按的键是否合法
    this.direction = event.key;
  }
  // 创建一个控制蛇移动的方法
  run() {
    // 根据方向来控制蛇的移动
    let X = this.snake.X;
    let Y = this.snake.Y;
    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        Y -= 10;
        break;
      case 'ArrowDown':
      case 'Down':
        Y += 10;
        break;
      case 'ArrowLeft':
      case 'Left':
        X -= 10;
        break;
      case 'ArrowRight':
      case 'Right':
        X += 10;
        break;
    }
    // 判断蛇是否吃到食物
    this.checkEat(X, Y);
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e: any) {
      alert(e.message);
      this.isLive = false;
    }
    // 开启定时调用
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }
  // 检测是否吃到食物
  checkEat(X: number, Y: number) {
    if (this.food.X === X && this.food.Y === Y) {
      console.log('吃到食物了');
      this.food.change();
      this.scorePanel.addScore();
      this.snake.addBody();
    };
  }
}
export default GameControl;
