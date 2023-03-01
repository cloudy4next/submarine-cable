<template>
<div class="modal fade" id="service-add-modal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title mr-5">Service Form</h4>
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
                                    <div class="col-md-12">
                                        <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                                            <div class="form-group">
                                                <label for="name">Service Name</label>
                                                <input type="text" v-model="
                                                            service.service
                                                        " class="form-control" id="name" placeholder="Enter name" />
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
export default {
    props: ["item"],
    data() {
        return {
            loading: false,
            service: {
                id: "",
                service: "",
            },

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
            }
        },
        onSubmit() {
            this.loading = true;
            axios
                .post("/service-store", {
                    ...this.service,

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

    },
};
</script>

<style scoped></style>
