import React from 'react'


const categoryPage = ({ params }) => {
  return (
    <div>
        My Post: {params.cSlug}
    </div>
  )
}

export default categoryPage
