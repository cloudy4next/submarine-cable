<template>
<div class="content-wrapper">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Tariff IPLC List</h1>
                </div>
                <div class="col-md-6 text-right">
                    <button type="button" @click="showModal" class="btn btn-outline-primary">
                        <i class="fa fa-plus mr-1"></i>
                        Create Demand Note
                    </button>
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
                                        <th>Service</th>
                                        <th>Sub Service</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="listData.length == 0" class="text-center">
                                        <td colspan="3"></td>
                                        <span>Data Not Found</span>
                                        <td colspan="3"></td>
                                    </tr>
                                    <tr v-for="(item, index) in listData" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item.service }}</td>
                                        <td>{{ item.sub_service_name }}</td>

                                        <td>
                                            <button type="button" title="Edit" @click="edit(item)" class="btn btn-success btn-sm">
                                                <i class="fa fa-edit action-btn-font m-0"></i>
                                            </button>
                                            <button type="button" title="Details" class="btn btn-primary btn-sm">
                                                <i class="fa fa-eye action-btn-font m-0" aria-hidden="true"></i>
                                            </button>
                                            <button type="button" title="Delete User" class="btn btn-danger btn-sm">
                                                <i class="fa fa-trash action-btn-font m-0" aria-hidden="true"></i>
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
    <capacity-update-modal :item="editItem" @executeMethod="getIplcList" v-if="visibleModal" />
    <demand-modal v-if="visibleDemandModal" />
</div>
</template>

<script>
import CapacityUpdateModal from "./CapacityUpdateModal.vue";
import DemandModal from "./DemandNoteAdd.vue";
export default {
    components: {
        CapacityUpdateModal,
        DemandModal,
    },
    data() {
        return {
            loading: false,
            visibleModal: false,
            visibleDemandModal: false,
            editItem: "",
            listData: [],
        };
    },
    created() {
        this.getIplcList();
    },
    methods: {
        getIplcList() {
            this.loading = true;
            axios.get("/get-iplc-list").then((response) => {
                this.loading = false;
                this.listData = response.data.data;
            });
        },
        edit(item) {
            this.editItem = item;
            this.visibleModal = true;
            $("#capacity-add-modal").modal("show");
        },
        showModal() {
            this.visibleDemandModal = true;
            $("#demand-modal").modal("show");
        },
    },
};
</script>

<style lang=""></style>
