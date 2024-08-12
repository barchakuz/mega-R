import { useState } from 'react'
import './App.css'
import conf from './conf/conf';

function App() {
  const [count, setCount] = useState(0)
  console.log(conf.appwriteBucketId, conf.appwriteProjectId);

  return (
    
    <>
    <h1 className=' bg-slate-400 size-11 font-thin align-middle max-h-9'>Hello</h1>

    </>
  )
}

export default App
