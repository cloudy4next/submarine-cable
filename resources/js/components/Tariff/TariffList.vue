<template>
<div class="content-wrapper">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Services Name : {{servName}}</h1>
                </div>
                <!-- <div class="col-md-6 text-right">
                    <button type="button" class="btn btn-outline-primary">
                        <i class="fa fa-plus mr-1"></i>
                        Add New
                    </button>
                </div> -->
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
                                        <th>Sub Service Name</th>
                                        <th>Capacity</th>
                                        <th>Inist Charge</th>
                                        <th>Group/Zone</th>
                                        <th>Tariff</th>
                                        <th>Vat (%)</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="listData.length == 0" class="text-center">
                                        <td colspan="6">Data Not Found</td>
                                        <span>Data Not Found</span>
                                        <td colspan="2"></td>
                                    </tr>
                                    <tr v-for="(item, index) in listData" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item.sub_service_name }}</td>
                                        <td>
                                            <span v-for="(sub, cap ) in item.capacity" :key="cap" class="badge badge-primary mr-1">{{ sub.capacity_name }}</span>
                                        </td>
                                        <td>
                                            <span v-for="(sub, cap ) in item.capacity" :key="cap" class="badge badge-primary mr-1">{{ sub.instl_charge }}</span>
                                        </td>
                                        <td>
                                            <span v-for="(zone, i ) in item.zone" :key="i" class="badge badge-success mr-1">{{ zone.groups.group_name }}</span>
                                        </td>
                                        <td>
                                            <span v-for="(zone, i ) in item.zone" :key="i" class="badge badge-info mr-1">{{ zone.charge }}</span>
                                        </td>
                                        <td>
                                            <span v-for="(zone, i ) in item.zone" :key="i" class="badge badge-info mr-1">{{ zone.vat }}</span>
                                        </td>

                                        <td>
                                            <button type="button" title="Edit" v-if="$can('tariff-edit')" @click="addTariffInSubService(item)" class="btn btn-success btn-sm">
                                                <i class="fa fa-edit action-btn-font m-0"></i>
                                            </button>
                                            <button type="button" title="Edit" class="btn btn-info btn-sm" @click="viewTariffInSubService(item)">
                                                <i class="fa fa-eye action-btn-font m-0"></i>
                                                 <!-- <router-link :to="{ name: 'TariffView', params:{id:item.id}}" class="nav-link m-0 p-0"></router-link> -->
                                            </button>
                                            <!-- <button type="button" title="Delete User" class="btn btn-danger btn-sm" @click="deleteItem(item)">
                                                <i class="fa fa-trash action-btn-font m-0" aria-hidden="true"></i>
                                            </button> -->
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

    <tariff-add @executeMethod="getSubServiceList" v-if="visibleModal" :subServiceId="subServiceId" :serviceName="servName" :serviceId="servId" :subService="selectedSubService"/>
</div>
</template>

<script>
import TariffAdd from "./TariffAdd.vue";
export default {
    components: {
        // SubServiceEdit,
        TariffAdd,
    },
    props: ["id", "name"],
    data() {
        return {
            selectedSubService: null,
            loading: false,
            visibleModal: false,
            editItem: {},
            servId: this.id,
            servName: this.name,
            subServiceName: '',
            subServiceId: '',

            // listData: {},
        };
    },
    created() {
        this.getSubServiceList();
        // console.log(this.$route.params);
    },
    methods: {
        addTariffInSubService(item) {
            this.selectedSubService = item;
            this.subServiceId = item.id;
            console.log(this.selectedSubService)

            this.visibleModal = true;
            $("#tariff-modal").modal("show");

        },

        viewTariffInSubService(item){
            this.$router.push({
                path: '/tariff-view/:id',
                props: true,
                name: "TariffView",
                params: {
                    id: item.id,
                }
            });
        },
        getSubServiceList() {
            this.loading = true;
            axios.post("/get-sub-service-list",{service_id: this.servId}).then((response) => {
                this.loading = false;
                this.listData = response.data.data;
            });
        },

        // deleteItem(item) {
        //     Swal.fire({
        //         title: "Are you sure?",
        //         icon: "warning",
        //         showCancelButton: true,
        //         confirmButtonColor: "#3085d6",
        //         cancelButtonColor: "#d33",
        //         confirmButtonText: "Yes, delete it!",
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             axios
        //                 .post("/change-service-status", {
        //                     id: item.id
        //                 })
        //                 .then((response) => {
        //                     this.getSubServiceList();
        //                     Swal.fire(
        //                         "Deleted!",
        //                         "Service has been deleted.",
        //                         "success"
        //                     );
        //                 });
        //         }
        //     });
        // },
    },
};
</script>

<style lang=""></style>
