import { useSelector } from 'react-redux';
import { Card,} from '../../components/components'
function Home() {
    const salts =  useSelector(state => state.Saltdata) 
    return (
        <div className='w-full flex flex-col gap-[4rem]'>
            {
            salts.map(salt => (
            <Card
            key={salt.id}
            salt_name={salt.salt}
            forms={(salt.salt_forms_json ? Object.keys(salt.salt_forms_json).flat() : [])}
            salt_json={salt.salt_forms_json}
            />
        ))
        }
        </div>
    )

}
export default Home