import { _decorator, Component, instantiate, Label, Node, Prefab, randomRangeInt, Vec3 } from 'cc';
import { BLOCK_SIZE } from './constant';
import { PlayerController } from './PlayerController';
import { store } from './store';
import { loadGameCommand, startGameCommand } from './store/features/game/commands';
import { addAppListener } from './store/listenerMiddleware';
import { gameLoadSuccessEvent, gameOverEvent, gameStartedEvent } from './store/features/game/events';
import { RoadBlock } from './store/features/game/entity';
import { playerJumpEndEvent } from './store/features/player/events';
import { selectLoadGameRoadLength } from './store/features/game/selector';
const { ccclass, property } = _decorator;


@ccclass('GameManager')
export class GameManager extends Component {
    @property({ type: Prefab })
    public boxPrefab: Prefab | null = null
    @property({ type: Node })
    public startMenu: Node | null = null; // 开始的 UI
    @property({ type: PlayerController }) 
    public playerCtrl: PlayerController | null = null; // 角色控制器
    @property({type: Label}) 
    public stepsLabel: Label|null = null; // 计步器
    start() {
        store.dispatch(addAppListener ({
            actionCreator: gameLoadSuccessEvent,
            effect: (action) => {
                const { gameRoad } = action.payload
                this.node.removeAllChildren()
                gameRoad.map(block => this.spawnRoadBlockNode(block)).forEach((node, i) => {
                    if(node) {
                        this.node.addChild(node)
                        node.setPosition(i * BLOCK_SIZE, 0, 0)
                    }
                })
            }
        }))
        store.dispatch(addAppListener({
            actionCreator: gameStartedEvent,
            effect: () => {
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
            }
        }))
        store.dispatch(addAppListener({
            actionCreator: playerJumpEndEvent,
            effect: action => {
                const { moveSteps } = action.payload
                if (this.stepsLabel) {
                    this.stepsLabel.string = Math.min(moveSteps, selectLoadGameRoadLength(store.getState())).toString()
                }
            }
        }))
        store.dispatch(addAppListener({
            actionCreator: gameOverEvent,
            effect: () => {
                this.init()
            }
        }))
        this.init()
    }

    update(deltaTime: number) {

    }
    private init() {
        if (this.startMenu) {
            this.startMenu.active = true
        }
        if (this.playerCtrl) {
            this.playerCtrl.setInputActive(false)
            this.playerCtrl.node.setPosition(Vec3.ZERO)
            this.playerCtrl.reset()
        }
        store.dispatch(loadGameCommand())
    }
    onStartButtonClicked() {
        store.dispatch(startGameCommand())
    }
    private spawnRoadBlockNode(type: RoadBlock) {
        if (!this.boxPrefab || type === RoadBlock.None) return null
        return instantiate(this.boxPrefab)
    }

}


