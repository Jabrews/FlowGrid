// hooks
import useQueryTracker from "./hooks/useQueryTracker"


type TrackerProps = {
    i : string
}

export default function Tracker({i} : TrackerProps) {

    const {data} = useQueryTracker(i)
    console.log(data)

    return (
    <div className='tracker-container highlight-content'>
        {/* Tracker Header */}
        <div className='tracker-header'>
            <button > &lt; </button>
            <h1> none </h1>
            <button > &gt; </button>
        </div>

        {/* Tracker Content */}
        <div className='tracker-menu-container'>
            <div className='tracker-menu-header' style={{overflow: 'visible'}}>
                    <p> nothing connected yet</p>
            </div>
            <div className="tracker-menu-content"> 
                    <p> No connected items.</p>
            </div>
        </div>
    </div>
    )

}