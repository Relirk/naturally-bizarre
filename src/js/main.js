import Root from './experiments/1/index'
import Neon from './experiments/2/index'
import Atom from './experiments/3/index'
import Flow from './experiments/4/index'

const experiments = {
  'root': Root,
  'neon': Neon,
  'atom': Atom,
  'flow': Flow
}

const experimentsNames = Object.getOwnPropertyNames(experiments)
const experimentsSelected = (window.location.hash) ? window.location.hash.replace('#', '') : experimentsNames[0]

let experimentsActive

if (experiments[experimentsSelected]) {
  experimentsActive = new experiments[experimentsSelected]()
} else {
  experimentsActive = new experiments['root']()
}

window.addEventListener('hashchange', function (e) {
  const hash = window.location.hash.replace('#', '')

  if (experimentsNames.indexOf(hash) > -1) {
    experimentsActive.destroy()

    experimentsActive = new experiments[hash]()
  }
})
