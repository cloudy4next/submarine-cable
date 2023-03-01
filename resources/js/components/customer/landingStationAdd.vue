<template>
<div class="modal fade" id="landing-add-modal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title mr-5"> Landing Station Add Form</h4>
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
                                        <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                                            <div class="form-group">
                                                <label for="name">Country Name</label>
                                                <input type="text" v-model="landing.country_name" class="form-control" id="name" placeholder="Enter Type name" />
                                                <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                                            </div>
                                        </ValidationProvider>
                                    </div>



                             <div class="col-md-6">
                                <ValidationProvider name="Subservices" rules="required|min_value:1" v-slot="{ errors }">
                                    <div class="form-group">
                                        <label>Group</label>
                                      <select
                            class="form-control"
                            style="width: 100%"
                            v-model="landing.group_id"
                          >
                            <option
                              v-for="(item, index) in landgroupList"
                              :key="index"
                              :value="item.id"
                            >
                              {{ item.group_name }}
                            </option>
                            <option value="" selected="selected" disabled>
                              Select Group
                            </option>
                          </select>
                                        <span class="invalid-feedback d-block">{{errors[0]}}</span>
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
            landgroupList:[],
            landing: {
                id:"",
                country_name:"",
                group_id:"",
            },

        };
    },
    created() {
        this.getData();
        this.getlandingGroup();
    },
    methods: {
        getData() {
            if (this.item) {
                this.landing.id = this.item.id;
                this.landing.country_name=this.item.country_name;
                this.landing.group_id =this.item.group_id;
            }
        },
        getlandingGroup(){
            axios.get("/get-landing-group")
            .then((res)=>{
                this.loading = false;
                this.landgroupList =res.data.data;
            })


        },
      onSubmit() {

       //   alert('ok');
            this.loading = true;
            axios
                .post("/store-landing-stations", this.landing)
                .then((res) => {
                    this.loading = false;
                    Toast.fire({
                        icon: "success",
                        title: "Landing Station Upload Successfull.",
                    });
                    this.$emit("executeMethod");
                    $("#landing-add-modal").modal("hide");
                })
                .catch(() => {
                    this.loading = false;
                    Swal.fire({
                        icon: "warning",
                        title: "wrong creidentials!",
                    });
                    $("landing-add-modal").modal("hide");
                });
        },

    },
};
</script>

<style scoped></style>
