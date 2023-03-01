<template>
    <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Landing List</h1>
                    </div>
                    <div class="col-md-6 text-right">
                        <button
                            type="button"
                            @click="showModal"
                            class="btn btn-outline-primary"
                        >
                            <i class="fa fa-plus mr-1"></i>
                            Add New Landing Station
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
                                <table
                                    id="example1"
                                    class="table table-bordered table-striped"
                                >
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th class="text-center">Country Name</th>
                                            <th class="text-center">Group</th>
                                            <th class="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-if="listData.length == 0"
                                            class="text-center"
                                        >
                                            <td colspan="3"></td>
                                            <span>Data Not Found</span>
                                            <td colspan="3"></td>
                                        </tr>
                                        <tr
                                            v-for="(item, index) in listData"
                                            :key="index"
                                        >
                                            <td>{{ index + 1 }}</td>
                                            <td class="text-center">{{ item.country_name }}</td>
                                            <td class="text-center">{{ item.landgroup.group_name }}</td>
                                            <td class="text-center">
                                                <button
                                                    type="button"
                                                    title="View Details"
                                                    class="btn btn-success btn-sm"
                                                    @click="edit(item)"
                                                >
                                                    <i
                                                        class="fa fa-edit action-btn-font m-0"
                                                    ></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    title="Delete User"
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

         <!-- <landing-station-add
            @executeMethod="getstationList"
            :user="editItem"
            v-if="visibleModal"
        /> -->

         <landing-station-add :item="editItem" @executeMethod="getstationList" key="editItem" v-if="visibleModal" />

    </div>
</template>
<script>

import landingStationAdd from './landingStationAdd.vue';
export default {
    components:{
        landingStationAdd,

    },
    data() {
        return {
            loading: false,
            visibleModal: false,
            listData: [],
            editItem: "",
        };
    },
    created() {
        this.getstationList();
    },
    methods: {
        edit(item) {
            this.editItem = item;
            this.visibleModal = true;
            $("#landing-add-modal").modal("show");
        },
        showModal() {
          //  alert('ok');
            this.visibleModal = true;
            $("#landing-add-modal").modal("show");
        },
        getstationList() {
            this.loading = true;
            axios.get("/get-landing-stations").then((response) => {
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
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/change-service-status", {
                            id: item.id
                        })
                        .then((response) => {
                            this.getstationList();
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
