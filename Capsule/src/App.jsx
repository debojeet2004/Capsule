import { useSelector } from 'react-redux';
import { Search_bar,Conatainer} from './components/components'
import { Outlet } from 'react-router-dom'


function App() {
  const salts =  useSelector(state => state.Saltdata) 

  return (
      <Conatainer classes={` p-6 py-10 flex flex-col justify-start items-center gap-[2rem] `}>
        <h1 className='font-sans text-3xl uppercase font-semibold text-cyan-950 cursor-default  tracking-widest'>Welcome to Capsule</h1>
        <div className='w-full p-4 py-10 border-b border-stone-400'>
          <Search_bar />
        </div>
        {salts.length === 0 ? (
        <p className='w-full capitalize flex justify-center items-center py-[15rem] text-[1.5rem] opacity-90 text-gray-400 tracking-wide font-sans'>"Find medicines with amazing discounts"</p>
      ) : (
        <Outlet/>
      )}

      
        
      </Conatainer>
      
)

}
export default App