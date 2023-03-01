<template>
  <div class="content-wrapper">
    <div class="modal-header">
      <h4 class="text-center" style="color: blue">
        <b>View Bill Info (IPLC)</b>
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
                    <th scope="col" title="Name of Clients">Name</th>
                    <!-- <th scope="col" title=" Circuit ">Circuit</th> -->
                    <th scope="col" title="Circuit Rate">Rate</th>
                    <th scope="col" title="Rate After Discount">MRC</th>

                    <th
                      scope="col"
                      title="Monthly Backhaul Charge After Discount BDT (TK)"
                    >
                      MBC
                    </th>
                    <th scope="col" title="Add Or Subtract">Add/Sub</th>
                    <th scope="col" title="Adjust/Additional Discount">
                      Adjust
                    </th>
                    <th scope="col" title="Monthly rental MRC+MBC + Adjust">
                      MRC + MBC + Adjust
                    </th>
                    <th scope="col" title="5% VAT on MRC for Wet Segment">
                      5% VAT
                    </th>
                    <th
                      scope="col"
                      title="(MRC+MBC) + Total VAT on MRC for Wet Segment & MBC"
                    >
                      Net Bill
                    </th>
                    <th scope="col" title="De-activation or Others">Remarks</th>
                    <th scope="col" title="Approve">Approve</th>
                    <th scope="col" title="Adjust this bill">Adjustment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in demandNoteList" :key="index">
                    <td scope="row">{{ index + 1 }}</td>
                    <td>
                      {{ item.customers.com_name }}
                    </td>

                    <!-- <td>
                      {{ item.circuit_id }}
                    </td> -->

                    <td>{{ item.old_mrc }}</td>
                    <td>{{ item.old_mrc_after_discount }}</td>

                    <td>{{ item.mbc }}</td>
                    <td v-if="item.add_sub == 1">Add</td>
                    <td v-else>Sub</td>
                    <td>{{ item.adjust }}</td>
                    <td>
                      {{ item.mrc }}
                    </td>
                    <td>
                      {{ item.vat }}
                    </td>
                    <td>
                      {{ item.net_total }}
                    </td>
                    <td>{{ item.remarks }}</td>
                    <td>
                      <button
                          v-if="item.invoice_status == 0"
                          title="Permission for Invoice Ganarete"
                          class="
                            list-group-item
                            d-inline
                            btn btn-sm
                            bg-success
                            text-white
                          "
                          @click="permissionforApprove(item.id)"
                        >
                            Approve
                        </button>

                    </td>

                      <td>
                        <router-link class="list-group-item
                                            d-inline
                                            btn btn-sm
                                            bg-success
                                            text-white" :to="{
                              name: 'IPLCCustomerBillAdjust',
                              params: { id: item.id }
                            }"> AdjustMent
                        </router-link>
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
        // alert(id)
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
