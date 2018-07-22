<template>
    <canvas :style="canvasStyle" :id="id" :width="W" :height="H"></canvas>
</template>

<script>
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
            W: 250,
            H: 250,
            // Variables
            degree: 0,
            new_degree: 0,
            difference: 0,
            max_degree: 180,
            new_value: 0,
            max_value: 100,
            radius: 90,
            color: 'LIGHTSEAGREEN',
            bgcolor: '#DDD',
            text: '',
            font: '40px Arial',
            text_space: 50,
            lineWidth: 30,
            animationLoop: '',
            redrawLoop: '',
            canvasStyle: {}
        }
    },
    computed: {
        controlLink() {
            return this.componentProperties.controlLink
        },
        eventName() {
            return 'eventBy_' + this.controlLink.expression.match(/\w+/)[0]
        },
        id() {
            return 'ellipse_' + this.controlLink.expression.match(/\w+/)[0]
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
            ctx.arc(this.W / 2, this.H / 2, this.radius, 0 - Math.PI, 0, false)
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
                0 - Math.PI,
                radians - Math.PI,
                false
            )
            ctx.stroke()

            // Add the text
            ctx.fillStyle = this.color
            ctx.font = this.font
            this.text =
                Math.floor(this.degree / this.max_degree * this.max_value) + '%'
            // Set the text to the center
            let text_width = ctx.measureText(this.text).width
            ctx.fillText(this.text, this.W / 2 - text_width / 2, this.H / 2)
        },
        canvasRedraw() {
            // Cancel any movement animation if a new chart is requested
            if (typeof this.animationLoop != undefined)
                clearInterval(this.animationLoop)
            // Random degree from 0 to max
            this.new_degree = Math.ceil(
                this.new_value / this.max_value * this.max_degree
            )
            this.difference = this.new_degree - this.degree
            // This will animate the gauge to new positions
            // The time animation takes for each frame is 0.1sec / difference in degree
            this.animationLoop = setInterval(
                this.animateAction,
                100 / this.difference
            )
            this.canvasInit()
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
        this.$bus.$on(this.eventName, event => {
            if (event.analogValue != null) {
                this.new_value = event.analogValue
                this.canvasRedraw()
            }
        })
    },
    mounted() {
        // Canvas Initialization is able only in mounted
        this.canvas = document.getElementById(this.id)
        this.ctx = this.canvas.getContext('2d')
        this.canvasInit()
    }
}
</script>

<style scoped>
canvas {
    position: absolute;
}
</style>
