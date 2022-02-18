import {react, useState, useEffect,useRef} from 'react'
import Card from './Card'
import './MemoryGameStyle.css'
import COLORS from './ElementsArray'



export default function MemoryGame () {
    
    const disable = () => {
        setShouldDisableAllCards(true);
      };
    
    const enable = () => {
      setShouldDisableAllCards(false);
     };

     const shuffleCards = (array) =>{
        array =  [...array.slice(0,options),...array.slice(0,options)]
        array.forEach((element, i) =>{
            let randomNumber = Math.floor(Math.random()*array.length)
            let tempArray = array[i]
            array[i] = array[randomNumber]
            array[randomNumber] = tempArray
        })
        console.log(array);
        return array
    }

    const [openCards, setOpenCards] = useState([]);
    const [options, setOptions] = useState(null)
    const [bestScore, setBestScore] = useState(Number.POSITIVE_INFINITY)
    const [puntuation, setPuntuation] = useState(0)
    const [arrayCards, setArrayCards] = useState(()=> shuffleCards(COLORS, options))
    const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
    const [clearedCards, setClearedCards] = useState({});
    const [pairsArray, setPairsArray] = useState([]);
    const timeout = useRef(null);

    

    const evaluate = () => {
        const [first, second] = openCards
        setPuntuation(puntuation => puntuation + 1)
        // enable();
        if(arrayCards[first].color === arrayCards[second].color){
            setPairsArray((prev)=> [...prev, arrayCards[first].color])
            setOpenCards([]);
            return
        }
          // This is to flip the cards back after 500ms duration
        timeout.current = setTimeout(() => {
            setOpenCards([]);
        }, 500);
    }

    const checkGameFinished = () => {
        if(pairsArray.length === options ){
        
            let score = Math.min(puntuation, bestScore)
            setBestScore(score) 
            setTimeout(() => {
                alert('Game finished')
                resetGame()
            },1000)      
            
        }

    }

    const handleClick = (index) => {
        if(openCards.length === 1){
            setOpenCards((prev)=>[...prev,index])
            // disable()
        }else {
            clearTimeout(timeout.current);
            setOpenCards([index])
        }
   
    }

    const resetGame = () => {
        setOpenCards([]);
        setPairsArray([])
        setOptions(null)
        setArrayCards(()=>shuffleCards(COLORS))
        setPuntuation(0)
    }
  
    useEffect(() => {
        let timeout = null;
        if (openCards.length === 2) {
          timeout = setTimeout(evaluate, 300);
        }
        return () => {
          clearTimeout(timeout);
        };
    }, [openCards]);

    useEffect(() => {
        checkGameFinished();
    },[pairsArray])

    const checkIsFlipped = (index) => {
      return openCards.includes(index);
    };
    const checkIsInactive = (card) => {
      return Boolean(pairsArray.includes(card.color));
    //   return Boolean(clearedCards[card.color]);
    };

    useEffect(() => {
      setArrayCards(()=>shuffleCards(COLORS));
    },[options])

      
    return (
        <div className="container-game">
        <h1>Memory Game 🧠</h1>
        <div className="container-game-info">
            <div className="game-info">Score: {puntuation}</div>
            <div className="game-info">High Score: {bestScore}</div>
        </div>
        <div className="menu-main">
        {
          options === null ? (
            <>
              <button className="btn-main"onClick={()=>setOptions(6)}>NORMAL</button>
              <button className="btn-main"onClick={()=>setOptions(8)}>MEDIUM</button>
              <button className="btn-main"onClick={()=>setOptions(12)}>ADVANCED</button>
            </>
          ) : (
            <>
              <button className="btn-reset" onClick={()=>resetGame()}>RESTART</button>
              <button className="btn-main" onClick={()=>setOptions(null)}>MAIN MENU</button>
            </>
          )
        }
 
      </div>
        <div className="cards-grid">
            
            {
                arrayCards.map((card,index)=>(
                    <Card 
                        card={card} 
                        index={index} 
                        onClick={handleClick}
                        isDisabled={shouldDisableAllCards}
                        isInactive={checkIsInactive(card)}
                        isFlipped={checkIsFlipped(index)}/>
                ))
            }
        </div>
        </div>
    )
}