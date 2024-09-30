import React, { useId } from 'react'
const Input = React.forwardRef(({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId()
    return (
        <>
            {label && <label htmlFor={id} className='text-[#0E1731] text-sm font-semibold mb-1 block text-left pl-2'>{label}</label>}
            <input type={type} id={id} ref={ref} className={`w-full border border-[#D0D5E4] px-5 py-1 rounded-xl text-[#0E1731] text-sm font-semibold ${className}`} {...props}/>
        </>
    )
})

export default Input
