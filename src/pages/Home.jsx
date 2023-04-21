import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import UnloggedMain from '../components/UnloggedMain'
import sunnyBG from '../public/sunny.jpg'
import rainyBG from '../public/rainy2.jpg'
import cloudyBG from '../public/cloudy.jpg'
import mistBG from '../public/mist.jpg'

const sleep = async (milliseconds) => {
  await new Promise(resolve => {
    return setTimeout(resolve, milliseconds)
  })
}

function animation(s, from, to){
  let arr = []
  let frames = 60
  let seconds = s
  let length = frames * seconds
  let interval = (to - from) / length
  for(let i = 0; i <= length; i++){
    from += interval
    arr.push(from)
  }
  return arr
} 


let opacityArr = animation(5, 1, 0)
console.log(opacityArr);
export default function Home() {

  const [weather, setweather] = useState('SUNNY')
  const [index  ,setIndex] = useState(0)
  const [isup, setIsUp] = useState(true)
  console.log(opacityArr[index]);
  useEffect(  () => {
    async function animate(){
      if (index >= opacityArr.length - 1 && isup){
        setIsUp(false)
      } else if (index <= 0 && !isup){
          setIsUp(true)
      }
      if (isup){
      await sleep(((1 / 60) * 1000))
      setIndex(index + 1)  
      } else{
        await sleep(((1 / 60) * 1000))
        console.log(index);
        if (index === opacityArr.length - 1 && weather === 'MISTY'){
          setweather('SUNNY')
        } else if (index === opacityArr.length - 1 && weather === 'SUNNY'){
          setweather('RAINY')
        } else if (index === opacityArr.length - 1 && weather === 'RAINY'){
          setweather('CLOUDY')
        } else if (index === opacityArr.length - 1 && weather === 'CLOUDY'){
          setweather('MISTY')
        }
        setIndex(index - 1)  
      }
    }
    animate()
  })
  return (
    <>
    <div id='bg-image' style={{backgroundImage: `url(${weather === 'SUNNY' ? sunnyBG : weather === 'RAINY' ? rainyBG : weather === 'CLOUDY' ? cloudyBG : mistBG})`, position: 'absolute', zIndex: -10, height: '100vh', width: '100vw', opacity: `${opacityArr[index]}`, backgroundSize: '1920px 1080px'}}>
    </div>
   <div id='home' style={{opacity: 1}}>
    <header>
    <NavBar />      
    </header>
    <main>
    <UnloggedMain weather={weather} opacity={opacityArr[index]}/>        
    </main>
   </div>
   </>
  )
}
