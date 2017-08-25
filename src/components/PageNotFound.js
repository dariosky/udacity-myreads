import React from 'react'
import Link from 'react-router-dom/es/Link'

function PageNotFound(props) {
  return <div style={{textAlign: 'center'}}>
    <h1>Page Not Found</h1>
    <p>You are maybe playing with the url, or it may be my fault...</p>
    <p>in any case... go back to <Link to="/">Home</Link></p>
  </div>
}

export default PageNotFound
