<template>
  <div class="content-wrapper">
    <div class="modal-header">
      <h4 class="text-center" style="color: blue"><b>Bill Update (IPLC)</b></h4>
      <router-link :to="{
        name: 'IplcBillingList',
        params: { id: this.$route.params.serviceId },
      }" class="btn btn-success p-1 m-1">
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
                  <table class="table table-striped table-bordered table-hover w-100" style="min-width: 100%">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">SL</th>
                        <th scope="col" title="Name of Clients">Name</th>
                        <th scope="col" title="Circuit Rate">Rate</th>
                        <th scope="col" title="Rate After Discount">MRC</th>

                        <th scope="col" title="Monthly Backhaul Charge After Discount BDT (TK)">
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
                        <th scope="col" title="(MRC+MBC) + Total VAT on MRC for Wet Segment & MBC">
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
                          <input type="hidden" v-model="item.bill_id" />
                          <input type="hidden" v-model="item.customer_id" />
                        </td>

                        <td>
                          <input type="text" readonly class="form-control inputFillSize" v-model="item.old_mrc" />
                        </td>
                        <td>
                          <input type="text" readonly class="form-control inputFillSize"
                            v-model="item.old_mrc_after_discount" />
                        </td>

                        <td>
                          <input type="number" class="form-control inputFillSize" v-model.number="item.mbc" />
                        </td>
                        <td>
                          <select class="form-control inputFillSize" v-model="item.add_sub">
                            <option value="1" :selected="item.add_sub == 1">
                              Add
                            </option>
                            <option value="2" :selected="item.add_sub == 2">
                              Sub
                            </option>
                          </select>
                        </td>
                        <td>
                          <input type="number" class="form-control inputFillSize" v-model.number="item.adjust" />
                        </td>
                        <td>
                          {{ getMrcCalculation(item, index).toFixed(2) }}

                        </td>
                        <td>
                          {{ getVatAmount(item, index).toFixed(2) }}

                        </td>
                        <td>
                          {{ getNatTotal(item, index).toFixed(2) }}

                        </td>
                        <td>
                          <input type="text" class="form-control inputFillSize" v-model="item.remarks" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="text-center pb-5">
                <button type="submit" class="btn btn-success float-center">
                  UPDATE
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
    getMrcCalculation(item, index) {
      let result = 0;
      this.adjustAry[index] = item.adjust;
      this.addOrSubAry[index] = item.add_sub;
      this.rateForMbcAry[index] = item.mbc;
      this.customerId[index] = item.customer_id;
      this.bill_id[index] = item.bill_id;
      this.remarks[index] = item.remarks;

      if (item.add_sub == 1) {
        result = +item.mbc + +item.old_mrc_after_discount + +item.adjust;
      } else {
        result = (+item.mbc + +item.old_mrc_after_discount) - +item.adjust;
      }
      // console.log(item, index)
      this.mrcAry[index] = result;
      return result;
    },

    getVatAmount(item, index) {
      let totalMrc = 0;
      totalMrc = this.getMrcCalculation(item, index);
      return this.vatAry[index] = totalMrc / 100 * 5;

    },
    getNatTotal(item, index) {
      return this.netAmountAry[index] = this.getMrcCalculation(item, index) + this.getVatAmount(item, index);

    },

    getSingleBillInfo() {
      axios
        .post("/get/iplc/single/bill-info", { id: this.$route.params.id })
        .then((res) => {
          this.loading = false;
          this.demandNoteList = res.data.data;
        })
        .catch(() => { });
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
          mrcAry: this.mrcAry,
          vatAry: this.vatAry,
          bill_id: this.bill_id,
          customerId: this.customerId,
        })
        .then((res) => {
          this.loading = false;
          this.$router.push({
            name: "IplcBillingList",
            // name: "IplcBillUpdate",
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
