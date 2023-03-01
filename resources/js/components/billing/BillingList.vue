<template>
<div class="content-wrapper">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <!-- <h1 v-if="listData[0]">Services Name : {{listData[0].service.service}}</h1> -->
             <h6  class="text-center"><strong> Invoice  list</strong></h6>
            <h6 class="text-center"> <strong > Billing preparation for the month of May, 2022</strong> </h6>
                </div>
                <div class="col-md-6 text-right">
                    <!-- <button type="button" @click="addSubCategory()" class="btn btn-outline-primary">
                        <i class="fa fa-plus mr-1"></i>
                        Add New Sub Service
                    </button> -->
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
                            <table id="example1" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th> Name of Clients</th>
                                        <th>MRC (tk)</th>
                                        <th>Activation Date</th>
                                        <th>Billing Period</th>
                                        <th>Rate(tk)</th>
                                        <th class="text-center">Discount(%)</th>
                                        <th class="text-center">Rate after Discount</th>
                                        <th>MRC after discount</th>
                                        <th class="text-center">5 % vat on MRC</th>
                                        <th>Group/Zone</th>
                                        <th>Remarks</th>
                                        <th>Action</th>
                                        <!-- <th>Tariff</th> -->
                                        <!-- <th class="text-center">Bill Generate</th> -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="listData.length == 0" class="text-center">
                                        <td colspan="6">Data Not Found</td>
                                        <!-- <span>Data Not Found</span> -->
                                    </tr>
                                    <tr v-for="(item, index) in listData" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td class="text-center"> {{ item.customers.com_name }} </td>
                                         <td> <input type="hidden" :value="item.demand.mrc">{{ item.demand.mrc }}  </td>
                                         <td> {{ moment(item.demand.approved_date).format('DD/MM/YY')  }} </td>
                                         <td> </td>
                                         <td> {{ item.demand.charge }}  </td>
                                         <td> <input type="number"  class="form-control" min="0"></td>
                                         <td> <input type="number" :value="item.demand.charge" readonly></td>
                                         <td> </td>
                                         <td></td>
                                         <td> {{ item.demand.group_id }} </td>
                                         <td> <input type="text" class="form-control"></td>
                                        <!-- <td>
                                            <span v-for="(zone, i ) in item.zone" :key="i" class="badge badge-success mr-1">{{ zone.grp_or_zone }}</span>
                                        </td> -->
                                        <td class="text-center">
                                            <button type="button" title="Invoice Generate" class="btn btn-success btn-sm">
                                                <i class="fa fa-eye action-btn-font m-0"></i>
                                            </button>
                                        </td>
<!--
                                        <td class="text-center">
                                            <button type="button" title="Report Generate" class="btn btn-success btn-sm">
                                                <i class="fa fa-eye action-btn-font m-0"></i>
                                            </button>
                                        </td> -->
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

import moment from 'moment';

export default {

    props: ["id", "name"],
    data() {
        return {
            selectedSubService: null,
            loading: false,
            visibleModal: false,
            listData: [],
        };
    },
    created() {
        this.moment =moment;
        this.getSubServiceList();

    },
    methods: {
        getSubServiceList() {
            this.loading = true;
            axios.post("/get-client-billing")
            .then((response) => {
                this.loading = false;
                this.listData = response.data.data;
            });
        },

        deleteItem(item) {
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/change-service-status", {
                            id: item.id
                        })
                        .then((response) => {
                            this.getSubServiceList();
                            Swal.fire(
                                "Deleted!",
                                "Service has been deleted.",
                                "success"
                            );
                        });
                }
            });
        },
    },
};
</script>

<style lang=""></style>
