import { Error_Image }  from '../../assets/media'

function ErrorPage() {
    return (
        <div className='h-screen font-bold text-8xl flex justify-center items-center flex-col'>
            <img src={Error_Image} alt="error" className='grayscale opacity-20 h-[70rem]' />
            <p className='uppercase font-semibold text-xl'>Page not found</p>
        </div>
    )
}

export default ErrorPage