<template>
    <div class="modal fade" id="group-add-modal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title mr-5"> Group/Pop Add Form</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="card card-primary">
                        <div class="overlay" v-if="loading">
                            <i class="fa fa-spinner fa-spin"></i>
                        </div>
                        <div class="card-body">
                            <ValidationObserver v-slot="{ handleSubmit }">
                                <form @submit.prevent="handleSubmit(onSubmit)">
                                    <div class="row">

                                        <div class="col-md-6">
                                            <ValidationProvider name="Services" rules="required|min_value:1"
                                                v-slot="{ errors }">
                                                <div class="form-group">
                                                    <label>Services</label>
                                                    <select class="form-control" style="width: 100%"
                                                        v-model="landgroup.service_id" aria-hidden="true">
                                                        <option selected="selected" disabled>
                                                            Select Customer Type
                                                        </option>
                                                        <option v-for="(
                                                                item, index
                                                            ) in serviceList" :key="index" :value="item.id">
                                                            {{ item.service }}
                                                        </option>
                                                        <!-- <option value="N/A">
                                                            N/A
                                                        </option> -->
                                                    </select>
                                                    <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                                                </div>
                                            </ValidationProvider>
                                        </div>


                                        <div class="col-md-6">
                                            <ValidationProvider name="Subservices" rules="required|min_value:1"
                                                v-slot="{ errors }">
                                                <div class="form-group">
                                                    <label>Subservices</label>
                                                    <select class="form-control" style="width: 100%"
                                                        v-model="landgroup.sub_service_id">
                                                        <option v-for="(item, index) in subServiceList" :key="index"
                                                            :value="item.id">
                                                            {{ item.sub_service_name }}
                                                        </option>
                                                        <option value="" selected="selected" disabled>
                                                            Select Sub Service
                                                        </option>
                                                    </select>
                                                    <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                                                </div>
                                            </ValidationProvider>
                                        </div>

                                        <div class="col-md-6">
                                            <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                                                <div class="form-group">
                                                    <label for="name">Landing Group Name</label>
                                                    <input type="text" v-model="landgroup.group_name"
                                                        class="form-control" id="name" placeholder="Enter Type name" />
                                                    <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                                                </div>
                                            </ValidationProvider>
                                        </div>




                                    </div>
                                    <div class="text-right mt-2">
                                        <button type="submit" class="btn btn-primary">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </ValidationObserver>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ["item"],
    data() {
        return {
            loading: false,
            serviceList: [],
            subServiceList: [],
            landgroup: {
                id: "",
                group_name: "",
                service_id: "",
                sub_service_id: "",
            },

        };
    },
    created() {
        this.getData();
        this.getserviceList();
    },
    watch: {
        "landgroup.service_id": function() {
            this.getSubServiceList(this.landgroup.service_id);

        },

    },
    methods: {
        getData() {
            if (this.item) {

                this.landgroup.id = this.item.id;
                this.landgroup.group_name = this.item.group_name;
                this.landgroup.service_id = this.item.service_id;
                this.landgroup.sub_service_id = this.item.sub_service_id;
            }
        },
        getserviceList() {
            axios.get("/get-service-list")
                .then((res) => {
                    this.loading = false;
                    this.serviceList = res.data.data;
                })


        },
        getSubServiceList(id) {
            this.loading = true;
            axios
                .post("/get-sub-service-list", {
                    service_id: id
                })
                .then((res) => {
                    this.loading = false;
                    this.subServiceList = res.data.data;
                })
                .catch(() => {});
        },
        onSubmit() {

            //   alert('ok');
            this.loading = true;
            axios
                .post("/store-landing-group", this.landgroup)
                .then((res) => {
                    this.loading = false;
                    Toast.fire({
                        icon: "success",
                        title: "Group/pop Created Successfull.",
                    });
                    this.$emit("executeMethod");
                    $("#group-add-modal").modal("hide");
                })
                .catch(() => {
                    this.loading = false;
                    Swal.fire({
                        icon: "warning",
                        title: "wrong creidentials!",
                    });
                    $("group-add-modal").modal("hide");
                });
        },

    },
};
</script>

<style scoped></style>