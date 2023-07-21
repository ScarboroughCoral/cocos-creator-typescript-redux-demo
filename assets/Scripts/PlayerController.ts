import { _decorator, Component, EventMouse, Input, input, Node, Vec3, Animation, EventTouch } from 'cc';
import { BLOCK_SIZE } from './constant';
import { Events } from './events';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    private startJump: boolean = false;
    private jumpStep: number = 0;
    private curJumpTime: number = 0;
    private jumpTime: number = 0.1;
    private curJumpSpeed: number = 0;
    private curPos: Vec3 = new Vec3();
    private deltaPos: Vec3 = new Vec3(0, 0, 0);
    private targetPos: Vec3 = new Vec3();

    @property(Animation)
    BodyAnim: Animation|null = null
    private curMoveSteps = 0
    @property(Node)
    leftTouch: Node | null = null
    @property(Node)
    rightTouch: Node | null = null
    start() {
    }
    reset() {
        this.curMoveSteps = 0
    }
    setInputActive(active: boolean) {
        if (active) {
            this.leftTouch?.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
            this.rightTouch?.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
            input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this)
        } else {
            input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this)
            this.leftTouch?.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
            this.rightTouch?.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        }
    }
    private onTouchStart(event: EventTouch) {
        const target = event.target as Node;    
        if (target?.name == 'LeftTouch') {
            this.jumpByStep(1);
        } else {
            this.jumpByStep(2);
        }
    }
    private onMouseUp(e: EventMouse) {
        const currentButton = e.getButton()
        if (currentButton === EventMouse.BUTTON_LEFT) {
            this.jumpByStep(1)
        } else if (currentButton === EventMouse.BUTTON_RIGHT) {
            this.jumpByStep(2)
        }
    }
    update(deltaTime: number) {
        if (this.startJump) {
            this.curJumpTime += deltaTime
            if (this.curJumpTime > this.jumpTime) {
                this.node.setPosition(this.targetPos)
                this.startJump = false
                this.onOnceJumpEnd()
            } else {
                this.node.getPosition(this.curPos)
                this.deltaPos.x = this.curJumpSpeed * deltaTime
                Vec3.add(this.curPos, this.curPos, this.deltaPos)
                this.node.setPosition(this.curPos)
            }
        }
    }

    private jumpByStep(step: 1 | 2) {
        if (this.startJump) return
        if (this.BodyAnim) {
            const clipName = step === 1 ? 'oneStep' : 'twoStep'
            this.jumpTime = this.BodyAnim.getState(clipName).duration
            this.BodyAnim.play(clipName)
        }
        this.startJump = true
        this.jumpStep = step
        this.curJumpTime = 0
        this.curJumpSpeed = this.jumpStep * BLOCK_SIZE / this.jumpTime
        this.node.getPosition(this.curPos)
        Vec3.add(this.targetPos,this.curPos,new Vec3(this.jumpStep * BLOCK_SIZE,0,0))
        this.curMoveSteps += step
    }
    onOnceJumpEnd() {
        this.node.emit(Events.JumpEnd, this.curMoveSteps)
    }
}


