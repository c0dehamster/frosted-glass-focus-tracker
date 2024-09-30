import type { TimeInterval } from "$lib/types/TimeInterval"
import {
    endOfDay,
    endOfToday,
    previousMonday,
    startOfDay,
    startOfMonth,
    startOfToday,
    startOfYear,
    subMonths,
    subWeeks,
} from "date-fns"
import { ca } from "date-fns/locale"

import { writable, type Writable } from "svelte/store"

export type TimespanOptions = "day" | "week" | "month" | "year"

// TODO: come up with better names for Everything

const defaultTimeInterval: TimeInterval = {
    start: endOfToday(),
    end: subWeeks(endOfToday(), 1),
}

const createTimeIntervalToReportStore = (timeInterval: TimeInterval) => {
    const { set, update, subscribe } = writable(timeInterval)

    const calculateTimespanBoundaries = (
        endDate: Date,
        timespan: TimespanOptions
    ): TimeInterval => {
        let startingPoint = startOfDay(endDate)
        let endingPoint = endOfDay(endDate)

        switch (timespan) {
            case "day":
                break

            case "week":
                startingPoint = subWeeks(previousMonday(startingPoint), 1)
                break

            case "month":
                startingPoint = subMonths(startOfMonth(startingPoint), 1)
                break

            case "year":
                startingPoint = startOfYear(startingPoint)
        }

        return {
            start: startingPoint,
            end: endingPoint,
        }
    }

    const fromEndDate = (endDate: Date, timespan: TimespanOptions) => {
        set(calculateTimespanBoundaries(endDate, timespan))
    }

    return {
        subscribe,
        fromEndDate,
    }
}

export const timeIntervalToReportStore =
    createTimeIntervalToReportStore(defaultTimeInterval)
