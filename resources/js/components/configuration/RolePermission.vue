<template>
<div class="content-wrapper">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Role & Permission</h1>
                </div>
                <div class="col-md-6 text-right">
                    <button type="button" data-toggle="modal" @click="edit()" data-target="#role-permission-modal" class="btn btn-outline-primary">
                        <i class="fa fa-plus mr-1"></i>
                        Add Role & Permission
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
                                        <th>Role Name</th>
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
                                        <td>{{ item.name }}</td>
                                        <!-- <td>{{ item.status }}</td> -->
                                        <td>
                                            <button type="button" title="View Details" class="btn btn-success btn-sm" @click="edit(item)">
                                                <i class="fa fa-edit action-btn-font m-0"></i>
                                            </button>
                                            <button type="button" title="Delete Role" @click="deleteItem(item)" class="btn btn-danger btn-sm">
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
    <add-role ref="role-permission-modal" @executeMethod="getRoleList" :rolePerData="editItem" v-if="visibleModal" />

</div>
</template>

<script>
import AddRole from "./AddRole.vue";
import EditRole from "./EditRole.vue";
export default {
    components: {
        AddRole,
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
        this.getRoleList();
    },
    methods: {
        edit(item) {
            this.editItem = item;
            this.visibleModal = true;
            $("#role-permission-modal").modal("show");
        },
        getRoleList() {
            this.loading = true;
            axios.get("/get-role-list").then((response) => {
                this.loading = false;
                this.listData = response.data.data;
            });
        },
          deleteItem(item) {
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete Role!",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/role-Delete", {
                            id: item.id
                        })
                        .then((response) => {
                            this.getRoleList();
                            Swal.fire(
                                "Deleted!",
                                "Role  has been deleted.",
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
