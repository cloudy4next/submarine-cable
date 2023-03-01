<template>
<div class="modal fade" id="event-add-modal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title mr-5">Event Form</h4>
            </div>
            <div class="modal-body">
                <div class="card card-primary">
                    <div class="overlay" v-if="loading">
                        <i class="fa fa-spinner fa-spin"></i>
                    </div>
                    <div class="card-body" v-if="visibleForm">
                        <ValidationObserver v-slot="{ handleSubmit }">
                            <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
                                <div class="row">


                                    <div class="col-md-6">
                                        <ValidationProvider name="title" rules="required" v-slot="{ errors }">
                                            <div class="form-group">
                                                <label for="name">Title</label>
                                                <input type="text" v-model="item.title" class="form-control" id="title" placeholder="Enter title" />
                                                <span class="invalid-feedback d-block">{{errors[0]}}</span>
                                            </div>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-6">
                                        <ValidationProvider name="date" rules="required" v-slot="{ errors }">
                                            <div class="form-group">
                                                <label for="name">Date</label>
                                                <input type="date" v-model="item.date" class="form-control" id="date" placeholder="Enter date" />
                                                <span class="invalid-feedback d-block">{{errors[0]}}</span>
                                            </div>
                                        </ValidationProvider>
                                    </div>

                                    <div class="col-md-12">
                                        <ValidationProvider name="description" rules="required" v-slot="{ errors }">
                                            <div class="form-group">
                                                <label for="name">Description</label>
                                                <!-- <input type="text" v-model="item.description" class="form-control" id="description" placeholder="Enter Description" /> -->
                                                <textarea class="form-control" id="description" name="txtname" rows="4" cols="50" maxlength="200" v-model="item.desc"  placeholder="Enter Description" > </textarea>
                                                <span class="invalid-feedback d-block">{{errors[0]}}</span>
                                            </div>
                                        </ValidationProvider>
                                    </div>


                                </div>

                                <div class="text-right">
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
    components: {
    },
    props: ["editItem"],
    data() {
        return {
            loading: false,
            visibleForm: false,
            item: {
                date: '',
                title: '',
                desc: '',
            },
        };
    },
    created() {
        this.visibleForm = true;
        this.getValue();
    },
    methods: {
        getValue() {
            if (this.editItem) {
                this.item.date = this.editItem.date;
                this.item.title = this.editItem.title;
                this.item.desc = this.editItem.desc;
            }
        },


        visibleAction() {
            // this.visibleForm = !this.visibleForm;
        },


        onSubmit() {
            this.loading = true;
            axios
                .post("/event-store", this.item)
                .then((res) => {
                    this.loading = false;
                    Toast.fire({
                        icon: "success",
                        title: "Event upload Successfully.",
                    });
                    this.$emit("executeMethod");
                    $("#event-add-modal").modal("hide");
                })
                .catch(() => {
                    this.loading = false;
                    Swal.fire({
                        icon: "warning",
                        title: "wrong creidentials!",
                    });
                    $("#event-add-modal").modal("hide");
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
