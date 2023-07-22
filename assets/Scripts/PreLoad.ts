import { _decorator, Component, Node } from 'cc';
const { ccclass, property, executionOrder } = _decorator;

        // @ts-ignore
        globalThis.process = {
            env: {
                NODE_ENV : 'production'
            }
        }
@ccclass('PreLoad')
@executionOrder(0)
export class PreLoad extends Component {
    start() {
    }

    update(deltaTime: number) {
        
    }
}


