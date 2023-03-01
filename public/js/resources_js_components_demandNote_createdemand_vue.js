"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_demandNote_createdemand_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/createdemand.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/createdemand.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ["item"],
  data: function data() {
    return {
      loading: false,
      visibleForm: false,
      totalBandwidth: 0,
      popWiseTotalBandwidth: 0,
      userList: [],
      serviceList: [],
      subServiceList: [],
      capacityList: [],
      zoneList: [],
      circuitList: [],
      licenceList: [],
      portList: [],
      countryList: [],
      qtyFill: false,
      countryShow: false,
      portShow: true,
      iplcVal: "",
      subServiceId: "",
      btnFide: false,
      demand: {
        customer_id: "",
        service_id: this.$route.params.id,
        sub_service_id: "",
        capacity_id: "",
        circuit_id: "",
        grp_or_zone: "",
        charge: 0,
        qty: 0,
        max: 0,
        mrc: 0,
        discount: 0,
        remarks: "",
        byCalculate: 1,
        byDiscountCalculation: 2,
        country: 0,
        port: 0,
        portqty: 0,
        specialDiscount: 0,
        deposit: 0
      }
    };
  },
  created: function created() {
    this.visibleForm = true;
    this.demand.service_id = this.$route.params.id, this.getSubServiceList(this.$route.params.id);
    this.getCircuit();
    this.getLicence();
    this.discountcal();
    this.onChangeDiscount();
    this.onChangeService(this.$route.params.id);
    if (this.demand.service_id == 1) {
      this.iplcVal = 1;
    } else {
      this.iplcVal = 0;
    }
  },
  watch: {
    "demand.circuit_id": function demandCircuit_id() {
      this.getzoneList(this.demand.circuit_id);
    },
    "demand.grp_or_zone": function demandGrp_or_zone() {
      this.getCharge(this.demand.grp_or_zone);
    }
  },
  methods: {
    customerChange: function customerChange(e) {
      var _this = this;
      this.demand.customer_id = e.target.value;
      this.btnFide = true;
      axios.get("/customer/wise/total-bandwidth/" + e.target.value).then(function (res) {
        _this.loading = false;
        _this.totalBandwidth = res.data.data;
      });
    },
    cuaromerWiseBandwidthDetails: function cuaromerWiseBandwidthDetails() {
      if (this.$route.params.id == 1) {
        this.$router.push({
          name: "CustomerBandwithList",
          params: {
            id: this.demand.customer_id
          }
        });
      } else {
        this.$router.push({
          name: "IPTCustomerTotalBandwith",
          params: {
            id: this.demand.customer_id
          }
        });
      }
    },
    onChangeSubService: function onChangeSubService(e) {
      if (this.demand.service_id == 7) {
        if (e.target.value == 107) {
          this.demand.circuit_id = 9;
          this.getPortList();
        } else {
          this.demand.circuit_id = 8;
          this.getPortList();
        }
      } else {
        if (e.target.value == 106) {
          this.countryShow = true;
        } else {
          this.countryShow = false;
        }
      }
    },
    groupIdWiseGetCountry: function groupIdWiseGetCountry() {
      var _this2 = this;
      this.loading = true;
      axios.post("/group-id/wise/get-country", {
        id: this.demand.grp_or_zone
      }).then(function (res) {
        _this2.loading = false;
        _this2.countryList = res.data.data;
      });
    },
    getPortList: function getPortList() {
      var _this3 = this;
      this.loading = true;
      axios.post("/get-port", {
        id: this.demand.circuit_id
      }).then(function (res) {
        _this3.loading = false;
        _this3.portList = res.data.data;
      });
    },
    getCircuit: function getCircuit() {
      var _this4 = this;
      axios.get("/get-circuit-list").then(function (response) {
        _this4.loading = false;
        _this4.circuitList = response.data.data;
      });
    },
    getLicence: function getLicence() {
      var _this5 = this;
      axios.get("/get-customer-serve/wise/type-list").then(function (response) {
        _this5.loading = false;
        _this5.licenceList = response.data.data;
      });
    },
    getValue: function getValue(id) {
      var _this6 = this;
      this.capacityList.map(function (item) {
        if (item.id === parseInt(id)) {
          _this6.demand.deposit = item.charge;
        }
      });
    },
    qtyCalculation: function qtyCalculation() {
      var _this7 = this;
      if (this.iplcVal != 1) {
        this.demand.mrc = this.demand.qty * this.demand.charge;
        this.demand.deposit = this.demand.mrc * 1.05;
        // this.totalBandwidth = parseFloat(this.totalBandwidth)+parseFloat(this.demand.qty)
      } else {
        axios.post("/mrc/calculate", this.demand).then(function (res) {
          _this7.loading = false;
          var mrcToFIxed = 0;
          mrcToFIxed = res.data.dataMrc;
          _this7.demand.mrc = mrcToFIxed.toFixed(2);
          _this7.demand.deposit = _this7.demand.mrc * 1.05;
        });
      }
    },
    discountcal: function discountcal() {
      if (this.demand.discount > 0) {
        this.demand.deposit = 0;
      } else {
        this.demand.deposit = Math.round(this.demand.mrc * 1.05);
      }
      return this.demand.deposit;
    },
    onChangeDiscount: function onChangeDiscount(e) {
      if (this.demand.discount > 0) {
        this.demand.deposit = Math.round((this.demand.mrc - this.demand.mrc * (this.demand.discount / 100)) * 1.05);
      } else {
        this.demand.deposit = Math.round(this.demand.mrc * 1.05);
      }
    },
    onChangeVal: function onChangeVal(e) {
      var _this8 = this;
      // if (this.iplcVal == 0) {
      //   // alert(this.demand.charge);
      //   this.demand.mrc = this.demand.qty * this.demand.charge;
      //   this.demand.deposit = this.demand.mrc * 1.05;
      // }
      if (this.iplcVal == 1) {
        this.demand.qty = 1;
        axios.post("/mrc/calculate", this.demand).then(function (res) {
          _this8.loading = false;
          // this.demand.mrc = res.data.dataMrc;
          var mrcToFIxed = 0;
          mrcToFIxed = res.data.dataMrc;
          _this8.demand.mrc = mrcToFIxed.toFixed(2);
          _this8.demand.deposit = _this8.demand.mrc * 1.05;
        });
      }
      axios.get("/customer/group/pop/wise/total-bandwidth/" + this.demand.customer_id + '/' + e.target.value).then(function (res) {
        _this8.loading = false;
        _this8.popWiseTotalBandwidth = res.data.data;
      });
      this.countryList = "";
      this.groupIdWiseGetCountry(e.target.value);
    },
    onChangeService: function onChangeService(id) {
      if (this.$route.params.id == 1) {
        this.qtyFill = true;
        this.portShow = false;
        this.iplcVal = 1;
        this.demand.qty = 1;
        this.demand.charge = "";
        this.demand.mrc = "";
        this.demand.discount = 0;
      } else {
        this.qtyFill = false;
        this.portShow = true;
        this.iplcVal = 0;
        this.demand.qty = 0;
        this.demand.charge = 0;
        this.demand.mrc = 0;
        this.demand.discount = 0;
      }
      this.getCustomerList(this.demand.service_id);
    },
    getCustomerList: function getCustomerList(id) {
      var _this9 = this;
      axios.post("/service-id/wise/get-customer-list", {
        id: id
      }).then(function (res) {
        _this9.loading = false;
        _this9.userList = res.data.users;
      })["catch"](function () {
        _this9.loading = false;
        Swal.fire({
          icon: "warning",
          title: "wrong creidentials!"
        });
      });
    },
    getSubServiceList: function getSubServiceList(id) {
      var _this10 = this;
      this.loading = true;
      axios.post("/get-sub-service-list", {
        service_id: id
      }).then(function (res) {
        _this10.loading = false;
        _this10.subServiceList = res.data.data;
      })["catch"](function () {});
    },
    getzoneList: function getzoneList(id) {
      var _this11 = this;
      this.loading = true;
      axios.post("/get-zone-list", {
        circuit_id: id,
        customer_id: this.demand.customer_id,
        service_id: this.demand.service_id,
        sub_service_id: this.demand.sub_service_id,
        qty: this.demand.qty,
        max: this.demand.max
      }).then(function (res) {
        _this11.loading = false;
        _this11.zoneList = res.data.data;
        _this11.demand.capacity_id = res.data.data[0].capacity_id;
        _this11.subServiceId = _this11.demand.sub_service_id;
        // this.demand.max = res.data.data[0].max;
        var maxCalculate = res.data.data[0].max;
        if (maxCalculate != 0) {
          if (id == 7) {
            _this11.demand.max = 100;
          } else if (id == 6) {
            _this11.demand.max = 10;
          } else {
            _this11.demand.max = 2.5;
          }
        } else {
          _this11.demand.max = 0;
        }
      });
    },
    getCharge: function getCharge(id) {
      var _this12 = this;
      this.loading = true;
      axios.post("/get-zone-charge", {
        grp_or_zone: id
      }).then(function (res) {
        _this12.loading = false;
        _this12.demand.charge = res.data.data.charge;
        if (_this12.iplcVal != 1) {
          _this12.demand.mrc = _this12.demand.qty * _this12.demand.charge;
          _this12.demand.deposit = _this12.demand.mrc * 1.05;
        }
      });
    },
    visibleAction: function visibleAction() {
      this.visibleForm = !this.visibleForm;
    },
    onSubmit: function onSubmit() {
      var _this13 = this;
      axios.post("/create-demand-note", this.demand).then(function (res) {
        _this13.loading = false;
        _this13.$router.push({
          name: "DemandNoteReport",
          // name: 'AddDemandNote'
          params: {
            servName: _this13.$route.params.servName,
            id: _this13.$route.params.id
          }
        });
        Toast.fire({
          icon: "success",
          title: "Data Upload Successfull."
        });
        window.location = res.data.redirect;
        _this13.$emit("executeMethod");
      })["catch"](function () {
        _this13.loading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/createdemand.vue?vue&type=template&id=17f8713e&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/createdemand.vue?vue&type=template&id=17f8713e&scoped=true& ***!
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
  }, [_c("h4", {
    staticClass: "modal-title mr-5"
  }, [_c("b", [_vm._v("Demand Note Form " + _vm._s(this.$route.params.servName))])]), _vm._v(" "), _c("p", [_vm._v("Total Bandwidth: "), _c("span", {
    staticClass: "text-red pr-4"
  }, [_vm._v(_vm._s(_vm.totalBandwidth))]), _vm._v(" "), !_vm.qtyFill ? _c("span", {}, [_vm._v("\n        Pop Wise: "), _c("span", {
    staticClass: "text-green"
  }, [_vm._v(_vm._s(_vm.popWiseTotalBandwidth))])]) : _vm._e(), _vm._v(" "), _vm.btnFide ? _c("button", {
    staticClass: "btn btn-md btn-primary pl-3 m-0",
    on: {
      click: function click($event) {
        return _vm.cuaromerWiseBandwidthDetails();
      }
    }
  }, [_vm._v("BW\n        Details")]) : _vm._e()]), _vm._v(" "), _c("router-link", {
    staticClass: "btn btn-success p-0 m-0",
    attrs: {
      to: {
        name: "DemandNoteList",
        params: {
          servName: this.$route.params.servName,
          id: this.$route.params.id
        }
      }
    }
  }, [_c("p", {
    staticClass: "pr-2 pb-1 mb-0"
  }, [_c("i", {
    staticClass: "fa fa-list-ul pl-2"
  }), _vm._v(" Demand Note List")])])], 1), _vm._v(" "), _c("div", {
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
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "Company",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref2) {
              var errors = _ref2.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("Company Name")]), _vm._v(" "), _c("select", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.customer_id,
                  expression: "demand.customer_id"
                }],
                staticClass: "form-control",
                staticStyle: {
                  width: "100%"
                },
                on: {
                  change: [function ($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                      return o.selected;
                    }).map(function (o) {
                      var val = "_value" in o ? o._value : o.value;
                      return val;
                    });
                    _vm.$set(_vm.demand, "customer_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }, function ($event) {
                    return _vm.customerChange($event);
                  }]
                }
              }, [_c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("\n                        Select Company\n                      ")]), _vm._v(" "), _vm._l(_vm.userList, function (item, index) {
                return _c("option", {
                  key: index,
                  domProps: {
                    value: item.id
                  }
                }, [_vm._v("\n                        " + _vm._s(item.com_name) + " (" + _vm._s(item.custype.cus_type_name) + ")\n                      ")]);
              })], 2), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1), _vm._v(" "), _vm.portShow ? _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "charge",
            rules: "required"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref3) {
              var errors = _ref3.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", {
                attrs: {
                  "for": "charge"
                }
              }, [_vm._v("Bandwidth")]), _vm._v(" "), _c("input", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.qty,
                  expression: "demand.qty"
                }],
                staticClass: "form-control",
                attrs: {
                  type: "number",
                  id: "qty",
                  min: "0",
                  placeholder: "Quantity"
                },
                domProps: {
                  value: _vm.demand.qty
                },
                on: {
                  keyup: _vm.qtyCalculation,
                  input: function input($event) {
                    if ($event.target.composing) return;
                    _vm.$set(_vm.demand, "qty", $event.target.value);
                  }
                }
              }), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1) : _vm._e(), _vm._v(" "), _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "Sub Services",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref4) {
              var errors = _ref4.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_vm.portShow ? _c("label", [_vm._v("Sub Service (Licence)")]) : _c("label", [_vm._v("Submarine Cable")]), _vm._v(" "), _c("select", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.sub_service_id,
                  expression: "demand.sub_service_id"
                }],
                staticClass: "form-control",
                staticStyle: {
                  width: "100%"
                },
                on: {
                  change: [function ($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                      return o.selected;
                    }).map(function (o) {
                      var val = "_value" in o ? o._value : o.value;
                      return val;
                    });
                    _vm.$set(_vm.demand, "sub_service_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }, function ($event) {
                    return _vm.onChangeSubService($event);
                  }]
                }
              }, [_vm._l(_vm.subServiceList, function (item, index) {
                return _c("option", {
                  key: index,
                  domProps: {
                    value: item.id
                  }
                }, [_vm._v("\n                        " + _vm._s(item.sub_service_name) + "\n                      ")]);
              }), _vm._v(" "), _c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("\n                        Select Submarine\n                      ")])], 2), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1), _vm._v(" "), _c("input", {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: _vm.demand.capacity_id,
            expression: "demand.capacity_id"
          }],
          attrs: {
            type: "hidden",
            disabled: "",
            min: "0",
            placeholder: "Capacity"
          },
          domProps: {
            value: _vm.demand.capacity_id
          },
          on: {
            input: function input($event) {
              if ($event.target.composing) return;
              _vm.$set(_vm.demand, "capacity_id", $event.target.value);
            }
          }
        }), _vm._v(" "), _c("input", {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: _vm.demand.max,
            expression: "demand.max"
          }],
          attrs: {
            type: "hidden",
            disabled: "",
            min: "0",
            placeholder: "max"
          },
          domProps: {
            value: _vm.demand.max
          },
          on: {
            input: function input($event) {
              if ($event.target.composing) return;
              _vm.$set(_vm.demand, "max", $event.target.value);
            }
          }
        }), _vm._v(" "), _vm.qtyFill ? _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "circuit_id",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref5) {
              var errors = _ref5.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("Circuit Capacity")]), _vm._v(" "), _c("select", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.circuit_id,
                  expression: "demand.circuit_id"
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
                    _vm.$set(_vm.demand, "circuit_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }
                }
              }, [_c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("\n                        Select Circuit\n                      ")]), _vm._v(" "), _vm._l(_vm.circuitList, function (val, index) {
                return _c("option", {
                  key: index,
                  domProps: {
                    value: val.id
                  }
                }, [_vm._v("\n                        " + _vm._s(val.circuit_name) + "\n                      ")]);
              })], 2), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1) : _vm._e(), _vm._v(" "), _vm.portShow ? _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "circuit_id",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref6) {
              var errors = _ref6.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("Licence Type")]), _vm._v(" "), _c("select", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.circuit_id,
                  expression: "demand.circuit_id"
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
                    _vm.$set(_vm.demand, "circuit_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }
                }
              }, [_c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("\n                        Select Licence\n                      ")]), _vm._v(" "), _vm._l(_vm.licenceList, function (val, index) {
                return _c("option", {
                  key: index,
                  domProps: {
                    value: val.id
                  }
                }, [_vm._v("\n                        " + _vm._s(val.cus_type_name + "id" + val.id) + "\n                      ")]);
              })], 2), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1) : _vm._e(), _vm._v(" "), _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "Zone",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref7) {
              var errors = _ref7.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_vm.qtyFill ? _c("label", [_vm._v(" Foreign Drop Point ")]) : _c("label", [_vm._v(" POP ")]), _vm._v(" "), _vm.qtyFill ? _c("select", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.grp_or_zone,
                  expression: "demand.grp_or_zone"
                }],
                staticClass: "form-control",
                staticStyle: {
                  width: "100%"
                },
                attrs: {
                  name: "",
                  id: "zone" + _vm.zoneIndex
                },
                on: {
                  change: [function ($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                      return o.selected;
                    }).map(function (o) {
                      var val = "_value" in o ? o._value : o.value;
                      return val;
                    });
                    _vm.$set(_vm.demand, "grp_or_zone", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }, function ($event) {
                    return _vm.onChangeVal($event);
                  }]
                }
              }, [_c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("\n                        Select\n                      ")]), _vm._v(" "), _vm._l(_vm.zoneList, function (popOrZone, index) {
                return _vm.subServiceId == popOrZone.sub_service_id ? _c("option", {
                  key: index,
                  domProps: {
                    value: popOrZone.id
                  }
                }, [_vm._v("\n                        " + _vm._s(popOrZone.groups.group_name) + "\n                      ")]) : _vm._e();
              })], 2) : _c("select", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.grp_or_zone,
                  expression: "demand.grp_or_zone"
                }],
                staticClass: "form-control",
                staticStyle: {
                  width: "100%"
                },
                attrs: {
                  name: "",
                  id: "zone" + _vm.zoneIndex
                },
                on: {
                  change: [function ($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                      return o.selected;
                    }).map(function (o) {
                      var val = "_value" in o ? o._value : o.value;
                      return val;
                    });
                    _vm.$set(_vm.demand, "grp_or_zone", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }, function ($event) {
                    return _vm.onChangeVal($event);
                  }]
                }
              }, [_c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("\n                        Select POP\n                      ")]), _vm._v(" "), _vm._l(_vm.zoneList, function (popOrZone, index) {
                return _c("option", {
                  key: index,
                  domProps: {
                    value: popOrZone.id
                  }
                }, [_vm._v("\n                        " + _vm._s(popOrZone.groups.group_name) + "\n                      ")]);
              })], 2), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1), _vm._v(" "), _vm.countryShow ? _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "country",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref8) {
              var errors = _ref8.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("Landing Stations (Country)")]), _vm._v(" "), _c("select", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.country,
                  expression: "demand.country"
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
                    _vm.$set(_vm.demand, "country", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }
                }
              }, [_c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("\n                        Select Country\n                      ")]), _vm._v(" "), _vm._l(_vm.countryList, function (country, counId) {
                return _c("option", {
                  key: counId,
                  domProps: {
                    value: country.id
                  }
                }, [_vm._v("\n                        " + _vm._s(country.country_name) + "\n                      ")]);
              })], 2), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1) : _vm._e(), _vm._v(" "), _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "charge",
            rules: "required"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref9) {
              var errors = _ref9.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", {
                attrs: {
                  "for": "charge"
                }
              }, [_vm._v("Slab Level")]), _vm._v(" "), _c("input", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.charge,
                  expression: "demand.charge"
                }],
                staticClass: "form-control",
                attrs: {
                  type: "number",
                  id: "charge",
                  disabled: "",
                  min: "0",
                  placeholder: "Tariff"
                },
                domProps: {
                  value: _vm.demand.charge
                },
                on: {
                  input: function input($event) {
                    if ($event.target.composing) return;
                    _vm.$set(_vm.demand, "charge", $event.target.value);
                  }
                }
              }), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1), _vm._v(" "), _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "mrc",
            rules: "required"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref10) {
              var errors = _ref10.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", {
                attrs: {
                  "for": "mrc"
                }
              }, [_vm._v("MRC")]), _vm._v(" "), _c("input", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.mrc,
                  expression: "demand.mrc"
                }],
                staticClass: "form-control",
                attrs: {
                  type: "number",
                  id: "mrc",
                  disabled: "",
                  min: "0",
                  placeholder: "MRC In BDT"
                },
                domProps: {
                  value: _vm.demand.mrc
                },
                on: {
                  input: function input($event) {
                    if ($event.target.composing) return;
                    _vm.$set(_vm.demand, "mrc", $event.target.value);
                  }
                }
              }), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1), _vm._v(" "), _vm.portShow ? _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "port",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref11) {
              var errors = _ref11.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("Port")]), _vm._v(" "), _c("select", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.port,
                  expression: "demand.port"
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
                    _vm.$set(_vm.demand, "port", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }
                }
              }, [_c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("\n                        Select port\n                      ")]), _vm._v(" "), _vm._l(_vm.portList, function (val, index) {
                return _c("option", {
                  key: index,
                  domProps: {
                    value: val.id
                  }
                }, [_vm._v("\n                        " + _vm._s(val.port_name) + "\n                      ")]);
              })], 2), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1) : _vm._e(), _vm._v(" "), _vm.portShow ? _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "portQty",
            rules: "required"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref12) {
              var errors = _ref12.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("Port Quantity")]), _vm._v(" "), _c("input", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.portqty,
                  expression: "demand.portqty"
                }],
                staticClass: "form-control",
                staticStyle: {
                  width: "100%"
                },
                attrs: {
                  type: "text"
                },
                domProps: {
                  value: _vm.demand.portqty
                },
                on: {
                  keyup: _vm.qtyCalculation,
                  input: function input($event) {
                    if ($event.target.composing) return;
                    _vm.$set(_vm.demand, "portqty", $event.target.value);
                  }
                }
              }), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1) : _vm._e(), _vm._v(" "), _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "byDiscountCalculation",
            rules: "required"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref13) {
              var errors = _ref13.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", {
                attrs: {
                  "for": "byDiscountCalculation"
                }
              }, [_vm._v("Fixed/Percentage")]), _vm._v(" "), _c("select", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.byDiscountCalculation,
                  expression: "demand.byDiscountCalculation"
                }],
                staticClass: "form-control",
                attrs: {
                  name: "",
                  id: "byDiscountCalculation"
                },
                on: {
                  change: function change($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                      return o.selected;
                    }).map(function (o) {
                      var val = "_value" in o ? o._value : o.value;
                      return val;
                    });
                    _vm.$set(_vm.demand, "byDiscountCalculation", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }
                }
              }, [_c("option", {
                attrs: {
                  value: "1"
                }
              }, [_vm._v("Fixed Amount")]), _vm._v(" "), _c("option", {
                attrs: {
                  value: "2"
                }
              }, [_vm._v("Percentage")])]), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1), _vm._v(" "), _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "discount",
            rules: "required"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref14) {
              var errors = _ref14.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", {
                attrs: {
                  "for": "discount"
                }
              }, [_vm._v("Discount")]), _vm._v(" "), _c("input", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.discount,
                  expression: "demand.discount"
                }],
                staticClass: "form-control",
                attrs: {
                  type: "text",
                  min: "0",
                  id: "discount",
                  placeholder: "Enter adjust/discount"
                },
                domProps: {
                  value: _vm.demand.discount
                },
                on: {
                  change: function change($event) {
                    return _vm.onChangeDiscount($event);
                  },
                  input: function input($event) {
                    if ($event.target.composing) return;
                    _vm.$set(_vm.demand, "discount", $event.target.value);
                  }
                }
              }), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1), _vm._v(" "), _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "byCalculate",
            rules: "required"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref15) {
              var errors = _ref15.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", {
                attrs: {
                  "for": "byCalculate"
                }
              }, [_vm._v("Add/Subtract Additional Amount")]), _vm._v(" "), _c("select", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.byCalculate,
                  expression: "demand.byCalculate"
                }],
                staticClass: "form-control",
                attrs: {
                  name: "",
                  id: "byCalculate"
                },
                on: {
                  change: function change($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                      return o.selected;
                    }).map(function (o) {
                      var val = "_value" in o ? o._value : o.value;
                      return val;
                    });
                    _vm.$set(_vm.demand, "byCalculate", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
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
              }, [_vm._v("Sub")])]), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1), _vm._v(" "), _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "specialDiscount",
            rules: "required"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref16) {
              var errors = _ref16.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", {
                attrs: {
                  "for": "specialDiscount"
                }
              }, [_vm._v("Additional Amount")]), _vm._v(" "), _c("input", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.specialDiscount,
                  expression: "demand.specialDiscount"
                }],
                staticClass: "form-control",
                attrs: {
                  type: "number",
                  min: "0",
                  id: "specialDiscount",
                  placeholder: "Enter  Special Discount"
                },
                domProps: {
                  value: _vm.demand.specialDiscount
                },
                on: {
                  input: function input($event) {
                    if ($event.target.composing) return;
                    _vm.$set(_vm.demand, "specialDiscount", $event.target.value);
                  }
                }
              }), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1), _vm._v(" "), _c("div", {
          staticClass: "col-md-4"
        }, [_c("div", {
          staticClass: "form-group"
        }, [_c("label", {
          attrs: {
            "for": "remarks"
          }
        }, [_vm._v("Remarks")]), _vm._v(" "), _c("input", {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: _vm.demand.remarks,
            expression: "demand.remarks"
          }],
          staticClass: "form-control",
          attrs: {
            type: "text",
            min: "0",
            id: "remarks",
            placeholder: "Enter"
          },
          domProps: {
            value: _vm.demand.remarks
          },
          on: {
            input: function input($event) {
              if ($event.target.composing) return;
              _vm.$set(_vm.demand, "remarks", $event.target.value);
            }
          }
        })])]), _vm._v(" "), _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "Security Deposit"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref17) {
              var errors = _ref17.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", {
                attrs: {
                  "for": "sub"
                }
              }, [_vm._v("Security Deposit")]), _vm._v(" "), _c("input", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.deposit,
                  expression: "demand.deposit"
                }],
                staticClass: "form-control",
                attrs: {
                  type: "number",
                  min: "0",
                  id: "deposit",
                  placeholder: "Enter security deposit"
                },
                domProps: {
                  value: _vm.demand.deposit
                },
                on: {
                  input: function input($event) {
                    if ($event.target.composing) return;
                    _vm.$set(_vm.demand, "deposit", $event.target.value);
                  }
                }
              }), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1)]), _vm._v(" "), _c("div", {
          staticClass: "text-right"
        }, [_c("button", {
          staticClass: "btn btn-primary float-left",
          attrs: {
            type: "submit"
          }
        }, [_vm._v("\n                Submit\n              ")])])])];
      }
    }], null, false, 2420222416)
  })], 1) : _vm._e()])])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/createdemand.vue?vue&type=style&index=0&id=17f8713e&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/createdemand.vue?vue&type=style&index=0&id=17f8713e&scoped=true&lang=css& ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.bulk-tag[data-v-17f8713e] {\n  margin-left: 14%;\n  margin-bottom: 0px;\n  margin-top: 7px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/createdemand.vue?vue&type=style&index=0&id=17f8713e&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/createdemand.vue?vue&type=style&index=0&id=17f8713e&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_createdemand_vue_vue_type_style_index_0_id_17f8713e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./createdemand.vue?vue&type=style&index=0&id=17f8713e&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/createdemand.vue?vue&type=style&index=0&id=17f8713e&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_createdemand_vue_vue_type_style_index_0_id_17f8713e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_createdemand_vue_vue_type_style_index_0_id_17f8713e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/demandNote/createdemand.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/demandNote/createdemand.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createdemand_vue_vue_type_template_id_17f8713e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createdemand.vue?vue&type=template&id=17f8713e&scoped=true& */ "./resources/js/components/demandNote/createdemand.vue?vue&type=template&id=17f8713e&scoped=true&");
