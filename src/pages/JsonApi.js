import React, { useEffect } from 'react'

export default function JsonApi() {

    useEffect(() => {
        fetch(`http://localhost:3000/posts/`)
            .then(res => res.json())
            .then(postsData => {


            })
    }, [])

  return (
    <div>
        <h1>Main page</h1>
    </div>
  )
}
