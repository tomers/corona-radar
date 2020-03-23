export function getterFeatures (state) {
  return state.rawFeatures && state.rawFeatures
    .map(feature => {
      console.assert(feature.type === 'Feature', 'Not a feature')
      console.assert(feature.geometry, 'No geometry')
      console.assert(feature.geometry.type === 'Point', 'Geometry is not a point')
      console.assert(feature.geometry.coordinates, 'No coordinates')
      console.assert(feature.properties, 'No properties')
      return {
        coordinates: feature.geometry.coordinates,
        properties: feature.properties
      }
    })
}

// console.assert(typeof (Number.prototype.toRad) !== 'undefined', 'No Number.toRad')

function distanceMeters (p1, p2) {
  const [lon1, lat1] = p1
  const [lon2, lat2] = p2
  var R = 6371 // Radius of the earth in km
  var dLat = (lat2 - lat1).toRad() // Javascript functions in radians
  var dLon = (lon2 - lon1).toRad()
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in km
  return d * 1000 // Distance in m
}

// Converts numeric degrees to radians
if (typeof (Number.prototype.toRad) === 'undefined') {
  // eslint-disable-next-line no-extend-native
  Number.prototype.toRad = function () {
    return this * Math.PI / 180
  }
}

// function distance (a, b) {
//   return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))
// }

export function getterNearesFeatures (state, getters) {
  if (!getters.getterFeatures || !state.coords) {
    return []
  }
  return getters.getterFeatures
    .map(x => {
      return {
        ...x,
        distance: distanceMeters(state.coords, x.coordinates)
      }
    })
    .filter(x => { return x.distance <= state.maxDistanceMeters })
    .sort((a, b) => { return a.distance - b.distance })
}
