import React, { useState, useEffect } from 'react';
import './App.css';

const words = ["Hello there! ", "I ", "am ", "trying ", "to ", "imitate ", "typing ", "effect ", "in ", "react."]


function App() {

  const [currentWord, setCurrentWord] = useState(0)
  const [currentLetter, setCurrentLetter] = useState(0)
  const [isReversing, setIsReversing] = useState(false)
  const [showCaret, setShowCaret] = useState(true)


  //Caret
  useEffect(() => {

    const timeout2 = setTimeout(() => {

      //Check if caret is shown. If not shown, show. If shown, hide.
      setShowCaret((prev) => !prev);

    }, 500);


    return () => clearTimeout(timeout2);


  }, [showCaret]);


  useEffect(() => {

    //If we've exhausted every word in the 'words' array, stop
    if (currentWord === words.length) return;

    //else if we've reach end of the current word && we are not on the last word && we are not reversing
    if (currentLetter === words[currentWord].length + 1 && currentWord !== words.length - 1 && !isReversing){

      //we should reverse
      setIsReversing(true);
      return;


    }
     
    //if we have reversed to the last letter of the current word, 
    if (currentLetter === 0 && isReversing) {

      //stop reversing (i mean, whats the point 🙄)
      setIsReversing(false);

      //move on to the next word in the 'words' array
      setCurrentWord((prev) => prev + 1);
      return;


    }

    //else
    const timeout = setTimeout(() => {
      //move on to the next letter of the current word (if reversing, move on to the previous letter)
      setCurrentLetter((prev) => prev + (isReversing ? -1 : 1));
    }, 150);
     
    return () => clearTimeout(timeout);

  }, [currentLetter, currentWord, isReversing]);
  


  return (
    <div className="App">
      <h1> {`${words[currentWord].substring(0, currentLetter)}${showCaret ? '|' : ''}`} </h1>
    </div>
  );
}

export default App;
