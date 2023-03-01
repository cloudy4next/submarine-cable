<template>
    <div class="modal fade" id="capacity-add-modal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title mr-5">IPLC Capacity Form</h4>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="card card-primary">
                        <div class="overlay" v-if="loading">
                            <i class="fa fa-spinner fa-spin"></i>
                        </div>
                        <div class="card-body" v-if="visibleForm">
                            <ValidationObserver v-slot="{ handleSubmit }">
                                <form @submit.prevent="handleSubmit(onSubmit)">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <ValidationProvider
                                                name="Service"
                                                rules="required"
                                                v-slot="{ errors }"
                                            >
                                                <div class="form-group">
                                                    <label for="service"
                                                        >Service</label
                                                    >
                                                    <input
                                                        readonly
                                                        type="text"
                                                        v-model="item.service"
                                                        class="form-control"
                                                        id="service"
                                                        placeholder="Enter service name"
                                                    />
                                                    <span
                                                        class="invalid-feedback d-block"
                                                        >{{ errors[0] }}</span
                                                    >
                                                </div>
                                            </ValidationProvider>
                                        </div>
                                        <div class="col-md-6">
                                            <ValidationProvider
                                                name="Sub Service"
                                                rules="required"
                                                v-slot="{ errors }"
                                            >
                                                <div class="form-group">
                                                    <label for="sub"
                                                        >Sub Service</label
                                                    >
                                                    <input
                                                        readonly
                                                        type="text"
                                                        v-model="
                                                            item.sub_service
                                                        "
                                                        class="form-control"
                                                        id="sub"
                                                        placeholder="Enter sub service"
                                                    />
                                                    <span
                                                        class="invalid-feedback d-block"
                                                        >{{ errors[0] }}</span
                                                    >
                                                </div>
                                            </ValidationProvider>
                                        </div>
                                        <div class="col-md-6">
                                            <ValidationProvider
                                                name="Capacity"
                                                rules="required"
                                                v-slot="{ errors }"
                                            >
                                                <div class="form-group">
                                                    <label for="phone"
                                                        >Capacity</label
                                                    >
                                                    <input
                                                        type="text"
                                                        v-model="
                                                            item.capacity_name
                                                        "
                                                        class="form-control"
                                                        id="capacity"
                                                        placeholder="Enter Capacity"
                                                    />
                                                    <span
                                                        class="invalid-feedback d-block"
                                                        >{{ errors[0] }}</span
                                                    >
                                                </div>
                                            </ValidationProvider>
                                        </div>
                                        <div class="col-md-6">
                                            <ValidationProvider
                                                name="Charge"
                                                rules="required"
                                                v-slot="{ errors }"
                                            >
                                                <div class="form-group">
                                                    <label for="charge"
                                                        >Charge</label
                                                    >
                                                    <input
                                                        type="number"
                                                        v-model="item.charge"
                                                        class="form-control"
                                                        id="charge"
                                                        placeholder="Enter charge"
                                                    />
                                                    <span
                                                        class="invalid-feedback d-block"
                                                        >{{ errors[0] }}</span
                                                    >
                                                </div>
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <button
                                            type="submit"
                                            class="btn btn-primary"
                                        >
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
export default {
    props: ["item"],
    data() {
        return {
            loading: false,
            visibleForm: false,
            tariff: {
                service_id: "",
                service: "",
                sub_service_id: "",
                sub_service: "",
                tariff_id: "",
                capacity_name: "",
                charge: "",
            },
        };
    },
    created() {
        this.visibleForm = true;
        this.getData();
    },
    methods: {
        getData() {
            if (this.item) {
                this.item = this.item;
            }
        },
        onSubmit() {
            axios
                .post("/capacity-update", this.item)
                .then((res) => {
                    this.loading = false;
                    Toast.fire({
                        icon: "success",
                        title: "Data Upload Successfull.",
                    });
                    this.$emit("executeMethod");
                    $("#capacity-add-modal").modal("hide");
                })
                .catch(() => {
                    this.loading = false;
                    $("#capacity-add-modal").modal("hide");
                    Swal.fire({
                        icon: "warning",
                        title: "wrong creidentials!",
                    });
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
