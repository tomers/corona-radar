import axios from 'axios'
import { actions, getters } from 'quasar-app-extension-geolocation/src/store'

let mockedResponse = null
if (process.env.MOCK_RESPONSE) {
  import('./mocked-response')
    .then((module) => {
      mockedResponse = module.mockedResponse
    })
}

const FEATURES_ENDPOINT = `${process.env.GIS_SERVER}/Points.json`

export async function actionReadRadar (context) {
  context.dispatch('actionReadFeatures')
  context.dispatch('actionSampleGeolocation')
}
export async function actionReadFeatures (context) {
  const response = mockedResponse || await axios.get(FEATURES_ENDPOINT)
  if (response && response.data) {
    const rawFeatures = response.data.features || []
    context.commit('mutationSetRawFeatures', rawFeatures)
  }
}

let pollingTimer = null

async function doQueryPermission () {
  await actions.queryPermission()
  if (getters.isPermissionDenied) {
    // poll permission as the user might allow them in a separate tab
    pollingTimer = setTimeout(() => doQueryPermission(), 2000)
  } else if (pollingTimer) {
    clearTimeout(pollingTimer)
  }
}

export async function actionSampleGeolocation (context) {
  await doQueryPermission()
  try {
    await actions.samplePosition()
    const coordsObj = getters.coords()
    const coords = coordsObj && [coordsObj.longitude, coordsObj.latitude]
    context.commit('mutationSetCoords', coords)
  } finally {
    // update permissions (as the user might have enabled them)
    await doQueryPermission()
  }
}
