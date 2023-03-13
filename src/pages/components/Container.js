import React from 'react'
import './Container.scss'

export default function Container({ className, children}) {
    let classes = `container ${className  ? className : ''}`

  return (
    <div className={classes}>{children}</div>
  )
}
