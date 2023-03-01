<template>
    <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h6 class="pl-3">
                        <strong class="text-blue"> Bill Adjustment Form<br>
                        <span class="text-red">Company Name: </span> <br> Billing Month: {{date.month}}</strong></h6>

                    </div>
                    <div class="col-md-6 text-right">
                        <router-link :to="{ name: 'CustomerList', params:{id: 1} }" class="btn btn-success p-1 m-1">
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
                                                        <month-picker-input @change="showDate" :no-default="false"></month-picker-input>
                                                        <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                                                    </div>
                                                </ValidationProvider>
                                            </div>

                                        </div>
                                        <div class="row"></div> <br>
                                        <table id="example1" class="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>SL</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Diff Date</th>
                                                    <th>Tot Circuit</th>
                                                    <th>Station Ckt</th>
                                                    <th>Ckt Type</th>
                                                    <th>Group/Station</th>
                                                    <th>Rate_Rate</th>
                                                    <th>Discount</th>
                                                    <th>Rate After Discount</th>
                                                    <th class="" style="width:100px;">Adjust</th>
                                                    <th>amount</th>
                                                    <th style="width:100px;" class="text-center">Add</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr v-for="(item, index) in adjustList" :key="index">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>
                                                        <input type="date" class="form-control" required @change="startDate(item, index)" :id="'item' + index"
                                                            v-model="item.sdate" />
                                                    </td>
                                                    <td>
                                                        <input type="date" class="form-control" required @change="endDate(item, index)" :id="'item' + index"
                                                            v-model="item.edate" />
                                                    </td>
                                                    <td>{{item.diffDays}}</td>
                                                    <td> <input type="text" class="form-control" required :id="'item' + index"
                                                            v-model="item.tot_circuit" />
                                                    </td>
                                                    <td> <input type="number" class="form-control" required :id="'item' + index"
                                                            v-model="item.this_group_circuit" />
                                                    </td>
                                                    <td>
                                                        <select class="form-control" required :id="'item' + index"
                                                            v-model="item.circuit_id">
                                                             <option value="" selected="selected" disabled>
                                                                Select Circuit</option>

                                                                <option
                                                                    v-for="(val, index) in circuitList"
                                                                    :key="index"
                                                                    :value="val.id"
                                                                    v-if="
                                                                       val.circuit_name == 'No Circuit'
                                                                    "
                                                                    >
                                                                    {{ val.circuit_name }}
                                                                </option>
                                                        </select>
                                                    </td>

                                                    <td>
                                                         <select class="form-control" required :id="'item' + index"
                                                            v-model="item.group_id" @change="getMrc(item)">
                                                            <option value="" disabled>Select Station</option>
                                                            <option :value="item.id" v-for="(item, index) in listData" :key="index" v-if="item.service_id==23">{{ item.group_name+'='+ item.subservice.sub_service_name}}</option>
                                                        </select>
                                                    </td>

                                                   <td> <input type="text" class="form-control" required :id="'item' + index"
                                                            v-model="item.rate" />
                                                    </td>
                                                     <td> <input type="text" class="form-control" required :id="'item' + index"
                                                            v-model="item.discount" />
                                                    </td>
                                                    <td>{{ rateAfterDiscount(item, index)}}
                                                    </td>
                                                    <td> <select class="form-control" required :id="'item' + index"
                                                            v-model="item.add_sub">
                                                            <option value="1">Add</option>
                                                            <option value="2">Sub</option>
                                                        </select>
                                                    </td>
                                                    <td> {{ rateByDayWiseBill(item, index) }}</td>

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
            circuitList: [],
            adjustList: [{
                sdate: '',
                edate: '',
                amount: '',
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
				days: null,

			}
        };
    },

    created() {
        this.visibleForm = true;
        this.moment = moment;
        this.invoiceId = this.$route.params.id;
        this.getlandingGroupList();
        this.getCircuit();
    },

    watch: {


  },
    methods: {


     getMrc(item) {

      this.loading = true;
      axios
        .post("/customer/wise/mrc/for/port/bill/adjustment", {
          circuitId: item.circuit_id,
          max: item.tot_circuit,
          groupId: item.group_id,
          stationCircuit: item.this_group_circuit,
        })
        .then((res) => {
          this.loading = false;
          this.mrcRate = res.data.data;
          item.rate = parseInt(this.mrcRate);

        });
    },
        startDate(item, index){
            return item.diffDays =  (moment(item.edate, 'YYYY.MM.DD').diff(moment(item.sdate, 'YYYY.MM.DD'), "days"))+1;
        },
        endDate(item,index){
            return item.diffDays =  (moment(item.edate, 'YYYY.MM.DD').diff(moment(item.sdate, 'YYYY.MM.DD'), "days"))+1;
        },

        showDate (date) {
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

        rateAfterDiscount(item, index) {

            if(item.discount !=0){

                return item.afterDiscount = (item.rate - ((item.rate/100)*item.discount)).toFixed(2);
            }else{
                 return item.afterDiscount = (item.rate).toFixed(2);
            }
        },

        rateByDayWiseBill(item, index) {

           return item.amount = ((parseInt(item.afterDiscount)/this.date.days)*item.diffDays).toFixed(2);
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

         getCircuit() {
            axios.get("/get-circuit-list").then((response) => {
                this.loading = false;
                this.circuitList = response.data.data;
            });
        },


        onSubmit() {
            axios.post("/customer/invoice-id/wise/port/bill/adjustment", {
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
                    this.adjustList =[{
                            sdate: '',
                            edate: '',
                            amount: '',
                            rate: '',
                            add_sub: '',
                            diffDays: null,

                        }];
                    this.date ={
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