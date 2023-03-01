<template>
<div class="content-wrapper">
    <section class="content-header">
        <div class="container-fluid">

         <form>

            <div class="row mb-2">
                <div class="col-sm-4">
                    <h2>Revenue Report</h2>
                </div>
                <div class="col-md-8 text-right">
                    <div class="row">

                        <div class="form-group row">
                            <label for="startDate" class="col-sm-5 col-form-label">Start Date</label>
                            <div class="col-sm-7">
                            <input type="date" class="form-control" id="startDate" required v-model="startDate" placeholder="Start Date">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="endDate" class="col-sm-5 col-form-label">End Date</label>
                            <div class="col-sm-7">
                            <input type="date" class="form-control" id="endDate" required v-model="endDate" placeholder="End Date">
                            </div>
                        </div>

                          <div class="col-md-2 text-left">
                            <button type="button" class="btn btn-outline-primary" @click="searcDatehWiseReportData()">
                                <i class="fa fa-plus mr-1"></i>
                                Search
                            </button>
                        </div>


                        <div class="col-md-2">
                            <button @click="print" type="button" class="btn btn-info">
                            <i class="fa fa-print"></i>
                            Print
                            </button>
                        </div>

                    </div>
                </div>
            </div>

         </form>
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
                                        <th class="text-center">Billing Month</th>
                                        <th class="text-center">Type of Service</th>
                                        <th class="text-center">Type of Cable</th>
                                        <th class="text-center">Type of Group/Station</th>
                                        <th class="text-center"> Invoice Amount(MRC) in BDT</th>
                                        <th class="text-center"> Invoice Amount(MBC) in BDT</th>
                                        <th class="text-center"> Total bill in BDT</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr v-for="(item, index, i) in listData" :key="index" v-if="item.service_id==1">
                                        <!-- <td>{{zI}}</td> -->
                                        <td scope="row">{{'#'}}</td>
                                        <td class="text-center">{{ moment(item.billing_month).format("DD.MMM.YYYY")}}</td>
                                        <td class="text-center">{{item.services.service}}</td>
                                        <td class="text-center">{{item.subservice.sub_service_name}} </td>
                                        <td class="text-center">{{item.groups.group_name}} </td>
                                        <td class="text-center">{{item.total_mrc}} </td>
                                        <td class="text-center">{{item.total_mbc}}</td>
                                        <td class="text-center">{{item.total_mrc_after_discount}}</td>
                                    </tr>
                                    <br>
                                    <br>

                                    <tr>
                                    <td colspan="5" class="text-right font-weight-bold">Total</td>
                                    <td class="text-center font-weight-bold">{{totalMrc(listData)}}</td>
                                    <td class="text-center font-weight-bold">{{totalMbc(listData)}}</td>
                                    <td class="text-center font-weight-bold">{{totalNetAmount(listData)}}</td>
                                </tr>
                                </tbody>
                            </table>

                             <br>
                            <br>
                            <br>

                            <table class="" style="min-width: 100%; padding-top:200px;">
                                    <tfoot>
                                    <tr>
                                        <td> <b>Assistant Manager(Billing)</b></td>
                                        <td> <b>Deputy  Manager (CC & Billing)</b></td>
                                        <td> <b>Manager (CC)</b></td>
                                        <td> <b>Deputy General Manager (F&A)</b></td>
                                        <td> <b>Deputy General Manager (CC)</b></td>
                                    </tr>
                                </tfoot>

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
            visibleModal: false,
            editItem: "",
            listData: [],
            startDate: '',
            endDate: '',
        };
    },
    created() {
        this.moment = moment;
        this.getRevenuReportList();
    },
    methods: {

        searcDatehWiseReportData(){
            if(this.startDate == '' || this.endDate ==''){
                alert('Please input date')
            }else{
               axios.post("/get-date-wise/total-revenu-report-list",{
                startDate : this.startDate,
                endDate : this.endDate
               })
                .then((response) => {
                    this.loading = false;
                    this.listData = response.data.data;
                });
            }
        },

        totalMrc(listItem){
              var total_mrc = 0;
                listItem.forEach(function(item, index, array) {
                    if(item.service_id==1){
                        total_mrc += item.total_mrc
                    }
                })
                return total_mrc;
            },

        totalMbc(listItem){
              var total_mbc = 0;
                listItem.forEach(function(item, index, array) {
                    if(item.service_id==1){

                        total_mbc += item.total_mbc
                    }
                })
                return total_mbc;
            },

        totalNetAmount(listItem){
            var total_mrc_after_discount = 0;
            listItem.forEach(function(item, index, array) {
                if(item.service_id==1){

                    total_mrc_after_discount += item.total_mrc_after_discount
                }
            })
            return total_mrc_after_discount;
        },


        getRevenuReportList() {
            this.loading = true;
            axios.get("/get-total-revenu-report-list")
            .then((response) => {
                this.loading = false;
                this.listData = response.data.data;
            });
        },


         print() {
            window.print();
        },



    },
};
</script>

<style lang=""></style>
