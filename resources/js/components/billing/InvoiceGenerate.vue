<template>
<div class="content-wrapper">
    <div class="modal-header">
        <h4 class="text-center" style="color:blue"><b>Invoice Generate</b></h4>
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

                                 <!-- Service Name -->
                            <div class="col-md-4">
                                <ValidationProvider name="service_id" rules="required|min_value:1" v-slot="{ errors }">
                                    <div class="form-group">
                                        <label>Service <span class="text-danger">*</span> </label>
                                        <select class="form-control" style="width: 100%" v-model="invoice.service_id">

                                            <option value="" selected="selected" disabled>
                                                Select Service
                                            </option>
                                            <option v-for="(item, index) in serviceList"  :key="index" :value="item.id">
                                                {{ item.service }}
                                            </option>
                                        </select>
                                        <span class="invalid-feedback d-block">{{errors[0]}}</span>
                                    </div>
                                </ValidationProvider>
                            </div>
                            <!-- end Service Name -->



                            <!-- new License -->
                             <div class="col-md-4">
                                <ValidationProvider name="circuit_id"  rules="required|min_value:1"  v-slot="{ errors }">
                                    <div class="form-group">
                                        <label>License <span class="text-danger">*</span> </label>
                                        <select class="form-control" style="width: 100%" v-model="invoice.circuit_id">

                                            <option value="" selected="selected" disabled>
                                                Select License
                                            </option>
                                            <option v-for="(item, index) in licenceList"  :key="index" :value="item.id">
                                                {{ item.cus_type_name }}
                                            </option>
                                        </select>
                                        <span class="invalid-feedback d-block">{{errors[0]}}</span>
                                    </div>
                                </ValidationProvider>
                            </div>
                            <!-- end new License -->


                             <!-- Customer Name -->
                            <div class="col-md-4">
                                <ValidationProvider name="customer_id" rules="required|min_value:1" v-slot="{ errors }">
                                    <div class="form-group">
                                        <label> Customer  <span class="text-danger">*</span></label>
                                        <select class="form-control" style="width: 100%" v-model="invoice.customer_id">
                                            <option value="" selected="selected" disabled>
                                                Select Customer
                                            </option>
                                            <option v-for="(item, index) in customerList" :key="index" :value="item.customer_id">
                                                {{ item.customers.com_name }} == {{ item.customers.id }}
                                            </option>

                                        </select>
                                        <span class="invalid-feedback d-block">{{errors[0]}}</span>
                                    </div>
                                </ValidationProvider>
                            </div>
                            <!-- end customer -->

                              <!-- Zone Name -->
                            <div class="col-md-4">
                                <ValidationProvider name="grp_or_zone" rules="required|min_value:1"  v-slot="{ errors }">
                                    <div class="form-group">
                                        <label>Pop(Zone) <span class="text-danger">*</span> </label>
                                        <select class="form-control" style="width: 100%" v-model="invoice.demand_note_id">

                                            <option value="" selected="selected" disabled>
                                                Select Zone
                                            </option>
                                            <option v-for="(item, index) in circuitList" :key="index" :value="item.id">
                                                {{ item.groups.group_name }} {{item.groups.id}}
                                                <!-- <input type="hidden" v-model=""> -->
                                            </option>
                                        </select>
                                        <span class="invalid-feedback d-block">{{errors[0]}}</span>
                                    </div>
                                </ValidationProvider>
                            </div>
                            <!-- end Zone Name -->



                              <div class="col-md-4">
                                <ValidationProvider name="inv_date" rules="required" v-slot="{ errors }">
                                    <div class="form-group">
                                        <label>Invoice Date <span class="text-danger">*</span></label>
                                        <input type="date"  v-model="invoice.inv_date"  id="bdaymonth" class="form-control" placeholder="Select Date" required>
                                        <span class="invalid-feedback d-block">{{errors[0]}}</span>
                                    </div>
                                </ValidationProvider>
                            </div>

                            <!-- <div class="form-group">
                                <input type="hidden" class="form-control"  v-model="invoice.id">
                            </div> -->

                             <!--end  Service Name -->

                        </div>
                        <div class="text-right">
                            <button type="submit" class="btn btn-primary float-center">
                                Generate
                            </button>
                        </div>
                    </form>
                </ValidationObserver>
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
            visibleForm: false,
            // qtyFill: false,
            // countryShow: false,
            // portShow: true,
            serviceList:[],
            licenceList: [],
            circuitList:[],
            customerList:[],
            invoice: {
                demand_note_id: "",
                service_id: "",
                circuit_id: "",
                grp_or_zone: "",
                customer_id:"",
                inv_date: "",
            },
        };
    },
    created() {
        this.visibleForm = true;
        // alert('ok');
        // this.getData();
        this.getServiceList();
        this.getCircuitList();
        this.getcustomerList();
        // this.getCircuit();
        // this.getLicence();
    },
    watch: {
        "invoice.service_id": function () {
            this.getLicenceList(this.invoice.service_id);
        },
        "invoice.circuit_id": function(){
            this.getcustomerList(this.invoice.circuit_id);

        },
        "invoice.customer_id": function(){
                this.getCircuitList(this.invoice.customer_id);
        }

    },
    methods: {

    // onChangeSubService(e) {
    //         // alert('ok');
    //         if (this.demand.service_id == 7) {

    //             if (e.target.value == 107) {
    //                 this.demand.circuit_id = 8;
    //                 this.getPortList();
    //             } else {
    //                 this.demand.circuit_id = 9;
    //                 this.getPortList();
    //             }
    //         }

    //     },
    //   getUserList() {
    //         axios
    //             .get("/get-customer-list")
    //             .then((res) => {
    //                 this.loading = false;
    //                 this.userList = res.data.users;
    //             })
    //             .catch(() => {
    //                 this.loading = false;
    //                 // $("#capacity-add-modal").modal("hide");
    //                 Swal.fire({
    //                     icon: "warning",
    //                     title: "wrong creidentials!",
    //                 });
    //             });
    //     },
        // qtyCalculation() {
        //     if (this.iplcVal != 1) {

        //         this.demand.mrc = this.demand.qty * this.demand.charge;
        //     } else {

        //         axios.post("/mrc/calculate", this.demand).then((res) => {
        //             this.loading = false;
        //             this.demand.mrc = res.data.data;
        //         });

        //     }
        // },
        getid(id){


        },
        getServiceList() {
            axios
                .get("/get-service-list")
                .then((res) => {
                    this.loading = false;
                    this.serviceList = res.data.data;
                })
                .catch(() => {});
        },
      getLicenceList(id){

            this.loading= true;
            axios.post("/get-license-type",{service_id:id})
            .then((res) =>{
                this.loading= false;
                this.licenceList=res.data.data;
            })
            .catch(() => {});

        },
          getcustomerList(id){
              // alert(id);

               this.loading =true;
               axios.post("/get-invoice-customer",{circuit_id:id})
               .then((res) =>{
                   this.loading =false;
                   this.customerList=res.data.data;
               })
               .catch(() =>{

               });


           },
           getCircuitList(id){
              // alert(id);
               this.loading=true;
               axios.post("/get-circuit-type", {customer_id:id})
               .then((res)=>{
                   this.loading =false;
                   this.circuitList=res.data.data;
               })
               .catch(() => {});


           },

        onSubmit() {
            axios
                .post("/create-invoice", this.invoice)
                .then((res) => {
                    this.loading = false;
                    this.$router.push({
                        name: 'BillingList'
                        // name: 'AddDemandNote'
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Invoice Generate  Successfully.",
                    });
                    this.$emit("executeMethod");
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
        hideModal() {
            $("#demand-modal").modal("hide");
            this.$router.push({
                name: "DemandNote"
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
