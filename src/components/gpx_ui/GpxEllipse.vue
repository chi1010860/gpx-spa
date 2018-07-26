<template>
    <canvas :style="canvasStyle" :id="id" :width="W" :height="H"></canvas>
</template>

<script>
import gURL from '@/router/url'
import io from 'socket.io-client'

var io_slider = io.connect(gURL + '/slider')

export default {
    props: {
        componentProperties: {}
    },
    data() {
        return {
            // Canvas Initialization
            canvas: {},
            ctx: {},
            // Dimensions
            W: 200,
            H: 200,
            // Variables
            degree: 0,
            new_degree: 0,
            difference: 0,
            max_degree: 360,
            new_value: 0,
            max_value: 100,
            radius: 50,
            color: '#0080FF',
            bgcolor: '#DDD',
            lineWidth: 100,
            animationLoop: '',
            redrawLoop: '',
            canvasStyle: {}
        }
    },
    computed: {
        controlLink() {
            if (this.componentProperties.controlLink != null) {
                return this.componentProperties.controlLink
            } else if (this.componentProperties['control-link'] != null) {
                return this.componentProperties['control-link'][0]
            } else {
                return ''
            }
        },
        eventName() {
            return 'eventBy_' + this.controlLink.expression.match(/\w+/)[0]
        },
        id() {
            return 'ellipse_' + this.controlLink.expression.match(/\w+/)[0]
        },
        uTagname() {
            return parseInt(this.controlLink.expression.match(/\d+/)[0])
        }
    },
    methods: {
        componentInit() {
            let rect = this.componentProperties.rect
            this.canvasStyle = {
                left: rect[0] + 'px',
                top: rect[1] + 'px',
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px'
            }
        },
        canvasInit() {
            // Clear the canvas everytime when a chart is drawn
            var ctx = this.ctx
            ctx.clearRect(0, 0, this.W, this.H)

            // Background arc
            ctx.beginPath()
            ctx.strokeStyle = this.bgcolor
            ctx.lineWidth = this.lineWidth
            ctx.arc(this.W / 2, this.H / 2, this.radius, 0, 2 * Math.PI, false)
            ctx.stroke()

            // Draw the degree of arc value
            var radians = this.degree * Math.PI / 180
            ctx.beginPath()
            ctx.strokeStyle = this.color
            ctx.lineWidth = this.lineWidth
            ctx.arc(
                this.W / 2,
                this.H / 2,
                this.radius,
                0 - 90 * Math.PI / 180,
                radians - 90 * Math.PI / 180,
                false
            )
            ctx.stroke()
        },
        canvasRedraw() {
            // Cancel any movement animation if a new chart is requested
            if (typeof this.animationLoop != undefined)
                clearInterval(this.animationLoop)
            // Get degree from 0 to max
            this.new_degree = Math.ceil(
                this.new_value / this.max_value * this.max_degree
            )
            this.difference = this.new_degree - this.degree
            // This will animate the gauge to new positions
            // The time animation takes for each frame is 1sec / difference in degree
            this.animationLoop = setInterval(
                this.animateAction,
                100 / this.difference
            )
        },
        animateAction() {
            if (this.degree == this.new_degree)
                clearInterval(this.animationLoop)
            else if (this.degree < this.new_degree) this.degree++
            else this.degree--

            this.canvasInit()
        }
    },
    created() {
        this.componentInit()

        io_slider.on('sliderUpdate' + this.uTagname, data => {
            this.new_value = data.analogValue
            this.canvasRedraw()
        })
    },
    mounted() {
        // Canvas Initialization is only able in mounted
        this.canvas = document.getElementById(this.id)
        this.ctx = this.canvas.getContext('2d')
        this.canvasInit()
    },
    beforeDestroy() {
        this.$bus.$off(this.eventName)
    }
}
</script>

<style scoped>
canvas {
    position: absolute;
}
</style>
