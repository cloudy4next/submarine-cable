<template>
  <div class="content-wrapper">
    <div class="modal-header">
      <h4 class="text-center" style="color: blue"><b>Invoice List ( IP Transit )</b></h4>

      <router-link
        :to="{ name: 'IpTransitBillingList', params: { id: this.$route.params.id } }"
        class="btn btn-success p-1 m-1"
      >
         <p class="pr-2 pb-1 mb-0"><i class="fa fa-list-ul  pl-2"> </i> Billing List</p>
      </router-link>
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
                class="table table-striped table-bordered table-hover w-100 ipiInvoiceTable"
                style="min-width: 100%">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col" title="Circuit Capacity">Customer</th>
                    <th scope="col" title="Activation Date">Old Mrc</th>
                    <th scope="col" title="Activation Date">Mbc</th>
                    <th scope="col" title="Old Mrc And Discount">Adjust</th>
                    <th scope="col" title="Old Mrc And Discount">Add/Sub</th>
                    <th scope="col" title="Circuit Capacity">Mrc</th>
                    <th scope="col" title="Old Mrc And Discount">Vat</th>
                    <th scope="col" title="Old Mrc And Discount">Total</th>
                    <th scope="col" title="Rate">Action</th>
                    <!-- <th scope="col" title="Rate">AdjustMent</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(bill, index) in invoiceList" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td scope="col">{{ bill.customers.com_name }}</td>
                    <td scope="col">{{ bill.old_mrc_after_discount }}</td>
                    <td scope="col">{{ bill.mbc }}</td>
                    <td scope="col">{{ bill.adjust }}</td>
                    <td scope="col" v-if="bill.add_sub == 1">Add</td>
                    <td scope="col" v-else>Sub</td>
                    <td scope="col">{{ bill.mrc }}</td>
                    <td scope="col">{{ bill.vat }}</td>
                    <td scope="col">{{ bill.net_total }}</td>
                    <td>
                      <router-link
                        v-if="bill.invoice_ganarete == 0"
                        :to="{
                          name: 'IpTransitInvoiceReport',
                          path: '/Ip-transit/bill-invoicereport/:id',
                          props: true,
                          params: { id: bill.id },
                        }"
                        target="_blank"
                        title="Permission for Invoice Ganarete"
                        class="
                          list-group-item
                          d-inline
                          btn btn-sm
                          bg-primary
                          text-white
                        "
                        >
                        Invoice Generate</router-link>
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

export default {
  props: ["item"],
  data() {
    return {
      loading: false,
      visibleForm: false,
      invoiceList: [],

      invoice: {
        demand_note_id: "",
      },
    };
  },

  created() {
    // alert(this.$route.params.id);
    this.visibleForm = true;
    this.getInvoiceList(this.$route.params.id);
  },

  watch: {},

mounted(){
    setTimeout(() => {
      $(document).ready(function () {
        $('.ipiInvoiceTable').DataTable({
          searching: true,
          ordering:  true
        });
    });
    }, 2000);
  },

  methods: {
    // permissionforInvoiceGanarete(id) {
    //     // alert(id)
    //     axios.post("/iplc-bill/invoice-ganarete",{id:id})
    //         .then((response) => {
    //             this.$router.push({
    //                 name: 'InvoiceReport',
    //             });
    //             Toast.fire({
    //                 icon: "success",
    //                 title: "Successfully Done Invoice Ganarete.",
    //             });
    //             // this.$emit("executeMethod");
    //             this.getInvoiceList();
    //         })
    //         .catch(() => {

    //         });
    // },

    getInvoiceList(id) {
      axios
        .get("/get/ip-transit-invoice-list/"+id)
        .then((res) => {
          this.loading = false;
          this.invoiceList = res.data.data;
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
