<template>
    <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h6 class="pl-3">
                            <strong class="text-blue"> Bill Adjustment Form<br>
                                <span class="text-red">Company Name: </span> <br> Billing Month: July</strong>
                        </h6>

                    </div>
                    <div class="col-md-6 text-right">
                        <router-link :to="{ name: 'CustomerList', params: { id: 7 } }" class="btn btn-success p-1 m-1">
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
                            <div class="card-body" v-if="visibleForm">

                                <ValidationObserver v-slot="{ handleSubmit }">
                                    <form @submit.prevent="onSubmit">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <ValidationProvider name="Billing Month" rules="required|min_value:1"
                                                    v-slot="{ errors }">
                                                    <div class="form-group">
                                                        <label>Adjustable Month</label>
                                                        <month-picker-input @change="showDate"
                                                            :no-default="true"></month-picker-input>
                                                        <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                                                    </div>
                                                </ValidationProvider>
                                            </div>

                                        </div>
                                        <div class="row"></div> <br>
                                        <table class="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>SL</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Diff Date</th>
                                                    <th>Tot Bandwith</th>
                                                    <th>This Pop</th>
                                                    <th>License Type</th>
                                                    <th>Pop</th>
                                                    <th>Unit Rate</th>
                                                    <th>Rate</th>
                                                    <th>Discount</th>
                                                    <th>Rate After Discount</th>
                                                    <th class="" style="width:100px;">Adjust</th>
                                                    <th>amount</th>
                                                    <th>remarks</th>
                                                    <th style="width:100px;" class="text-center">Add</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr v-for="(item, index) in adjustList" :key="index">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>
                                                        <input type="date" class="form-control" required
                                                            @change="startDate(item, index)" :id="'item' + index"
                                                            v-model="item.sdate" />
                                                    </td>
                                                    <td>
                                                        <input type="date" class="form-control" required
                                                            @change="endDate(item, index)" :id="'item' + index"
                                                            v-model="item.edate" />
                                                    </td>
                                                    <td>{{ item.diffDays }}</td>
                                                    <td> <input type="text" class="form-control" required
                                                            :id="'item' + index" v-model="item.tot_bandwith" />
                                                    </td>
                                                    <td> <input type="number" class="form-control" required
                                                            :id="'item' + index" v-model="item.this_group_bandwith" />
                                                    </td>
                                                    <td>
                                                        <select class="form-control" required :id="'item' + index"
                                                            v-model="item.licence">
                                                            <option value="" selected="selected" disabled>
                                                                Select License
                                                            </option>
                                                            <option v-for="(val, index) in licenceList" :key="index"
                                                                :value="val.id">
                                                                {{ val.cus_type_name }}
                                                            </option>
                                                        </select>
                                                    </td>

                                                    <td>
                                                        <select class="form-control" required :id="'item' + index"
                                                            v-model="item.group_id" @change="getMrc(item)">
                                                            <option value="" disabled>Select Pop</option>
                                                            <option :value="item.id" v-for="(item, index) in listData"
                                                                :key="index" v-if="item.service_id == 7">{{
                                                                    item.group_name + '=' + item.subservice.sub_service_name }}
                                                            </option>
                                                        </select>
                                                    </td>

                                                    <td> <input type="text" class="form-control" required
                                                            :id="'item' + index" v-model="item.rate" />
                                                    </td>

                                                    <td> {{ rateMultiply(item) }}
                                                        <input type="hidden" class="form-control" required
                                                            :id="'item' + index" v-model="item.rate" />
                                                    </td>
                                                    <td> <input type="text" class="form-control" required
                                                            :id="'item' + index" v-model="item.discount" />
                                                    </td>
                                                    <td>{{ rateAfterDiscount(item, index) }}
                                                    </td>
                                                    <td> <select class="form-control" required :id="'item' + index"
                                                            v-model="item.add_sub">
                                                            <option value="1">Add</option>
                                                            <option value="2">Sub</option>
                                                        </select>
                                                    </td>
                                                    <td> {{ rateByDayWiseBill(item, index) }}</td>
                                                    <td>
                                                        <input type="text" class="form-control" required
                                                            :id="'item' + index" v-model="item.remarks" />
                                                    </td>
                                                    <td class="btn btn-success" @click="addRow()"> <i
                                                            class="fa fa-plus text-red p-1 m-1"></i>
                                                    </td>

                                                    <td v-if="adjustList.length != 1" class="btn btn-danger"
                                                        @click="removeRow(index)"> <i
                                                            class="fa fa-times text-light p-1 m-1"></i>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="row pt-2">
                                            <div class="col-md-12 text-center">
                                                <button class="btn btn-success" type="submit">SUBMIT</button>
                                            </div>
                                        </div>
                                    </form>
                                </ValidationObserver>
                            </div>

                            <div class="card-body" v-if="currentAdjustList.length > 0">
                                <table class="table table-bordered table-striped">
                                    <thead>

                                        <!-- <tr>
                                            <th>Tot Circuit</th>
                                            <th>Station Ckt</th>
                                        </tr> -->

                                        <tr>
                                            <th>SL</th>
                                            <th style="width:200px">Start Date</th>
                                            <th style="width:200px">End Date</th>
                                            <th>Diff Date</th>
                                            <th>Tot Bandwith</th>
                                            <th>This Pop</th>
                                            <th>License Type</th>
                                            <th>Pop</th>
                                            <th>Unit Rate</th>
                                            <th>Rate</th>
                                            <th>Discount</th>
                                            <th>Rate After Discount</th>
                                            <th class="" style="width:100px;">Adjust</th>
                                            <th>amount</th>
                                            <th>remarks</th>
                                            <th style="width:100px;" class="text-center">Action</th>
                                        </tr>

                                    </thead>

                                    <tbody>
                                        <tr v-for="(adjustItem, i) in currentAdjustList" :key="i">
                                            <td>{{ i + 1 }}</td>
                                            <td>{{ moment(adjustItem.sdate).format("DD/MMM/YYYY") }}</td>
                                            <td>{{ moment(adjustItem.edate).format("DD/MMM/YYYY") }}</td>
                                            <td>{{ adjustItem.dif_days }}</td>
                                            <td>{{ adjustItem.tot_circuit }}</td>
                                            <td>{{ adjustItem.this_group_circuit }}</td>
                                            <td>{{ adjustItem.circuit.circuit_name }}</td>
                                            <td>{{ adjustItem.groups.group_name }}</td>
                                            <td>{{ adjustItem.rate }}</td>
                                            <td>{{ adjustItem.rate * adjustItem.this_group_circuit }}</td>
                                            <td>{{ adjustItem.discount }}</td>
                                            <td>{{ adjustItem.rate_after_discount }}</td>
                                            <td>{{ adjustItem.add_sub }}</td>
                                            <td>{{ adjustItem.amount }}</td>
                                            <td>{{ adjustItem.remarks }}</td>
                                            <td>
                                                <button type="button" title="Delete Adjust" class="btn btn-danger btn-sm"
                                                    @click="deleteAdjustItem(adjustItem.id)">
                                                    <i class="fa fa-trash action-btn-font m-0" aria-hidden="true"></i>
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
import Datepicker from 'vuejs-datepicker';
import { MonthPickerInput } from 'vue-month-picker';
import { MonthPicker } from 'vue-month-picker'
export default {
    components: {
        MonthPickerInput,
        MonthPicker,
        Datepicker
    },
    data() {
        return {
            loading: false,
            visibleForm: false,
            invoiceId: '',
            mrcRate: 0,
            listData: [],
            licenceList: [],
            currentAdjustList: [],
            adjustList: [{
                sdate: '',
                edate: '',
                amount: '',
                remarks: '',
                rate: '',
                add_sub: '',
                diffDays: null,

            }],

            date: {
                sdate: null,
                edate: null,
                from: null,
                to: null,
                month: null,
                year: null,
                monthIndex: null,
                days: null
            }
        };
    },

    created() {
        this.visibleForm = true;
        this.moment = moment;
        this.invoiceId = this.$route.params.id;
        this.getlandingGroupList();
        this.getCurrentAdjustList(this.$route.params.id);
        this.getLicence();
    },

    watch: {


    },
    methods: {

        getCurrentAdjustList(id) {
            axios.get("/get/customer/invoice-id/wise/bill/adjustment/" + id)
                .then((response) => {
                    this.loading = false;
                    this.currentAdjustList = response.data.data;
                });
        },


        deleteAdjustItem(id) {
            axios.get("/delete/iplc/bill/adjustment/" + id)
                .then((response) => {
                    this.loading = false;
                    this.getCurrentAdjustList(this.$route.params.id);
                    Toast.fire({
                        icon: "success",
                        title: "Adjustment Delete Successfully.",
                    });
                });
        },

        getMrc(item) {
            this.loading = true;
            axios
                .post("/customer/wise/ip-transit/mrc/for/bill/adjustment", {
                    licenceId: item.licence,
                    max: item.tot_bandwith,
                    groupId: item.group_id,
                    stationCircuit: item.this_group_bandwith,
                })
                .then((res) => {
                    this.loading = false;
                    this.mrcRate = res.data.data;
                    item.rate = parseInt(this.mrcRate);

                });
        },
        startDate(item, index) {
            return item.diffDays = (moment(item.edate, 'YYYY.MM.DD').diff(moment(item.sdate, 'YYYY.MM.DD'), "days")) + 1;
        },
        endDate(item, index) {
            return item.diffDays = (moment(item.edate, 'YYYY.MM.DD').diff(moment(item.sdate, 'YYYY.MM.DD'), "days")) + 1;
        },

        showDate(date) {
            this.date = date
            var monthIndex = null;
            var year = null;
            var month = null;

            year = this.date.year;
            monthIndex = this.date.monthIndex;
            month = this.date.month;


            const getDays = (year, month) => new Date(year, month, 0).getDate();
            const days = getDays(year, monthIndex);
            this.date.days = days;
        },

        rateMultiply(item) {
            return item.urate = item.rate * item.this_group_bandwith;
        },

        rateAfterDiscount(item, index) {

            if (item.discount != 0) {

                return item.afterDiscount = (parseFloat(item.urate - ((item.urate / 100) * item.discount))).toFixed(2);
            } else {
                return item.afterDiscount = (parseFloat(item.urate)).toFixed(2);
            }
        },

        rateByDayWiseBill(item, index) {

            return item.amount = ((parseInt(item.afterDiscount) / this.date.days) * item.diffDays).toFixed(2);
        },

        addRow() {
            this.adjustList.push({

            })
        },

        removeRow(index) {
            this.adjustList.splice(index, 1)
        },

        getlandingGroupList() {
            this.loading = true;
            axios.get("/get-landing-group")
                .then((response) => {
                    this.loading = false;
                    this.listData = response.data.data;
                });
        },

        getLicence() {
            axios.get("/get-customer-serve/wise/type-list").then((response) => {
                this.loading = false;
                this.licenceList = response.data.data;
            });
        },


        onSubmit() {
            axios
                .post("/customer/invoice-id/wise/ipt/bill/adjustment", {
                    invoiceId: this.invoiceId,
                    adjustList: this.adjustList,
                    date: this.date,
                })
                .then((res) => {
                    this.loading = false;
                    Toast.fire({
                        icon: "success",
                        title: "Successfull Adjust Customer Day wies Bill",
                    });

                    this.getCurrentAdjustList(this.$route.params.id);
                    this.adjustList = [{
                        sdate: '',
                        edate: '',
                        amount: '',
                        remarks: '',
                        rate: '',
                        add_sub: '',
                        diffDays: null,

                    }];
                    this.date = {
                        sdate: null,
                        edate: null,
                        from: null,
                        to: null,
                        month: null,
                        year: null,
                        monthIndex: null,
                        days: null
                    };
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