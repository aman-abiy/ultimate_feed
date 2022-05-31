<template>
    <div class="row">
        <div class="card content-card col-6 offset-3">
            <img class="card-img-top" :src="feed.img" alt="img">
            <div class="card-body">
                <div class="d-flex justify-content-around">
                    <button class="btn" v-on:click="engage(ENGAGEMENT_LIKE, feed.id)">
                        <font-awesome-icon icon="fa-solid fa-thumbs-up" class="fa"/>
                    </button>
                    <button class="btn" v-on:click="engage(ENGAGEMENT_DISLIKE, feed.id)">
                        <font-awesome-icon icon="fa-solid fa-thumbs-down" class="fa"/>
                    </button>
                    <button class="btn">
                        <font-awesome-icon icon="fa-solid fa-forward" class="fa"/>
                    </button>
                </div>
            </div>
            {{feeds}}
        </div>
    </div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faThumbsDown, faForward } from '@fortawesome/free-solid-svg-icons'
library.add(faThumbsUp, faThumbsDown, faForward)

import { ENGAGEMENT_LIKE, ENGAGEMENT_DISLIKE } from '../../utils/consts'
import { SEND_ENGAGEMENT, GET_FEED } from '../../store/action_types'

export default {
    props: {
        feed: Object
    },
    data() {
        return {
            ENGAGEMENT_LIKE,
            ENGAGEMENT_DISLIKE
        }
    },
    computed: {
        account() {
            return this.$store.getters.account.data
        },
        feeds() {
            return this.$store.getters.feed.data
        },
    },
    methods: {
        engage(type, id) {
            const engagement = {
                actor: this.account.id,
                activity_id: id,
                verb: type,
                score: 100,
                time: new Date(Date.now()),
                // foreign_id: this.account.id
            }
            this.$store.dispatch(SEND_ENGAGEMENT, engagement)
        },
        getFeeds() {
            const feedObj = {
                userId: this.account.id
            }
            this.$store.dispatch(GET_FEED, feedObj)
        }
    },
    created() {
        this.getFeeds()
    }
}
</script>
<style>
.content-card .btn {
    padding: 10px 15px 10px 15px;
    border: 1px solid rgb(155, 155, 155);
    border-radius: 25%;
}

.content-card .btn:hover {
    cursor: pointer;
    border-color: rgb(233, 233, 233);
    background-color: rgb(233, 233, 233);
}

.content-card .btn .fa {
    color: rgb(60, 60, 60);
}
</style>