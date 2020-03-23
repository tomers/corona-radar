export function getterFeatures (state) {
  return state.rawFeatures && state.rawFeatures
    .map(feature => {
      console.assert(feature.type === 'Feature', 'Not a feature')
      console.assert(feature.type === 'Feature', 'Not a feature')
      console.dir(feature)
      return {}
    })
}
export function getterNearesFeatures (state, getters) {
  if (!state.getterFeatures || !state.coords) {
    return null
  }
  return [
    state.coords
  ]
}
