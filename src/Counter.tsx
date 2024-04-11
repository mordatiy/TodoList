import React, {useState} from "react";

export function Counter() {
    console.log("Counter rendered")
    const [count, setCount] = useState(5)

    return (
        <div style={{width: "100%", marginTop: "50px", border: "1px solid"}} onClick={()=> {setCount(count+1)}}>{count}</div>
    )
}