"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_billing_ipt_IptBillProcess_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
      adjustAry: [],
      netAmountAry: [],
      discountWiseOldMrcAry: [],
      addOrSubAry: [],
      rateForMbcAry: [],
      OldMrcAry: [],
      remarks: [],
      mrcAry: [],
      vatAry: [],
      allCustomer: [],
      mbcArray: [],
      item: {
        adjust: 0,
        addOrSub: 1,
        mbc: 0,
        remarks: '',
        mrc: '',
        customer_id: '',
        charge: 0,
        discount: 0
      },
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
  },
  watch: {
    "invoice.sub_service_id": function invoiceSub_service_id() {
      this.getLicenceList(this.invoice.service_id);
    },
    "invoice.licence_id": function invoiceLicence_id() {
      this.getzoneList(this.invoice.service_id, this.invoice.sub_service_id);
    },
    "invoice.grp_or_zone_id": function invoiceGrp_or_zone_id() {
      this.getcustomerList(this.invoice.service_id, this.invoice.sub_service_id, this.invoice.grp_or_zone_id, this.invoice.licence_id);
    }
  },
  methods: {
    billInfo: function billInfo(item, index) {
      return parseFloat(item.bill);
    },
    billInfoWith10Discount: function billInfoWith10Discount(item, index) {
      return this.billInfo(item, index) - this.billInfo(item, index) / 100 * item.discount;
    },
    billInfoWithDiscountAndMrc: function billInfoWithDiscountAndMrc(item, index) {
      return this.billInfoWith10Discount(item, index) * item.cableWiseTotal;
    },
    mrcMbcAndAdjustCalculation: function mrcMbcAndAdjustCalculation(item, index) {
      this.mrcAndMbcCount = parseFloat(item.mbc) + parseFloat(this.billInfoWithDiscountAndMrc(item, index));
      if (item.add_sub == 1) {
        this.mrc = this.mrcAndMbcCount + parseFloat(item.adjust);
      } else {
        this.mrc = this.mrcAndMbcCount - parseFloat(item.adjust);
      }
      return this.mrc;
    },
    mrcMbcAdjustWiseVatCalculation: function mrcMbcAdjustWiseVatCalculation(item, index) {
      this.vat = this.mrcMbcAndAdjustCalculation(item, index) / 100 * 5;
      return this.vat;
    },
    mrcMbcAdjustVatCalculation: function mrcMbcAdjustVatCalculation(item, index) {
      this.netAmount = this.mrcMbcAndAdjustCalculation(item, index) + this.mrcMbcAdjustWiseVatCalculation(item, index);
      this.rateForMbcAry[index] = item.mbc;
      this.adjustAry[index] = item.adjust;
      this.addOrSubAry[index] = item.add_sub;
      this.discountWiseOldMrcAry[index] = this.billInfoWith10Discount(item, index);
      this.OldMrcAry[index] = item.bill;
      this.mrcAry[index] = this.mrcMbcAndAdjustCalculation(item, index);
      this.vatAry[index] = this.mrcMbcAdjustWiseVatCalculation(item, index);
      this.allCustomer[index] = item.customer_id;
      this.netAmountAry[index] = this.netAmount;
      this.remarks[index] = item.remarks;
      return this.netAmount;
    },
    getSubServiceList: function getSubServiceList() {
      var _this = this;
      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/get-sub-service-list", {
        service_id: this.$route.params.id
      }).then(function (res) {
        _this.loading = false;
        _this.subServiceList = "";
        _this.licenceList = "";
        _this.groupZoneList = "";
        _this.subServiceList = res.data.data;
      })["catch"](function () {});
    },
    getLicenceList: function getLicenceList(id) {
      var _this2 = this;
      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/get-license-type", {
        service_id: id
      }).then(function (res) {
        _this2.loading = false;
        _this2.licenceList = "";
        _this2.groupZoneList = "";
        _this2.licenceList = res.data.data;
      })["catch"](function () {});
    },
    getzoneList: function getzoneList(service_id, sub_service_id) {
      var _this3 = this;
      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/get-group/zone", {
        service_id: service_id,
        sub_service_id: sub_service_id
      }).then(function (res) {
        _this3.loading = false;
        _this3.groupZoneList = "";
        _this3.groupZoneList = res.data.data;
      })["catch"](function () {});
    },
    getcustomerList: function getcustomerList(service_id, sub_service_id, grp_or_zone_id, licence_id) {
      var _this4 = this;
      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/get/service/sub-service/group-zone/wise/customer", {
        service_id: service_id,
        sub_service_id: sub_service_id,
        lincenceId: licence_id,
        grp_or_zone_id: grp_or_zone_id
      }).then(function (res) {
        _this4.loading = false;
        _this4.customerList = res.data.data;
      })["catch"](function () {});
    },
    showCustomerAndMrcInfo: function showCustomerAndMrcInfo() {
      var _this5 = this;
      // this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/get/service/sub-service/group-zone/customer/wise/demandNote", {
        service_id: this.invoice.service_id,
        sub_service_id: this.invoice.sub_service_id,
        grp_or_zone_id: this.invoice.grp_or_zone_id,
        customer_id: this.invoice.customer_id
        // customer_id: 0,
      }).then(function (res) {
        _this5.loading = false;
        _this5.demandNoteList = res.data.data;
      })["catch"](function () {});
    },
    onSubmit: function onSubmit() {
      var _this6 = this;
      console.log(this.vatAry);
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/bill-rocess/ip-transit", {
        netAmountAry: this.netAmountAry,
        remarks: this.remarks,
        rateForMbcAry: this.rateForMbcAry,
        adjustAry: this.adjustAry,
        OldMrcAry: this.OldMrcAry,
        discountWiseOldMrcAry: this.discountWiseOldMrcAry,
        addOrSubAry: this.addOrSubAry,
        mrcAry: this.mrcAry,
        vatAry: this.vatAry,
        allCustomer: this.allCustomer,
        service_id: this.invoice.service_id,
        sub_service_id: this.invoice.sub_service_id,
        grp_or_zone_id: this.invoice.grp_or_zone_id,
        licence_id: this.invoice.licence_id,
        billing_month: this.invoice.billing_month
      }).then(function (res) {
        _this6.loading = false;
        _this6.$router.push({
          // name: 'IplcBillProcess',
          name: "IpTransitBillingList",
          params: {
            id: _this6.$route.params.id
          }
        });
        Toast.fire({
          icon: "success",
          title: "Successfully Process Monthly bill info ."
        });
        _this6.$emit("executeMethod");
      })["catch"](function () {
        _this6.loading = false;
        Swal.fire({
          icon: "warning",
          title: "wrong.. Please try again!"
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=template&id=7b21be5c&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=template&id=7b21be5c&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
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
        name: "IpTransitBillingList",
        params: {
          id: this.$route.params.id
        }
      }
    }
  }, [_c("p", {
    staticClass: "pr-2 pb-1 mb-0"
  }, [_c("i", {
    staticClass: "fa fa-list-ul pl-2"
  }), _vm._v(" Billing List\n      ")])])], 1), _vm._v(" "), _c("div", {
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
              }, [_c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("Select Submarine")]), _vm._v(" "), _vm._l(_vm.subServiceList, function (item, index) {
                return _c("option", {
                  key: index,
                  domProps: {
                    value: item.id
                  }
                }, [_vm._v("\n                        " + _vm._s(item.sub_service_name) + "\n                      ")]);
              })], 2), _vm._v(" "), _c("span", {
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
              }, [_c("label", [_vm._v("License "), _c("span", {
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
              }, [_vm._v(" Select License ")]), _vm._v(" "), _vm._l(_vm.licenceList, function (item, index) {
                return _c("option", {
                  key: index,
                  domProps: {
                    value: item.id
                  }
                }, [_vm._v("\n                        " + _vm._s(item.cus_type_name) + "\n                      ")]);
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
              }, [_c("label", [_vm._v("Pop "), _c("span", {
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
              }, [_vm._v("Select Pop ")]), _vm._v(" "), _vm._l(_vm.groupZoneList, function (item, index) {
                return _c("option", {
                  key: index,
                  domProps: {
                    value: item.id
                  }
                }, [_vm._v("\n                        " + _vm._s(item.group_name) + "\n                        ")]);
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
              }, [_c("label", [_vm._v(" Customer "), _c("span", {
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
              }, [_vm._v(" Select Customer ")]), _vm._v(" "), _c("option", {
                attrs: {
                  value: "0"
                }
              }, [_vm._v("All Customer")]), _vm._v(" "), _vm._l(_vm.customerList, function (item, index) {
                return _c("option", {
                  key: index,
                  domProps: {
                    value: item[0].customer_id
                  }
                }, [_vm._v("\n                        " + _vm._s(item[0].customers.com_name) + "\n                      ")]);
              })], 2), _vm._v(" "), _c("span", {
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
              }, [_c("label", [_vm._v("\n                                Billing Month\n                                "), _c("span", {
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
        }, [_vm._v("\n                      Generate\n                  ")])])]), _vm._v(" "), _c("div", {
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
        }, [_vm._v("Name")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Activation Date"
          }
        }, [_vm._v("Date")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Total Bandwidth"
          }
        }, [_vm._v("Total Bandwidth")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Bandwidth Consumption Mbps"
          }
        }, [_vm._v("Bandwidth Consumption Mbps")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Slab wisi Rate"
          }
        }, [_vm._v("Rate")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Discount"
          }
        }, [_vm._v("Discount")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Rate After Discount"
          }
        }, [_vm._v("D/A Rate")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Monthly Recuring Charge After Discount BDT (TK)"
          }
        }, [_vm._v("MRC")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Monthly Backhaul Charge After Discount BDT (TK)"
          }
        }, [_vm._v(" MBC ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Add Or Subtract"
          }
        }, [_vm._v("Add/Sub")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Adjust/Additional Discount"
          }
        }, [_vm._v(" Adjust")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Monthly rental MRC+MBC + Adjust"
          }
        }, [_vm._v(" MRC + MBC + Adjust ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "5% VAT on MRC for Wet Segment"
          }
        }, [_vm._v(" 5% VAT ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "(MRC+MBC) + Total VAT on MRC for Wet Segment & MBC"
          }
        }, [_vm._v(" Net Bill ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "De-activation or Others"
          }
        }, [_vm._v(" Remarks ")])])]), _vm._v(" "), _c("tbody", _vm._l(_vm.demandNoteList, function (item, index) {
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
          }), _vm._v(_vm._s(item.customer_name) + "\n                      ")]), _vm._v(" "), _c("td", {
            staticClass: "dateFillSize"
          }, [_c("span", {
            staticClass: "badge badge-success dateFillSize"
          }, [_vm._v(_vm._s(item.last_activation_date.approved_date))])]), _vm._v(" "), _c("td", {
            staticClass: "dateFillSize"
          }, [_c("span", {}, [_vm._v(_vm._s(item.total))])]), _vm._v(" "), _c("td", {
            staticClass: "mrcAndDiscount"
          }, [_vm._v("\n                        " + _vm._s(item.cableWiseTotal) + "\n                      ")]), _vm._v(" "), _c("td", {
            staticClass: "mrcAndDiscount"
          }, [_vm._v("\n                        " + _vm._s(item.bill) + "\n                      ")]), _vm._v(" "), _c("td", [_c("input", {
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
          }, [_vm._v("\n                          " + _vm._s(_vm.billInfoWith10Discount(item, index).toFixed(2)) + "\n                      ")]), _vm._v(" "), _c("td", {
            staticClass: "dateFillSize"
          }, [_vm._v("\n                          " + _vm._s(_vm.billInfoWithDiscountAndMrc(item, index).toFixed(2)) + "\n                      ")]), _vm._v(" "), _c("td", {
            staticClass: "mrcAndDiscount"
          }, [_c("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: item.mbc,
              expression: "item.mbc"
            }],
            staticClass: "form-control inputFillSize",
            attrs: {
              type: "number"
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
          }, [_vm._v("Add")]), _vm._v(" "), _c("option", {
            attrs: {
              value: "2"
            }
          }, [_vm._v("Sub")])])]), _vm._v(" "), _c("td", [_c("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: item.adjust,
              expression: "item.adjust"
            }],
            staticClass: "form-control inputFillSize",
            attrs: {
              type: "number"
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
          })]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.mrcMbcAndAdjustCalculation(item, index).toFixed(2)))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.mrcMbcAdjustWiseVatCalculation(item, index).toFixed(2)))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.mrcMbcAdjustVatCalculation(item, index).toFixed(2)) + "\n\n                      ")]), _vm._v(" "), _c("td", [_c("input", {
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
        }, [_vm._v(" SUBMIT ")])])])];
      }
    }], null, false, 1037114698)
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
  }, [_c("b", [_vm._v("Bill Processing (IP Transit)")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=style&index=0&id=7b21be5c&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=style&index=0&id=7b21be5c&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.bulk-tag[data-v-7b21be5c] {\n    margin-left: 14%;\n    margin-bottom: 0px;\n    margin-top: 7px;\n}\ntable[data-v-7b21be5c] {\n    width: 100%;\n}\ntbody tr td[data-v-7b21be5c] {\n    width: auto;\n}\n.inputFillSize[data-v-7b21be5c] {\n    width: 100%;\n}\n.dateFillSize[data-v-7b21be5c] {\n    width: 70px;\n}\n.mrcAndDiscount[data-v-7b21be5c] {\n    width: 95px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=style&index=0&id=7b21be5c&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=style&index=0&id=7b21be5c&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IptBillProcess_vue_vue_type_style_index_0_id_7b21be5c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./IptBillProcess.vue?vue&type=style&index=0&id=7b21be5c&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=style&index=0&id=7b21be5c&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IptBillProcess_vue_vue_type_style_index_0_id_7b21be5c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IptBillProcess_vue_vue_type_style_index_0_id_7b21be5c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/billing/ipt/IptBillProcess.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/billing/ipt/IptBillProcess.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _IptBillProcess_vue_vue_type_template_id_7b21be5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IptBillProcess.vue?vue&type=template&id=7b21be5c&scoped=true& */ "./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=template&id=7b21be5c&scoped=true&");
/* harmony import */ var _IptBillProcess_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IptBillProcess.vue?vue&type=script&lang=js& */ "./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=script&lang=js&");
/* harmony import */ var _IptBillProcess_vue_vue_type_style_index_0_id_7b21be5c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IptBillProcess.vue?vue&type=style&index=0&id=7b21be5c&scoped=true&lang=css& */ "./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=style&index=0&id=7b21be5c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _IptBillProcess_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IptBillProcess_vue_vue_type_template_id_7b21be5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _IptBillProcess_vue_vue_type_template_id_7b21be5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "7b21be5c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/billing/ipt/IptBillProcess.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IptBillProcess_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./IptBillProcess.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IptBillProcess_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=template&id=7b21be5c&scoped=true&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=template&id=7b21be5c&scoped=true& ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IptBillProcess_vue_vue_type_template_id_7b21be5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IptBillProcess_vue_vue_type_template_id_7b21be5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IptBillProcess_vue_vue_type_template_id_7b21be5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./IptBillProcess.vue?vue&type=template&id=7b21be5c&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=template&id=7b21be5c&scoped=true&");


/***/ }),

/***/ "./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=style&index=0&id=7b21be5c&scoped=true&lang=css&":
/*!*************************************************************************************************************************!*\
  !*** ./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=style&index=0&id=7b21be5c&scoped=true&lang=css& ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IptBillProcess_vue_vue_type_style_index_0_id_7b21be5c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./IptBillProcess.vue?vue&type=style&index=0&id=7b21be5c&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/ipt/IptBillProcess.vue?vue&type=style&index=0&id=7b21be5c&scoped=true&lang=css&");


/***/ })

}]);