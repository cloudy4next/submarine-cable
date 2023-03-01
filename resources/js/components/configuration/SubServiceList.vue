<template>
<div class="content-wrapper">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <!-- <h1 v-if="listData[0]">Services Name : {{listData[0].service.service}}</h1> -->
                    <h1>Services Name : {{servName}}</h1>
                </div>
                <div class="col-md-6 text-right">
                    <button type="button" v-if="$can('service-add')" @click="addSubCategory()" class="btn btn-outline-primary">
                        <i class="fa fa-plus mr-1"></i>
                        Add New Sub Service
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
                                        <th>Sub Service Name</th>
                                        <th>Capacity</th>
                                        <th>Group/Zone</th>
                                        <!-- <th>Tariff</th> -->
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="listData.length == 0" class="text-center">
                                        <td colspan="6">Data Not Found</td>
                                        <!-- <span>Data Not Found</span> -->
                                    </tr>
                                    <tr v-for="(item, index) in listData" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item.sub_service_name }}</td>
                                        <td>
                                            <span v-for="(sub, i ) in item.capacity" :key="i" class="badge badge-primary mr-1">{{ sub.capacity_name }}</span>
                                        </td>
                                        <td>
                                            <span v-for="(zone, i ) in item.zone" :key="i" class="badge badge-success mr-1">{{ zone.groups.group_name }}</span>
                                        </td>
                                        <!-- <td>
                                            <span v-for="(zone, i ) in item.zone" :key="i" class="badge badge-info mr-1">{{ zone.charge }}</span>
                                        </td> -->

                                        <td>
                                            <button type="button" v-if="$can('service-edit')" title="Edit" @click="editSubCategory(item)" class="btn btn-success btn-sm">
                                                <i class="fa fa-edit action-btn-font m-0"></i>
                                            </button>
                                            <!-- <button type="button" v-if="$can('service-delete')" title="Delete User" class="btn btn-danger btn-sm" @click="deleteItem(listData)">
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
    <!-- <service-add :item="editItem"  /> -->
    <!-- sub service add -->
    <sub-service-add ref="subService" :srrv="servId" :name="servName" @executeMethod="getSubServiceList" key="editItem" v-if="visibleModal" />

    <sub-service-edit  v-if="visibleModal" :serviceName="servName" :serviceId="servId" @executeMethod="getSubServiceList" :subServiceId="subServiceId" :subService="selectedSubService" />
</div>
</template>

<script>
import SubServiceAdd from "./SubServiceAdd.vue";
import SubServiceEdit from "./SubServiceEdit.vue";
export default {
    components: {
        SubServiceAdd,
        SubServiceEdit,
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
            listData: [],
        };
    },
    created() {
        this.getSubServiceList();

    },
    methods: {
        addSubCategory() {
            this.servId = this.id;
            this.servName = this.name;
            this.visibleModal = true;
            $("#sub-service-add-modal").modal("show");

            const subServiceRef = this.$refs.subService;
            subServiceRef.getData();
            console.log(subServiceRef)
        },
        editSubCategory(item) {
            this.selectedSubService = item;
            this.subServiceId = item.id;
            // alert(item.id);

            console.log(this.selectedSubService)
            // alert(item.subServiceName);
            // this.subServiceName = item.sub_service_name;
            // this.editItem = item;
            // alert(this.subServiceName);
            // this.servId = this.id;
            // this.servName = this.name;
            this.visibleModal = true;
            $("#sub-service-edit-modal").modal("show");

            // const subServiceRef = this.$refs.subService;
            // const subServiceRef = this.$refs.subService1;
            // subServiceRef.getData();
            // console.log(subServiceRef);
        },
        getSubServiceList() {
            this.loading = true;
            axios.post("/get-sub-service-list",{service_id: this.servId}).then((response) => {
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
                            this.getSubServiceList();
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
