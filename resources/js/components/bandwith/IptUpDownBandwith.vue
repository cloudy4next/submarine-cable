<template>
<div class="content-wrapper">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                <h6 class="pl-3"><strong class="text-green"> Company Name <span class="text-blue">{{ comName}}</span></strong></h6>
                <h6 class="pl-3"><strong class="text-blue"> Total Active Bandwith <span class="text-red">{{ totalBandwith}}</span></strong></h6>
                </div>
                <div class="col-md-6 text-right">
                    <router-link
                        :to="{ name: 'CustomerList', params:{id: 7} }"
                        class="btn btn-success p-1 m-1"
                    >
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
                            <form @submit.prevent="onSubmit">


                                <!-- <table class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Bandwidth</th>
                                            <th>Upgrade/Downgrade</th>
                                            <th>Current Bandwidth</th>
                                            <th>Active Bandwidth</th>
                                            <th>Date</th>
                                            <th>Pop</th>
                                            <th>Activation Date</th>
                                            <th>Downgrade Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="listData.length == 0" class="text-center">
                                            <td colspan="6">Data Not Found</td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td>

                                                <table id="example1" class="table table-bordered table-striped">
                                                    <tr>
                                                        <td>{{totalBandwithCalculate()}}<td/>
                                                        <td>
                                                        <input type="number" class="form-control" v-model="downBandwith"/>
                                                        <td/>
                                                        <td> <button type="submit" class="btn btn-success">Submit</button> </td>
                                                    </tr>
                                                </table>

                                            </td>
                                            <td> <input type="date" class="form-control" v-model="date"/></td>
                                            <td><td/>

                                        </tr>

                                        <tr v-for="(item, index) in listData" :key="index">
                                            <td>{{ index + 1 }}</td>
                                            <td> {{item.max}}</td>
                                            <td> {{item.downgrade}}</td>

                                            <td> <input type="text" class="form-control" v-model="item.bandwidth"/></td>
                                            <td>
                                            <input type="hidden" v-model="item.customer_id"/>
                                            <input type="hidden" v-model="item.id"/>
                                                <select class="form-control inputFillSize" v-model="item.add_sub">
                                                        <option value="1"> Upgrade </option>
                                                        <option value="2">Downgrade</option>
                                                </select>
                                            </td>
                                            <td> {{ demandNoteIssueWiseActive(item, index)}} </td>
                                            <td>{{item.max - item.downgrade}}</td>

                                            <td> <input type="date" class="form-control" v-model="item.date"/></td>

                                            <td> {{ item.groups.group_name }}</td>
                                            <td> {{ item.approved_date }}</td>
                                            <td> {{ item.downgrade_date }}</td>

                                            <td> <button @click="demandNoteIssueWiseActiveDeactive(item.bandwidth, item.date, item.add_sub, item.id)" type="button" class="btn btn-success"> Save</button> </td>

                                        </tr>


                                        <br>
                                        <br>
                                        <br>
                                    </tbody>
                                </table> -->






                                <div class="col-sm-12 text-center">
                                 <h6 class="pl-3"><strong class="">Pop Wise Total Active Bandwith </strong></h6>
                                </div>
                                <table class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Pop</th>
                                            <th>Bandwidth</th>
                                            <th>Upgrade/Downgrade</th>
                                            <th>Current Bandwidth</th>
                                            <th>Active Bandwidth</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr v-for="(item, index) in groupTotalBandwithList" :key="index">
                                            <td>{{ index + 1 }}</td>
                                            <td> {{item.groups.group_name}}</td>

                                             <td> <input type="text" class="form-control" v-model="item.bandwidth"/></td>
                                            <td>
                                            <input type="hidden" v-model="item.customer_id"/>
                                            <input type="hidden" v-model="item.id"/>
                                                <select class="form-control inputFillSize" v-model="item.add_sub">
                                                        <option value="1"> Upgrade </option>
                                                        <option value="2">Downgrade</option>
                                                        <option value="3">Migrate</option>
                                                </select>

                                                <select class="form-control inputFillSize" required :id="'item' + index" v-if="item.add_sub == 3"
                                                    v-model="item.migrateGroupId">
                                                    <option value="" disabled>Select Pop</option>
                                                    <option :value="groupItem.id" v-for="(groupItem, i) in popListData" :key="i" v-if="groupItem.service_id==7">{{ groupItem.group_name}}</option>
                                                </select>

                                            </td>
                                            <td> {{ demandNoteIssueWiseActive(item, index)}} </td>
                                            <td>{{item.active}}</td>

                                            <td> <input type="date" class="form-control" v-model="item.date"/></td>
                                            <td> <button @click="demandNoteIssueWiseActiveDeactive(item.bandwidth, item.date, item.add_sub, item.group_id, item.migrateGroupId)" type="button" class="btn btn-success"> Save</button> </td>


                                        </tr>

                                    </tbody>
                                </table>



                                <div class="row pb-4">

                                    <div class="col-sm-6 col-md-4  text-center pt-4">
                                        <select @change="upDownSearchFunction($event)" class="form-control" v-model="upDownSearch">
                                                <option value="0" selected disabled hidden>Select Upgrade/Downgrade</option>
                                                <option value="1"> Upgrade </option>
                                                <option value="2">Downgrade</option>
                                                <option value="3">Migrate</option>
                                        </select>
                                    </div>

                                    <div class="col-sm-6 col-md-4  text-center pt-4">
                                        <h6 class="pl-3"><strong class="">Bandwith Up-Down Record</strong></h6>
                                    </div>

                                    <div class="col-sm-6 col-md-4  text-center pt-4">
                                        <select @change="popWiseSearchFunction($event)" class="form-control" v-model="popWiseSearch">
                                                <option value="0" selected disabled hidden>Select POP</option>
                                                <option :value="popItem.group_id" v-for="(popItem, pI) in groupByGropupIdList" :key="pI">{{ popItem.groups.group_name}}</option>
                                        </select>
                                    </div>

                                </div>


                                <table class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Pop</th>
                                            <th>Status</th>
                                            <th>Bandwith</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr v-for="(data, index) in upDownRecordList" :key="index">
                                            <td>{{ index + 1 }}</td>
                                            <td> {{data.groups.group_name}}</td>

                                            <td v-if="data.up_down ==1">Upgrade</td>
                                            <td v-else-if="data.up_down ==2">Downgrade</td>
                                            <td v-else>Migrate</td>

                                            <td v-if="data.up_down ==1">{{data.max}}</td>
                                            <td v-else-if="data.up_down ==2">{{data.downgrade}}</td>
                                            <td v-else>{{data.downgrade}}</td>

                                            <td v-if="data.up_down ==1">{{moment(data.approved_date).format("DD-MMM-YYYY")}}</td>
                                            <td v-else-if="data.up_down ==2">{{moment(data.downgrade_date).format("DD-MMM-YYYY")}}</td>
                                            <td v-else>{{ moment(data.downgrade_date).format("DD-MMM-YYYY")}}</td>
                                        </tr>

                                    </tbody>
                                </table>

                            </form>
                        </div>

                        <!-- <div class="card-body">
                            <div class="col-sm-12 text-center">
                              <h6 class="pl-3"><strong class="">Pop Wise Total Active Bandwith </strong></h6>
                            </div>
                                <table class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Pop</th>
                                            <th>Bandwidth</th>
                                            <th>Upgrade/Downgrade</th>
                                            <th>Current Bandwidth</th>
                                            <th>Active Bandwidth</th>
                                            <th>Date</th>
                                            <th>Activation Date</th>
                                            <th>Downgrade Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr v-for="(item, index) in groupTotalBandwithList" :key="index">
                                            <td>{{ index + 1 }}</td>
                                            <td> {{item.groups.group_name}}</td>

                                             <td> <input type="text" class="form-control" v-model="item.bandwidth"/></td>
                                            <td>
                                            <input type="hidden" v-model="item.customer_id"/>
                                            <input type="hidden" v-model="item.id"/>
                                                <select class="form-control inputFillSize" v-model="item.add_sub">
                                                        <option value="1"> Upgrade </option>
                                                        <option value="2">Downgrade</option>
                                                </select>
                                            </td>
                                            <td> {{ demandNoteIssueWiseActive(item, index)}} </td>
                                            <td>{{item.active}}</td>

                                            <td> <input type="date" class="form-control" v-model="item.date"/></td>
                                            <td> {{ item.approved_date }}</td>
                                            <td> {{ item.downgrade_date }}</td>

                                            <td> <button @click="demandNoteIssueWiseActiveDeactive(item.bandwidth, item.date, item.add_sub, item.id)" type="button" class="btn btn-success"> Save</button> </td>


                                        </tr>

                                    </tbody>
                                </table>
                        </div> -->



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
            popListData: [],
            groupTotalBandwithList: [],
            upDownRecordList: [],
            groupByGropupIdList: [],
            totalBandwith: 0,
            customer_id: '',
            comName: '',
            serviceId: 7,
            migration: false,
            upDownSearch: 0,
            popWiseSearch: 0.
        };
    },

    created() {
        this.moment = moment;

        this.getCustomerWiseCircuit();
        this.getlandingGroupList();
    },
    methods: {

        upDownSearchFunction(event){
            // alert(event.target.value)
            this.popOrUpDownWiseBHSearch();
        },

        popWiseSearchFunction(event){
            // alert(event.target.value)
            this.popOrUpDownWiseBHSearch();
        },

        getlandingGroupList() {
            // this.loading = true;
            axios.get("/get-landing-group")
            .then((response) => {
                this.loading = false;
                this.popListData = response.data.data;
            });
        },


        demandNoteIssueWiseActive(item, index){

            if(item.add_sub == 2 && item.bandwidth > item.active){
                alert('Please valid number');
                item.bandwidth = 0;
            }

            if(item.add_sub == 3){
                this.migration = true;

            }

            var total = 0;
            var demandNoteIssueWiseActiveBandwidth = 0;
            var inputBandwidth = 0;
            demandNoteIssueWiseActiveBandwidth = item.active;
            inputBandwidth = item.bandwidth;

           if(item.add_sub == 1){
            total = parseInt(demandNoteIssueWiseActiveBandwidth) + parseInt(inputBandwidth);
           }else{
            total = parseInt(demandNoteIssueWiseActiveBandwidth) - parseInt(inputBandwidth);
           }
           return total;
        },


        // demandNoteIssueWiseActive(item, index){
        //     var total = 0;
        //     var demandNoteIssueWiseActiveBandwidth = 0;
        //     var inputBandwidth = 0;

        //     demandNoteIssueWiseActiveBandwidth = item.max - item.downgrade;

        //     inputBandwidth = item.bandwidth;

        //    if(item.add_sub == 1){
        //     total = parseInt(demandNoteIssueWiseActiveBandwidth) + parseInt(inputBandwidth);
        //    }else{
        //     total = parseInt(demandNoteIssueWiseActiveBandwidth) - parseInt(inputBandwidth);
        //    }
        //    return total;
        // },

        // totalBandwithCalculate(){
        //     if(this.downBandwith > this.totalBandwith){
        //         alert('Please valid number');
        //         this.downBandwith = 0;
        //     }
        //     return this.totalBandwith - this.downBandwith;
        // },

        getCustomerWiseCircuit() {
            axios
                .post("/customer/id/wise/circuit", {id: this.$route.params.id})
                .then((res) => {
                    this.loading = false;
                    this.listData = res.data.data;
                    this.singleItemInListData = this.listData[0];
                    this.groupTotalBandwithList = res.data.groupData;
                    this.upDownRecordList = res.data.upDownRecord;
                    this.groupByGropupIdList = res.data.groupByGropupId;
                    this.totalBandwith = res.data.total;
                    this.customer_id = res.data.customer_id;
                    this.comName = res.data.comName;
                })
                .catch(() => {
                });
        },


        popOrUpDownWiseBHSearch() {
            axios
                .post("/pop/up-down/bandwith/search", {
                    id: this.$route.params.id,
                    upDownSearch: this.upDownSearch,
                    popWiseSearch: this.popWiseSearch
                    })
                .then((res) => {
                    this.loading = false;
                    // this.listData = res.data.data;
                    // this.singleItemInListData = this.listData[0];
                    // this.groupTotalBandwithList = res.data.groupData;
                    this.upDownRecordList = res.data.upDownRecord;
                    // this.groupByGropupIdList = res.data.groupByGropupId;
                    // this.totalBandwith = res.data.total;
                    // this.customer_id = res.data.customer_id;
                    // this.comName = res.data.comName;
                })
                .catch(() => {
                });
        },


        demandNoteIssueWiseActiveDeactive(inputBandwidth, date, add_sub, group_id, migrateGroupId){
            this.onSubmit(inputBandwidth, date, add_sub, group_id, migrateGroupId);
        },

        onSubmit(inputBandwidth, date, add_sub, group_id, migrateGroupId=null){

            axios
                .post("/customer/wisw/bandwith/downgrade",{
                    date : date,
                    add_sub : add_sub,
                    inputBandwidth : inputBandwidth,
                    group_id : group_id,
                    migrateGroupId : migrateGroupId,
                    customer_id : this.customer_id,
                    singleItemInListData : this.singleItemInListData,
                }).then((res) => {
                    this.loading = false;
                    Toast.fire({
                        icon: "success",
                        title: "Successfull Up/Downgrade Customer Bandwith",
                    });
                    this.getCustomerWiseCircuit();
                }).catch(() => {
                    this.loading = false;
                    Swal.fire({
                        icon: "warning",
                        title: "Opps! Please try again !",
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
