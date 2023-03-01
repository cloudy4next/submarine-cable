<template>
<div class="content-wrapper">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Group/Pop List</h1>
                </div>
                <div class="col-md-6 text-right">
                    <button type="button" @click="showModal()" class="btn btn-outline-primary">
                        <i class="fa fa-plus mr-1"></i>
                        Add Group or Pop
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
                                        <th class="text-center">Group Name</th>
                                        <th class="text-center"> Service Name</th>
                                         <th class="text-center"> Sub Service Name </th>
                                        <!-- <th>Status</th> -->
                                        <th class="text-center">Action</th>
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
                                        <td class="text-center">{{ item.group_name }}</td>
                                        <td class="text-center">{{ item.services.service }}</td>
                                        <td class="text-center">{{ item.subservice.sub_service_name}}</td>
                                        <!-- <td>
                                             <span v-for="(sub, i ) in item.subservices" :key="i" class="badge badge-primary mr-1">{{ sub.sub_service_name }}</span>
                                        </td> -->
                                        <!-- <td>
                                            <span v-if="item.status == 1" class="badge badge-success">Active</span>
                                            <span v-else class="badge badge-danger">Inactive</span>
                                        </td> -->
                                        <td class="text-center">
                                            <button type="button" title="Edit" @click="edit(item)" class="btn btn-success btn-sm">
                                                <i class="fa fa-edit action-btn-font m-0"></i>
                                            </button>
                                            <button type="button" title="Delete User" class="btn btn-danger btn-sm" @click="deleteItem(item)">
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

    <!-- <customer-type-add :item="editItem" @executeMethod="getlandingGroupList" key="editItem" v-if="visibleModal" /> -->

    <group-add :item="editItem" @executeMethod="getlandingGroupList" key="editItem" v-if="visibleModal" />


</div>
</template>

<script>


// import CustomerTypeAdd from './CustomerTypeAdd.vue';


import GroupAdd from './GroupAdd.vue';

export default {
    components: {
       // ServiceAdd,
       GroupAdd,
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
        this.getlandingGroupList();
    },
    methods: {
        getlandingGroupList() {
            this.loading = true;
            axios.get("/get-landing-group")
            .then((response) => {
                this.loading = false;
                this.listData = response.data.data;
            });
        },
        showModal(){
         //  alert('ok')
            this.visibleModal=true;
            $("#group-add-modal").modal("show");

        },
        edit(item) {
            this.editItem = item;
            this.visibleModal = true;
            $("#group-add-modal").modal("show");
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
                            this.getlandingGroupList();
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
