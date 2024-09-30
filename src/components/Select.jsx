import React from 'react'

const Select = ({ options,label, className = "", ...props },ref) => {
    return (
        <>
        {label && <label className='text-[#0E1731] text-sm font-semibold mb-1 block text-left'>{label}</label>}
        <select className={`w-full border border-[#D0D5E4] px-5 py-1 rounded-xl text-[#0E1731] text-sm font-semibold ${className}`} {...props} ref={ref}>
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        </>
    )
}

export default React.forwardRef(Select);    
