<template>
  <div class="content-wrapper">
    <div class="modal-header">
            <h4 class="modal-title mr-3" style="color: blue">
                <b>Billing Reports (IPLC)</b>
            </h4>
            <div class="col-md-2">
            <button
              @click="print"
              type="button"
              class="btn btn-info float-left"
            >
              <i class="fa fa-print"></i>
              Print
            </button>
          </div>
        </div>

    <div class="modal-body">
      <div class="card card-primary">
        <div class="overlay" v-if="loading">
          <i class="fa fa-spinner fa-spin"></i>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <table class="table table-bordered w-100" style="min-width: 100%">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col" title="Name of Clients">Name</th>
                    <th scope="col" title="Name of Clients">Billing Period</th>
                    <th scope="col" title="Rate">Rate</th>
                    <th scope="col" title="Rate After Discount">Rate After Discount</th>
                    <th scope="col" title=" MRC For Wet Segment After slab and days count BDT (TK) ">MRC</th>
                    <th scope="col" title="Monthly Backhaul Charge After Discount BDT (TK)" > MBC</th>
                    <th scope="col" title="Add Or Subtract">Add/Sub</th>
                    <th scope="col" title="Adjust/Additional Discount"> Adjust</th>
                    <th scope="col" title="Monthly rental MRC+MBC + Adjust"> MRC + MBC + Adjust </th>
                    <th scope="col" title="5% VAT on MRC for Wet Segment">5% VAT</th>
                    <th scope="col" title="(MRC+MBC) + Total VAT on MRC for Wet Segment & MBC">Net Bill</th>
                    <th scope="col" title="De-activation or Others">Remarks</th>
                  </tr>
                </thead>
                <tbody>

                <template v-for="(item, index) in demandNoteList">
                  <tr  :key="index">
                    <td scope="row">{{ index + 1 }}</td>
                    <td>{{ item.company }}</td>

                    <td> {{ item.billing_month}}</td>

                    <td>{{ item.old_mrc }}</td>
                    <!-- <td>
                          {{old_mrc(billInfo.cableWiseBill).toFixed(2)}}
                    </td> -->

                    <td>{{ item.old_mrc_after_discount }}</td>
                    <!-- <td>
                        {{old_mrc_after_discount(billInfo.cableWiseBill).toFixed(2)}}
                    </td> -->


                    <td>{{ item.old_mrc_after_discount }}</td>
                    <!-- <td>
                        {{old_mrc_after_discount(billInfo.cableWiseBill).toFixed(2)}}
                    </td> -->


                    <td>{{ item.mbc }}</td>
                    <!-- <td>
                        {{mbcCalculate(billInfo.cableWiseBill).toFixed(2) }}
                    </td> -->


                    <td v-if="item.add_sub == 1">Add</td>
                    <td v-else>Sub</td>
                    <td>{{ item.adjust }}</td>
                    <!-- <td>
                        {{ adjustCalculate(billInfo.cableWiseBill).toFixed(2)}}
                    </td> -->


                    <td>{{ item.mrc }} </td>
                    <td>{{ item.vat }}</td>
                    <td>{{ item.net_total }}</td>
                    <td>{{ item.remarks }}</td>
                  </tr>

                  <tr v-if="item.adjustData.length >= 0" v-for="adjust in item.adjustData">
                          <td></td>
                          <td>{{ adjust.remarks}}</td>
                          <td>{{ adjust.sdate}} To
                              {{ adjust.edate}}</td>
                          <td>{{adjust.rate}}</td>
                          <td>{{adjust.rate_after_discount}}</td>
                          <td>{{adjust.amount}}</td>
                          <td>N/A</td>
                          <td>{{adjust.amount}}</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                  </tr>
                   <br>
                   <br>


                   <!-- <tr><td>ookk</td></tr> -->


                     <tr class="">
                      <td style="text-align: right" colspan="7">
                          <strong class="text-center">Sub-Total</strong>
                      </td>
                      <td colspan="8">{{mrcForRunningBillAndAdjustableBill(item.cableWiseBill, item.adjustData).toFixed(2)}}</td>
                  </tr>
                <!-- <tr v-if="item.existingDemandNote >0">
                      <td style="text-align: right" colspan="7">
                          <strong class="text-center">Demand Note MRC Adjustment</strong>
                      </td>
                      <td colspan="8" >{{(item.existingDemandNote).toFixed(2)}}</td>
                  </tr> -->

                  <tr v-if="item.adjustData.length >0">
                      <td style="text-align: right" colspan="7">
                          <strong class="text-center" >Adjustment. Of Bill {{item.adjustData[0].adjust_month_name}} </strong>
                      </td>
                      <td colspan="8" > {{adjustNetTotalCaculation(item.oldMonthNetTotal).toFixed(2)}} </td>
                  </tr>

                  <!--  <tr>
                      <td style="text-align: right" colspan="7">
                          <strong class="text-center">Total</strong>
                      </td>
                      <td colspan="8">{{subAdjustMontBillAndDemondnote(item.existingDemandNote, billInfo.oldMonthNetTotal, billInfo.cableWiseBill, billInfo.adjustData).toFixed(2) }}</td>
                  </tr> -->
                  <tr>
                      <td style="text-align: right" colspan="7">
                          <strong class="text-center">Vat(5%)</strong>
                      </td>
                      <td colspan="">{{ vatSubAndAdjustWise().toFixed(2) }}</td>
                      <!-- <td colspan=""> VAT amount may be changed according to the opinion
                          of VAT authority. </td> -->
                  </tr>
                  <tr>
                      <td style="text-align: right" colspan="7">
                          <strong class="text-center">Net Bill</strong>
                      </td>
                      <td colspan="8">{{ netTotalinAllCalculate().toFixed(2) }}</td>
                  </tr>


                </template>

                </tbody>
              </table>

               <br>
              <br>
              <br>

              <table class="" style="min-width: 100%; padding-top:200px;">
                    <tfoot>
                      <tr>
                          <td> <b>Assistant Manager(Billing)</b></td>
                          <td> <b>Deputy  Manager (CC & Billing)</b></td>
                          <td> <b>Manager (CC)</b></td>
                          <td> <b>Deputy General Manager (F&A)</b></td>
                          <td> <b>Deputy General Manager (CC)</b></td>
                      </tr>
                  </tfoot>

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
      id: '',
      date: '',
      serviceId: '',
    };
  },

  created() {
    this.visibleForm = true;
    this.serviceId = this.$route.params.serviceId;
    if(this.$route.params.id != null){
      this.id = this.$route.params.id;
    }else{
      this.date = this.$route.params.date
    }
    this.getSingleBillInfo();
  },

  methods: {

    old_mrc_after_discount(itemList) {
                var data = 0;
                itemList.forEach(function(item, index, array) {
                     data += item.old_mrc_after_discount
                })
                return data;
            },

            old_mrc(itemList) {
                var data = 0;
                itemList.forEach(function(item, index, array) {
                     data += item.old_mrc
                })
                return data;
            },

            mbcCalculate(itemList) {
                var mbc = 0;
                itemList.forEach(function(item, index, array) {
                     mbc += item.mbc
                })
                return mbc;
            },


            mbcAndold_mrc_after_discount(itemList) {
                var data = 0;
                return data = this.mbcCalculate(itemList) + this.old_mrc_after_discount(itemList);
            },

            adjustCalculate(itemList) {
                var adjust = 0;
                itemList.forEach(function(item, index, array) {
                     adjust += item.adjust
                })
                return adjust;
            },

            vatCalculate(itemList) {
                var vat = 0;

                itemList.forEach(function(item, index, array) {
                     vat += item.vat
                })
                return vat;
            },


            netCalculate(itemList) {
                var net_total = 0;
                itemList.forEach(function(item, index, array) {
                     net_total += item.net_total
                })
                return net_total;
            },

            mrcCalculate(itemList) {
                var mrc = 0;
                itemList.forEach(function(item, index, array) {
                     mrc += item.mrc
                })

                return mrc;
            },

            adjustableTotalAmount(adjustTableNetTotal) {
                var amount = 0;
                adjustTableNetTotal.forEach(function(item, index, array) {
                     amount += item.amount
                })
                return amount;
            },


            adjustNetTotalCaculation(oldMonthNetTotal) {
                var mrc = 0;
                if(oldMonthNetTotal.length >0){
                    oldMonthNetTotal.forEach(function(item, index, array) {
                         mrc += item.mrc
                    })
                    return mrc;
                }else{
                     return mrc;
                }
            },

            mrcForRunningBillAndAdjustableBill(runningBill, adjustableBill){

                if(adjustableBill.length >0){

                    return this.mbcAndold_mrc_after_discount(runningBill)+this.adjustableTotalAmount(adjustableBill);
                }else{
                    return this.mbcAndold_mrc_after_discount(runningBill);
                }

            },

            subAdjustMontBillAndDemondnote(existingDemandNote, oldMonthNetTotal, runningBill, adjustableBill){

                return (this.subTotalForVat = this.mrcForRunningBillAndAdjustableBill(runningBill, adjustableBill) - (this.adjustNetTotalCaculation(oldMonthNetTotal)+existingDemandNote));

            },

            vatSubAndAdjustWise(){
                return this.subTotalWiseVat = this.subTotalForVat/100*5;
            },

            netTotalinAllCalculate(){
                return this.subTotalWiseVat +this.subTotalForVat;
            },






      permissionforApprove(id) {
       axios
        .get("/iplc-bill/permission/approval/"+id)
        .then((response) => {
          this.getSingleBillInfo();
          Toast.fire({
            icon: "success",
            title: "Successfully Approved.",
          });
        })
        .catch(() => {});
    },

    getSingleBillInfo() {
      axios
        .post("/get/iplc/single/bill-info-report", { id: this.id, date: this.date, serviceId:this.serviceId})
        .then((res) => {
          this.loading = false;
          this.demandNoteList = res.data.data;
        })
        .catch(() => {});
    },

    print() {
          window.print();
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
