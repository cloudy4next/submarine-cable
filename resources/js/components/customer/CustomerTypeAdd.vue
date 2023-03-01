<template>
<div class="modal fade" id="custype-add-modal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title mr-5"> Customer-type Add Form</h4>
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
                                                <label for="name">Customer Type Name</label>
                                                <input type="text" v-model="custype.cus_type_name" class="form-control" id="name" placeholder="Enter Type name" />
                                                <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                                            </div>
                                        </ValidationProvider>
                                    </div>
                                  <div class="col-md-6">
                                <ValidationProvider name="Services" rules="required|min_value:1" v-slot="{ errors }">
                                    <div class="form-group">
                                        <label>Services</label>
                                      <select
                                                        class="form-control"
                                                        style="width: 100%"
                                                        v-model="custype.service_id"
                                                        aria-hidden="true"
                                                    >
                                                    <option  selected="selected" disabled>
                                                            Select Customer Type
                                                        </option>
                                                        <option
                                                            v-for="(
                                                                item, index
                                                            ) in serviceList"
                                                            :key="index"
                                                            :value="item.id"
                                                        >
                                                            {{ item.service }}
                                                        </option>
                                                        <!-- <option value="N/A">
                                                            N/A
                                                        </option> -->
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
export default {
    props: ["item"],
    data() {
        return {
            loading: false,
            serviceList:[],
            custype: {
                id:"",
                cus_type_name:"",
                service_id:"",
            },

        };
    },
    created() {
        this.getData();
        this.getserviceList();
    },
    methods: {
        getData() {
            if (this.item) {
                this.custype.id = this.item.id;
                this.custype.cus_type_name = this.item.cus_type_name;
                this.custype.service_id =this.item.service_id;
            }
        },
        getserviceList(){
            axios.get("/get-service-list")
            .then((res)=>{
                this.loading=false;
                this.serviceList =res.data.data;
            })


        },
      onSubmit() {

       //   alert('ok');
            this.loading = true;
            axios
                .post("/store-customer-type", this.custype)
                .then((res) => {
                    this.loading = false;
                    Toast.fire({
                        icon: "success",
                        title: "Data Upload Successfull.",
                    });
                    this.$emit("executeMethod");
                    $("#custype-add-modal").modal("hide");
                })
                .catch(() => {
                    this.loading = false;
                    Swal.fire({
                        icon: "warning",
                        title: "wrong creidentials!",
                    });
                    $("custype-add-modal").modal("hide");
                });
        },

    },
};
</script>

<style scoped></style>
