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



    </div>
</template>

<script>
import ProductCard from "../components/ProductCard";

export default {
  name: "ProductTester",
  data() {
    return {
      madeFrom: "Taiwan",
      product: {
        name: "Big Pen",
        description: "What a nice pen!",
        price: 99.12
      }
    };
  },
  methods: {
    showMoreInfo: function(id) {
      console.log(id);
    },
    onMadeFromChanged: function(updateMadeFrom) {
      this.madeFrom = updateMadeFrom;
    }
  },
  components: {
    ProductCard
  }
};
</script>

<style scoped lang="scss">
.props-tester {
  width: 500px;
  margin-left: 200px;
}
</style>
