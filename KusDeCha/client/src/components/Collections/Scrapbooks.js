import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import CreateScrapbook from './CreateScrapbook'
import ScrapbookImageCard from './ScrapbookImageCard'

const Scrapbooks = () => {

  const [ scrapbooks, setScrapbooks ] = useState(null)
  const [ activeModal, setActiveModal ] = useState(null)
  const [ modalScrapbook, setModalScrapbook ] = useState({
    id: '',
    digital_images: [],
    name: '',
  })

  useEffect(() =>{
    const getData = async() => {
      const { data } = await axios.get('api/scrapbooks/')
      setScrapbooks(data)
    }
    getData()
  },[])

  const handleModal = (event) => {
    if (!activeModal) {
      const scrapbookModal = scrapbooks.filter(scrapbook => scrapbook.name === event.target.value)
      setModalScrapbook({ ...scrapbookModal[0] })
      setActiveModal('is-active')
    } else {
      setActiveModal(null)
    }
    
  }

  if (!scrapbooks) return null

  return (
    <section className='section scrapbooks'>
      <div className='container'>
        <h3 className='subtitle is-2'>Scrapbooks</h3>
        <div className='box'>
          <CreateScrapbook />
        </div>
        <div className='columns is-multiline'>
          { scrapbooks.map(scrapbook => {
            return <div key={scrapbook.id}>
              <div className='box column relative-container'>
                <h4 className='subtitle is-4'>{scrapbook.name}</h4>
                <p className='subtitle is-6'>Created by: {scrapbook.creator.username}</p>
                { scrapbook.digital_images.length > 0 ?
                  <>
                    <ScrapbookImageCard 
                      imageInfo={scrapbook.digital_images[Math.floor(Math.random() * scrapbook.digital_images.length)]}
                      size={1}
                    />
                    <div className={`modal ${activeModal}`}>
                      <div className='modal-background'></div>
                      <div className='modal-card'>
                        <p className='subtitle is-4'>{modalScrapbook.name}</p>
                        <Link to={`/scrapbooks/${modalScrapbook.id}`}>
                          <button className='button'>Go to {modalScrapbook.name}</button>
                        </Link>
                        <div className='columns is-multiline'>

                          {modalScrapbook.digital_images.map(image => {
                            return <div key={image.id}>
                              <div className='column'>
                                <ScrapbookImageCard  
                                  imageInfo={image} 
                                  size={2}
                                />
                              </div>

                            </div>
                          
                          })

                          }
                        </div>
                        <button 
                          className='modal-close is-large' 
                          aria-label='close'
                          onClick={handleModal}
                        >
                        </button>

                      </div>
                    </div>
                  </>
                  :
                  <p>No images added yet...</p>
                }
                <button
                  className='button'
                  onClick={handleModal}
                  value={scrapbook.name}
                >
                  {scrapbook.digital_images.length} images</button>
              </div>
              
            </div>
          })}
        </div>
      </div>
    </section>
    
  )
}

export default Scrapbooks
