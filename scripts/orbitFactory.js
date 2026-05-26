import { getSetting } from './settings.js'
import { ORBIT_SHAPES, SETTING } from './config.js'

export class OrbitFactory {
    static create(shape, radius, spacing) {
        const startAngle = (Math.PI / 180) * getSetting(SETTING.ORBIT_START_ANGLE)
        const isReverse = getSetting(SETTING.ORBIT_REVERSE_DIRECTION)

        switch (shape) {
            case ORBIT_SHAPES.SQUARE:
                return new SquareOrbit(radius, spacing, startAngle, isReverse)
            case ORBIT_SHAPES.HEXAGON:
                return new HexagonOrbit(radius, spacing, startAngle, isReverse, false)
            case ORBIT_SHAPES.FLAT_HEXAGON:
                return new HexagonOrbit(radius, spacing, startAngle, isReverse, true)
            case ORBIT_SHAPES.CIRCLE:
            default:
                return new CircleOrbit(radius, spacing, startAngle, isReverse)
        }
    }
}

class BaseOrbit {
    constructor(radius, spacing, startAngle, isReverse) {
        this.radius = radius
        this.spacing = spacing
        this.startAngle = startAngle
        this.isReverse = isReverse

        this.perimeter = this._getPerimeter()
        this.maxIcons = Math.max(1, Math.floor(this.perimeter / this.spacing))
    }

    getPoints(remainingCount) {
        const count = Math.min(remainingCount, this.maxIcons)
        const points = []

        for (let i = 0; i < count; i++) {
            let progress = i / this.maxIcons
            if (this.isReverse) progress = 1 - progress

            let angleProgress = this.startAngle / (2 * Math.PI)
            progress = (progress + angleProgress) % 1.0
            if (progress < 0) progress += 1.0

            let pt = this._getPositionOnPerimeter(progress)

            points.push(pt)
        }

        return { points, consumed: count }
    }

    _getPerimeter() {
        throw new Error('Method _getPerimeter() must be implemented')
    }

    _getPositionOnPerimeter(progress) {
        throw new Error('Method _getPositionOnPerimeter() must be implemented')
    }
}

class CircleOrbit extends BaseOrbit {
    _getPerimeter() {
        return 2 * Math.PI * this.radius
    }
    _getPositionOnPerimeter(progress) {
        const angle = progress * 2 * Math.PI

        return {
            x: Math.cos(angle) * this.radius,
            y: -Math.sin(angle) * this.radius,
        }
    }
}

class SquareOrbit extends BaseOrbit {
    _getPerimeter() {
        return this.radius * 8
    }
    _getPositionOnPerimeter(progress) {
        const side = this.radius * 2
        const totalDist = (progress * this.perimeter + side / 2) % this.perimeter

        if (totalDist < side) return { x: this.radius, y: this.radius - totalDist }
        if (totalDist < side * 2) return { x: this.radius - (totalDist - side), y: -this.radius }
        if (totalDist < side * 3) return { x: -this.radius, y: -this.radius + (totalDist - side * 2) }
        return { x: -this.radius + (totalDist - side * 3), y: this.radius }
    }
}

class HexagonOrbit extends BaseOrbit {
    constructor(radius, spacing, startAngle, isReverse, isFlat) {
        super(radius, spacing, startAngle, isReverse)
        this.isFlat = isFlat
        this.vertices = this._buildVertices()
    }

    _getPerimeter() {
        return this.radius * 6
    }

    _buildVertices() {
        const baseHexAngle = this.isFlat ? 0 : Math.PI / 6
        const verts = []
        for (let v = 0; v < 6; v++) {
            const alpha = baseHexAngle + (v * Math.PI) / 3
            verts.push({ x: Math.cos(alpha) * this.radius, y: -Math.sin(alpha) * this.radius })
        }
        return verts
    }

    _getPositionOnPerimeter(progress) {
        let fixedProgress = progress
        if (!this.isFlat) {
            fixedProgress = (progress - 1 / 12) % 1
            if (fixedProgress < 0) fixedProgress += 1
        }

        const positionOnPerimeter = fixedProgress * 6
        const segmentIndex = Math.floor(positionOnPerimeter) % 6
        const segmentProgress = positionOnPerimeter - Math.floor(positionOnPerimeter)

        const p1 = this.vertices[segmentIndex]
        const p2 = this.vertices[(segmentIndex + 1) % 6]

        return {
            x: p1.x + (p2.x - p1.x) * segmentProgress,
            y: p1.y + (p2.y - p1.y) * segmentProgress,
        }
    }
}
