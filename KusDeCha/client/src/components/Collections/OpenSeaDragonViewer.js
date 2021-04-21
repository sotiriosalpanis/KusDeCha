import OpenSeaDragon from 'openseadragon'
import React, { useEffect, useState } from 'react'

const OpenSeaDragonViewer = ( { iiifManifestURL } ) => {

  const [viewer, setViewer] = useState(null)

  useEffect(() => {
    InitOpenseadragon()
    return () => {
      viewer && viewer.destroy()
    }
  }, [])


  const InitOpenseadragon = () => {
    viewer && viewer.destroy()
    setViewer(
      OpenSeaDragon({
        id: 'openSeaDragon',
        preserveViewport: true,
        animationTime: 0.5,
        zoomPerScroll: 2,
        visibilityRatio: 0.5,
        zoomInButton: 'zoom-in',
        zoomOutButton: 'zoom-out',
        fullPageButton: 'full-page',
        showNavigator: true,
        tileSources: iiifManifestURL,
      })
    )
  }

  return (
    <section>
      <div className='columns'>
        <div className='column'>
          <a className='button' id='full-page' href='#full-page' title="Zoom in">Full page</a>
          <a className='button' id='zoom-in' href='#zoom-in' title="Zoom in">+</a>
          <a className='button' id='zoom-out' href='#zoom-out' title="Zoom in">-</a>
        </div>
      </div>
      <div 
        id="openSeaDragon" 
        style={{
          height: '700px',
          width: '1200px',
        }}
      >
      </div>
    </section>

  )
 
}

export default OpenSeaDragonViewer
