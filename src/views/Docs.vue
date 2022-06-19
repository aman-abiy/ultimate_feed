<template>
    <div>
        <div v-html="docs">
        </div>
        <h1>docs = > {{docs}}</h1>
    </div>
</template>
<script>
import GET_DOCS from '../store/action_types'

export default {
    computed: {
        docs() {
            return this.$store.getters.doc
        }
    },
    methods: {
        getDocs() {
            this.$store.dispatch(GET_DOCS)
        }
    },
    created() {
        this.getDocs()
    }
}
</script>
<style scoped>

</style>