import React from 'react'

const Button = ({btnText,id, onClick}) => {
  return (
    <button id={id} onClick = {onClick}>
    {btnText}
      
    </button>
  )
}

export default Button
