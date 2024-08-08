import { useState , useEffect} from "react";
import img from "./watch.jpg";


export default function Stopwatch() {

  const [isRunning, setIsRunning]= useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lapTimes, setLapTimes] = useState([]);

  useEffect(()=>{
let intervalId;
if(isRunning){
  intervalId= setInterval(()=>{
    setElapsedTime(prevElapsedTime => prevElapsedTime + 10 );
  
  },10);
}else{
  clearInterval(intervalId);
}
return ()=>clearInterval(intervalId);
  },[isRunning]);

  const startStop =()=>{
setIsRunning(!isRunning);
  }
  const reset =()=>{
    setIsRunning(false);
    setElapsedTime(0);
    setLapTimes([]);
  }
  const lap =()=>{
    setLapTimes([elapsedTime, ...lapTimes]);
  }

  const formatTime = (time)=>{
const hours= Math.floor((time/ 3600000));
const minutes= Math.floor((time/ 60000)%60);
const seconds= Math.floor((time/1000)%60);
const milliseconds=Math.floor((time % 1000)/10);
return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  }

  return (

    <div className="stopwatch">
      <h1>PANDA'S STOPWATCH</h1>
      <div className="display">{formatTime(elapsedTime)}</div>
      <div className="controls">
        <button  style={{backgroundColor:"#fb7373"}} onClick={startStop}>{isRunning ? 'Stop' : 'Start'}</button>
        <button style={{backgroundColor:"#6fcb6f"}} onClick={lap}  disabled={!isRunning}>Lap</button>
        <button style={{backgroundColor:"#8383ff"}} onClick={reset}>Reset</button>
        <div className="lap-times">
        <h2>Lap Times</h2>
        <ul>
          {lapTimes.map((lapTime, index) => (
            <li key={index}>Lap {lapTimes.length - index}: {formatTime(lapTime)}</li>
          ))}
        </ul>
      </div>
      </div>
      <img src={img} alt="" />
    </div>
  )
}
