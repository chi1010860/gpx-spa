<template>
	<canvas v-bind:id="id" v-bind:width="W" v-bind:height="H"></canvas>
</template>

<script>
export default {
    name: 'FullGauge',
    data() {
        return {
            // Canvas Initialization
            id: 'FullGauge',
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
            radius: 70,
            color: 'LIGHTSEAGREEN',
            bgcolor: '#DDD',
            text: '',
            font: '40px Arial',
            text_space: 50,
            lineWidth: 30,
            animationLoop: '',
            redrawLoop: ''
        }
    },
    methods: {
        init() {
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

            // Add the text
            ctx.fillStyle = this.color
            ctx.font = this.font
            this.text = Math.floor(this.degree / this.max_degree * 100) + '%'
            // Set the text to the center
            let text_width = ctx.measureText(this.text).width
            ctx.fillText(
                this.text,
                this.W / 2 - text_width / 2,
                this.H / 2 + 15
            )
        },
        draw() {
            // Cancel any movement animation if a new chart is requested
            if (typeof this.animationLoop != undefined)
                clearInterval(this.animationLoop)
            // Random degree from 0 to max
            this.new_degree = Math.round(Math.random() * this.max_degree)
            this.difference = this.new_degree - this.degree
            // This will animate the gauge to new positions
            // The time animation takes for each frame is 1sec / difference in degree
            this.animationLoop = setInterval(
                this.animateAction,
                1000 / this.difference
            )
        },
        animateAction() {
            if (this.degree == this.new_degree)
                clearInterval(this.animationLoop)
            else if (this.degree < this.new_degree) this.degree++
            else this.degree--

            this.init()
        }
    },
    mounted() {
        // Canvas Initialization
        this.canvas = document.getElementById(this.id)
        this.ctx = this.canvas.getContext('2d')

        // Invoke the animation
        this.draw()
        this.redrawLoop = setInterval(this.draw, 1000)
    }
}
</script>

<style scoped>
</style>
