import type {FillLayer} from 'react-map-gl';

export const layerStyle1: FillLayer = {
    id: 'rectangle',
    type: 'fill',
    paint: {
      'fill-color': '#0080ff', // blue color fill
      'fill-opacity': 0.5
    }
  };
  
  export const layerStyle2: FillLayer = {
    id: 'rectangleHover',
    type: 'fill',
    paint: {
      'fill-color': '#aa8ece', // blue color fill
      'fill-opacity': 0.5
    }
  };
  
  export const layerStyle3: FillLayer = {
    id: 'rectangleModified',
    type: 'fill',
    paint: {
      'fill-color': '#2eeeee', // blue color fill
      'fill-opacity': 0.5
    }
  };