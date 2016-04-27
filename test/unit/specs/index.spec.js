import Vue from 'vue'
import Vuex from 'vuex-fsa'
import vuexPromise from '../../../src'

Vue.use(Vuex)

describe('Promise', () => {
  before(() => {
    const el = document.createElement('div')
    el.id = 'el'
    document.body.appendChild(el)
  })

  it('should render correct contents', done => {
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
    const vm = new Vue({
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
})
