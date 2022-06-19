<template>
    <div class="container">
        <div class="row justify-content-between">
            <h5>API Keys</h5>
            <button class="btn btn-primary create-api-key-btn" data-toggle="modal" data-target="#exampleModal">Create API Key</button>
        </div>
        <br>
         apiKeysIsLoading - {{apiKeysIsLoading}}
        <div v-if="apiKeyIsLoading || apiKeysIsLoading" class="alert alert-dark loading-alert" role="alert">
            <div class="row">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="col-3">
                    Loading...
                </div>
            </div>
        </div>
        <div class="card">
            <template v-for="(apiKey, index) in apiKeys">
                <div v-bind:key="index" class="row">
                    <div class="col-lg-3" :lg="8">
                        <h6 class="text-center title">Name</h6>
                        <hr>
                        <p class="text-secondary text-center">{{ apiKey.name }}</p>
                    </div>
                    <div class="col-lg-7" :lg="8">
                        <h6 class="text-center title">API Key</h6>
                        <hr>
                        <p class="text-secondary text-center">{{ apiKey.key }} <i v-clipboard="() => `${apiKey.name}`" v-on:click="showToast" class="fa fa-copy"></i></p>
                    </div>
                    <div class="col-lg-2" :lg="8">
                        <h6 class="text-center title">Action </h6>
                        <hr>
                        <h6 class="text-secondary text-center" type="button" data-toggle="dropdown"><i class="fa fa-cogs"></i> <i class="fa fa-caret-down "></i></h6>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item text-danger" v-on:click="deleteApiKey(apiKey.id)">Delete</a>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Create API Key</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="api-name">Name</label>
                                <input type="text" class="form-control" id="api-name" placeholder="Enter API Name">
                                <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-dismiss="modal">Close</button>
                        <button v-on:click="createApiKey" type="button" class="btn btn-primary create-btn">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { GET_API_KEYS, CREATE_API_KEY, DELETE_API_KEYS } from '../store/action_types'

export default {
    computed: {
        apiKeys() {
            return this.$store.getters.api_keys.data
        },
        apiKeyIsLoading() {
            return this.$store.getters.api_key.isLoading
        },
        apiKeysIsLoading() {
            return this.$store.getters.api_keys.isLoading
        }
    },
    methods: {
        getAPIKeys() {
            this.$store.dispatch(GET_API_KEYS)
        },
        createApiKey(apiKey) {
            this.$store.dispatch(CREATE_API_KEY)
        },
        deleteApiKey(apiKey) {
            this.$store.dispatch(id, { id })
        },
        onCopy(api_key) {
            alert(api_key)
        },
        showToast() {
            this.$toast.default('Copied to clipboard.')
        }
    },
    created() {
        this.getAPIKeys()
    }
}
</script>
<style scoped>
.card {
    padding: 15px;
    border-radius: 5px;
}
.card .title {
    margin-bottom: 15px;
}
.justify-content-between {
    padding-left: 20px;
    padding-right: 20px;
}
.create-api-key-btn, .create-btn {
    border-radius: 1px;
    background-color: #1890ff;
    float: right;
}
.fa:hover {
    cursor: pointer;
}
.loading-alert .spinner-border {
    width: 1rem;
    height: 1rem;
    margin-top: 5px;
    margin-left: 15px;
    color: #29478f;
}

.loading-alert {
    background-color: rgb(225, 240, 253);
}

</style>