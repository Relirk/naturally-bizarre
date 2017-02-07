import { randomInt } from '../../lib/random'

import Experiments from '../../classes/Experiments'
import Mover from './Mover'

export default class Atom extends Experiments {
  constructor () {
    super()

    this.movers = null
    this.moversLength = null
    this.moversColor = null
    this.moversMultiply = null

    this.createMovers()

    this.update()
  }

  createMover () {
    const x = randomInt(0, window.innerWidth)
    const y = randomInt(0, window.innerHeight)
    const radius = randomInt(1, 5)
    const color = this.colors[this.moversColor][randomInt(0, this.colors.length - 1)]

    const mover = new Mover(x, y, radius, color)

    this.movers.push(mover)
  }

  createMovers () {
    this.movers = []
    this.moversLength = 250
    this.moversColor = randomInt(0, this.colors.length - 1)
    this.moversMultiply = 1

    for (let i = 0; i <= this.moversLength; i++) {
      this.createMover()
    }
  }

  update () {
    super.update()

    this.stats.begin()

    this.movers.forEach((mover, index) => {
      mover.update(this.mouse, this.moversMultiply)
      mover.draw(this.context)
    })

    this.context.globalAlpha = 1
    this.context.globalCompositeOperation = 'source-over'

    this.context.fillStyle = 'rgba(0, 0, 0, 0.1)'
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)

    this.stats.end()
  }

  dblclick () {
    super.dblclick()

    this.createMovers()
  }

  mousedown () {
    super.mousedown()

    this.moversMultiply *= -1
  }

  mouseup () {
    super.mouseup()

    this.moversMultiply *= -1
  }

  resize () {
    super.resize()

    this.createMovers()
  }
}
