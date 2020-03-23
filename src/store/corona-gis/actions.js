import axios from 'axios'

const FEATURES_ENDPOINT = `${process.env.GIS_SERVER}/Points.json`

export async function actionReadFeatures (context) {
  const response = await axios.get(FEATURES_ENDPOINT)
  if (response.data) {
    const features = response.data.features || []
    context.commit('mutationSetFeatures', features)
  }
}
