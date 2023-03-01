<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="conatiner-fluid">
        <div class="row mb-2">
          <div class="col-md-2 offset-10">
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
      </div>
    </section>

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 mt-3">
            <div class="card">
              <div class="card-header">
                <div class="row">
                  <div class="col-md-2">
                    <img src="/assets/dist/logo/logo.png" />
                  </div>

                  <div class="col-md-8 text-center">
                    <h3>
                      <span style="color: green"
                        >বাংলাদেশ সাবমেরিন ক্যাবল কোম্পানি লিমিটেড (বিএসসিসিএল)
                        <br />
                      </span>
                      <span style="color: blue">
                        Bangladesh Submarine Cable Company Limited (BSCCL)
                      </span>
                    </h3>
                  </div>
                  <div class="col-md-2">
                    <img src="/assets/dist/logo/download.jpg" />
                  </div>
                </div>
                <hr />
                <!-- <div class="text-center">
                                <h3>
                                    <strong>Demand note for {{ finddata.services.service }} Connection</strong>
                                </h3>
                            </div> -->
              </div>

              <!-- start card-body -->

              <div class="card-body">
                <div class="row">
                  <div class="col-sm-12">
                    <h2 class="text-center">
                      <strong> Invoice</strong>
                    </h2>
                    <div class="col-md-12 tableStyle">
                      <table class="table">
                        <tr style="border: 1px solid black">
                          <td
                            style="
                              border: 1px solid black;
                              width: 50%;
                              padding-left: 20px;
                            "
                          >
                            To<br />Managing Director<br />
                            {{ billInfo.customers.com_name }}<br />
                            {{ billInfo.customers.address }}<br />
                            BIN: {{ billInfo.customers.bin_vat_etc }}
                          </td>
                          <td style="border: 1px solid black">
                            Invoice No.: BSCCL/BWP/IIG/BILL/SUMMIT/12-13/ <br />
                            Issue Date:
                            {{
                              moment(billInfo.bill_process_date).format(
                                "Do.MMMM .YYYY"
                              )
                            }}<br />

                            Issue Bill for the Month:
                            {{
                              moment(billInfo.billing_month).format(
                                "MMMM.YYYY"
                              )
                            }}<br />

                            VAT Registration No.:
                            {{ billInfo.customers.bin_vat_etc }}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end card-body -->

              <div class="card-body">
                <div class="row">
                  <div class="col-sm-12">
                    <h6 class="text-center">
                      <strong>Description of Bill ({{billInfo.iplcbill.custype.cus_type_name}} ) ({{billInfo.iplcbill.subservice.sub_service_name}} )</strong>
                      <!-- <strong>Description of Bill {{ billInfo.IplcBill.subservice.sub_service_name }}</strong> -->
                    </h6>
                    <table
                      id="example1"
                      class="table table-bordered table-striped"
                    >
                      <thead style="border: 1px solid black">
                        <tr style="border: 1px solid black">
                          <th>SL</th>
                          <th>Connection Information</th>
                          <th>Billing Period</th>
                          <th>MRC for Wet Segment</th>
                          <th>Monthly Backhaul Charge After Discount (MBC)</th>
                          <th>Monthly Rental (MRC+MBC)</th>
                          <th>Adjust</th>
                          <th>SubTotal</th>
                          <th>Vat</th>
                          <th>Total</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style="border: 1px solid black" v-for="(item,index) in billList" :key="index">
                          <td>1</td>
                          <!-- <td>{{circuitName(item, index)}}</td> -->

                          <td>
                            {{item.iplcbill.services.service}}  <span v-for="(circuit, i) in circuitName(item, index)" :key="i"></span>
                            {{circuit}}
                            <!-- Half Circuit, Moghbazar-Chennai CD: -->
                            <!-- COX/SUMMIT(01)ITC-CHN/BHA VC4S001 Activation Date:
                            17 April 2016 CD: COX/SUMMIT(02)ITC-CHN/BHA VC4S001
                            Activation Date: 22 October 2019 -->
                          </td>
                          <td class="text-right w-3">

                            {{
                              moment(billList[0].billing_month).format(
                                "DD.MM.YYYY"
                              ) +
                              " To " +
                              moment(billList[0].billing_month)
                                .add(1, "M")
                                .format("DD.MM.YYYY")
                            }}
                          </td>
                          <td>{{ old_mrc_after_discount(item, index)}}</td>
                          <td> {{mbcCalculate(item, index)}} </td>
                          <td>
                             {{mbcAndold_mrc_after_discount(item, index)}}
                          </td>
                          <td>{{adjustCalculate(item, index)}}</td>
                          <td> {{mrcCalculate(item, index)}}</td>
                          <td> {{vatCalculate(item, index)}}</td>
                          <td> {{netCalculate(item, index)}} </td>
                          <td> {{item.remarks }}</td>
                        </tr>

                        <tr>
                          <!-- <td colspan="6"> Total</td> -->
                          <td style="text-align: right" colspan="9"><strong class="text-center">Sub Total</strong></td>
                          <td colspan="10">{{subTotalBillCalculate(billList)}}</td>
                        </tr>
                        <tr>
                          <td style="text-align: right" colspan="9"><strong class="text-center">Vat(5%)</strong></td>
                          <td colspan="">{{vatTotalBillCalculate(billList)}} </td>
                          <td colspan="">
                            VAT amount may be changed according to the opinion
                            of VAT authority.
                          </td>
                        </tr>
                        <tr>
                          <td style="text-align: right" colspan="9">
                            <strong class="text-center">Net Bill</strong>
                          </td>
                          <td colspan="10"> {{netTotalBillCalculate(billList)}}  </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="11" class="text-center">
                            In words (Taka) :
                             {{netTotalBill | toWords }} BDT Only.
                          </td>
                        </tr>
                        <tr>
                          <td colspan="11" class="text-center">
                            <strong>
                              In respect of the bill, please issue payorder for
                              Tk.
                               {{netTotalBill}}  in favour of “Bangladesh
                              Submarine Cable Company Limited”.</strong
                            >
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
              <!-- end card body -->
            </div>
            <!-- end card -->
          </div>

          <!-- <div class="col-md-12 mb-5 ml-3">
            In words (Taka) : {{ billInfo.net_total | toWords }} BDT Only.
            <br />
            <strong>
              In respect of the bill, please issue payorder for Tk.
              {{ billInfo.net_total }} in favour of “Bangladesh Submarine Cable
              Company Limited”.</strong
            >
          </div> -->
          <div class="col-md-6 text-center mb-5" style="padding-top: 20px">
            <p class="mb-0">Deputy General Manager (Finance & Accounts)</p>
            <p class="mb-0">Bangladesh Submarine Cable Co. Ltd. (BSCCL)</p>
            <p class="mb-0">Phone : 8879285</p>
            <p class="mb-0">Fax : 8879193</p>
          </div>

          <div class="col-md-6 text-center mb-5 mb-5" style="padding-top: 20px">
            <p class="mb-0">Deputy General Manager (Customer Care)</p>
            <p class="mb-0">Bangladesh Submarine Cable Co. Ltd. (BSCCL)</p>
            <p class="mb-0">Phone : 8879192</p>
            <p class="mb-0">Fax : 8879193</p>
          </div>

          <div class="col-md-12 text-center">
            <p class="mb-0">Copy To:</p>
            <p class="mb-0">1. General Manager, (Admin & Finance), BSCCL.</p>
            <p class="mb-0">2. General Manager (M & S), BSCCL</p>
            <p class="mb-0">3. Deputy General Manager (BWP), BSCCL.</p>
            <p class="mb-0">
              4. Deputy General Manager (Internal Audit), BSCCL.
            </p>
            <p class="mb-0">5. PA to MD, BSCCL.</p>
            <p class="mb-0">6. Office Copy.</p>
          </div>

          <!-- end row -->
        </div>
      </div>
    </section>

    <!-- div content wrapper -->
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      billList: [],
      billInfo: {},
      netTotalBill: 0,
      vatTotalBill: 0,
      subTotalBill: 0,
      //   customer: {},
    };
  },

  beforeCreate() {},
  created() {

    // alert(this.$route.params.id)
    this.moment = moment;
    this.permissionforInvoiceGanarete();
  },

  methods: {

    old_mrc_after_discount(item, index){
      var data = 0;
     return data += item.old_mrc_after_discount
    },

    mbcCalculate(item, index){
      var mbc = 0;
     return mbc += item.mbc;
    },


    mbcAndold_mrc_after_discount(item, index){
      var data = 0;
     return data = this.mbcCalculate(item, index) + this.old_mrc_after_discount(item, index);
    },

    adjustCalculate(item, index){
      var adjust = 0;
     return adjust += item.adjust;
    },

    vatCalculate(item, index){
      var vat = 0;
     return vat += item.vat;
    },

    mrcCalculate(item, index){
      var mrc = 0;
     return mrc += item.mrc;
    },
    netCalculate(item, index){
      var net_total = 0;
      net_total += item.net_total;
     return net_total;
    },

  netTotalBillCalculate(billList){

  return billList.reduce((acc, ele) => {
    return acc + parseInt(ele.net_total);
  }, 0);

    //  billList.forEach(function(value, index) {

    //         this.netTotalBill+=val.net_total

    //       })

    //   return this.netTotalBill;
    },

  subTotalBillCalculate(items){

  return items.reduce((acc, ele) => {
    return acc + parseInt(ele.mrc);
  }, 0);


    },

  vatTotalBillCalculate(items){

  return items.reduce((acc, ele) => {
    return acc + parseInt(ele.vat);
  }, 0);


    },





    circuitName(item, index){
      return item.circuit_id.split(',');
    },

    permissionforInvoiceGanarete() {
      axios
        .post("/iplc-bill/invoice-ganarete", { id: this.$route.params.id })
        .then((response) => {
          this.billList = response.data.data;
          this.billInfo = response.data.billInfo;

          // console.log(this.billInfo)

          //   this.customer = response.data.billInfo.customers;
          Toast.fire({
            icon: "success",
            title: "Successfully Done Invoice Generate.",
          });
        })
        .catch(() => {});
    },

    print() {
      window.print();
    },
  },

  computed: {
    // subServiceName() {
    //   return this.billInfo.IplcBill.services.service;
    // },
  },
};
</script>

<style>
.tableStyle {
  margin: 0 auto;
}
</style>
