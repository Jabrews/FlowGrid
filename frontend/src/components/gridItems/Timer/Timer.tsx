import {TailSpin} from 'react-loader-spinner'

// hooks
import useQueryTimer from "./hooks/useQueryTImer"


type TimerProps = {
    i  : string
}

export default function Timer({i} : TimerProps) {

    const {data, isLoading} = useQueryTimer(i)
    console.log('timer data : ', data, 'and i :', i)

    return (
        <>
            <div>
                {isLoading && (
                    <TailSpin 
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="tail-spin-loading"
                        visible={isLoading}
                    />
                )}
                {data && (
                    <>
                        <p> Im a timer </p>
                        <p> i : {i}</p>
                    </>
                )}
            </div>

        </>
           )


}