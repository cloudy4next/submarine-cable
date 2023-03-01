<template lang="">

    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Dashboard</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <a href="#">Home</a>
                            </li>
                            <li class="breadcrumb-item active">Dashboard </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-navy">
                            <div class="inner">
                                <h3> {{ invoiceList }}</h3>
                                <p>Total Invoice</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-bag"></i>
                            </div>
                            <a href="#" class="small-box-footer"
                                >More info
                                <i class="fas fa-arrow-circle-right"></i
                            ></a>

                        </div>
                    </div>

                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-green">
                            <div class="inner">
                                <h3> {{ totaldemandNote }}<sup style="font-size: 20px"></sup></h3>
                                <p>Total Demand Note</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-stats-bars"></i>
                            </div>
                            <a href="#" class="small-box-footer"
                                >More info
                                <i class="fas fa-arrow-circle-right"></i
                            ></a>
                        </div>
                    </div>

                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-yellow">
                            <div class="inner">
                                <h3> {{ totalCustomer}}</h3>
                                <p>Total Customers </p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-person-add"></i>
                            </div>
                            <a href="#" class="small-box-footer"
                                >More info
                                <i class="fas fa-arrow-circle-right"></i
                            ></a>

                        </div>
                    </div>

                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-orange">
                            <div class="inner">
                                <h3>  {{ totalLicense }}</h3>
                                <p> license Type </p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-pie-graph"></i>
                            </div>
                            <a href="#" class="small-box-footer"
                                >More info
                                <i class="fas fa-arrow-circle-right"></i
                            ></a>
                        </div>
                    </div>
                </div>
                <!-- start second row -->

                <div class="row">
                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-dark">
                            <div class="inner">
                                <h3>15</h3>
                                <p>Total zone</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-bag"></i>
                            </div>
                            <a href="#" class="small-box-footer"
                                >More info
                                <i class="fas fa-arrow-circle-right"></i
                            ></a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-dark">
                            <div class="inner">
                                <h3>09</h3>
                                <p>Total zone</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-bag"></i>
                            </div>
                            <a href="#" class="small-box-footer"
                                >Inactive Customers
                                <i class="fas fa-arrow-circle-right"></i
                            ></a>
                        </div>
                    </div>
                    <!-- <div class="col-lg-3 col-6">
                        <Bar
                            :chart-options="chartOptions"
                            :chart-data="chartData"
                            :chart-id="chartId"
                            :dataset-id-key="datasetIdKey"
                            :plugins="plugins"
                            :css-classes="cssClasses"
                            :styles="styles"
                            :width="width"
                            :height="height"
                        />
                    </div> -->
                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-dark">
                            <div class="inner">
                                <h3>15</h3>
                                <p>Total zone</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-bag"></i>
                            </div>
                            <a href="#" class="small-box-footer"
                                >More info
                                <i class="fas fa-arrow-circle-right"></i
                            ></a>
                        </div>
                    </div>
                      <!-- <form action="" method="get">
                        <button @click="getSql()" style="submit" class="btn btn-primary"> download</button>
                    </form> -->

                    <!-- <div class="col-lg-3 col-6">
                        <div class="small-box bg-success">
                            <div class="inner">
                                <h3> 35<sup style="font-size: 20px"></sup></h3>
                                <p>Total Demand Note</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-stats-bars"></i>
                            </div>
                            <a href="#" class="small-box-footer"
                                >More info
                                <i class="fas fa-arrow-circle-right"></i
                            ></a>
                        </div>
                    </div>

                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-warning">
                            <div class="inner">
                                <h3>44</h3>
                                <p>Total Customers </p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-person-add"></i>
                            </div>
                            <a href="#" class="small-box-footer"
                                >More info
                                <i class="fas fa-arrow-circle-right"></i
                            ></a>
                        </div>
                    </div>

                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-danger">
                            <div class="inner">
                                <h3> 6</h3>
                                <p> license Type </p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-pie-graph"></i>
                            </div>
                            <a href="#" class="small-box-footer"
                                >More info
                                <i class="fas fa-arrow-circle-right"></i
                            ></a>
                        </div>
                    </div> -->
                </div>
                <!-- end second row -->

                <div class="row">
                    <div class="col-lg-12 col-12" style="height:auto;">
                        <vue-event-calendar
                            :events="getEvents"
                            :title="title"
                            @day-changed="handleDayChanged"
                            @month-changed="handleMonthChanged"
                            @dayChanged="handleDayChange"
                            >
                        </vue-event-calendar>

                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-6 col-6">
                        <img src="uploads/chart.png" alt="Chirt" width="90%" height="90%">
                    </div>
                    <div class="col-lg-6 col-6">
                            <Bar
                                :chart-options="chartOptions"
                                :chart-data="chartData"
                                :chart-id="chartId"
                                :dataset-id-key="datasetIdKey"
                                :plugins="plugins"
                                :css-classes="cssClasses"
                                :styles="styles"
                                :width="width"
                                :height="height"
                            />
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from "moment";
import axios from 'axios';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {

name: 'BarChart',
  components: { Bar },

   props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
    data(){
        return{
            loading:false,
            invoiceList:"",
            totaldemandNote:"",
            totalCustomer:"",
            totalLicense:"",

            chartData: {
                labels: [ 'January', 'February', 'March', 'April', 'May', 'June','July', 'August','September','October','November','December' ],
                datasets: [ { data: [40, 20, 12, 33, 24, 77, 40, 12, 88,79, 90, 100] } ]
            },
            chartOptions: {
                responsive: true
            },

            // getEvents: [{
            //     locale: 'en',
            //     color: 'blue', //Set main color
            //     className: 'Custom className for current clicked date', // (default: 'selected-day')
            //     weekStartOn: 'week Start on which day',  // Can be: 1, 2, 3, 4, 5, 6, 0 (default: 0)
            //     customClass: 'disabled highlight', // Custom classes to an calendar cell
            // }],

            getEvents:[],

        }
    },

    created(){

        this.getInvoice();
        this.getDemandNote();
        this.gettotalCustomer();
        this.getTotallicense();
        this.moment = moment;
        this.getEventList();

    },
    methods: {

        getEventList() {
            this.loading = true;
            axios.get("/get-event-list").then((response) => {
                this.loading = false;
                this.getEvents = response.data.Event;
            });
        },

    getSql(){
      axios.get('/our_backup_database')
        .then()
        .catch()
     },

       getInvoice(){
      axios.get('/get-invoice-info')
        .then(({data}) => (this.invoiceList = data))
        .catch()
     },
     getDemandNote(){
        axios.get("/get-demand-info")
        .then(({data}) => (this.totaldemandNote =data))
        .catch()

     },
     gettotalCustomer(){
        axios.get("/get-customer-info")
        .then(({data}) => (this.totalCustomer =data))
        .catch()

     },
      getTotallicense(){
        axios.get("/get-license-info")
        .then(({data}) => (this.totalLicense =data))
        .catch()

     },

    },

};


</script>
<style lang="scop">


</style>
