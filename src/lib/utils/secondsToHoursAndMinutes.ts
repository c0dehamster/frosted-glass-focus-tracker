import type { durationInSeconds } from "$lib/types/duration"

// TODO: rewrite this to use date-fns

export const secondsToHoursAndMinutes = (duration: durationInSeconds) => {
    let hours = Math.floor(duration / 3600)
    let hoursRemainder = duration % 3600
    let minutes = Math.round(hoursRemainder / 60)

    return {
        hours,
        minutes,
    }
}
