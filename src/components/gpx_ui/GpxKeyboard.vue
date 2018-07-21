<template>
    <div class="gpx-keyboard">
        <div v-if="keyboardType.typeNumber" class="line-number" v-for="(line, i) in layoutNumber" :key="'line'+i">
            <button class="button-number" v-for="(unit, j) in line" :key="'bn'+j" @click="keySomething(unit)">{{unit}}</button>
        </div>
        <div v-if="keyboardType.typeString" class="line-string" v-for="(line, i) in layoutString" :key="'line'+i">
            <button class="button-string" v-for="(unit, j) in line" :key="'bs'+j" @click="keySomething(unit)">{{unit}}</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        keyboardType: {}
    },
    data() {
        return {
            layoutNumber: [
                ['7', '8', '9'],
                ['4', '5', '6'],
                ['1', '2', '3'],
                ['0', '.', '⬅']
            ],
            normal: [
                ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
                ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', "'"],
                ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
                ['↕', 'spa', '⬅']
            ],
            shift: [
                ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
                ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '"'],
                ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '/'],
                ['↕', 'spa', '⬅']
            ],
            stringType: false
        }
    },
    computed: {
        layoutString() {
            return this.stringType ? this.shift : this.normal
        }
    },
    methods: {
        keySomething(unit) {
            if (unit == '↕') {
                this.stringType = !this.stringType
                unit = ''
            } else if (unit == 'spa') {
                unit = ' '
            }
            this.$emit('keying', unit)
        }
    }
}
</script>

<style scoped>
* {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.gpx-keyboard {
    margin: 10px 0px 10px 0px;
}
.line-number {
    width: 340px;
    height: 52px;
}
.line-string {
    width: 340px;
    height: 35px;
}
.button-number {
    width: 50px;
    height: 50px;
}
.button-string {
    width: 33px;
    height: 33px;
}
</style>
