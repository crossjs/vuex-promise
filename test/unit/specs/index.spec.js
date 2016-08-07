import Vue from 'vue'
import Vuex, { mapGetters, mapActions } from 'vuex'
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
    const store = new Vuex.Store({
      state: {
        message: 'world'
      },
      getters: {
        message: state => state.message
      },
      actions: {
        sendMessage ({ commit }, payload) {
          commit(HELLO, payload)
        }
      },
      mutations: {
        [HELLO] (state, { payload, meta }) {
          if (meta && meta.promise === 1) {
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
      computed: mapGetters(['message']),
      methods: mapActions(['sendMessage']),
      watch: {
        message (val) {
          expect(val).to.equal('words')
          done()
        }
      }
    })
    expect(vm.message).to.equal('world')
    vm.sendMessage(Promise.resolve('words'))
  })

  it('with reject', done => {
    const HELLO = 'H-E-L-L-O'
    const store = new Vuex.Store({
      state: {
        message: 'world'
      },
      getters: {
        message: state => state.message
      },
      actions: {
        sendMessage ({ commit }, payload) {
          commit(HELLO, payload)
        }
      },
      mutations: {
        [HELLO] (state, { payload, meta }) {
          if (meta && meta.promise === 2) {
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
      computed: mapGetters(['message']),
      methods: mapActions(['sendMessage']),
      watch: {
        message (val) {
          expect(val).to.equal('wards')
          done()
        }
      }
    })
    expect(vm.message).to.equal('world')
    vm.sendMessage(Promise.reject('wards'))
  })
})

describe('multiple payloads will ONLY accept first', () => {
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
    const store = new Vuex.Store({
      state: {
        message: 'world'
      },
      getters: {
        message: state => state.message
      },
      actions: {
        sendMessage ({ commit }, ...payload) {
          commit(HELLO, ...payload)
        }
      },
      mutations: {
        [HELLO] (state, { payload, meta }) {
          if (meta && meta.promise === 1) {
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
      computed: mapGetters(['message']),
      methods: mapActions(['sendMessage']),
      watch: {
        message (val) {
          expect(val).to.equal('words')
          done()
        }
      }
    })
    expect(vm.message).to.equal('world')
    vm.sendMessage(Promise.resolve('words'), 'words1', 'words2')
  })

  it('with reject', done => {
    const HELLO = 'H-E-L-L-O'
    const store = new Vuex.Store({
      state: {
        message: 'world'
      },
      getters: {
        message: state => state.message
      },
      actions: {
        sendMessage ({ commit }, payload) {
          commit(HELLO, payload)
        }
      },
      mutations: {
        [HELLO] (state, { payload, meta, error }) {
          if (error) {
            expect(meta.promise).to.equal(2)
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
      computed: mapGetters(['message']),
      methods: mapActions(['sendMessage']),
      watch: {
        message (val) {
          expect(val).to.equal('wards')
          done()
        }
      }
    })
    expect(vm.message).to.equal('world')
    vm.sendMessage(Promise.reject('wards'), 'wards1', 'wards2')
  })
})
