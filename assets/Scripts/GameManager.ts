import { _decorator, CCInteger, Component, instantiate, Label, Node, Prefab, randomRangeInt, Vec3 } from 'cc';
import { BLOCK_SIZE, GameState } from './constant';
import { PlayerController } from './PlayerController';
import { Events } from './events';
const { ccclass, property } = _decorator;

enum BlockType {
    None,
    Stone
}

@ccclass('GameManager')
export class GameManager extends Component {

    @property({ type: Prefab })
    public boxPrefab: Prefab | null = null

    @property({ type: CCInteger})
    public roadLength: number = 50

    @property({ type: Node })
    public startMenu: Node | null = null; // 开始的 UI
    @property({ type: PlayerController }) 
    public playerCtrl: PlayerController | null = null; // 角色控制器
    @property({type: Label}) 
    public stepsLabel: Label|null = null; // 计步器
    private road: BlockType[] = []
    start() {
        this.setCurState(GameState.GS_INIT)
        this.playerCtrl?.node.on(Events.JumpEnd, this.onPlayerJumpEnd, this)
    }

    update(deltaTime: number) {

    }
    private onPlayerJumpEnd(moveSteps: number) {
        if (this.stepsLabel) {
            this.stepsLabel.string = Math.min(moveSteps, this.roadLength).toString()
        }
        this.checkResult(moveSteps)
    }
    private checkResult(moveSteps: number) {
        if (moveSteps < this.roadLength) {
            if (this.road[moveSteps] === BlockType.None) {
                this.setCurState(GameState.GS_INIT)
            } 
        }else {
            this.setCurState(GameState.GS_INIT)
        }
    }
    private init() {
        if (this.startMenu) {
            this.startMenu.active = true
        }
        this.generateRoad()
        if (this.playerCtrl) {
            this.playerCtrl.setInputActive(false)
            this.playerCtrl.node.setPosition(Vec3.ZERO)
            this.playerCtrl.reset()
        }
    }
    private generateRoad() {
        this.node.removeAllChildren()

        this.road.push(BlockType.Stone)
        for (let i = 1; i < this.roadLength; i++) {
            if (this.road[i - 1] === BlockType.None) {
                this.road.push(BlockType.Stone);
            } else {
                this.road.push(randomRangeInt(BlockType.None, BlockType.Stone + 1));
            }
        }

        this.road.map(block => this.spawnBlockByType(block)).forEach((node, i) => {
            if(node) {
                this.node.addChild(node)
                node.setPosition(i * BLOCK_SIZE, 0, 0)
            }
        })
    }
    onStartButtonClicked() {
        this.setCurState(GameState.GS_PLAYING)
    }
    private spawnBlockByType(type: BlockType) {
        if (!this.boxPrefab || type === BlockType.None) return null
        return instantiate(this.boxPrefab)
    }

    private setCurState (value: GameState) {
        switch(value) {
            case GameState.GS_INIT:
                this.init();
                break;
            case GameState.GS_PLAYING:   
                if (this.startMenu) {
                    this.startMenu.active = false
                }        
                if (this.stepsLabel) {
                    this.stepsLabel.string = '0'
                }
                setTimeout(() => {
                    if (this.playerCtrl) {
                        this.playerCtrl.setInputActive(true)
                    }
                }, 0.1);
                break;
            case GameState.GS_END:
                break;
        }
    }
}


