<template>
    <div class="props-tester">

        <div class="container">
            <form>
                <div class="form-group row">
                    <label class="col-sm-4 form-control-label">Made From</label>
                    <div class="col-sm-8">
                        <input type="text" v-model="madeFrom" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-4 form-control-label">Product Name</label>
                    <div class="col-sm-8">
                        <input type="text" v-model="product.name" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-4 form-control-label">Product Price</label>
                    <div class="col-sm-8">
                        <input type="text" v-model="product.price" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-4 form-control-label">Product Desc</label>
                    <div class="col-sm-8">
                        <input type="text" v-model="product.description" class="form-control">
                    </div>
                </div>

            </form>
        </div>

        <!--使用 ProductCard 子組件 -->
        <product-card v-bind:made-from="madeFrom" :product="product" :more-info="showMoreInfo" v-on:madeFromChanged="onMadeFromChanged"></product-card>

        <canvas id="cvs" width="800" height="600" style="border: solid 1px #000000"></canvas>

    </div>
</template>

<script>
import ProductCard from '@/components/ui/ProductCard'

export default {
    name: 'ProductTester',
    data() {
        return {
            madeFrom: 'Taiwan',
            product: {
                name: 'Big Pen',
                description: 'What a nice pen!',
                price: 99.12
            }
        }
    },
    methods: {
        showMoreInfo: function(id) {
            console.log(id)
        },
        onMadeFromChanged: function(updateMadeFrom) {
            this.madeFrom = updateMadeFrom
        },
        canvasDraw: function() {
            var cvs = document.querySelector('#cvs')
            // var cts = cvs.getContext("webgl") // 3D繪圖
            var ctx = cvs.getContext('2d')
            // Fill
            ctx.fillStyle = 'red'
            ctx.globalAlpha = 0.5
            ctx.fillRect(50, 20, 150, 200)
            // Stroke
            ctx.strokeStyle = 'green'
            ctx.strokeRect(200, 300, 300, 100)
            // Path
            ctx.beginPath()
            ctx.moveTo(300, 500)
            ctx.lineTo(350, 550)
            ctx.lineTo(400, 300)
            ctx.closePath()
            ctx.stroke()
            // Circle
            ctx.beginPath()
            ctx.arc(500, 50, 40, 0, 2 * Math.PI)
            ctx.stroke()
            // Text
            ctx.font = '30px Consolas'
            ctx.fillText('Hello Canvas', 20, 400)
            ctx.strokeText('Hello Canvas', 20, 430)
        }
    },
    components: {
        ProductCard
    },
    mounted: function() {
        this.canvasDraw()
    }
}
</script>

<style scoped lang="scss">
.props-tester {
    width: 500px;
    margin-left: 200px;
}
</style>
