import {TailSpin} from 'react-loader-spinner'
import { useState } from 'react'

// hooks
import useQueryTimer from "./hooks/useQueryTImer"

// components
import CountdownTimer from './CountdownTimer/CountdownTimer'
import StopwatchTimer from './StopwatchTimer/StopwatchTimer'


type TimerProps = {
    i  : string
}

export default function Timer({i} : TimerProps) {

    const {data, isLoading} = useQueryTimer(i)

    const [timerView, toggleTimerView] = useState('countdown')

    const handleSwapBtn = () => {
        if (timerView == 'countdown') {
            toggleTimerView('stopwatch')
        } else {
            toggleTimerView('countdown')
        }
    }

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
                            <div className='timer-container highlight-content'>
                            <div className='swap-btn-container'>

                                <button
                                    className={timerView === 'countdown' ? 'swap-btn-inactive' : 'swap-btn'}
                                    onClick={handleSwapBtn}
                                >
                                    countdown
                                </button>

                                <button
                                    className={timerView === 'stopwatch' ? 'swap-btn-inactive' : 'swap-btn'}
                                    onClick={handleSwapBtn}
                                >
                                    stopwatch
                                </button>

                                </div>

                                <div className='timer-child'>
                                    {timerView == 'countdown' ? (
                                        <CountdownTimer />
                                    ) : (
                                        <StopwatchTimer />
                                    )} 
                                </div>
                            </div> 
                        
                        </>

                    )}
            </div>

        </>
           )


}