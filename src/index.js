export default function createPromise ({
  debug = false,
  status = {
    PENDING: 0,
    SUCCESS: 1,
    FAILURE: 2
  },
  silent = false
} = {}) {
  return store => {
    if (debug) {
      console.log('[Promise] Vuex Promise Plugin Installed.')
    }

    store.on('mutation', ({ type, payload }) => {
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
    })

    function hasPromise (payload) {
      return payload && (payload.then || (Array.isArray(payload) && payload.some(p => p && p.then)))
    }
  }
}
