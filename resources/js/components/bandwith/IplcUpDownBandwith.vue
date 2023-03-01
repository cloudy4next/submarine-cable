<template>
    <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h6 class="pl-3"><strong class="text-green"> Company Name <span class="text-blue">{{
                            comName }}</span></strong></h6>
                        <h6 class="pl-3"><strong class="text-blue"> Total Active Bandwith <span class="text-red">{{
                            totalBandwith }}</span></strong></h6>
                    </div>
                    <div class="col-md-6 text-right">
                        <router-link :to="{ name: 'CustomerList', params: { id: 1 } }" class="btn btn-success p-1 m-1">
                            <p class="pr-2 pb-1 mb-0">
                                <i class="fa fa-list-ul pl-2"> </i> Customer List
                            </p>
                        </router-link>
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
                                <table class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th> Circuit Capacity</th>
                                            <th> Cable</th>
                                            <th> Designation</th>
                                            <th>Activation Date</th>
                                            <th>Deactivation Date</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="listData.length == 0" class="text-center">
                                            <span>Data Not Found</span>
                                        </tr>

                                        <tr v-for="(item, index) in listData" :key="index">
                                            <td>{{ index + 1 }}</td>
                                            <td style="text-align:center"> {{ item.circuit.circuit_name }} </td>
                                            <td style="text-align:center"> {{ item.subservice.sub_service_name }} </td>
                                            <td style="text-align:center"> {{ item.circuit_designation }} </td>
                                            <td style="text-align:center"> {{ format_date(item.approved_date) }} </td>
                                            <td style="text-align:center"> {{ item.downgrade_date }} </td>

                                            <td> <input type="date" class="form-control" v-model="item.date" /></td>

                                            <td class=" badge rounded-pill bg-primary" v-if="item.approval_status == 1">
                                                Pending</td>
                                            <td class=" badge rounded-pill bg-success" v-if="item.approval_status == 2">
                                                Active</td>
                                            <!-- <td class=" badge rounded-pill bg-danger" v-if="item.approval_status == 3">Reject</td> -->
                                            <td class=" badge rounded-pill bg-warning" v-if="item.approval_status == 4">
                                                Deactive</td>

                                            <td>
                                                <router-link target="_blank" :to="{
                                                    name: 'DemandNoteReport',
                                                    path: '/demandNote/:id',
                                                    props: true,
                                                    params: { id: item.id },
                                                }" title="View Details"
                                                    class="btn btn-success btn-sm">View</router-link>
                                            </td>
                                            <td class="text-center" v-if="item.approval_status == 2">
                                                <button type="button" title="Circuit Deactive"
                                                    @click="circuitDeactive(item.id, item.date)"
                                                    class="btn btn-danger btn-sm">
                                                    <i class="fa fa-times action-btn-font m-0"></i>
                                                </button>
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
    </div>
</template>


<script>
import moment from "moment";
export default {
    components: {

    },
    data() {
        return {
            loading: false,
            listData: [],
            totalBandwith: 0,
            comName: '',
        };
    },

    created() {
        this.moment = moment;
        this.getCustomerWiseCircuit();
    },
    methods: {
        format_date(value) {
            if (value) {
                return moment(String(value)).format('DD-MM-YYYY')
            }
        },
        getCustomerWiseCircuit() {
            axios
                .post("/customer/id/wise/circuit", { id: this.$route.params.id })
                .then((res) => {
                    this.loading = false;
                    this.listData = res.data.data;
                    this.totalBandwith = res.data.total;
                    this.comName = res.data.comName;
                })
                .catch(() => {
                });
        },

        circuitDeactive(id, date) {
            axios
                .post("/customer/wisw/circuit/deactivation", {
                    id: id, date: date
                })
                .then((res) => {
                    this.loading = false;
                    Toast.fire({
                        icon: "success",
                        title: "Successfull Downgrade Customer Circuit or Bandwith",
                    });
                    this.getCustomerWiseCircuit();
                })
                .catch(() => {
                    this.loading = false;
                    Swal.fire({
                        icon: "warning",
                        title: "Opps Please try again !",
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
