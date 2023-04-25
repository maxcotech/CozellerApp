import React, { useEffect, useState } from "react";

interface CounterProps {
    duration?: number,
    renderPendingLabel: (durationLeft: number) => React.ReactNode;
    renderActionLabel: (counterReset: () => void) => React.ReactNode;
}

export default function Counter({duration = 60,renderPendingLabel, renderActionLabel}: CounterProps){
    const [counter,setCounter] = useState(duration);
    const resetCounter = () => setCounter(duration);
    useEffect(() => {
        let handler: ReturnType<typeof setInterval>;
        if(counter > 0){
            handler = setTimeout(() => {
                setCounter(counter - 1)
            },1000)
        }
        return () => {
            clearTimeout(handler);
        }

    },[counter])
    return (
        <>
            {(counter > 0)? renderPendingLabel(counter): renderActionLabel(resetCounter)}
        </>
    )

}