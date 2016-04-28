# vuex-promise
[![Travis](https://img.shields.io/travis/crossjs/vuex-promise.svg?style=flat-square)](https://github.com/crossjs/vuex-promise)
[![Coveralls](https://img.shields.io/coveralls/crossjs/vuex-promise.svg?style=flat-square)](https://github.com/crossjs/vuex-promise)
[![NPM version](https://img.shields.io/npm/v/vuex-promise.svg?style=flat-square)](https://npmjs.org/package/vuex-promise)


### Introduction

A promise middleware for [Vuex-FSA](https://www.npmjs.com/package/vuex-fsa)

`Vuex-FSA` is a fork of [Vuex](https://github.com/vuejs/vuex), with modifications for FSA compliant

``` js
import { GET_BEARER, DELETE_BEARER } from '../constants'
import { POST, DELETE } from 'utils/ajax'

// POST and DELETE based on fetch, return promises

// some vuex actions
export default {
  getBearer ({ dispatch }, payload) {
    dispatch(GET_BEARER, POST('/apis/login', {
      body: payload
    }))
  },

  deleteBearer ({ dispatch }) {
    dispatch(DELETE_BEARER, DELETE('/apis/user/logout'))
  }
}
```

### Development Setup

``` bash
# install deps
npm install

# build dist files
npm run build

# lint & run all tests
npm test

# run unit tests only
npm run unit
```

## License

[MIT](http://opensource.org/licenses/MIT)
