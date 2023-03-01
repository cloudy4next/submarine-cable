<template>
    <div class="modal fade" id="service-add-modal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title mr-5">Service Form</h4>
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
                        <div class="card-body">
                            <ValidationObserver v-slot="{ handleSubmit }">
                                <form @submit.prevent="handleSubmit(onSubmit)">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <ValidationProvider
                                                name="Name"
                                                rules="required"
                                                v-slot="{ errors }"
                                            >
                                                <div class="form-group">
                                                    <label for="name"
                                                        >Service Name</label
                                                    >
                                                    <input
                                                        type="text"
                                                        v-model="
                                                            service.service
                                                        "
                                                        class="form-control"
                                                        id="name"
                                                        placeholder="Enter name"
                                                    />
                                                    <span
                                                        class="invalid-feedback d-block"
                                                        >{{ errors[0] }}</span
                                                    >
                                                </div>
                                            </ValidationProvider>
                                        </div>
                                        <div
                                            class="col-md-12 mb-1"
                                            v-for="(item, i) in sub_service"
                                            :key="i"
                                        >
                                            <div class="border border-dar p-1">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label
                                                            :for="
                                                                'Sub Service' +
                                                                i
                                                            "
                                                            >Sub Service
                                                            Name</label
                                                        >
                                                        <input
                                                            type="text"
                                                            v-model="
                                                                item.sub_service
                                                            "
                                                            class="form-control"
                                                            :id="
                                                                'Sub_Service' +
                                                                i
                                                            "
                                                            placeholder="Sub Service Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-md-12 d-flex"
                                                    v-for="(
                                                        capacity, capIndex
                                                    ) in item.capacity"
                                                    :key="capIndex"
                                                >
                                                    <div
                                                        class="col-md-10"
                                                        style="
                                                            margin-left: -7px !important;
                                                        "
                                                    >
                                                        <div class="form-group">
                                                            <label
                                                                :for="
                                                                    'capacity' +
                                                                    capIndex
                                                                "
                                                                >Capacity
                                                                Name</label
                                                            >
                                                            <input
                                                                type="text"
                                                                v-model="
                                                                    capacity.capacity_name
                                                                "
                                                                class="form-control"
                                                                :id="
                                                                    'capacity' +
                                                                    capIndex
                                                                "
                                                                placeholder="Capacity Name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-md-2"
                                                        style="margin-top: 5%"
                                                    >
                                                        <button
                                                            v-if="
                                                                item.capacity
                                                                    .length -
                                                                    1 ===
                                                                capIndex
                                                            "
                                                            class="btn btn-success btn-sm"
                                                            type="button"
                                                            @click="
                                                                addCapItem(i)
                                                            "
                                                        >
                                                            <i
                                                                class="fa fa-plus"
                                                            ></i>
                                                        </button>
                                                        <button
                                                            class="btn btn-danger btn-sm"
                                                            type="button"
                                                            @click="
                                                                removeCapItem(
                                                                    i,
                                                                    capIndex
                                                                )
                                                            "
                                                        >
                                                            <i
                                                                class="fa fa-times"
                                                            ></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="text-right p-3">
                                                    <button
                                                        v-if="
                                                            sub_service.length -
                                                                1 ===
                                                            i
                                                        "
                                                        class="btn btn-success"
                                                        type="button"
                                                        @click="addItem()"
                                                    >
                                                        <i
                                                            class="fa fa-plus mr-1"
                                                        ></i>
                                                        Add More
                                                    </button>
                                                    <button
                                                        class="btn btn-danger"
                                                        type="button"
                                                        @click="removeItem(i)"
                                                    >
                                                        <i
                                                            class="fa fa-times mr-1"
                                                        ></i
                                                        >Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-right mt-2">
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
            service: {
                id: "",
                service: "",
            },
            sub_service: [
                {
                    sub_service: "",
                    capacity: [
                        {
                            capacity_name: "",
                        },
                    ],
                },
            ],
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            if (this.item) {
                this.service.id = this.item.id;
                this.service.service = this.item.service;
                this.sub_service = this.item.sub_services;
                console.log(this.sub_service);
            }
        },
        onSubmit() {
            this.loading = true;
            axios
                .post("/service-store", {
                    ...this.service,
                    sub_service: this.sub_service,
                })
                .then((res) => {
                    this.loading = false;
                    Toast.fire({
                        icon: "success",
                        title: "Data Upload Successfull.",
                    });
                    this.$emit("executeMethod");
                    $("#service-add-modal").modal("hide");
                })
                .catch(() => {
                    this.loading = false;
                    Swal.fire({
                        icon: "warning",
                        title: "wrong creidentials!",
                    });
                    $("#service-add-modal").modal("hide");
                });
        },
        addCapItem(i) {
            this.sub_service[i].capacity.push({
                capacity_name: "",
            });
        },
        removeCapItem(i, cap) {
            this.sub_service[i].capacity.splice(cap, 1);
        },
        addItem() {
            this.sub_service.push({
                service: "",
                capacity: [
                    {
                        capacity_name: "",
                    },
                ],
            });
        },
        removeItem(i) {
            this.sub_service.splice(i, 1);
        },
    },
};
</script>
<style scoped></style>
