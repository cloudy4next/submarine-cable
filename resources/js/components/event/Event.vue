<template>
<div class="content-wrapper">
     <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Events</h1>
                    </div>
                    <div class="col-md-6 text-right">
                        <button
                            type="button"
                            @click="showModal"
                            class="btn btn-outline-primary">
                            <i class="fa fa-plus mr-1"></i>
                            Add New Event
                        </button>
                    <div>


                    </div>

                    </div>
                </div>
            </div>
        </section>

    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="overlay" v-if="loading">
                            <i class="fa fa-spinner fa-spin"></i>
                        </div>
                        <div class="card-body">
                            <table id="example1" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Date</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="getEvents.length == 0" class="text-center">
                                        <td colspan="6">Event Not Found</td>
                                    </tr>

                                    <tr
                                        v-for="(item, index) in getEvents"
                                        :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item.date }}</td>
                                        <td>{{ item.title }}</td>
                                        <td>{{ item.desc }}</td>
                                            <td>
                                            <button
                                                type="button"
                                                title="Edit Event"
                                                class="btn btn-success btn-sm"
                                                @click="edit(item)">
                                                <i
                                                    class="fa fa-edit action-btn-font m-0"
                                                ></i>
                                            </button>
                                            <button
                                                type="button"
                                                title="Delete event"
                                                class="btn btn-danger btn-sm"
                                            >
                                                <i
                                                    class="fa fa-trash action-btn-font m-0"
                                                    aria-hidden="true"
                                                ></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
   <event-add
            @executeMethod="getEventList"
            :editItem="editItem"
        />
</div>
</template>


<script>
import moment from "moment";
import EventAdd from "./EventAdd.vue";
export default {
    components: {
        EventAdd
    },
    data() {
        return {
            loading: false,
            editItem: "",
             getEvents: [],
        };
    },

    created() {
        this.moment = moment;
        this.getEventList();
    },
    methods: {

        edit(item) {
            this.editItem = item;
            this.visibleModal = true;
            $("#event-add-modal").modal("show");
        },

        showModal() {
            this.visibleModal = true;
            $("#event-add-modal").modal("show");
        },

        getEventList() {
            this.loading = true;
            axios.get("/get-event-list").then((response) => {
                this.loading = false;
                this.getEvents = response.data.Event;
            });
        },

    },
};
</script>

<style scoped>
.bulk-tag {
    margin-left: 14%;
    margin-bottom: 0px;
    margin-top: 7px;
}
</style>
