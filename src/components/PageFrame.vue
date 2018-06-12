<template>
	<div class="page-frame">

	</div>
</template>

<script>
export default {
    name: 'PageFrame',
    data() {
        return {
            //   URL: "/api/gpxDocument"
            URL: 'http://localhost/api/gpxDocument'
        }
    },
    methods: {
        getApiByXMLHttpRequest() {
            var vm = this
            var xhttp = new XMLHttpRequest()
            xhttp.open('GET', vm.URL, true)
            xhttp.send()
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var data = this.responseText
                    console.log(data)
                }
            }
        },
        getApiByFetch: async function() {
            var vm = this
            let res = await fetch(vm.URL)
            if (res.ok) {
                let data = await res.json()
                console.log(res)
                console.log(data)
            } else {
                let text = await res.text()
                console.log(text)
            }
        }
    },
    created() {
        // this.getApiByXMLHttpRequest()
        this.getApiByFetch()
    }
}
</script>

<style>
.page-frame {
    width: 800px;
    height: 600px;
    border: 2px solid SEAGREEN;
}
</style>