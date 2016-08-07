export default function createPromise ({
  debug = false,
  status = {
    PENDING: 0,
    SUCCESS: 1,
    FAILURE: 2,
    FINALLY: 4
  },
  silent = false
} = {}) {
  return store => {
    if (debug) {
      console.log('[Promise] Vuex Promise Plugin Installed.')
    }

    store.subscribe(({ type, payload, meta }) => {
      if (hasPromise(payload)) {
        store.commit({
          type,
          silent,
          meta: {
            ...meta,
            promise: status.PENDING
          }
        })

        if (!Array.isArray(payload)) {
          payload = [payload]
        }

        Promise.all(payload)
        .then(
          function (res) {
            store.commit({
              type,
              silent,
              payload: payload.length === 1 ? res[0] : res,
              meta: {
                ...meta,
                promise: status.SUCCESS
              }
            })
            // finally
            store.commit({
              type,
              meta: {
                ...meta,
                promise: status.FINALLY
              }
            })
          },
          function (err) {
            store.commit({
              type,
              silent,
              payload: err,
              error: true,
              meta: {
                ...meta,
                promise: status.FAILURE
              }
            })
            // finally
            store.commit({
              type,
              meta: {
                ...meta,
                promise: status.FINALLY
              }
            })
          }
        )
      }
    })

    function hasPromise (payload) {
      return payload && (payload.then || (Array.isArray(payload) && payload.some(p => p && p.then)))
    }
  }
}
