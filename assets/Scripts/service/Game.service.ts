import { randomRangeInt } from "cc";
import { RoadBlock } from "../store/features/game/entity";

export class GameService {
    static generateMap(length: number) {
        const road = []
        road.push(RoadBlock.Stone)
        for (let i = 1; i < length; i++) {
            if (road[i - 1] === RoadBlock.None) {
                road.push(RoadBlock.Stone);
            } else {
                road.push(randomRangeInt(RoadBlock.None, RoadBlock.Stone + 1));
            }
        }
        return road
    }
}