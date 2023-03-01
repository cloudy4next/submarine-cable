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
                            {{ billInfo.company }}<br />
                            {{ billInfo.address }}<br />
                            BIN: {{ billInfo.bin }}
                          </td>
                          <td style="border: 1px solid black">
                            Invoice No.: 14.34.0000.422 <br />
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
                            {{ billInfo.bin }}
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
                      <strong>Description of Bill</strong>
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
                          <th>Billing For Mbps</th>
                          <th>Rate</th>
                          <th>Monthly Backhaul Charge After Discount (MBC)</th>
                          <th>Monthly Rental (MRC+MBC)</th>
                          <th>Adjust</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style="border: 1px solid black">
                          <td>1</td>
                          <td v-for="item in billInfo.demandnote">
                            <!-- IPLC (2xSTM-1) Half Circuit, Moghbazar-Chennai CD:
                            COX/SUMMIT(01)ITC-CHN/BHA VC4S001 Activation Date:
                            17 April 2016 CD: COX/SUMMIT(02)ITC-CHN/BHA VC4S001
                            Activation Date: 22 October 2019 -->
                            {{item.capacity_name}} on
                            {{moment(item.approved_date).format(
                                "DD.MM.YYYY"
                              )}}
                          </td>
                          <td class="text-right w-3">

                              {{moment(billInfo.billing_month).format(
                                "DD.MM.YYYY"
                              ) +
                              " To " +
                              moment(billInfo.billing_month)
                                .add(1, "M")
                                .format("DD.MM.YYYY")}}

                          </td>
                          <td>{{billInfo.total}}</td>
                          <td>{{billInfo.mbc}} </td>
                          <td>{{billInfo.mrc}} </td>
                          <td>
                            {{billInfo.mbc + billInfo.mrc}}
                          </td>
                          <td>{{billInfo.adjust}} </td>
                          <td>{{billInfo.remarks }}</td>
                        </tr>

                        <tr>
                          <!-- <td colspan="6"> Total</td> -->
                          <td style="text-align: right" colspan="5">Total</td>
                          <td colspan="1">{{billInfo.mrc}} </td>
                        </tr>
                        <tr>
                          <td style="text-align: right" colspan="5">Vat(5%)</td>
                          <td colspan="1">{{billInfo.vat}} </td>
                          <td colspan="2">
                            VAT amount may be changed according to the opinion
                            of VAT authority.
                          </td>
                        </tr>
                        <tr>
                          <td style="text-align: right" colspan="5">
                            Net Bill
                          </td>
                          <td colspan="1">{{billInfo.net_total}} </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="8" class="text-center">
                            In words (Taka) :
                            {{billInfo.net_total | toWords }} BDT Only.
                          </td>
                        </tr>
                        <tr>
                          <td colspan="8" class="text-center">
                            <strong>
                              In respect of the bill, please issue payorder for
                              Tk.
                              {{billInfo.net_total}} in favour of “Bangladesh
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
      billInfo: {},
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
    permissionforInvoiceGanarete() {
      axios
        .post("/ip-transit-bill/invoice-ganarete", { id: this.$route.params.id })
        .then((response) => {
          this.billInfo = response.data.data;

          console.log(this.billInfo)

          //   this.customer = response.data.billInfo.customers;
          Toast.fire({
            icon: "success",
            title: "Successfully Done Invoice Ganarete.",
          });
        })
        .catch(() => {});
    },

    print() {
      window.print();
    },
  },

  computed: {
    // serviceName() {
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
