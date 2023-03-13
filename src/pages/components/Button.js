import React from 'react'
import './Button.scss'

export default function Button({ buttonClass, handler, buttonText }) {
  return (
    <button className={`button ${buttonClass}`} onClick={handler}>{buttonText}</button>
  )
}
