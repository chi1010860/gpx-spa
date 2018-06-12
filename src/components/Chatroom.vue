<template>
	<div>
		<input id="input" v-model="message" v-on:keyup.13="onBtnClick">
		<button id="btn" v-on:click="onBtnClick">送出</button>
		<ul>
			<li v-for="(item, index) in messages" v-bind:key="item.id" v-bind:id=item.id>{{ item.message }}
				<button class="remove" v-bind:name="index" v-on:click="onRemoveClick">&times;</button>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
    name: 'Chatroom',
    data: function() {
        return {
            msgRef: '',
            message: '',
            messages: []
        }
    },
    methods: {
        onBtnClick: function() {
            var msg = this.message
            this.msgRef.push({
                message: msg
            })
            this.message = ''
        },
        onRemoveClick: function(e) {
            this.msgRef.child(e.target.name).remove()
        }
    },
    created: function() {
        var msgRef = firebase.database().ref('/messages/')
        this.msgRef = msgRef
    },
    mounted: function() {
        const vm = this
        this.msgRef.on('value', function(snapshot) {
            var val = snapshot.val()
            vm.messages = val
        })
    }
}
</script>

<style>
.remove {
    font-size: 10px;
    cursor: pointer;
}
</style>
