export default function vuexPromise ({
  debug = false,
  status = {
    PENDING: 0,
    SUCCESS: 1,
    FAILURE: 2
  }
} = {}) {
  return {
    onInit () {
      if (debug) {
        console.log('Vuex Promise Initialized.')
      }
    },
    onMutation ({ type, payload: [payload] }, state, store) {
      if (payload && payload.then) {
        store.dispatch(type, null, status.PENDING)
        payload.then(
          res => store.dispatch(type, res, status.SUCCESS),
          err => store.dispatch(type, err, status.FAILURE)
        )
      }
    }
  }
}
