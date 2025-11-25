// hooks
import useQueryTimer from "./hooks/useQueryTImer"


type TimerProps = {
    i  : string
}

export default function Timer({i} : TimerProps) {

    const {data} = useQueryTimer(i)
    console.log('timer data : ', data, 'and i :', i)

    return (
        <div>
            <p> Im a timer </p>
            <p> i : {i}</p>
        </div>
    )


}