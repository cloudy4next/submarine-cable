<template>
    <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Customer List</h1>
                    </div>
                    <div v-if="$can('customer-add')" class="col-md-6 text-right">
                        <button type="button" @click="showModal" class="btn btn-outline-primary">
                            <i class="fa fa-plus mr-1"></i>
                            Add New Customer
                        </button>
                    </div>
                    <div class="col-md-3 float-right">
                        <input type="search" v-model="searchData" style="width:200px" class="form-control"
                            placeholder="Search Customer">

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
                                <table class="table table-bordered table-striped table-responsive testDataTable">
                                    <thead>
                                        <tr>
                                            <th style="text-align:center">SL</th>
                                            <th style="text-align:center">Company</th>
                                            <th style="text-align:center">Customer Type</th>
                                            <th style="text-align:center">Bin or Vat No.</th>
                                            <th style="text-align:center">Tin</th>
                                            <th style="text-align:center">Billing Contact Person Name</th>
                                            <th style="text-align:center">Email</th>
                                            <th style="text-align:center">Phone</th>
                                            <th style="text-align:center">Address</th>
                                            <th style="text-align:center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="filterSearch.length == 0" class="text-center">
                                            <td colspan="3" style="text-align:center"></td>
                                            <span>Data Not Found</span>
                                            <td colspan="3" style="text-align:center"></td>
                                        </tr>
                                        <tr v-for="(item, index) in filterSearch" :key="index">
                                            <td style="text-align:center">{{ index + 1 }}</td>
                                            <td style="text-align:center">{{ item.com_name }}</td>
                                            <td style="text-align:center">{{ item.custype.cus_type_name }}</td>
                                            <td style="text-align:center">{{ item.bin_vat_etc }}</td>
                                            <td style="text-align:center">{{ item.tin }}</td>
                                            <td style="text-align:center">{{ item.name }}</td>
                                            <td style="text-align:center">{{ item.email }}</td>
                                            <td style="text-align:center">
                                                {{
                                                    item.phone == 0
                                                    ? "Not Found"
                                                    : item.phone
                                                }}
                                            </td>
                                            <td style="text-align:center">{{ item.address }}</td>

                                            <td style="text-align:center">
                                                <button v-if="$can('customer-edit')" type="button" title="Edit Customer"
                                                    class="btn btn-success btn-sm" @click="edit(item)">
                                                    <i class="fa fa-edit action-btn-font m-0"></i>
                                                </button>

                                                <router-link v-if="$can('customer-edit') && $route.params.id == 1" :to="{
                                                    name: 'CustomerBandwithList',
                                                    params: { id: item.id },
                                                }" type="button" title="Up-DOwn Bandwith"
                                                    class="btn btn-primary btn-sm">
                                                    <i class="fa fa-eye action-btn-font m-0"></i>
                                                </router-link>

                                                <router-link v-if="$can('customer-edit') && $route.params.id == 7" :to="{
                                                    name: 'IPTCustomerTotalBandwith',
                                                    params: { id: item.id },
                                                }" type="button" title="Up-Down Bandwith"
                                                    class="btn btn-primary btn-sm">
                                                    <i class="fa fa-eye action-btn-font m-0"></i>
                                                </router-link>

                                                <!-- <button v-if="$can('customer-delete')" type="button" title="Delete User"
                                                    class="btn btn-danger btn-sm">
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
        <customer-add @executeMethod="getCustomerList" :customer="editItem" v-if="visibleModal" />
    </div>
</template>

<script>
import CustomerAdd from "./CustomerAdd.vue";
export default {
    components: {
        CustomerAdd,
    },
    data() {
        return {
            loading: false,
            visibleModal: false,
            listData: [],
            editItem: "",
            searchData: "",
        };
    },
    computed: {
        filterSearch() {
            return this.listData.filter(item => {
                // return item.com_name.match(this.searchData);

                return item.com_name.toLowerCase().includes(this.searchData.toLowerCase())
            });
        },

    },
    created() {
        this.getCustomerList();
    },

        mounted() {

        setTimeout(() => {
        $(document).ready(function () {
            $('.testDataTable').DataTable({
            searching: true,
            ordering: true
            });
        });
        }, 2000);
    },

    methods: {
        edit(item) {
            this.editItem = item;
            this.visibleModal = true;
            $("#customer-add-modal").modal("show");
        },
        showModal() {
            this.visibleModal = true;
            $("#customer-add-modal").modal("show");
        },

        // showBandwithModal(item) {
        //     // alert('ookk')
        //     this.$router.push()
        // },
        getCustomerList() {
            this.loading = true;
            axios.get("/get-customer-list/" + this.$route.params.id).then((response) => {
                this.loading = false;
                this.listData = response.data.users;
            });
        },

    },
};
</script>


<style lang=""></style>