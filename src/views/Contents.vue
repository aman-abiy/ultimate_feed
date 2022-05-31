<template>
    <div>
        <template v-for="(feed, index) in feeds">
            <contentCard v-bind:key="index" :feed="feed"/>
        </template>
    </div>
</template>
<script>
import contentCard from '@/components/Content/card'

export default {
    components: {
        contentCard
    },
    computed: {
        feeds() {
            return this.$store.getters.feed.data
        }
    }
}
</script>