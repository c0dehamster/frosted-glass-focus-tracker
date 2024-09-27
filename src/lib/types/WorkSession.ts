import { differenceInSeconds, interval } from "date-fns"
import type { durationInSeconds } from "./duration"

export class WorkSession {
    start: Date
    end: Date

    constructor(start: Date, end: Date) {
        this.start = start
        this.end = end
    }

    get duration(): durationInSeconds {
        return differenceInSeconds(this.end, this.start)
    }
}
