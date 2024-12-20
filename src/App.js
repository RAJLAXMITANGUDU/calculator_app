import React,{ useState} from "react";
import "./App.css";
const evaluteExpression =(expression)=>{
  try {
    if(!expression) return "0";
    const result=Function(`"use strict"; return (${expression})`)();
    if(expression === "0/0") return NaN;
    if(result === Infinity || result === -Infinity) return "Infinity";
    return result;
  } catch {
    return "Error";
  }
};

 export default function App(){
  const [input,setInput]=useState("");
  const [result,setResult]=useState("0");

  const appendValue=(value)=>{
    if(input === "" && value === "-"){
      setInput(value);
    } else if(
      input === "" || ["+","-","*","/"].includes(input[input.length-1])
    ) {
      if  (["+","-","*","/"].includes(value)){
        setInput(input + value);
      } else {
        setInput(input + value);
      }
    } else {
      setInput(input + value);
    }
  };
  const clearInput=()=>{
    setInput("");
    setResult("0");
  };
  const calculate=()=>{
    if(!input || /[+\-*/]$/.test(input)){
      setResult("Error");
      return ;
    }
    const output=evaluteExpression(input);
    setResult(output);
  };
  // React.useEffect(()=>{
  //   if(!input || !/[+\-*/]$/.test(input)){
  //     const output=evaluteExpression(input);
  //     setResult(output);
  //   } else {
  //     setResult("");
  //   }
  // },[input]);
  return (
    <div className="calculator">
      <h1>React Calculator</h1>
      <input
        type="text"
        value={input}
        readOnly
        className="inputField"
        />
        <div className="result">{result}</div>
        <div className="buttons">
          {["7","8","9","+"].map((btn,index)=>(
            <button key={index} onClick={()=>appendValue(btn)}>
              {btn}
            </button>
          ))}
            {["4","5","6","-"].map((btn,index)=>(
            <button key={index} onClick={()=>appendValue(btn)}>
              {btn}
            </button>
          ))}
            {["1","2","3","*"].map((btn,index)=>(
            <button key={index} onClick={()=>appendValue(btn)}>
              {btn}
            </button>
          ))}
           {/* <div className="grouped-buttons">  */}
            {["C","0","=","/",].map((btn,index)=>
            btn === "C" ? (
            <button key={index} onClick={clearInput}>
              {btn}
            </button>
              ): btn === "=" ?(
                <button key={index} onClick={calculate}>
                  {btn}
                </button>
              ) : (
           <button key={index} onClick={()=>appendValue(btn)} >
            {btn}
            </button>
            )
        )}       
        {/* </div>*/}
      </div>
     </div> 
  );
}