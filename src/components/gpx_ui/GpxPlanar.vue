
<template>
    <div class="planar-wrapper" :style="wrapper.wrapperStyle">
        <div class="planar" :style="planar.planarStyle">
            <div class="square" :style="square.squareStyle"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        componentProperties: {}
    },
    data() {
        return {
            controlLink: [],
            eventName: [],
            output: {
                maxValue: 100,
                minValue: 0,
                outputValue: []
            },
            wrapper: {
                wrapperStyle: {}
            },
            planar: {
                planarStyle: {},
                planarWidth: 100,
                planarHeight: 100
            },
            square: {
                squareStyle: {},
                squareWidth: 10,
                squareHeight: 10
            }
        }
    },
    methods: {
        componentInit() {
            this.controlLink = this.componentProperties['control-link'] // X:0, Y:1
            this.eventName[0] = 'eventBy_' + this.controlLink[0].tagname
            this.eventName[1] = 'eventBy_' + this.controlLink[1].tagname
            let rect = this.componentProperties.rect
            this.wrapper.wrapperStyle = {
                left: rect[0] + 'px',
                top: rect[1] + 'px'
            }
            this.planar.planarStyle = {
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px'
            }
            this.square.squareStyle = {
                width: this.square.squareWidth + 'px',
                height: this.square.squareHeight + 'px'
            }
        },
        // Draggagle Element
        dragElement(_square) {
            let vm = this
            let rect = this.componentProperties.rect
            let posOffsetX = 0,
                posOffsetY = 0,
                lastPosX = 0,
                lastPosY = 0
            let originX = 0,
                originY = 0
            let planarWidth = this.planar.planarWidth,
                planarHeight = this.planar.planarHeight,
                squareWidth = this.square.squareWidth,
                squareHeight = this.square.squareHeight
            let maxOffsetLeft = planarWidth - squareWidth,
                maxOffsetTop = planarHeight - squareHeight
            if (_square) {
                /* if present, the header is where you move the DIV from:*/
                _square.onmousedown = dragMouseDown
            } else {
                /* otherwise, move the DIV from anywhere inside the DIV:*/
                _square.onmousedown = dragMouseDown
            }

            function dragMouseDown(e) {
                e = e || window.event
                // get the mouse cursor position at startup:
                lastPosX = e.clientX
                lastPosY = e.clientY
                document.onmouseup = closeDragElement
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag
            }

            function elementDrag(e) {
                e = e || window.event
                // calculate the new cursor position:
                posOffsetX = lastPosX - e.clientX
                posOffsetY = lastPosY - e.clientY
                lastPosX = e.clientX
                lastPosY = e.clientY
                // set the element's new position:
                // Depends on the width and height of "Planar"
                // // X
                if (_square.offsetLeft < originX) {
                    _square.style.left = originX + 'px'
                } else if (_square.offsetLeft > originX + maxOffsetLeft) {
                    _square.style.left = originX + maxOffsetLeft + 'px'
                } else {
                    _square.style.left = _square.offsetLeft - posOffsetX + 'px'
                }

                // // Y
                if (_square.offsetTop < originY) {
                    _square.style.top = originY + 'px'
                } else if (_square.offsetTop > originY + maxOffsetTop) {
                    _square.style.top = originY + maxOffsetTop + 'px'
                } else {
                    _square.style.top = _square.offsetTop - posOffsetY + 'px'
                }

                vm.output.outputValue[0] = analogMapping(
                    _square.offsetLeft,
                    maxOffsetLeft
                )
                vm.output.outputValue[1] = analogMapping(
                    _square.offsetTop,
                    maxOffsetTop
                )

                for (let i in vm.eventName) {
                    vm.$bus.$emit(vm.eventName[i], {
                        analogValue: vm.output.outputValue[i]
                    })
                }
            }

            function analogMapping(pos, range) {
                let max = vm.output.maxValue
                let min = vm.output.minValue
                let result = pos * (max - min) / range
                result = Math.round(result)
                if (result < min) result = min
                else if (result > max) result = max
                return result
            }

            function closeDragElement() {
                /* stop moving when mouse button is released:*/
                document.onmouseup = null
                document.onmousemove = null
            }
        }
    },
    created() {
        this.componentInit()
    },
    mounted() {
        let squares = document.getElementsByClassName('square')
        for (let i = 0; i < squares.length; i++) {
            this.dragElement(squares[i])
        }
    }
}
</script>

<style scoped>
.planar-wrapper {
    position: absolute;
    left: 340px;
    top: 283px;
    width: 100px;
    display: inline-block;
    vertical-align: middle;
}

.square {
    position: absolute;
    z-index: 9;
    width: 10px;
    height: 10px;
    cursor: pointer;
    background-color: #8c8c8c;
    text-align: center;
}

.planar {
    position: relative;
    width: 100px;
    height: 100px;
    background-color: #cccccc;
    border: 1px solid gray;
}
</style>

