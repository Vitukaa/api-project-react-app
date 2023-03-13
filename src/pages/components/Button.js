import React from 'react'

export default function Button({ buttonClass, handler, buttonText }) {
  return (
    <button className={`button ${buttonClass}`} onClick={handler}>{buttonText}</button>
  )
}
