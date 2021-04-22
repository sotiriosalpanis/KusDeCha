import React from 'react'

const InstitutionCard = ( { props } ) => {


  return (
    <section className='hero hero-image is-halfheight'>
      <div className='hero-body'>
        <h2 className='title is-2'>{props.institution_name}</h2>
        <hr />
        <p className='title is-3'>{props.description}</p>
        {/* <a href={props.website} className='title is-5'>Visit the {props.institution_name} website </a> */}
      </div>
    </section>

  )
}

export default InstitutionCard
