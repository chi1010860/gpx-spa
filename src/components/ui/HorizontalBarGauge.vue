<template>
	<canvas v-bind:id="id" v-bind:width="W" v-bind:height="H"></canvas>
</template>

<script>
export default {
    name: 'HorizontalBarGauge',
    data() {
        return {
            // Canvas Initialization
            id: 'HorizontalBarGauge',
            canvas: {},
            ctx: {},
            // Dimensions
            W: 200,
            H: 200,
            // Variables
            level: 0,
            new_level: 0,
            difference: 0,
            max_level: 0,
            color: 'LIGHTSEAGREEN',
            bgcolor: '#DDD',
            text: '',
            font: '40px Arial',
            text_space: 50,
            line_width: 30,
            animationLoop: '',
            redrawLoop: ''
        }
    },
    methods: {
        init() {
            // Clear the canvas everytime when a chart is drawn
            var ctx = this.ctx
            ctx.clearRect(0, 0, this.W, this.H)

            // Initial variables
            this.max_level = this.H
            this.start_level = this.H - this.text_space

            // Background bar
            ctx.beginPath()
            ctx.strokeStyle = this.bgcolor
            ctx.lineWidth = this.line_width
            ctx.moveTo(0, this.H / 2)
            ctx.lineTo(this.W, this.H / 2)
            ctx.stroke()

            // Draw the level of bar value
            ctx.beginPath()
            ctx.strokeStyle = this.color
            ctx.lineWidth = this.line_width
            ctx.moveTo(0, this.H / 2)
            ctx.lineTo(this.level, this.H / 2)
            ctx.stroke()

            // Add the text
            ctx.fillStyle = this.color
            ctx.font = this.font
            this.text = Math.floor(this.level / this.max_level * 100) + '%'
            // Set the text to the center
            let text_width = ctx.measureText(this.text).width
            ctx.fillText(
                this.text,
                this.W / 2 - text_width / 2,
                this.H / 2 + this.text_space
            )
        },
        draw() {
            // Cancel any movement animation if a new chart is requested
            if (typeof this.animationLoop != undefined)
                clearInterval(this.animationLoop)
            // Random level from 0 to max
            this.new_level = Math.round(Math.random() * this.max_level)
            this.difference = this.new_level - this.level
            // This will animate the gauge to new positions
            // The time animation takes for each frame is 1sec / difference in level
            this.animationLoop = setInterval(
                this.animateAction,
                1000 / this.difference
            )
        },
        animateAction() {
            if (this.level == this.new_level) clearInterval(this.animationLoop)
            else if (this.level < this.new_level) this.level++
            else this.level--

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
