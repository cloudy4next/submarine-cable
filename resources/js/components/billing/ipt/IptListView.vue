<template>
  <div class="content-wrapper">
    <div class="modal-header">
      <h4 class="modal-title mr-3" style="color: blue">
        <b>Billing List (IP Transit)</b>
      </h4>

      <div>
        <label for="inputMonth" class="form-label">Please Select Month</label>
        <input id="inputMonth" type="date" v-model="dateForBill" class="form-control" @change="dateWiseBillShow()"
          style="width:200px" />
      </div>

      <div class="text-right">
        <router-link v-if="$can('Iptransit-billing-invoice-list')" :to="{
          name: 'IpTransitInvoiceList',
          params: { id: this.$route.params.id },
        }" class="btn btn-primary p-1 m-1">
          <p class="pr-2 pb-1 mb-0"><i class="fa fa-plus-square  pl-2"> </i> Invoice List</p>
        </router-link>

        <router-link v-if="$can('Iptransit-billing-process')" :to="{
          name: 'IpTransitBillProcess',
          params: { id: this.$route.params.id },
        }" class="btn btn-success p-1 m-1">
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
              <table class="table table-striped table-bordered table-hover w-100" style="min-width: 100%">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col" title="Name of Clients">Month</th>
                    <th scope="col" title="Pop">Pop</th>
                    <th scope="col" title="No. of Customers">No. of Customers</th>
                    <th scope="col" title="Total (BDT)">Total (BDT)</th>
                    <th scope="col" title="License">License</th>
                    <th scope="col" title="Rate">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(bill, index) in billingList" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td title="Name of Month">{{ moment(bill.billing_month).format("MMM-YYYY") }}</td>
                    <td title="Group/Zone">{{ bill.groups.group_name }}</td>
                    <td title="Name of Month">{{ bill.total_custonmer }}</td>
                    <td title="Total Amount">{{ bill.net_total + " /=" }}</td>
                    <td title="License">{{ bill.custype.cus_type_name }}</td>

                    <td>
                      <router-link v-if="$can('Iptransit-billing-View')" :to="{
                        name: 'IpTransitBillView',
                        path: '/Iplc/bill-view/:id',
                        props: true,
                        params: { id: bill.id, serviceId: serviceId },
                      }" target="_blank" title="Bill info View" class="
                            list-group-item
                            d-inline
                            btn btn-sm
                            bg-success
                            text-white
                          ">View</router-link>

                      <router-link v-if="$can('Iptransit-billing-invoice-edit')" :to="{
                        name: 'IpTransitBillUpdate',
                        path: '/Iplc/bill-update/:id',
                        props: true,
                        params: { id: bill.id, serviceId: serviceId },
                      }" target="_blank" title="Bill info Edit" class="
                            list-group-item
                            d-inline
                            btn btn-sm
                            bg-danger
                            text-white
                          ">Edit</router-link>


                      <button v-if="bill.invoice_status == 0" title="Permission for Invoice Ganarete" class="
                            list-group-item
                            d-inline
                            btn btn-sm
                            bg-primary
                            text-white
                          " @click="permissionforInvoiceGanarete(bill.id)">
                        Permission Invoice
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
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

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
    this.moment = moment;
    this.serviceId = this.$route.params.id;
    // this.getBillingList();
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

  watch: {},

  methods: {

    dateWiseBillShow() {
      axios
        .post("/get/date/wise/iplc-billing-list", {
          serId: this.serviceId,
          date: this.dateForBill,
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
          console.log(this.billingList);
        });
    },

    // getTotalCircuitDiscount(circuitList) {
    //     this.circuitDiscount = 0;

    //     circuitList.forEach((value, index) => {
    //         this.circuitDiscount += value.discount;
    //     });

    //     return this.circuitDiscount;
    // },

    showManageItem() {
      // alert("ookk");
      document.getElementById("manageItemId").removeClass("d-none");
    },

    permissionforInvoiceGanarete(id) {
      // alert(id)
      axios
        .post("/iplc-bill-permission/for/invoice-ganarete", { id: id })
        .then((response) => {
          this.$router.push({
            // name: "IplcBillingList",
            name: "IpTransitInvoiceList",
            path: "/Iplc/invoice-list/:id",
            props: true,
            params: { id: this.$route.params.id },
          });
          Toast.fire({
            icon: "success",
            title: "Successfully Done Permission for Invoice Ganarete.",
          });
          // this.$emit("executeMethod");
          this.getBillingList();
        })
        .catch(() => { });
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
