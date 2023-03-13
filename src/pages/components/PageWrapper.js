import React from 'react'
import './PageWrapper.scss'

export default function PageWrapper({ className, children}) {
    let classes = `page-wrapper ${className  ? className : ''}`

    return (
        <div className={classes}>{children}</div>
    )
}
