import { constrain, map } from '../../lib/math'
import { noise, noiseSeed } from '../../lib/perlin'

// import Cell from './Cell'
import Vector from '../../classes/Vector'

noiseSeed(Math.floor(Math.random() * 100))

export default class Field {
  constructor () {
    this.resolution = 10

    this.columns = Math.ceil(window.innerWidth / this.resolution)
    this.rows = Math.ceil(window.innerHeight / this.resolution)

    this.field = []

    for (let i = this.columns; i >= 0; i--) {
      this.field.push([])
    }

    console.log(this.field)

    this.noise = 0

    this.create()
  }

  create () {
    for (let i = 0, x = 0; i < this.columns; i++) {
      for (let j = 0, y = 0; j < this.rows; j++) {
        const angle = map(noise(x, y, this.noise), 0, 1, 0, Math.PI * 2)

        // this.cell[i][j] = new Cell(i, j, angle)
        this.field[i][j] = new Vector(Math.cos(angle), Math.sin(angle))

        y += 0.1
      }

      x += 0.1
    }
  }

  update () {
    for (let i = 0, x = 0; i < this.columns; i++) {
      for (let j = 0, y = 0; j < this.rows; j++) {
        const angle = map(noise(x, y, this.noise), 0, 1, 0, Math.PI * 2)

        // this.cell[i][j].update(angle)
        this.field[i][j].set(Math.cos(angle), Math.sin(angle))

        y += 0.1
      }

      x += 0.1
    }

    this.noise += 0.01
  }

  draw (context) {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        // this.cell[i][j].draw(context)
      }
    }
  }

  lookup (position) {
    const column = Math.floor(constrain(position.x / this.resolution, 0, this.columns - 1))
    const row = Math.floor(constrain(position.y / this.resolution, 0, this.rows - 1))

    return this.field[column][row].copy()
  }
}
