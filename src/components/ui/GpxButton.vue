<template>
    <button @mousedown="controllinkCheckType(controlLink)">{{ controlLink.msg }}</button>
</template>

<script>
export default {
    name: 'GpxButton',
    props: {
        controlLink: {
            msg: '',
            type: '',
            discrete: '',
            tagname: ''
        }
    },
    data() {
        return {
            state: false
        }
    },
    methods: {
        controllinkCheckType(_controlLink) {
            if (_controlLink.type == 'discrete') {
                if (_controlLink.discrete == 'direct') {
                    this.directClick()
                }
            } else {
                console.log('Please check _controlLink.')
            }
        },
        directClick() {
            console.log('directClick')
        },
        reverseClick() {
            console.log('reverseClick')
        },
        toggleClick() {
            console.log('toggleClick')
        },
        setClick() {
            console.log('setClick')
        },
        resetClick() {
            console.log('resetClick')
        }
    }
}
</script>

<style scoped>
button {
    width: 100px;
    height: 50px;
}
</style>
