import { useSelector } from 'react-redux';
import { Card, Button,Search_bar,Conatainer} from './components/components'
import {data} from './components/card_component/sampledata'
import {checkFormsForNonNullIds} from './components/card_component/StockAvalibility'

function App() {
  const salts =  useSelector(state => state.Saltdata) 
  console.log(data)
  console.log(checkFormsForNonNullIds(data.saltSuggestions));
  return (
      <Conatainer classes={` p-6 py-10 flex flex-col justify-start items-center gap-[2rem] `}>
        <h1 className='font-sans text-3xl uppercase font-semibold text-cyan-950 cursor-default  tracking-widest'>Welcome to Capsule</h1>
        <div className='w-full p-4 py-10 border-b border-stone-400'>
          <Search_bar />
        </div>
        {/* {salts.length === 0 ? (
        <p className='w-full capitalize flex justify-center items-center py-[15rem] text-[1.5rem] opacity-90 text-gray-400 tracking-wide font-sans'>"Find medicines with amazing discounts"</p>
      ) : (
        salts.map(salt => (
          <Card
            key={salt.id}
            salt_name={salt.salt}
            forms={(salt.salt_forms_json ? Object.keys(salt.salt_forms_json).flat() : [])}
            salt_json={salt.salt_forms_json}
          />
        ))
      )} */}

      
        
      </Conatainer>
      
)

}
export default App