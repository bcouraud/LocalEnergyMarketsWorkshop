// You should change the .eslintrc.json with this:
// {
//   "extends": ["next/babel"]
// }
//and add a file babel.rc
 


//import Link from 'next/link'
import {useRouter} from 'next/router'

function Home(){
    const router = useRouter()
    const handleClick1 = () => {
        console.log('Getting Data')
        router.replace('/Part1')
    }
    const handleClick2 = () => {
      console.log('Getting to market')
      router.replace('/Part2')
  }
  const handleClick3 = () => {
    console.log('Getting to Optimization')
    router.replace('/Part3')
}  
    const log = () => {
        console.log('hello')
    }
    return (
    


        <div>
 
        <div className="jumbotron text-center">
        <h1>Project Workshop: Local Energy Markets</h1>
        </div>

        <div className="row">
          <div className="d-flex justify-content-center">
            <h1 className="mt-4"></h1>
            <p>MSc Smart Cities</p>
            {/* <button className="btn btn-outline-secondary">
              or just get started
            </button> */}
          </div>
        </div>
        <div className="row">
          <div className="col">

            <button className="btn btn-primary me-2" onClick={handleClick1}>Phase 1: Electric consumption </button>
            {/* <button className="btn btn-outline-secondary"> 
              or just get started
            </button> */}
            <p>Understand Electric Consumption, profiles, and what self-consumption means</p>
          </div>
        </div>

        <div className="row">
          <div className="col">

            <button className="btn btn-primary me-2" onClick={handleClick2}>Phase 2: Market bidding</button>
            {/* <button className="btn btn-outline-secondary">
              or just get started
            </button> */}
              <p>Understand how Local Energy Markets could work through Market bidding process</p>

          </div>
        </div>


        <div className="row">
          <div className="col">

            <button className="btn btn-primary me-2" onClick={handleClick3}>Phase 3: Optimization Example</button>
            {/* <button className="btn btn-outline-secondary">
              or just get started
            </button> */}
              <p>Experience how optimization of electricity consumption can help regulate the house at lowest cost or environmental impact</p>

          </div>
        </div>



{/* 
        <h1>Home Page</h1>

        <Link href='/data'>
            <a>data</a>
        </Link>
        <Link href='/data/smartmeter'>
            <a>smartmeter</a>
        </Link>
        <button onClick={handleClick}>Get Data</button>
        <div><button onClick={log}>Click</button></div> */}

        </div>)
}

export default Home