import React from 'react'

const Button = ({children,type="button" , className="",bgColor, textColor,...props}) => {
  return (
    <button type={type} className={`cursor-pointer px-5 py-1 rounded-3xl ${bgColor} ${textColor}  text-sm font-semibold ${className} `} {...props} >
      {children}
    </button>
  )
}

export default Button
