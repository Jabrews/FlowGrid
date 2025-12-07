
type ConvertProps = {
    interval : string
    value : number
}

export default function convert_to_second({interval, value} : ConvertProps) {

    switch (interval) {


        case 'hrL':
            return value * 36000// 10 hours

        case 'hrR':
            return value * 3600    // 1 hour

        case 'minL':
            return value * 600     // 10 minutes

        case 'minR':
            return value * 60      // 1 minute

        case 'secL':
            return value * 10      // 10 seconds

        case 'secR':
            return value * 1       // 1 second

        default:
            return 0
    }
}
