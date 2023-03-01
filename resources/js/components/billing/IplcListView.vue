<template>
  <div class="content-wrapper">
    <div class="modal-header">
      <h4 class="mr-3" style="color: blue">
        <b v-if="$route.params.report!=1">Billing List (IPLC)</b>
        <b v-if="$route.params.report==1">Bill Details Report (IPLC)</b>
      </h4>
      <div>
       <label for="inputMonth" class="form-label">Please Select Month</label>
      <input id="inputMonth" type="date" v-model="dateForBill" class="form-control"  @change="dateWiseBillShow()" style="width:200px"/>
      </div>

      <div class="text-left mt-4 pr-5 mr-5" v-if="$route.params.report==1">
        <router-link v-if="$can('Iplc-billing-View')"
          :to="{
            name: 'IplcMonthWiseBillReport',
            path: '/Iplc/bill-month/wise/report/:date',
            props: true,
            params: {serviceId: serviceId, date:dateForBill },
          }"
          target="_blank" title="Monthly Report Generate" class="text-right border-0 rounded  btn bg-success text-white">Monthly Report Generate</router-link>
      </div>

      <div class="text-right" v-if="$route.params.report!=1">
        <router-link v-if="$can('Iplc-billing-invoice-list')"
          :to="{
            name: 'IplcInvoiceList',
            params: { id: this.$route.params.id },
          }"
          class="btn btn-primary p-1 m-1">
          <p class="pr-2 pb-1 mb-0"><i class="fa fa-plus-square  pl-2"> </i> Invoice List</p>
        </router-link>

        <router-link v-if="$can('Iplc-billing-process')"
          :to="{
            name: 'IplcBillProcess',
            params: { id: this.$route.params.id },
          }"
          class="btn btn-success p-1 m-1">
          <p class="pr-2 pb-1 mb-0"><i class="fa fa-plus-square  pl-2"> </i> Bill Process</p>
        </router-link>
      </div>

    </div>

    <div class="modal-body">
      <div class="card card-primary">
        <div class="overlay" v-if="loading">
          <i class="fa fa-spinner fa-spin"></i>
        </div>
        <div class="card-body" v-if="visibleForm">
          <div class="row">
            <div class="col-md-12">
              <table
                class="table table-striped table-bordered table-hover w-100"
                style="min-width: 100%"
              >
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col" title="Name of Clients">Month</th>
                    <th scope="col" title="Pop">Pop</th>
                    <th scope="col" title="No. of Customers">No. of Customers</th>
                    <th scope="col" title="Total (BDT)">Total (BDT)</th>
                    <th scope="col" title="License">License</th>
                    <th scope="col" title="Rate" v-if="$route.params.report==1">Report</th>
                    <th scope="col" title="Rate" v-if="$route.params.report!=1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(bill, index) in billingList" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td title="Name of Month">{{ moment(bill.billing_month).format("MMM-YYYY")}}</td>
                    <td title="Group/Zone">{{ bill.groups.group_name }}</td>
                    <td title="Name of Month">{{ bill.total_custonmer }}</td>
                    <td title="Total Amount">{{ bill.net_total + " /=" }}</td>
                    <td title="License">{{ bill.custype.cus_type_name }}</td>
                    <td v-if="$route.params.report==1">
                       <router-link v-if="$can('Iplc-billing-View')"
                        :to="{
                          name: 'IplcBillReport',
                          path: '/Iplc/bill-report/:id',
                          props: true,
                          params: { id: bill.id, serviceId: serviceId },
                        }"
                        target="_blank"
                        title="Bill info View"
                        class="
                          list-group-item
                          d-inline
                          btn btn-sm
                          bg-primary
                          text-white
                        "
                        >Generate</router-link
                      >
                    </td>
                    <td v-if="$route.params.report!=1">
                      <router-link v-if="$can('Iplc-billing-View')"
                        :to="{
                          name: 'IplcBillView',
                          path: '/Iplc/bill-view/:id',
                          props: true,
                          params: { id: bill.id, serviceId: serviceId },
                        }"
                        target="_blank"
                        title="Bill info View"
                        class="
                          list-group-item
                          d-inline
                          btn btn-sm
                          bg-success
                          text-white
                        "
                        >View</router-link
                      >

                      <router-link v-if="$can('Iplc-billing-invoice-edit')"
                        :to="{
                          name: 'IplcBillUpdate',
                          path: '/Iplc/bill-update/:id',
                          props: true,
                          params: { id: bill.id, serviceId: serviceId },
                        }"
                        target="_blank"
                        title="Bill info Edit"
                        class="
                          list-group-item
                          d-inline
                          btn btn-sm
                          bg-danger
                          text-white
                        "
                        >Edit</router-link
                      >

                       <router-link
                        :to="{
                          name: 'IplcMonthlyInvoiceView',
                          path: '/Iplc/bill-view/invoice/:id',
                          props: true,
                          params: { id: bill.id, serviceId: serviceId },
                        }"
                        target="_blank"
                        title="Bill info Edit"
                        class="
                          list-group-item
                          d-inline
                          btn btn-sm
                          bg-primary
                          text-white
                        "
                        >Invoice</router-link
                      >


                      <!-- <button
                        v-if="bill.invoice_status == 0"
                        title="Permission for Invoice Ganarete"
                        class="
                          list-group-item
                          d-inline
                          btn btn-sm
                          bg-warning
                          text-white
                        "
                        @click="permissionforInvoiceGanarete(bill.id)"
                      >
                          Approve (ALL)
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
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  props: ["item"],
  data() {
    return {
      loading: false,
      visibleForm: false,
      billingList: [],
      serviceId: "",
      dateForBill: "",

      invoice: {
        demand_note_id: "",
      },
    };
  },

  created() {
    this.visibleForm = true;
    this.serviceId = this.$route.params.id;
    // this.getBillingList();
    this.moment = moment;
  },
  watch: {},

   mounted(){
    setTimeout(() => {
      $(document).ready(function () {
        $('.testDataTable').DataTable({
          searching: true,
          ordering:  true
        });
    });
    }, 2000);
  },

  methods: {

    dateWiseBillShow(){
       axios
        .post("/get/date/wise/iplc-billing-list",{
          serId:this.serviceId,
          date:this.dateForBill,
        })
        .then((res) => {
          this.loading = false;
          this.billingList = res.data.data;
        });
    },
    getBillingList() {
      axios
        .get("/get/iplc-billing-list/" + this.serviceId)
        .then((res) => {
          this.loading = false;
          this.billingList = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // getTotalCircuitDiscount(circuitList) {
    //     this.circuitDiscount = 0;

    //     circuitList.forEach((value, index) => {
    //         this.circuitDiscount += value.discount;
    //     });

    //     return this.circuitDiscount;
    // },

    permissionforInvoiceGanarete(id) {
      // alert(id)
      axios
        .post("/iplc-bill-permission/for/invoice-ganarete", { id: id })
        .then((response) => {
          this.$router.push({
            // name: "IplcBillingList",
            name: "IplcInvoiceList",
            path: "/Iplc/invoice-list/:id",
            props: true,
            params: { id: this.$route.params.id},
          });
          Toast.fire({
            icon: "success",
            title: "Successfully Done Permission for Invoice Generate.",
          });
          // this.$emit("executeMethod");
          this.getBillingList();
        })
        .catch(() => {});
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

table {
  width: 100%;
}

tbody tr td {
  width: auto;
}
.inputFillSize {
  width: 100%;
}

.dateFillSize {
  width: 70px;
}
.mrcAndDiscount {
  width: 95px;
}
</style>
