<template>
	<div class="switchSet">
		<div class="switchText">Port {{ portNumber }}:</div>
		<label class="switch">
			<input v-bind:id="id" type="checkbox" v-bind:checked="isChecked" @click="onSwitchClick">
			<span class="slider round"></span>
		</label>
		<span class="light" v-bind:id="lightId"></span>
	</div>
</template>

<script>
export default {
    name: 'GpxSwitch',
    props: {
        id: {
            type: String,
            default: '0',
            required: true
        },
        portNumber: {
            type: String,
            default: 2048,
            required: true
        }
    },
    data() {
        return {
            isChecked: false
        }
    },
    computed: {
        switchId: function() {
            return 'portSwitch' + this.id
        },
        lightId: function() {
            return 'light' + this.id
        }
    },
    methods: {
        onSwitchClick(id) {
            var vm = this
            var xhr = new XMLHttpRequest()
            var url = '/winpc32/light-switch/' + vm.id
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var isTurnOn = JSON.parse(this.responseText).bValue
                    vm.setLightSwitchState(vm.id, isTurnOn)
                }
            }
            xhr.open('GET', url, true)
            xhr.send()
        },
        setLightSwitchState(id, isTurnOn) {
            var xhr = new XMLHttpRequest()
            var url = '/lightswitch/' + id + '/' + isTurnOn
            xhr.open('GET', url, true)
            xhr.send()
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var state = JSON.parse(this.responseText)[id].isTurnOn
                }
            }
        }
    }
}
</script>

<style scoped>
.switchSet {
    display: flex;
    justify-content: center;
    margin: 2px;
}

.switchText {
    display: flex;
    align-items: center;
}

.switch {
    position: relative;
    display: flex;
    width: 60px;
    height: 34px;
}

.switch input {
    display: none;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

.slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

input:checked + .slider {
    background-color: #007399;
}

input:focus + .slider {
    box-shadow: 0 0 1px #007399;
}

input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>
