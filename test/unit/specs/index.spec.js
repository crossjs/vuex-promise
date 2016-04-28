import Vue from 'vue'
import Vuex from 'vuex-fsa'
import vuexPromise from '../../../src'

Vue.use(Vuex)

describe('single payload', () => {
  let el
  let vm

  beforeEach(() => {
    el = document.createElement('div')
    el.id = 'el'
    document.body.appendChild(el)
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
        [HELLO] (state, { payload }) {
          state.message = payload
        }
      },
      middlewares: [vuexPromise({
        debug: false
      })]
    })
    vm = new Vue({
      el: '#el',
      template: '<p>hello {{message}}</p>',
      store,
      vuex: {
        getters,
        actions
      },
      watch: {
        message () {
          expect(vm.message).to.equal('words')
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
        [HELLO] (state, { payload }) {
          state.message = payload
        }
      },
      middlewares: [vuexPromise({
        debug: false
      })]
    })
    vm = new Vue({
      el: '#el',
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
    vm.sendMessage(Promise.reject('wards'))
  })

  afterEach(() => {
    vm.$destroy()
  })

  after(() => {
    document.body.removeChild(el)
  })
})

describe('multiple payloads', () => {
  let el
  let vm

  beforeEach(() => {
    el = document.createElement('div')
    el.id = 'el'
    document.body.appendChild(el)
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
      middlewares: [vuexPromise({
        debug: false
      })]
    })
    vm = new Vue({
      el: '#el',
      template: '<p>hello {{message}}</p>',
      store,
      vuex: {
        getters,
        actions
      },
      watch: {
        message () {
          expect(vm.message).to.equal('words words1 words2')
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
      middlewares: [vuexPromise({
        debug: false
      })]
    })
    vm = new Vue({
      el: '#el',
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

  afterEach(() => {
    vm.$destroy(true)
  })
})
