import React, { useState, useEffect } from 'react';
import './App.css';

const words = ["Hello there! ", "I ", "am ", "trying ", "to ", "imitate ", "typing ", "effect ", "in ", "react."]


function App() {

  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)
  const [blink, setBlink] = useState(true)

  useEffect(() => {

    const timeout2 = setTimeout(() => {

      //Check for a 'truthy' value, if not make it falsy
      setBlink((prev) => !prev);

    }, 500);


    return () => clearTimeout(timeout2);


  }, [blink]);

  useEffect(() => {

    //If we've exhausted every word in the 'words' array, stop
    if (index === words.length) return;

    //else if we've reach end of the current word && we are not on the last word && we are not reversing
    if (subIndex === words[index].length + 1 && index !== words.length - 1 && !reverse){

      //we should reverse
      setReverse(true);
      return;


    }
     
    //if we have reversed to the last letter of the current word, 
    if (subIndex === 0 && reverse) {

      //stop reversing (i mean, whats the point 🙄)
      setReverse(false);

      //move on to the next word in the 'words' array
      setIndex((prev) => prev + 1);
      return;


    }

    //else
    const timeout = setTimeout(() => {
      //move on to the next letter of the current word (if reversing, move on to the previous letter)
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, 200);
     
    return () => clearTimeout(timeout);

  }, [subIndex, index, reverse]);
  //  ...
  


  return (
    <div className="App">
      <h1> {`${words[index].substring(0, subIndex)}${blink ? '|' : ''}`} </h1>
    </div>
  );
}

export default App;
