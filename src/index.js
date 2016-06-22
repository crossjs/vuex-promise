const hasPromise = payload => payload && (payload.then || (Array.isArray(payload) && payload.some(p => p && p.then)))

export default function vuexPromise ({
  debug = false,
  status = {
    PENDING: 0,
    SUCCESS: 1,
    FAILURE: 2
  },
  silent = false
} = {}) {
  return {
    onInit () {
      if (debug) {
        console.log('Vuex Promise Initialized.')
      }
    },
    onMutation ({ type, payload }, state, store) {
      if (hasPromise(payload)) {
        store.dispatch({
          type,
          silent,
          meta: status.PENDING
        })
        if (!Array.isArray(payload)) {
          payload = [payload]
        }
        Promise.all(payload)
        .then(
          res => store.dispatch({
            type,
            silent,
            payload: payload.length === 1 ? res[0] : res,
            meta: status.SUCCESS
          }),
          err => store.dispatch({
            type,
            silent,
            payload: err,
            error: true,
            meta: status.FAILURE
          })
        )
      }
    }
  }
}
