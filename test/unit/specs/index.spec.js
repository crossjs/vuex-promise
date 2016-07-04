import Vue from 'vue'
import Vuex from 'vuex'
import vuexPromise from '../../../src'

Vue.use(Vuex)

describe('single payload', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    document.body.removeChild(el)
  })

  it('with resolve', done => {
    const HELLO = 'H-E-L-L-O'
    const getters = {
      message ({ message }) {
        return message
      }
    }
    const actions = {
      sendMessage ({ dispatch }, payload) {
        dispatch(HELLO, payload)
      }
    }
    const store = new Vuex.Store({
      state: {
        message: 'world'
      },
      mutations: {
        [HELLO] (state, { payload, meta }) {
          if (meta === 1) {
            // success
            state.message = payload
          }
        }
      },
      plugins: [vuexPromise({
        debug: false
      })]
    })
    const vm = new Vue({
      el,
      replace: false,
      template: '<p>hello {{message}}</p>',
      store,
      vuex: {
        getters,
        actions
      },
      watch: {
        message () {
          expect(this.message).to.equal('words')
          done()
        }
      }
    })
    expect(vm.message).to.equal('world')
    vm.sendMessage(Promise.resolve('words'))
  })

  it('with reject', done => {
    const HELLO = 'H-E-L-L-O'
    const getters = {
      message ({ message }) {
        return message
      }
    }
    const actions = {
      sendMessage ({ dispatch }, payload) {
        dispatch(HELLO, payload)
      }
    }
    const store = new Vuex.Store({
      state: {
        message: 'world'
      },
      mutations: {
        [HELLO] (state, { payload, meta }) {
          if (meta === 2) {
            state.message = payload
          }
        }
      },
      plugins: [vuexPromise({
        debug: false
      })]
    })
    const vm = new Vue({
      el,
      replace: false,
      template: '<p>hello {{message}}</p>',
      store,
      vuex: {
        getters,
        actions
      },
      watch: {
        message () {
          expect(this.message).to.equal('wards')
          done()
        }
      }
    })
    expect(vm.message).to.equal('world')
    vm.sendMessage(Promise.reject('wards'))
  })
})

describe('multiple payloads', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    document.body.removeChild(el)
  })

  it('with resolve', done => {
    const HELLO = 'H-E-L-L-O'
    const getters = {
      message ({ message }) {
        return message
      }
    }
    const actions = {
      sendMessage ({ dispatch }, ...payload) {
        dispatch(HELLO, ...payload)
      }
    }
    const store = new Vuex.Store({
      state: {
        message: 'world'
      },
      mutations: {
        [HELLO] (state, { payload, meta }) {
          if (meta === 1) {
            state.message = payload.join(' ')
          }
        }
      },
      plugins: [vuexPromise({
        debug: false
      })]
    })
    const vm = new Vue({
      el,
      replace: false,
      template: '<p>hello {{message}}</p>',
      store,
      vuex: {
        getters,
        actions
      },
      watch: {
        message () {
          expect(this.message).to.equal('words words1 words2')
          done()
        }
      }
    })
    expect(vm.message).to.equal('world')
    vm.sendMessage(Promise.resolve('words'), 'words1', 'words2')
  })

  it('with reject', done => {
    const HELLO = 'H-E-L-L-O'
    const getters = {
      message ({ message }) {
        return message
      }
    }
    const actions = {
      sendMessage ({ dispatch }, payload) {
        dispatch(HELLO, payload)
      }
    }
    const store = new Vuex.Store({
      state: {
        message: 'world'
      },
      mutations: {
        [HELLO] (state, { payload, meta, error }) {
          if (error) {
            expect(meta).to.equal(2)
            state.message = payload
          }
        }
      },
      plugins: [vuexPromise({
        debug: false
      })]
    })
    const vm = new Vue({
      el,
      replace: false,
      template: '<p>hello {{message}}</p>',
      store,
      vuex: {
        getters,
        actions
      },
      watch: {
        message () {
          expect(vm.message).to.equal('wards')
          done()
        }
      }
    })
    expect(vm.message).to.equal('world')
    vm.sendMessage(Promise.reject('wards'), 'wards1', 'wards2')
  })
})
