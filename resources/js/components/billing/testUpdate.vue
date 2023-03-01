<template>
  <div class="content-wrapper">
    <div class="modal-header">
      <h4 class="text-center" style="color: blue"><b>Bill Update (IPLC)</b></h4>
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
        <div class="card-body" v-if="visibleForm">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
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
                        <!-- <th scope="col" title="5% VAT on MBC">5% Vat.MBC</th> -->
                        <!-- <th scope="col" title="Total  VAT on MRC for Wet Segment & MBC">Total VAT</th> -->
                        <th
                          scope="col"
                          title="(MRC+MBC) + Total VAT on MRC for Wet Segment & MBC"
                        >
                          Net Bill
                        </th>
                        <th scope="col" title="De-activation or Others">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in demandNoteList" :key="index">
                        <td scope="row">{{ index + 1 }}</td>
                        <td>
                          {{ item.customers.com_name }}
                          <input
                            type="hidden"
                            :id="index + 'bill_id'"
                            :value="item.bill_id"
                          />
                          <input
                            type="hidden"
                            :id="index + 'customerId'"
                            :value="item.customer_id"
                          />
                        </td>

                        <td>
                          <input
                            type="text"
                            readonly
                            class="form-control inputFillSize"
                            :id="index + ''"
                            :value="item.old_mrc"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            readonly
                            class="form-control inputFillSize"
                            :id="index + '_oldMrc'"
                            :value="item.old_mrc_after_discount"
                          />
                        </td>

                        <td>
                          <input
                            type="number"
                            class="form-control inputFillSize"
                            :id="index + '_mbc'"
                            :value="item.mbc"
                            @keyup="mbcVatCalculation(index)"
                          />
                        </td>
                        <td>
                          <select
                            class="form-control inputFillSize"
                            name=""
                            :id="index + '_addOrSub'"
                          >
                            <option value="1" :selected="item.add_sub == 1">
                              Add
                            </option>
                            <option value="2" :selected="item.add_sub == 2">
                              Sub
                            </option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            class="form-control inputFillSize"
                            :id="index + '_adjust'"
                            :value="item.adjust"
                            @keyup="adjustCalculation(index)"
                          />
                        </td>
                        <td>
                          {{ item.mrc }}
                          <input
                            type="text"
                            readonly
                            class="form-control form-control-sm inputFillSize"
                            :id="index + '_mbcAndMrc'"
                          />
                        </td>
                        <td>
                          {{ item.vat }}
                          <input
                            type="text"
                            readonly
                            class="form-control form-control-sm inputFillSize"
                            :id="index + '_totalVat'"
                          />
                        </td>
                        <td>
                          {{ item.net_total }}
                          <input
                            type="text"
                            readonly
                            class="form-control form-control-sm inputFillSize"
                            :id="index + 'netAmount'"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            class="form-control inputFillSize"
                            :id="index + 'remarks'"
                            :value="item.remarks"
                            @keyup="remarksAdd(index)"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="text-center pb-5">
                <button type="submit" class="btn btn-success float-center">
                  SUBMIT
                </button>
              </div>
            </form>
          </ValidationObserver>
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
      demandNoteList: [],

      rateForMbcAry: [],
      adjustAry: [],
      addOrSubAry: [],
      discountWiseOldMrcAry: [],
      OldMrcAry: [],
      mrcAry: [],
      vatAry: [],
      netAmountAry: [],
      allCustomer: [],
      remarks: [],
      bill_id: [],
      customerId: [],

      rateForMbc: 0,
      adjust: 0,
      addOrSub: 1,
      discountWiseOldMrc: 0,
      OldMrc: 0,
      mrc: 0,
      vat: 0,
      vatResult: 0,
      mrcAndMbcCount: 0,
    };
  },

  created() {
    this.visibleForm = true;
    this.getSingleBillInfo();
  },

  methods: {
    remarksAdd(index) {
      this.mbcVatCalculation(index);
      this.remarks[index] = document.getElementById(index + "remarks").value;
    },

    adjustCalculation(index) {
      this.remarksAdd(index);
    },

    mbcVatCalculation(index) {
      this.rateForMbc = 0;
      this.adjust = 0;
      this.OldMrc = 0;
      this.discountWiseOldMrc = 0;
      this.vat = 0;
      this.adjust = 0;

      this.OldMrc = document.getElementById(index + "_oldMrc").value;
      this.adjust = document.getElementById(index + "_adjust").value;
      this.addOrSub = document.getElementById(index + "_addOrSub").value;
      this.rateForMbc = document.getElementById(index + "_mbc").value;

      this.bill_id[index] = document.getElementById(index + "bill_id").value;
      this.customerId[index] = document.getElementById(
        index + "customerId"
      ).value;

      this.mrcAndMbcCount =
        parseFloat(this.rateForMbc) + parseFloat(this.OldMrc);

      if (this.addOrSub == 1) {
        this.mrc = this.mrcAndMbcCount + parseFloat(this.adjust);
        document
          .getElementById(index + "_mbcAndMrc")
          // .removeAttribute("value")
          .setAttribute("value", this.mrc);
      } else {
        this.mrc = this.mrcAndMbcCount - parseFloat(this.adjust);
        document
          .getElementById(index + "_mbcAndMrc")
          .setAttribute("value", this.mrc);
      }

      this.vat = (this.mrc / 100) * 5;
      document
        .getElementById(index + "_totalVat")
        .setAttribute("value", this.vat);
      document
        .getElementById(index + "netAmount")
        .setAttribute("value", this.vat + this.mrc);

      this.rateForMbcAry[index] = this.rateForMbc;
      this.adjustAry[index] = this.adjust;
      this.addOrSubAry[index] = this.addOrSub;
      this.OldMrcAry[index] = this.OldMrc;
      this.mrcAry[index] = this.mrc;
      this.vatAry[index] = this.vat;
      this.netAmountAry[index] = this.vat + this.mrc;
    },

    getSingleBillInfo() {
      axios
        .post("/get/iplc/single/bill-info", { id: this.$route.params.id })
        .then((res) => {
          this.loading = false;
          this.demandNoteList = res.data.data;
        })
        .catch(() => {});
    },

    onSubmit() {
      // alert(this.demandNoteList[0].bill_id);
      axios
        .post("/update/processing-bill-info", {
          netAmountAry: this.netAmountAry,
          remarks: this.remarks,
          rateForMbcAry: this.rateForMbcAry,
          adjustAry: this.adjustAry,
          addOrSubAry: this.addOrSubAry,
          OldMrcAry: this.OldMrcAry,
          mrcAry: this.mrcAry,
          vatAry: this.vatAry,
          bill_id: this.bill_id,
          customerId: this.customerId,
        })
        .then((res) => {
          this.loading = false;
          this.$router.push({
            name: "IplcBillingList",
            params: { id: this.$route.params.serviceId },
          });
          Toast.fire({
            icon: "success",
            title: "Successfully Update Monthly bill info .",
          });
          this.$emit("executeMethod");
        })
        .catch(() => {
          this.loading = false;
          Swal.fire({
            icon: "warning",
            title: "wrong.. Please try again!",
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
