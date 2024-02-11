import { useState, useEffect, useCallback } from 'react'

import Map, { Source, Layer } from 'react-map-gl';
import type { FillLayer, GeoJSONSource } from 'react-map-gl';

import {layerStyle1, layerStyle2, layerStyle3} from './components/layers';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import type { FeatureCollection } from 'geojson'

import * as turf from '@turf/turf'

const REACT_APP_MAPBOX_TOKEN = "pk.eyJ1IjoiaG9va2FobG9jYXRvciIsImEiOiI5WnJEQTBBIn0.DrAlI7fhFaYr2RcrWWocgw"

const nullGeojson: FeatureCollection = {
  type: 'FeatureCollection',
  features: []
}

const newGeojson: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        coordinates: [
          [
            [
              -121.3868011551091,
              37.86412940728563
            ],
            [
              -121.3868011551091,
              37.82407149439766
            ],
            [
              -121.34241540254291,
              37.82407149439766
            ],
            [
              -121.34241540254291,
              37.86412940728563
            ],
            [
              -121.3868011551091,
              37.86412940728563
            ]
          ]
        ],
        type: "Polygon"
      }
    }
  ]
};

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        coordinates: [
          [
            [
              -122.3868011551091,
              37.86412940728563
            ],
            [
              -122.3868011551091,
              37.82407149439766
            ],
            [
              -122.34241540254291,
              37.82407149439766
            ],
            [
              -122.34241540254291,
              37.86412940728563
            ],
            [
              -122.3868011551091,
              37.86412940728563
            ]
          ]
        ],
        type: "Polygon"
      }
    }
  ]
};

function modifiedPolygon () {
  const polygon = turf.polygon(geojson.features[0].geometry.coordinates)
  const translatePoly = turf.transformTranslate(polygon, 90, 50);

  console.log('trans')
  console.log(translatePoly)

  const array = []
  array.push(translatePoly)

  const plos = {
    type: 'FeatureCollection',
    features: array
  } 

  console.log(plos)

  return newGeojson

  // return {
  //   type: 'Polygon',
  //   coordinates: [coordinates[0].map(point => {
  //     return [point[0] + 1.15, point[1] + 1.15]
  //   })]
  // }

}



function App() {
  const [count, setCount] = useState(0)

  const [isHovered, setIsHovered] = useState<boolean>(false)

  const [isClicked, setIsClicked] = useState<boolean>(false)

  const [polygonData, setPolygonData] = useState(null)

  const updateData = useEffect(() => {
    
  })

  const clickHandler = useCallback(e => {

    if (isClicked === true) {
      setIsClicked(false)
    } else if(isClicked === false) {
      setIsClicked(true)
    }

    console.log('setisclicked')
    console.log(isClicked)

    

    console.log('click')
    if (e.features.length > 0) {
      

      const {
        features,
        point: { x, y }
      } = e

      // console.log(features[0].geometry.coordinates)
      const coordinates = modifiedPolygon()
      setPolygonData(coordinates)

      console.log(coordinates)

      console.log('newdata')
      console.log(polygonData)
      console.log('data')
      console.log(geojson)

      // console.log(polygonData)

    }
  }, [])

  const onHover = useCallback(event => {
    const {
      features,
      point: { x, y }
    } = event
    // console.log(features, x, y)

    if (features.length > 0 && features) {
      const layerId = features[0].layer.id
      layerId == 'rectangleHover' ? clicked = 'visible' : clicked = 'none'
      console.log(clicked)
    }
    // if features.
  }, [])


  return (
    <>
      <div>
        <Map
          mapboxAccessToken={REACT_APP_MAPBOX_TOKEN}
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14
          }}
          style={{ width: 600, height: 400 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          interactiveLayerIds={['rectangleHover']}
          onMouseDown={clickHandler}
          onMouseEnter={() => {
            setIsHovered(true)
            console.log(true)
          }}
          onMouseLeave={() => {
            setIsHovered(false)
            console.log(false)
          }}
        >

          <Source id="my-data" type="geojson" data={geojson}>
            {isHovered && (<Layer {...layerStyle1}
            />)}
            <Layer {...layerStyle2} />
          </Source>

          <Source id='my-updated-data' type="geojson" data={polygonData}>
            {isClicked && polygonData && (<Layer {...layerStyle3} />)}
          </Source>
        </Map>
      </div>
      <br></br>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
