<template>
    <div class="container">
        <button id="show-modal" @click="showModal = true">Show Modal</button>
        <!-- use the modal component, pass in the prop -->
        <modal v-if="showModal" @close="showModal = false">
            <!-- you can use custom content here to overwrite
             default content -->
            <h3 slot="header">custom header</h3>
        </modal>
        <br>
        <counter></counter>
    </div>
</template>

<script>
import Modal from '@/components/ui/Modal'
import Counter from '@/components/ui/Counter'

export default {
    data() {
        return {
            showModal: false
        }
    },
    components: {
        Modal,
        Counter
    }
}
</script>

<style>
</style>
