import React from 'react'

const Button = ({btnText,id, onClick,type}) => {
  return (
    <button id={id} onClick = {onClick} type={type}>
    {btnText}
      
    </button>
  )
}

export default Button
