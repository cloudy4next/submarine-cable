<template>
<div class="content-wrapper">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Services List</h1>
                </div>
                <div class="col-md-6 text-right">
                    <button type="button" @click="edit()" class="btn btn-outline-primary">
                        <i class="fa fa-plus mr-1"></i>
                        Add New Service
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
                                        <th>Service Name</th>
                                        <th>Sub Service</th>
                                        <!-- <th>Status</th> -->
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="listData.length == 0" class="text-center">
                                        <td colspan="2"></td>
                                        <span>Data Not Found</span>
                                        <td colspan="2"></td>
                                    </tr>
                                    <tr v-for="(item, index) in listData" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item.service }}</td>
                                        <td>
                                            <span v-for="(sub, i ) in item.subservices" :key="i" class="badge badge-primary mr-1">{{ sub.sub_service_name }}</span>
                                        </td>
                                        <!-- <td>
                                            <span v-if="item.status == 1" class="badge badge-success">Active</span>
                                            <span v-else class="badge badge-danger">Inactive</span>
                                        </td> -->
                                        <td>
                                            <button type="button" title="Edit" @click="edit(item)" class="btn btn-success btn-sm">
                                                <i class="fa fa-edit action-btn-font m-0"></i>
                                            </button>
                                            <button type="button" title="Delete Service" class="btn btn-danger btn-sm" @click="deleteItem(item)">
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
    <service-add :item="editItem" @executeMethod="getServiceList" key="editItem" v-if="visibleModal" />
</div>
</template>

<script>
  import ServiceAdd from "./ServiceAdd.vue";
export default {
    components: {
        ServiceAdd,
    },
    data() {
        return {
            loading: false,
            visibleModal: false,
            editItem: "",
            listData: [],
        };
    },
    created() {
        this.getServiceList();
    },
    methods: {
        getServiceList() {
            this.loading = true;
            axios.get("/service-list").then((response) => {
                this.loading = false;
                this.listData = response.data.data;
            });
        },
        edit(item) {
            this.editItem = item;
            this.visibleModal = true;
            $("#service-add-modal").modal("show");
        },
        deleteItem(item) {
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/change-service-status", {
                            id: item.id
                        })
                        .then((response) => {
                            this.getServiceList();
                            Swal.fire(
                                "Deleted!",
                                "Service has been deleted.",
                                "success"
                            );
                        });
                }
            });
        },
    },
};
</script>

<style lang=""></style>
