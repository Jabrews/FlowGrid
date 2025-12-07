import {useRef, useState, useEffect} from "react"

// hooks

// util
import type { TimeObject } from "../../util/timer_types"

type NumberScrollProps = {
    interval : string
    setTimeObjects: React.Dispatch<React.SetStateAction<TimeObject[]>>;
}

export default function NumberScroll({interval, setTimeObjects} : NumberScrollProps) {

    // handle array
    let nums = ['x', 0,1,2,3,4,5,6,7,8,9, 'X']
    if (interval == 'minL' ||  interval == 'secL') {
        nums = ['x', 0, 1, 2, 3, 4, 5, 'X']
    }

    const ref = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLLIElement>(null)
    const [activeNumber, setActiveNumber] = useState('0')
    


    // force scroll position on startup
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        el.scrollTop = 200; 
    }, []);

    // set time object
    useEffect(() => {
        setTimeObjects(prev =>
            prev.map(obj =>
                obj.type === interval
                    ? { ...obj, value: parseInt(activeNumber), lastValue : obj.value }
                    : obj
            )
        );
    }, [activeNumber, setTimeObjects, interval]);


    const handleOnScroll = () => {
        const picker = ref.current;
        if (!picker) return;

        const rect = picker.getBoundingClientRect();
        const pickerCenter = rect.top + rect.height / 2;
        let closestChild : HTMLLIElement;
        let closestDistance = Infinity;

        picker.querySelectorAll("li").forEach((child) => {
            const childRect = child.getBoundingClientRect();
            const childCenter = childRect.top + childRect.height / 2;
            const distance = Math.abs(childCenter - pickerCenter);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestChild = child;
                if (closestChild.innerText == 'x' || closestChild.innerText == 'X') {
                    return
                }
                setActiveNumber(closestChild?.innerText)
            }
        });



    }
    
    const handleOnScrollEnd = () => {
        const picker = ref.current;
        const li = ref2.current;

        if (!picker || !li) return;

        // picker center 
        const rect = picker.getBoundingClientRect();
        const pickerCenter = rect.top + rect.height / 2;

        // child center 
        const liRect = li.getBoundingClientRect();
        const childCenter = liRect.top + liRect.height / 2;

        // how far child is from center
        const delta = childCenter - pickerCenter;

        // scroll the picker so the child aligns with center
        picker.scrollTop += delta;

    };


    return (
        <>
            <div 
            key={`${interval}-scroll`}
            className='number-scroll-container' 
            ref={ref}
            onScroll={handleOnScroll}
            onScrollEnd={handleOnScrollEnd}
            >
                {nums.map((num : number | string) => 

                    <li
                    ref={activeNumber === num.toString() ? ref2 : null}
                    key={`${interval}-scroll-${num.toString()}`}
                    className={
                        num === "x" || num ==="X"
                            ? "x"
                            : activeNumber === num.toString()
                                ? "active"
                                : "in-active"
                    }
                    > 
                        {num}
                    </li> 
                )}



            </div>

        </>

    )



}