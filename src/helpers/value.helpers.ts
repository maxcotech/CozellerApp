let timeoutHandler = null;
export const debounced = <T>(val: T,actionFunc: (val: T) => void, timeoutDuration = 1000)  => {
    if(timeoutHandler !== null){
        clearTimeout(timeoutHandler);
        timeoutHandler = null;
    } 
    timeoutHandler = setTimeout(() => {
        actionFunc(val);
    },timeoutDuration)
}