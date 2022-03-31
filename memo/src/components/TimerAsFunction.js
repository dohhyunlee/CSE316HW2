import React, {useState, useEffect} from 'react';

function TimerAsFunction() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds]); //this causes it to re-call the useEffect if the seconds change, which can prevent issues
    // See https://blog.davidvassallo.me/2020/04/09/react-hooks-and-setinterval/ for more info
    // Or https://overreacted.io/making-setinterval-declarative-with-react-hooks/ for a detailed description
    // of the problem and a better (but more complex) solution

    return (
        <div>
            Seconds Function: {seconds}
        </div>
    );
}

export default TimerAsFunction;
