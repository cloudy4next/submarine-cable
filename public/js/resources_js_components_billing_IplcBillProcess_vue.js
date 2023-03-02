"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_billing_IplcBillProcess_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/IplcBillProcess.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/IplcBillProcess.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ["item"],
  data: function data() {
    return {
      loading: false,
      visibleForm: false,
      subServiceList: [],
      licenceList: [],
      groupZoneList: [],
      customerList: [],
      demandNoteList: [],
      circuitRate: 0,
      circuit5: 0,
      circuit6: 0,
      circuit7: 0,
      circuitDiscountRate: 0,
      circuitDiscount: 0,
      totalWithDiscount: 0,
      discountAmount: 0,
      rateForDiscount: 0,
      circuitRateDiscount: 0,
      rateForMbcAry: [],
      adjustAry: [],
      addOrSubAry: [],
      discountWiseOldMrcAry: [],
      OldMrcAry: [],
      mrcAry: [],
      vatAry: [],
      netAmountAry: [],
      allCustomer: [],
      customerId: "",
      rateForMbc: 0,
      adjust: 0,
      addOrSub: 1,
      discountWiseOldMrc: 0,
      OldMrc: 0,
      mrc: 0,
      vat: 0,
      vatResult: 0,
      remarks: [],
      mrcAndMbcCount: 0,
      invoice: {
        demand_note_id: "",
        service_id: this.$route.params.id,
        sub_service_id: "",
        licence_id: "",
        grp_or_zone_id: "",
        customer_id: 0,
        cus_type_id: "",
        billing_month: ""
      }
    };
  },
  created: function created() {
    this.visibleForm = true;
    this.service_id = this.$route.params.id;
    this.getSubServiceList();
    // alert(this.$route.params.id);
  },

  watch: {
    "invoice.sub_service_id": function invoiceSub_service_id() {
      this.getLicenceList(this.invoice.service_id);
    },
    "invoice.licence_id": function invoiceLicence_id() {
      this.getzoneList(this.invoice.service_id, this.invoice.sub_service_id);
    },
    "invoice.grp_or_zone_id": function invoiceGrp_or_zone_id() {
      this.getcustomerList(this.invoice.service_id, this.invoice.sub_service_id, this.invoice.licence_id, this.invoice.grp_or_zone_id);
    }
  },
  methods: {
    getTotalCircuitDiscount: function getTotalCircuitDiscount(circuitList) {
      var _this = this;
      this.circuitDiscount = 0;
      circuitList.forEach(function (value, index) {
        _this.circuitDiscount += value.discount;
      });
      return this.circuitDiscount;
    },
    billInfo: function billInfo(item, index) {
      return parseFloat(item.bill);
    },
    billInfoWith10Discount: function billInfoWith10Discount(item, index) {
      return (this.billInfo(item, index) - this.billInfo(item, index) / 100 * item.discount).toFixed(2);
    },
    mrcMbcAndAdjustCalculation: function mrcMbcAndAdjustCalculation(item, index) {
      var mrcAndMbcCount = parseFloat(item.mbc) + parseFloat(this.billInfoWith10Discount(item, index));
      var mrc = 0;
      if (item.add_sub == 1) {
        mrc = mrcAndMbcCount + parseFloat(item.adjust);
      } else {
        mrc = mrcAndMbcCount - parseFloat(item.adjust);
      }
      return mrc.toFixed(2);
    },
    mrcMbcAdjustWiseVatCalculation: function mrcMbcAdjustWiseVatCalculation(item, index) {
      var vat = this.mrcMbcAndAdjustCalculation(item, index) / 100 * 5;
      return vat.toFixed(2);
    },
    mrcMbcAdjustVatCalculation: function mrcMbcAdjustVatCalculation(item, index) {
      var netAmount = parseFloat(this.mrcMbcAndAdjustCalculation(item, index)) + parseFloat(this.mrcMbcAdjustWiseVatCalculation(item, index));
      this.rateForMbcAry[index] = item.mbc;
      this.adjustAry[index] = item.adjust;
      this.addOrSubAry[index] = item.add_sub;
      this.discountWiseOldMrcAry[index] = this.billInfoWith10Discount(item, index);
      this.OldMrcAry[index] = item.bill;
      this.mrcAry[index] = this.mrcMbcAndAdjustCalculation(item, index);
      this.vatAry[index] = this.mrcMbcAdjustWiseVatCalculation(item, index);
      this.allCustomer[index] = item.customer_id;
      this.netAmountAry[index] = netAmount;
      this.remarks[index] = item.remarks;
      return netAmount.toFixed(2);
    },
    getSubServiceList: function getSubServiceList() {
      var _this2 = this;
      // this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/get-sub-service-list", {
        service_id: this.$route.params.id
      }).then(function (res) {
        _this2.loading = false;
        _this2.subServiceList = "";
        _this2.licenceList = "";
        _this2.groupZoneList = "";
        _this2.subServiceList = res.data.data;
      })["catch"](function () {});
    },
    getLicenceList: function getLicenceList(id) {
      var _this3 = this;
      // this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/get-license-type", {
        service_id: id
      }).then(function (res) {
        _this3.loading = false;
        _this3.licenceList = "";
        _this3.groupZoneList = "";
        _this3.licenceList = res.data.data;
      })["catch"](function () {});
    },
    getzoneList: function getzoneList(service_id, sub_service_id) {
      var _this4 = this;
      // this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/get-group/zone", {
        service_id: service_id,
        sub_service_id: sub_service_id
      }).then(function (res) {
        _this4.loading = false;
        _this4.groupZoneList = "";
        _this4.groupZoneList = res.data.data;
      })["catch"](function () {});
    },
    getcustomerList: function getcustomerList(service_id, sub_service_id, licence_id, grp_or_zone_id) {
      var _this5 = this;
      // this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/get/service/sub-service/group-zone/wise/customer", {
        service_id: service_id,
        sub_service_id: sub_service_id,
        licence_id: licence_id,
        grp_or_zone_id: grp_or_zone_id
      }).then(function (res) {
        _this5.loading = false;
        _this5.customerList = res.data.data;
      })["catch"](function () {});
    },
    showCustomerAndMrcInfo: function showCustomerAndMrcInfo() {
      var _this6 = this;
      // this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/get/service/sub-service/group-zone/customer/wise/demandNote", {
        service_id: this.invoice.service_id,
        sub_service_id: this.invoice.sub_service_id,
        grp_or_zone_id: this.invoice.grp_or_zone_id,
        // customer_id: this.invoice.customer_id,
        customer_id: 0
      }).then(function (res) {
        _this6.loading = false;
        _this6.demandNoteList = res.data.data;
        //    this.allCircuitList = res.data.allCircuit;
      })["catch"](function () {});
    },
    onSubmit: function onSubmit() {
      var _this7 = this;
      console.log(this.vatAry);
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/bill-rocess", {
        allCustomer: this.allCustomer,
        demandNoteList: this.demandNoteList,
        netAmountAry: this.netAmountAry,
        remarks: this.remarks,
        rateForMbcAry: this.rateForMbcAry,
        adjustAry: this.adjustAry,
        addOrSubAry: this.addOrSubAry,
        discountWiseOldMrcAry: this.discountWiseOldMrcAry,
        OldMrcAry: this.OldMrcAry,
        mrcAry: this.mrcAry,
        vatAry: this.vatAry,
        service_id: this.invoice.service_id,
        sub_service_id: this.invoice.sub_service_id,
        grp_or_zone_id: this.invoice.grp_or_zone_id,
        licence_id: this.invoice.licence_id,
        billing_month: this.invoice.billing_month
      }).then(function (res) {
        _this7.loading = false;
        _this7.$router.push({
          // name: 'IplcBillProcess',
          name: "IplcBillingList",
          params: {
            id: _this7.$route.params.id
          }
        });
        Toast.fire({
          icon: "success",
          title: "Successfully Process Monthly bill info ."
        });
        _this7.$emit("executeMethod");
      })["catch"](function () {
        _this7.loading = false;
        Swal.fire({
          icon: "warning",
          title: "wrong.. Please try again!"
        });
      });
    }
  },
  computed: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/IplcBillProcess.vue?vue&type=template&id=aa13650a&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/IplcBillProcess.vue?vue&type=template&id=aa13650a&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "content-wrapper"
  }, [_c("div", {
    staticClass: "modal-header"
  }, [_vm._m(0), _vm._v(" "), _c("router-link", {
    staticClass: "btn btn-success p-1 m-1",
    attrs: {
      to: {
        name: "IplcBillingList",
        params: {
          id: this.$route.params.id
        }
      }
    }
  }, [_c("p", {
    staticClass: "pr-2 pb-1 mb-0"
  }, [_c("i", {
    staticClass: "fa fa-list-ul pl-2"
  }), _vm._v(" Billing List\n                ")])])], 1), _vm._v(" "), _c("div", {
    staticClass: "modal-body"
  }, [_c("div", {
    staticClass: "card card-primary"
  }, [_vm.loading ? _c("div", {
    staticClass: "overlay"
  }, [_c("i", {
    staticClass: "fa fa-spinner fa-spin"
  })]) : _vm._e(), _vm._v(" "), _vm.visibleForm ? _c("div", {
    staticClass: "card-body"
  }, [_c("ValidationObserver", {
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(_ref) {
        var handleSubmit = _ref.handleSubmit;
        return [_c("form", {
          on: {
            submit: function submit($event) {
              $event.preventDefault();
              return handleSubmit(_vm.onSubmit);
            }
          }
        }, [_c("div", {
          staticClass: "row"
        }, [_c("div", {
          staticClass: "col-md-2"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "Sub Services",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref2) {
              var errors = _ref2.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("Submarine Cable")]), _vm._v(" "), _c("select", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.invoice.sub_service_id,
                  expression: "invoice.sub_service_id"
                }],
                staticClass: "form-control",
                staticStyle: {
                  width: "100%"
                },
                on: {
                  change: function change($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                      return o.selected;
                    }).map(function (o) {
                      var val = "_value" in o ? o._value : o.value;
                      return val;
                    });
                    _vm.$set(_vm.invoice, "sub_service_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }
                }
              }, [_vm._l(_vm.subServiceList, function (item, index) {
                return _c("option", {
                  key: index,
                  domProps: {
                    value: item.id
                  }
                }, [_vm._v("\n                                                    " + _vm._s(item.sub_service_name) + "\n                                                ")]);
              }), _vm._v(" "), _c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("\n                                                    Select Submarine\n                                                ")])], 2), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1), _vm._v(" "), _c("div", {
          staticClass: "col-md-2"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "licence_id",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref3) {
              var errors = _ref3.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("License\n                                                "), _c("span", {
                staticClass: "text-danger"
              }, [_vm._v("*")])]), _vm._v(" "), _c("select", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.invoice.licence_id,
                  expression: "invoice.licence_id"
                }],
                staticClass: "form-control",
                staticStyle: {
                  width: "100%"
                },
                on: {
                  change: function change($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                      return o.selected;
                    }).map(function (o) {
                      var val = "_value" in o ? o._value : o.value;
                      return val;
                    });
                    _vm.$set(_vm.invoice, "licence_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }
                }
              }, [_c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("\n                                                    Select License\n                                                ")]), _vm._v(" "), _vm._l(_vm.licenceList, function (item, index) {
                return _c("option", {
                  key: index,
                  domProps: {
                    value: item.id
                  }
                }, [_vm._v("\n                                                    " + _vm._s(item.cus_type_name) + "\n                                                ")]);
              })], 2), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1), _vm._v(" "), _c("div", {
          staticClass: "col-md-2"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "grp_or_zone_id",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref4) {
              var errors = _ref4.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("Group/Zone"), _c("span", {
                staticClass: "text-danger"
              }, [_vm._v("*")])]), _vm._v(" "), _c("select", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.invoice.grp_or_zone_id,
                  expression: "invoice.grp_or_zone_id"
                }],
                staticClass: "form-control",
                staticStyle: {
                  width: "100%"
                },
                on: {
                  change: function change($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                      return o.selected;
                    }).map(function (o) {
                      var val = "_value" in o ? o._value : o.value;
                      return val;
                    });
                    _vm.$set(_vm.invoice, "grp_or_zone_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }
                }
              }, [_c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("\n                                                    Select Zone\n                                                ")]), _vm._v(" "), _vm._l(_vm.groupZoneList, function (item, index) {
                return item.sub_service_id == _vm.invoice.sub_service_id ? _c("option", {
                  key: index,
                  domProps: {
                    value: item.id
                  }
                }, [_vm._v("\n                                                    " + _vm._s(item.group_name) + "\n                                                    ")]) : _vm._e();
              })], 2), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1), _vm._v(" "), _c("div", {
          staticClass: "col-md-2"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "customer_id",
            rules: "required"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref5) {
              var errors = _ref5.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("\n                                                Customer\n                                                "), _c("span", {
                staticClass: "text-danger"
              }, [_vm._v("*")])]), _vm._v(" "), _c("select", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.invoice.customer_id,
                  expression: "invoice.customer_id"
                }],
                staticClass: "form-control",
                staticStyle: {
                  width: "100%"
                },
                on: {
                  change: function change($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                      return o.selected;
                    }).map(function (o) {
                      var val = "_value" in o ? o._value : o.value;
                      return val;
                    });
                    _vm.$set(_vm.invoice, "customer_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }
                }
              }, [_c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("\n                                                    Select Customer\n                                                ")]), _vm._v(" "), _c("option", {
                attrs: {
                  value: "0"
                }
              }, [_vm._v("\n                                                    All Customer\n                                                ")])]), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1), _vm._v(" "), _c("div", {
          staticClass: "col-md-2"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "billing_month",
            rules: "required"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref6) {
              var errors = _ref6.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("\n                                                Billing Month\n                                                "), _c("span", {
                staticClass: "text-danger"
              }, [_vm._v("*")])]), _vm._v(" "), _c("input", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.invoice.billing_month,
                  expression: "invoice.billing_month"
                }],
                staticClass: "form-control",
                attrs: {
                  type: "date"
                },
                domProps: {
                  value: _vm.invoice.billing_month
                },
                on: {
                  input: function input($event) {
                    if ($event.target.composing) return;
                    _vm.$set(_vm.invoice, "billing_month", $event.target.value);
                  }
                }
              }), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1), _vm._v(" "), _c("div", {
          staticClass: "col-md-2",
          staticStyle: {
            "padding-top": "30px"
          }
        }, [_c("button", {
          staticClass: "btn btn-primary float-center",
          attrs: {
            type: "button"
          },
          on: {
            click: function click($event) {
              return _vm.showCustomerAndMrcInfo();
            }
          }
        }, [_vm._v("\n                                        Generate\n                                    ")])])]), _vm._v(" "), _c("div", {
          staticClass: "row"
        }, [_c("div", {
          staticClass: "col-md-12"
        }, [_c("table", {
          staticClass: "table table-striped table-bordered table-hover w-100",
          staticStyle: {
            "min-width": "100%"
          }
        }, [_c("thead", {
          staticClass: "thead-dark"
        }, [_c("tr", [_c("th", {
          attrs: {
            scope: "col"
          }
        }, [_vm._v("SL")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Name of Clients"
          }
        }, [_vm._v("\n                                                    Name\n                                                ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Circuit Capacity"
          }
        }, [_vm._v("\n                                                    This C\n                                                ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Circuit Capacity"
          }
        }, [_vm._v("\n                                                    Circuit\n                                                ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Circuit Capacity"
          }
        }, [_vm._v("\n                                                    Tot C\n                                                ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Activation Date"
          }
        }, [_vm._v("\n                                                    Date\n                                                ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Rate"
          }
        }, [_vm._v("\n                                                    Rate\n                                                ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Rate After Discount"
          }
        }, [_vm._v("\n                                                    Rate After Discount\n                                                ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "MRC For Wet Segment After slab and  days count BDT (TK)"
          }
        }, [_vm._v("\n                                                    MRC\n                                                ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Monthly Backhaul Charge After Discount BDT (TK)"
          }
        }, [_vm._v("\n                                                    MBC\n                                                ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Adjust/Additional Discount"
          }
        }, [_vm._v("\n                                                    Adjust\n                                                ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Add Or Subtract"
          }
        }, [_vm._v("\n                                                    Add/Sub\n                                                ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Monthly rental MRC+MBC + Adjust"
          }
        }, [_vm._v("\n                                                    MRC + MBC + Adjust\n                                                ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "5% VAT on MRC for Wet Segment"
          }
        }, [_vm._v("\n                                                    5% VAT\n                                                ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "(MRC+MBC) + Total VAT on MRC for Wet Segment & MBC"
          }
        }, [_vm._v("\n                                                    Net Bill\n                                                ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "De-activation or Others"
          }
        }, [_vm._v("\n                                                    Remarks\n                                                ")])])]), _vm._v(" "), _c("tbody", _vm._l(_vm.demandNoteList, function (item, index) {
          return _c("tr", {
            key: index
          }, [_c("td", {
            attrs: {
              scope: "row"
            }
          }, [_vm._v(_vm._s(index))]), _vm._v(" "), _c("td", [_c("input", {
            attrs: {
              type: "hidden",
              id: index + "_customer"
            },
            domProps: {
              value: item.customer_id
            }
          }), _vm._v(_vm._s(item.customer_name) + "\n                                                ")]), _vm._v(" "), _c("td", {
            staticClass: "dateFillSize"
          }, _vm._l(item.CablAndGroupWiseCircuits, function (circuit, cIndex) {
            return _c("span", {
              key: cIndex,
              staticClass: "badge badge-success dateFillSize"
            }, [_vm._v(_vm._s(circuit.name))]);
          }), 0), _vm._v(" "), _c("td", {
            staticClass: "dateFillSize"
          }, _vm._l(item.cableWiseCircuits, function (circuit, cIndex) {
            return _c("span", {
              key: cIndex,
              staticClass: "badge badge-success dateFillSize"
            }, [_vm._v(_vm._s(circuit.name))]);
          }), 0), _vm._v(" "), _c("td", {
            staticClass: "dateFillSize"
          }, _vm._l(item.circuits, function (circuit, cIndex) {
            return _c("span", {
              key: cIndex,
              staticClass: "badge badge-success dateFillSize"
            }, [_vm._v(_vm._s(circuit.name))]);
          }), 0), _vm._v(" "), _c("td", {
            staticClass: "dateFillSize"
          }, _vm._l(item.cableWiseCircuits, function (circuit, cIndex) {
            return _c("span", {
              key: cIndex,
              staticClass: "badge badge-success dateFillSize"
            }, [_vm._v(_vm._s(circuit.approved_date))]);
          }), 0), _vm._v(" "), _c("td", {
            staticClass: "dateFillSize"
          }, [_vm._v("\n                                                    " + _vm._s(_vm.billInfo(item, index).toFixed(2)) + "\n                                                ")]), _vm._v(" "), _c("td", {
            staticClass: "dateFillSize"
          }, [_c("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: item.discount,
              expression: "item.discount"
            }],
            staticClass: "form-control inputFillSize",
            attrs: {
              type: "text"
            },
            domProps: {
              value: item.discount
            },
            on: {
              input: function input($event) {
                if ($event.target.composing) return;
                _vm.$set(item, "discount", $event.target.value);
              }
            }
          })]), _vm._v(" "), _c("td", {
            staticClass: "dateFillSize"
          }, [_vm._v("\n                                                    " + _vm._s(_vm.billInfoWith10Discount(item, index)) + "\n                                                ")]), _vm._v(" "), _c("td", [_c("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: item.mbc,
              expression: "item.mbc"
            }],
            staticClass: "form-control inputFillSize",
            attrs: {
              type: "text"
            },
            domProps: {
              value: item.mbc
            },
            on: {
              input: function input($event) {
                if ($event.target.composing) return;
                _vm.$set(item, "mbc", $event.target.value);
              }
            }
          })]), _vm._v(" "), _c("td", [_c("select", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: item.add_sub,
              expression: "item.add_sub"
            }],
            staticClass: "form-control inputFillSize",
            on: {
              change: function change($event) {
                var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                  return o.selected;
                }).map(function (o) {
                  var val = "_value" in o ? o._value : o.value;
                  return val;
                });
                _vm.$set(item, "add_sub", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
              }
            }
          }, [_c("option", {
            attrs: {
              value: "1"
            }
          }, [_vm._v("\n                                                            Add\n                                                        ")]), _vm._v(" "), _c("option", {
            attrs: {
              value: "2"
            }
          }, [_vm._v("\n                                                            Sub\n                                                        ")])])]), _vm._v(" "), _c("td", [_c("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: item.adjust,
              expression: "item.adjust"
            }],
            staticClass: "form-control inputFillSize",
            attrs: {
              type: "text"
            },
            domProps: {
              value: item.adjust
            },
            on: {
              input: function input($event) {
                if ($event.target.composing) return;
                _vm.$set(item, "adjust", $event.target.value);
              }
            }
          })]), _vm._v(" "), _c("td", [_vm._v("\n                                                    " + _vm._s(_vm.mrcMbcAndAdjustCalculation(item, index)) + "\n                                                ")]), _vm._v(" "), _c("td", [_vm._v("\n                                                    " + _vm._s(_vm.mrcMbcAdjustWiseVatCalculation(item, index)) + "\n                                                ")]), _vm._v(" "), _c("td", [_vm._v("\n                                                    " + _vm._s(_vm.mrcMbcAdjustVatCalculation(item, index)) + "\n                                                ")]), _vm._v(" "), _c("td", [_c("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: item.remarks,
              expression: "item.remarks"
            }],
            staticClass: "form-control inputFillSize",
            attrs: {
              type: "text"
            },
            domProps: {
              value: item.remarks
            },
            on: {
              input: function input($event) {
                if ($event.target.composing) return;
                _vm.$set(item, "remarks", $event.target.value);
              }
            }
          })])]);
        }), 0)])])]), _vm._v(" "), _c("div", {
          staticClass: "text-center pb-5"
        }, [_c("button", {
          staticClass: "btn btn-success float-center",
          attrs: {
            type: "submit"
          }
        }, [_vm._v("\n                                    SUBMIT\n                                ")])])])];
      }
    }], null, false, 312793039)
  })], 1) : _vm._e()])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("h4", {
    staticClass: "modal-title mr-3",
    staticStyle: {
      color: "blue"
    }
  }, [_c("b", [_vm._v("Bill Processing (IPLC)")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/IplcBillProcess.vue?vue&type=style&index=0&id=aa13650a&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/IplcBillProcess.vue?vue&type=style&index=0&id=aa13650a&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.bulk-tag[data-v-aa13650a] {\n    margin-left: 14%;\n    margin-bottom: 0px;\n    margin-top: 7px;\n}\ntable[data-v-aa13650a] {\n    width: 100%;\n}\ntbody tr td[data-v-aa13650a] {\n    width: auto;\n}\n.inputFillSize[data-v-aa13650a] {\n    width: 100%;\n}\n.dateFillSize[data-v-aa13650a] {\n    width: 70px;\n}\n.mrcAndDiscount[data-v-aa13650a] {\n    width: 95px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/IplcBillProcess.vue?vue&type=style&index=0&id=aa13650a&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/IplcBillProcess.vue?vue&type=style&index=0&id=aa13650a&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IplcBillProcess_vue_vue_type_style_index_0_id_aa13650a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./IplcBillProcess.vue?vue&type=style&index=0&id=aa13650a&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/IplcBillProcess.vue?vue&type=style&index=0&id=aa13650a&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IplcBillProcess_vue_vue_type_style_index_0_id_aa13650a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IplcBillProcess_vue_vue_type_style_index_0_id_aa13650a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/billing/IplcBillProcess.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/billing/IplcBillProcess.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _IplcBillProcess_vue_vue_type_template_id_aa13650a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IplcBillProcess.vue?vue&type=template&id=aa13650a&scoped=true& */ "./resources/js/components/billing/IplcBillProcess.vue?vue&type=template&id=aa13650a&scoped=true&");
/* harmony import */ var _IplcBillProcess_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IplcBillProcess.vue?vue&type=script&lang=js& */ "./resources/js/components/billing/IplcBillProcess.vue?vue&type=script&lang=js&");
/* harmony import */ var _IplcBillProcess_vue_vue_type_style_index_0_id_aa13650a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IplcBillProcess.vue?vue&type=style&index=0&id=aa13650a&scoped=true&lang=css& */ "./resources/js/components/billing/IplcBillProcess.vue?vue&type=style&index=0&id=aa13650a&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _IplcBillProcess_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IplcBillProcess_vue_vue_type_template_id_aa13650a_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _IplcBillProcess_vue_vue_type_template_id_aa13650a_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "aa13650a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/billing/IplcBillProcess.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/billing/IplcBillProcess.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/billing/IplcBillProcess.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IplcBillProcess_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./IplcBillProcess.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/IplcBillProcess.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IplcBillProcess_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/billing/IplcBillProcess.vue?vue&type=template&id=aa13650a&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/billing/IplcBillProcess.vue?vue&type=template&id=aa13650a&scoped=true& ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IplcBillProcess_vue_vue_type_template_id_aa13650a_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IplcBillProcess_vue_vue_type_template_id_aa13650a_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IplcBillProcess_vue_vue_type_template_id_aa13650a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./IplcBillProcess.vue?vue&type=template&id=aa13650a&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/IplcBillProcess.vue?vue&type=template&id=aa13650a&scoped=true&");


/***/ }),

/***/ "./resources/js/components/billing/IplcBillProcess.vue?vue&type=style&index=0&id=aa13650a&scoped=true&lang=css&":
/*!**********************************************************************************************************************!*\
  !*** ./resources/js/components/billing/IplcBillProcess.vue?vue&type=style&index=0&id=aa13650a&scoped=true&lang=css& ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IplcBillProcess_vue_vue_type_style_index_0_id_aa13650a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./IplcBillProcess.vue?vue&type=style&index=0&id=aa13650a&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/IplcBillProcess.vue?vue&type=style&index=0&id=aa13650a&scoped=true&lang=css&");


/***/ })

}]);