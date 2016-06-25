# VUEX-PROMISE

> :two_hearts: A Promise Middleware for [Vuex-FSA](https://www.npmjs.com/package/vuex-fsa) (fork of [Vuex](https://github.com/vuejs/vuex), with modifications for FSA compliant)

[![Travis](https://img.shields.io/travis/crossjs/vuex-promise.svg?style=flat-square)](https://travis-ci.org/crossjs/vuex-promise)
[![Coveralls](https://img.shields.io/coveralls/crossjs/vuex-promise.svg?style=flat-square)](https://coveralls.io/github/crossjs/vuex-promise)
[![dependencies](https://david-dm.org/crossjs/vuex-promise.svg?style=flat-square)](https://david-dm.org/crossjs/vuex-promise)
[![devDependency Status](https://david-dm.org/crossjs/vuex-promise/dev-status.svg?style=flat-square)](https://david-dm.org/crossjs/vuex-promise#info=devDependencies)
[![NPM version](https://img.shields.io/npm/v/vuex-promise.svg?style=flat-square)](https://npmjs.org/package/vuex-promise)

## Usage

### set middleware in store

``` js
import createPromise from 'vuex-promise'

export default new Vuex.Store({
  strict: __DEV__,
  ...,
  middlewares: [createPromise({
    debug: __DEV__,
    status: {
      PENDING: 'PROMISE_PENDING',
      SUCCESS: 'PROMISE_SUCCESS',
      FAILURE: 'PROMISE_FAILURE'
    },
    silent: true
  })]
})
```

### dispatch actions with promisify payloads

``` js
import { GET_BEARER, DELETE_BEARER } from '../constants'
import request from 'vuex-promise'

// some vuex actions
export default {
  getBearer ({ dispatch }, payload) {
    dispatch(GET_BEARER, request('/apis/login', {
      method: 'POST',
      body: payload
    }))
  },

  deleteBearer ({ dispatch }) {
    dispatch(DELETE_BEARER, request('/apis/user/logout', {
      method: 'DELETE'
    }))
  }
}
```

## License

[MIT](http://opensource.org/licenses/MIT)
