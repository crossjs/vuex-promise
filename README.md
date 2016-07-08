# VUEX-PROMISE

> :two_hearts: A Promise Plugin for [Vuex](https://github.com/vuejs/vuex), compatible with 2.0.0-rc

[![Travis](https://img.shields.io/travis/crossjs/vuex-promise.svg?style=flat-square)](https://travis-ci.org/crossjs/vuex-promise)
[![Coveralls](https://img.shields.io/coveralls/crossjs/vuex-promise.svg?style=flat-square)](https://coveralls.io/github/crossjs/vuex-promise)
[![dependencies](https://david-dm.org/crossjs/vuex-promise.svg?style=flat-square)](https://david-dm.org/crossjs/vuex-promise)
[![devDependency Status](https://david-dm.org/crossjs/vuex-promise/dev-status.svg?style=flat-square)](https://david-dm.org/crossjs/vuex-promise#info=devDependencies)
[![NPM version](https://img.shields.io/npm/v/vuex-promise.svg?style=flat-square)](https://npmjs.org/package/vuex-promise)

## Usage

### set plugin in store

``` js
import createPromise from 'vuex-promise'

export default new Vuex.Store({
  strict: __DEV__,
  ...,
  plugins: [createPromise({
    debug: __DEV__,
    status: {
      PENDING: 'PROMISE_PENDING',
      SUCCESS: 'PROMISE_SUCCESS',
      FAILURE: 'PROMISE_FAILURE'
    },
    silent: false
  })]
})
```

### set module

``` js
import request from 'plato-request'

import {
  GET_COMMITS
} from '../types'

import {
  PROMISE_SUCCESS
} from '../constants'

const state = {
  commits: null
}

const getters = {
  commits: state => state.commits
}

const actions = {
  getCommits ({ commit }, payload) {
    commit(GET_COMMITS, request('{base}/commits?sha=', {
      params: {
        base: 'https://api.github.com/repos/crossjs/plato'
      },
      query: {
        per_page: 3
      },
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    }))
  }
}

const mutations = {
  [GET_COMMITS] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.commits = payload
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
```

### handle payloads in module mutations

``` js
import { GET_COMMITS } from '../types'
import { PROMISE_SUCCESS } from '../constants'

const state = {
  commits: null
}

const mutations = {
  [GET_COMMITS] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.commits = payload
    }
  }
}

export default {
  state,
  mutations
}
```

## License

[MIT](http://opensource.org/licenses/MIT)
