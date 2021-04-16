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
        showNavigator: true,
        tileSources: iiifManifestURL,
      })
    )
  }

  return (
    <section>
      <div>
        <a id='zoom-in' href='#zoom-in' title="Zoom in">Zoom in</a>
        <a id='zoom-out' href='#zoom-out' title="Zoom in">Zoom out</a>
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
