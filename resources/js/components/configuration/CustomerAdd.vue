<template>
    <div class="modal fade" id="customer-add-modal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title mr-5">Customer Form</h4>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="card card-primary">
                        <div class="overlay" v-if="loading">
                            <i class="fa fa-spinner fa-spin"></i>
                        </div>
                        <div class="card-body" v-if="visibleForm">

                            <form @submit.prevent="onSubmit">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="com_name">Customer/Company Name</label>
                                            <input type="text" v-model="com_name" class="form-control" id="com_name"
                                                placeholder="Enter Customer/Company name" />

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Customer Type</label>
                                            <select class="form-control" style="width: 100%" v-model="customer_type_id"
                                                tabindex="-1" aria-hidden="true">
                                                <option selected="selected" disabled>
                                                    Select type
                                                </option>
                                                <option v-for="(item,index) in cusTypeList" :key="index"
                                                    :value="item.id">
                                                    {{ item.cus_type_name }}

                                                </option>

                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="name">Billing Contact Person Name </label>
                                            <input type="text" v-model="name" class="form-control" id="name"
                                                placeholder="Enter Contact Person name" />

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="email">Billing Contact Person Email </label>
                                            <input type="email" v-model="email" class="form-control" id="email"
                                                placeholder="Enter email" />

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="phone">Billing Contact Person Phone Number </label>
                                            <input type="text" v-model="phone" class="form-control" id="phn-number"
                                                placeholder="Enter phone number" />

                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="bin_vat_etc">BIN or VAT Reg. No </label>
                                            <input type="text" v-model="bin_vat_etc" class="form-control"
                                                id="bin_vat_etc" placeholder="Enter BIN or VAT Reg. No" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="tin">Tin Number </label>
                                            <input type="text" v-model="tin" class="form-control" id="tin"
                                                placeholder="Enter Tin Reg. No" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="address">Address</label>
                                            <input type="text" v-model="address" class="form-control" id="address"
                                                placeholder="Enter your address" />
                                        </div>
                                    </div>
                                </div>

                                <div class="text-right">
                                    <button type="submit" class="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { ValidationProvider } from 'vee-validate';
export default {
    components: {

        // ValidationProvider,
    },
    props: ["customer"],
    data() {
        return {
            // id: this.customer.id,
            loading: false,
            visibleForm: false,

            name: "",
            email: "",
            phone: "",
            com_name: "",
            customer_type_id: "",
            address: "",
            bin_vat_etc: "",
            tin: "",
            cusTypeList: [],
        };
    },

    created() {
        this.visibleForm = true;
        this.getData();
        this.getCusTypeList();
    },
    methods: {

        getData() {
            if (this.customer) {
                this.name = this.customer.name;
                this.email = this.customer.email;
                this.phone = this.customer.phone;
                this.com_name = this.customer.com_name;
                this.type = this.customer.type;
                this.address = this.customer.address;
                this.bin_vat_etc = this.customer.bin_vat_etc;
                this.tin = this.customer.tin;
            }
        },

        visibleAction() {
            this.visibleForm = !this.visibleForm;
        },
        getCusTypeList() {
            axios.get("/get-customer-type-list")
                .then((res) => {
                    this.cusTypeList = res.data.data;
                })

        },

        onSubmit() {
            // alert('ookk');
            this.loading = true;
            axios
                .post("/customer/store", {
                    com_name: this.com_name,
                    email: this.email,
                    id: this.customer.id,
                    name: this.name,
                    phone: this.phone,
                    customer_type_id: this.customer_type_id,
                    address: this.address,
                    bin_vat_etc: this.bin_vat_etc,
                    tin: this.tin,
                })
                .then((res) => {
                    this.loading = false;
                    Toast.fire({
                        icon: "success",
                        title: "Successfull Created New Customer Information",
                    });
                    this.$emit("executeMethod");
                    $("#customer-add-modal").modal("hide");
                })
                .catch(() => {
                    this.loading = false;
                    Swal.fire({
                        icon: "warning",
                        title: "Opps Please try again !",
                    });
                    $("#customer-add-modal").modal("hide");
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