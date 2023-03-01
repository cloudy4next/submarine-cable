"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_billing_colocationPower_ColocationBillUpdate_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************/
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
      mrcAndMbcCount: 0
    };
  },
  created: function created() {
    this.visibleForm = true;
    this.getSingleBillInfo();
  },
  methods: {
    getMrcCalculation: function getMrcCalculation(item, index) {
      var result = 0;
      this.adjustAry[index] = item.adjust;
      this.addOrSubAry[index] = item.add_sub;
      this.rateForMbcAry[index] = item.mbc;
      this.customerId[index] = item.customer_id;
      this.bill_id[index] = item.bill_id;
      this.remarks[index] = item.remarks;
      if (item.add_sub == 1) {
        result = +item.mbc + +item.old_mrc_after_discount + +item.adjust;
      } else {
        result = +item.mbc + +item.old_mrc_after_discount - +item.adjust;
      }
      // console.log(item, index)
      this.mrcAry[index] = result;
      return result;
    },
    getVatAmount: function getVatAmount(item, index) {
      var totalMrc = 0;
      totalMrc = this.getMrcCalculation(item, index);
      return this.vatAry[index] = totalMrc / 100 * 5;
    },
    getNatTotal: function getNatTotal(item, index) {
      return this.netAmountAry[index] = this.getMrcCalculation(item, index) + this.getVatAmount(item, index);
    },
    getSingleBillInfo: function getSingleBillInfo() {
      var _this = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/get/iplc/single/bill-info", {
        id: this.$route.params.id
      }).then(function (res) {
        _this.loading = false;
        _this.demandNoteList = res.data.data;
      })["catch"](function () {});
    },
    onSubmit: function onSubmit() {
      var _this2 = this;
      // alert(this.demandNoteList[0].bill_id);
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/update/processing-bill-info", {
        netAmountAry: this.netAmountAry,
        remarks: this.remarks,
        rateForMbcAry: this.rateForMbcAry,
        adjustAry: this.adjustAry,
        addOrSubAry: this.addOrSubAry,
        mrcAry: this.mrcAry,
        vatAry: this.vatAry,
        bill_id: this.bill_id,
        customerId: this.customerId
      }).then(function (res) {
        _this2.loading = false;
        _this2.$router.push({
          name: "IplcBillingList",
          // name: "IplcBillUpdate",
          params: {
            id: _this2.$route.params.serviceId
          }
        });
        Toast.fire({
          icon: "success",
          title: "Successfully Update Monthly bill info ."
        });
        _this2.$emit("executeMethod");
      })["catch"](function () {
        _this2.loading = false;
        Swal.fire({
          icon: "warning",
          title: "wrong.. Please try again!"
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=template&id=13fa157b&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=template&id=13fa157b&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
          id: this.$route.params.serviceId
        }
      }
    }
  }, [_c("p", {
    staticClass: "pr-2 pb-1 mb-0"
  }, [_c("i", {
    staticClass: "fa fa-list-ul pl-2"
  }), _vm._v(" Billing List")])])], 1), _vm._v(" "), _c("div", {
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
            title: "Circuit Rate"
          }
        }, [_vm._v("Rate")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Rate After Discount"
          }
        }, [_vm._v("MRC")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Monthly Backhaul Charge After Discount BDT (TK)"
          }
        }, [_vm._v("\n                        MBC\n                      ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Add Or Subtract"
          }
        }, [_vm._v("Add/Sub")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Adjust/Additional Discount"
          }
        }, [_vm._v("\n                        Adjust\n                      ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "Monthly rental MRC+MBC + Adjust"
          }
        }, [_vm._v("\n                        MRC + MBC + Adjust\n                      ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "5% VAT on MRC for Wet Segment"
          }
        }, [_vm._v("\n                        5% VAT\n                      ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "(MRC+MBC) + Total VAT on MRC for Wet Segment & MBC"
          }
        }, [_vm._v("\n                        Net Bill\n                      ")]), _vm._v(" "), _c("th", {
          attrs: {
            scope: "col",
            title: "De-activation or Others"
          }
        }, [_vm._v("\n                        Remarks\n                      ")])])]), _vm._v(" "), _c("tbody", _vm._l(_vm.demandNoteList, function (item, index) {
          return _c("tr", {
            key: index
          }, [_c("td", {
            attrs: {
              scope: "row"
            }
          }, [_vm._v(_vm._s(index + 1))]), _vm._v(" "), _c("td", [_vm._v("\n                        " + _vm._s(item.customers.com_name) + "\n                        "), _c("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: item.bill_id,
              expression: "item.bill_id"
            }],
            attrs: {
              type: "hidden"
            },
            domProps: {
              value: item.bill_id
            },
            on: {
              input: function input($event) {
                if ($event.target.composing) return;
                _vm.$set(item, "bill_id", $event.target.value);
              }
            }
          }), _vm._v(" "), _c("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: item.customer_id,
              expression: "item.customer_id"
            }],
            attrs: {
              type: "hidden"
            },
            domProps: {
              value: item.customer_id
            },
            on: {
              input: function input($event) {
                if ($event.target.composing) return;
                _vm.$set(item, "customer_id", $event.target.value);
              }
            }
          })]), _vm._v(" "), _c("td", [_c("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: item.old_mrc,
              expression: "item.old_mrc"
            }],
            staticClass: "form-control inputFillSize",
            attrs: {
              type: "text",
              readonly: ""
            },
            domProps: {
              value: item.old_mrc
            },
            on: {
              input: function input($event) {
                if ($event.target.composing) return;
                _vm.$set(item, "old_mrc", $event.target.value);
              }
            }
          })]), _vm._v(" "), _c("td", [_c("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: item.old_mrc_after_discount,
              expression: "item.old_mrc_after_discount"
            }],
            staticClass: "form-control inputFillSize",
            attrs: {
              type: "text",
              readonly: ""
            },
            domProps: {
              value: item.old_mrc_after_discount
            },
            on: {
              input: function input($event) {
                if ($event.target.composing) return;
                _vm.$set(item, "old_mrc_after_discount", $event.target.value);
              }
            }
          })]), _vm._v(" "), _c("td", [_c("input", {
            directives: [{
              name: "model",
              rawName: "v-model.number",
              value: item.mbc,
              expression: "item.mbc",
              modifiers: {
                number: true
              }
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
                _vm.$set(item, "mbc", _vm._n($event.target.value));
              },
              blur: function blur($event) {
                return _vm.$forceUpdate();
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
            },
            domProps: {
              selected: item.add_sub == 1
            }
          }, [_vm._v("\n                            Add\n                          ")]), _vm._v(" "), _c("option", {
            attrs: {
              value: "2"
            },
            domProps: {
              selected: item.add_sub == 2
            }
          }, [_vm._v("\n                            Sub\n                          ")])])]), _vm._v(" "), _c("td", [_c("input", {
            directives: [{
              name: "model",
              rawName: "v-model.number",
              value: item.adjust,
              expression: "item.adjust",
              modifiers: {
                number: true
              }
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
                _vm.$set(item, "adjust", _vm._n($event.target.value));
              },
              blur: function blur($event) {
                return _vm.$forceUpdate();
              }
            }
          })]), _vm._v(" "), _c("td", [_vm._v("\n                        " + _vm._s(_vm.getMrcCalculation(item, index).toFixed(2)) + "\n\n                      ")]), _vm._v(" "), _c("td", [_vm._v("\n                        " + _vm._s(_vm.getVatAmount(item, index).toFixed(2)) + "\n\n                      ")]), _vm._v(" "), _c("td", [_vm._v("\n                        " + _vm._s(_vm.getNatTotal(item, index).toFixed(2)) + "\n\n                      ")]), _vm._v(" "), _c("td", [_c("input", {
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
        }, [_vm._v("\n                UPDATE\n              ")])])])];
      }
    }], null, false, 2334167641)
  })], 1) : _vm._e()])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("h4", {
    staticClass: "text-center",
    staticStyle: {
      color: "blue"
    }
  }, [_c("b", [_vm._v("Bill Update (IPLC)")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=style&index=0&id=13fa157b&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=style&index=0&id=13fa157b&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.bulk-tag[data-v-13fa157b] {\n  margin-left: 14%;\n  margin-bottom: 0px;\n  margin-top: 7px;\n}\ntable[data-v-13fa157b] {\n  width: 100%;\n}\ntbody tr td[data-v-13fa157b] {\n  width: auto;\n}\n.inputFillSize[data-v-13fa157b] {\n  width: 100%;\n}\n.dateFillSize[data-v-13fa157b] {\n  width: 70px;\n}\n.mrcAndDiscount[data-v-13fa157b] {\n  width: 95px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=style&index=0&id=13fa157b&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=style&index=0&id=13fa157b&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationBillUpdate_vue_vue_type_style_index_0_id_13fa157b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ColocationBillUpdate.vue?vue&type=style&index=0&id=13fa157b&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=style&index=0&id=13fa157b&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationBillUpdate_vue_vue_type_style_index_0_id_13fa157b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationBillUpdate_vue_vue_type_style_index_0_id_13fa157b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ColocationBillUpdate_vue_vue_type_template_id_13fa157b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ColocationBillUpdate.vue?vue&type=template&id=13fa157b&scoped=true& */ "./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=template&id=13fa157b&scoped=true&");
/* harmony import */ var _ColocationBillUpdate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ColocationBillUpdate.vue?vue&type=script&lang=js& */ "./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=script&lang=js&");
/* harmony import */ var _ColocationBillUpdate_vue_vue_type_style_index_0_id_13fa157b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ColocationBillUpdate.vue?vue&type=style&index=0&id=13fa157b&scoped=true&lang=css& */ "./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=style&index=0&id=13fa157b&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ColocationBillUpdate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ColocationBillUpdate_vue_vue_type_template_id_13fa157b_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _ColocationBillUpdate_vue_vue_type_template_id_13fa157b_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "13fa157b",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/billing/colocationPower/ColocationBillUpdate.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationBillUpdate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ColocationBillUpdate.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationBillUpdate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=template&id=13fa157b&scoped=true&":
/*!*****************************************************************************************************************************!*\
  !*** ./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=template&id=13fa157b&scoped=true& ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationBillUpdate_vue_vue_type_template_id_13fa157b_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationBillUpdate_vue_vue_type_template_id_13fa157b_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationBillUpdate_vue_vue_type_template_id_13fa157b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ColocationBillUpdate.vue?vue&type=template&id=13fa157b&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=template&id=13fa157b&scoped=true&");


/***/ }),

/***/ "./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=style&index=0&id=13fa157b&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************!*\
  !*** ./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=style&index=0&id=13fa157b&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationBillUpdate_vue_vue_type_style_index_0_id_13fa157b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ColocationBillUpdate.vue?vue&type=style&index=0&id=13fa157b&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/billing/colocationPower/ColocationBillUpdate.vue?vue&type=style&index=0&id=13fa157b&scoped=true&lang=css&");


/***/ })

}]);