<template>
  <div class="content-wrapper">
    <div class="modal-header">
      <h4 class="text-center" style="color: blue">
        <b>View Invoice List (IPLC)</b>
      </h4>
      <router-link
        :to="{
          name: 'IplcBillingList',
          params: { id: this.$route.params.serviceId },
        }"
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
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <table
                class="table table-striped table-bordered table-hover w-100"
                style="min-width: 100%"
              >
                <thead class="thead-dark">
                  <tr>
                   <th scope="col">SL</th>
                    <th scope="col" title="Circuit Capacity">Customer</th>
                    <th scope="col" title="Circuit Capacity">Cable</th>
                    <th scope="col" title="Circuit Capacity">License</th>
                    <th scope="col" title="Circuit Capacity">Group/Zone</th>
                    <th scope="col" title="Old Mrc And Discount">Total</th>
                    <th scope="col" title="Rate">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in demandNoteList" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td scope="col">{{ item.customers.com_name }}</td>
                    <td scope="col">{{ item.iplcbill.subservice.sub_service_name}}</td>
                    <td scope="col">{{ item.iplcbill.custype.cus_type_name}}</td>
                    <td scope="col">{{ item.iplcbill.groups.group_name}}</td>
                    <td scope="col">{{ item.net_total }}</td>
                    <td>
                        <router-link
                          v-if="item.invoice_ganarete == 0"
                          :to="{
                            name: 'IplcInvoiceReport',
                            path: '/Iplc/bill-invoicereport/:id',
                            props: true,
                            params: { id: item.id },
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
                          >Invoice View</router-link
                        >
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
      demandNoteList: [],
    };
  },

  created() {
    this.visibleForm = true;
    // alert(this.$route.params.serviceId);
    this.getSingleBillInfo(this.$route.params.id );
  },

  methods: {

      permissionforApprove(id) {
        alert(id)
      axios
        .get("/iplc-bill/permission/approval/"+id)
        .then((response) => {
          this.getSingleBillInfo(this.$route.params.id );
          Toast.fire({
            icon: "success",
            title: "Successfully Approved.",
          });
        })
        .catch(() => {});
    },

    getSingleBillInfo(id) {
      axios
        .post("/get/iplc/single/bill-info", { id: id})
        .then((res) => {
          this.loading = false;
          this.demandNoteList = res.data.data;
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
