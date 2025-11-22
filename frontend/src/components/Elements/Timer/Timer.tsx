
type TimerProps = {
    i  : string
}

export default function Timer({i} : TimerProps) {

    return (
        <div>
            <p> Im a timer </p>
            <p> i : {i}</p>
        </div>
    )


}