/* harmony import */ var _createdemand_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createdemand.vue?vue&type=script&lang=js& */ "./resources/js/components/demandNote/createdemand.vue?vue&type=script&lang=js&");
/* harmony import */ var _createdemand_vue_vue_type_style_index_0_id_17f8713e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createdemand.vue?vue&type=style&index=0&id=17f8713e&scoped=true&lang=css& */ "./resources/js/components/demandNote/createdemand.vue?vue&type=style&index=0&id=17f8713e&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _createdemand_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _createdemand_vue_vue_type_template_id_17f8713e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _createdemand_vue_vue_type_template_id_17f8713e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "17f8713e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/demandNote/createdemand.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/demandNote/createdemand.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/demandNote/createdemand.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_createdemand_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./createdemand.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/createdemand.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_createdemand_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/demandNote/createdemand.vue?vue&type=template&id=17f8713e&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/demandNote/createdemand.vue?vue&type=template&id=17f8713e&scoped=true& ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_createdemand_vue_vue_type_template_id_17f8713e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_createdemand_vue_vue_type_template_id_17f8713e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_createdemand_vue_vue_type_template_id_17f8713e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./createdemand.vue?vue&type=template&id=17f8713e&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/createdemand.vue?vue&type=template&id=17f8713e&scoped=true&");


/***/ }),

/***/ "./resources/js/components/demandNote/createdemand.vue?vue&type=style&index=0&id=17f8713e&scoped=true&lang=css&":
/*!**********************************************************************************************************************!*\
  !*** ./resources/js/components/demandNote/createdemand.vue?vue&type=style&index=0&id=17f8713e&scoped=true&lang=css& ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_createdemand_vue_vue_type_style_index_0_id_17f8713e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./createdemand.vue?vue&type=style&index=0&id=17f8713e&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/createdemand.vue?vue&type=style&index=0&id=17f8713e&scoped=true&lang=css&");


/***/ })

}]);