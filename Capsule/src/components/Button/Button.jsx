import './Button.css'

function Button({children, onClick, stock_available, selected}) {

    // const selected = 'border-2 border-stone-600 border-opacity-45  focus:border-cyan-900  focus:shadow-[0_0_10px_0] focus:shadow-teal-500'
    // const not_selected = 'border-2 border-dashed focus:border-teal-950 border-stone-600 border-opacity-45'
    return (
        <button 
        onClick={onClick}
        className={`
        ${stock_available ? ('stock_available') : ('stock_not_available')}
        ${selected ? ('selected') : (null)}
            

            `}
            >
        {children}
        </button>
        
    )
}
export default Button
