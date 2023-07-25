import { EventHandlerEpic } from "../../epic.type";
import rxjs from 'rxjs'
import { startGameFailedEvent } from "./events";
const { filter ,switchMap, EMPTY} = rxjs
const startGameFailedEventHandler: EventHandlerEpic = action$ =>
    action$.pipe(filter(startGameFailedEvent.match), switchMap((action) => {
        const { reason } = action.payload
        alert(reason)
        return EMPTY
    }))