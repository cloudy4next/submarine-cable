"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_demandNote_colocation_ColocationDemandNote_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
      iplcColocation: false,
      customerList: [],
      serviceList: [],
      subServiceList: [],
      capacityList: [],
      zoneList: [],
      circuitList: [],
      demand: {
        customer_id: "",
        service_id: "",
        sub_service_id: "",
        capacity_id: "",
        circuit_id: "",
        grp_or_zone: "",
        charge: 0,
        rack: 0,
        rackQty: 1,
        max: "",
        mrc: 0,
        mrc2: 0,
        Power: 0,
        PowerQty: 1,
        discount: "",
        specialDiscount: "",
        deposit: "",
        remarks: "",
        byCalculate: ""
      }
    };
  },
  created: function created() {
    // alert("ookk");
    this.demand.service_id = this.$route.params.id;
    this.visibleForm = true;
    this.getSubServiceList(this.$route.params.id);
    this.getCircuit();
  },
  computed: {
    dataAsign: function dataAsign() {
      return parseFloat(this.demand.mrc);
    },
    mrc1InMrc2: function mrc1InMrc2() {
      if (this.demand.Power * this.demand.PowerQty >= 2500) {
        if (this.demand.PowerQty > 5000) {
          return 15 * this.demand.PowerQty + this.demand.rack * this.demand.rackQty + this.dataAsign;
        } else {
          return this.demand.Power * this.demand.PowerQty + this.demand.rack * this.demand.rackQty + this.dataAsign;
        }
      } else {
        return this.demand.rack * this.demand.rackQty + 2500 + this.dataAsign;
      }
    },
    allMrcinDeposit: function allMrcinDeposit() {
      return this.demand.deposit = this.mrc1InMrc2;
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
    serviceWiseCustomer: function serviceWiseCustomer(serviceId) {
      if (serviceId == 13) {
        this.iplcColocation = true;
        this.getCustomerList(1);
      } else {
        this.iplcColocation = false;
        this.getCustomerList(7);
      }
    },
    getCustomerList: function getCustomerList(id) {
      var _this = this;
      axios.post("/service-id/wise/get-customer-list", {
        id: id
      }).then(function (res) {
        _this.loading = false;
        _this.customerList = res.data.users;
      })["catch"](function () {
        _this.loading = false;
        Swal.fire({
          icon: "warning",
          title: "wrong creidentials!"
        });
      });
    },
    rackAndQty: function rackAndQty() {
      this.demand.mrc2 = this.mrc1InMrc2;
      this.demand.deposit = this.mrc1InMrc2;
    },
    powerAndQty: function powerAndQty() {
      this.demand.mrc2 = this.mrc1InMrc2;
      this.demand.deposit = this.mrc1InMrc2;
    },
    getCircuit: function getCircuit() {
      var _this2 = this;
      axios.get("/get-circuit-list").then(function (response) {
        _this2.loading = false;
        _this2.circuitList = response.data.data;
      });
    },
    onChangeVal: function onChangeVal(e) {
      var _this3 = this;
      axios.post("/colocation/mrc/calculate", this.demand).then(function (res) {
        _this3.loading = false;
        // this.demand.mrc = res.data.data;
        _this3.demand.mrc = res.data.dataMrc;
        _this3.demand.deposit = _this3.demand.mrc;
      });
    },
    getServiceList: function getServiceList() {
      var _this4 = this;
      // alert("ok");
      axios.get("/get-service-list").then(function (res) {
        _this4.loading = false;
        _this4.serviceList = res.data.data;
      })["catch"](function () {});
    },
    getSubServiceList: function getSubServiceList(id) {
      var _this5 = this;
      this.loading = true;
      axios.post("/get-sub-service-list", {
        service_id: id
      }).then(function (res) {
        _this5.serviceWiseCustomer(_this5.$route.params.id);
        _this5.loading = false;
        _this5.subServiceList = res.data.data;
      })["catch"](function () {});
    },
    getzoneList: function getzoneList(id) {
      var _this6 = this;
      if (id != 14) {
        this.loading = true;
        axios.post("/get-colocation-charge", {
          circuit_id: id,
          customer_id: this.demand.customer_id,
          service_id: this.demand.service_id,
          sub_service_id: this.demand.sub_service_id
        }).then(function (res) {
          _this6.loading = false;
          _this6.zoneList = res.data.data;
          _this6.demand.capacity_id = res.data.data[0].capacity_id;
          _this6.demand.max = res.data.data[0].max;
          var maxCalculate = res.data.data[0].max;
          if (maxCalculate != 0) {
            _this6.demand.max = 1;
          } else {
            _this6.demand.max = 0;
          }
        });
      } else {
        this.loading = true;
        axios.get("/get-landing-group").then(function (response) {
          _this6.loading = false;
          _this6.zoneList = response.data.data;
        });
      }
    },
    getCharge: function getCharge(id) {
      var _this7 = this;
      this.loading = true;
      axios.post("/get-zone-charge", {
        grp_or_zone: id
      }).then(function (res) {
        _this7.loading = false;
        _this7.demand.charge = res.data.data.charge;
      });
    },
    visibleAction: function visibleAction() {
      this.visibleForm = !this.visibleForm;
    },
    onSubmit: function onSubmit() {
      var _this8 = this;
      axios.post("/create-CoLocation/demand-note", this.demand).then(function (res) {
        _this8.loading = false;
        _this8.$router.push({
          name: "ColocationDemandNoteList"
          // name: 'AddColocationDemandNote'
        });

        Toast.fire({
          icon: "success",
          title: "Data Upload Successfull."
        });
        _this8.$emit("executeMethod");
      })["catch"](function () {
        _this8.loading = false;
        Swal.fire({
          icon: "warning",
          title: "wrong creidentials!"
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=template&id=6b4ceb85&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=template&id=6b4ceb85&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  }, [_c("section", {
    staticClass: "content-header"
  }, [_c("div", {
    staticClass: "container-fluid"
  }, [_c("div", {
    staticClass: "row mb-2"
  }, [_c("div", {
    staticClass: "col-sm-6"
  }, [_c("h1", [_vm._v(_vm._s(this.$route.params.servName) + " Form")])]), _vm._v(" "), _c("div", {
    staticClass: "col-md-6 text-right"
  }, [_c("router-link", {
    staticClass: "btn btn-success p-1 m-0",
    attrs: {
      to: {
        name: "ColocationDemandNoteList"
      }
    }
  }, [_c("p", {
    staticClass: "pr-2 pb-1 mb-0"
  }, [_c("i", {
    staticClass: "fa fa-list-ul pl-2"
  }), _vm._v(" Demand Note List")])])], 1)])])]), _vm._v(" "), _c("div", {
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
                  change: function change($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                      return o.selected;
                    }).map(function (o) {
                      var val = "_value" in o ? o._value : o.value;
                      return val;
                    });
                    _vm.$set(_vm.demand, "customer_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }
                }
              }, [_c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("\n                        Select Company\n                      ")]), _vm._v(" "), _vm._l(_vm.customerList, function (item, index) {
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
        })], 1), _vm._v(" "), _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "Sub Services",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref3) {
              var errors = _ref3.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("Submarine Cable")]), _vm._v(" "), _c("select", {
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
                  change: function change($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                      return o.selected;
                    }).map(function (o) {
                      var val = "_value" in o ? o._value : o.value;
                      return val;
                    });
                    _vm.$set(_vm.demand, "sub_service_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }
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
        }), _vm._v(" "), _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "circuit_id",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref4) {
              var errors = _ref4.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("Circuit Type")]), _vm._v(" "), _c("select", {
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
                return val.circuit_name !== "E1" && val.circuit_name !== "E1 (Full)" && val.circuit_name !== "DS3 (21 x E1/ 45 Mbps)" && val.circuit_name !== "DS3 (21 x E1/ 45 Mbps) (Full)" && val.circuit_name !== "STM 1 (Full)" && val.circuit_name !== "STM 4 (Full)" && _vm.$route.params.id == 13 ? _c("option", {
                  key: index,
                  domProps: {
                    value: val.id
                  }
                }, [_vm._v("\n                        " + _vm._s(val.circuit_name) + "\n                      ")]) : _vm._e();
              }), _vm._v(" "), _vm._l(_vm.circuitList, function (val, index) {
                return _vm.$route.params.id == 23 && val.circuit_name == "No Circuit" ? _c("option", {
                  key: index,
                  domProps: {
                    value: val.id
                  }
                }, [_vm._v("\n                        " + _vm._s(val.circuit_name) + "\n                      ")]) : _vm._e();
              })], 2), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1), _vm._v(" "), _vm.$route.params.id == 13 ? _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "Zone",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref5) {
              var errors = _ref5.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v(" Stations/Group ")]), _vm._v(" "), _c("select", {
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
              }, [_vm._v("\n                        Select Stations/Group  old\n                      ")]), _vm._v(" "), _vm._l(_vm.zoneList, function (popOrZone, index) {
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
        })], 1) : _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "Zone",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref6) {
              var errors = _ref6.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v(" Stations/Group ")]), _vm._v(" "), _c("select", {
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
                  change: function change($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                      return o.selected;
                    }).map(function (o) {
                      var val = "_value" in o ? o._value : o.value;
                      return val;
                    });
                    _vm.$set(_vm.demand, "grp_or_zone", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }
                }
              }, [_c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("\n                        Select Stations/Group\n                      ")]), _vm._v(" "), _vm._l(_vm.zoneList, function (item, index) {
                return item.service_id == 23 ? _c("option", {
                  key: index,
                  domProps: {
                    value: item.id
                  }
                }, [_vm._v(_vm._s(item.group_name))]) : _vm._e();
              })], 2), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1), _vm._v(" "), _vm.iplcColocation ? _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "charge",
            rules: "required"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref7) {
              var errors = _ref7.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", {
                attrs: {
                  "for": "charge"
                }
              }, [_vm._v("Unite Rate")]), _vm._v(" "), _c("input", {
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
        })], 1) : _vm._e(), _vm._v(" "), _vm.iplcColocation ? _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "mrc",
            rules: "required"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref8) {
              var errors = _ref8.errors;
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
                  readonly: "",
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
        })], 1) : _vm._e(), _vm._v(" "), !_vm.iplcColocation ? _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "rack",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref9) {
              var errors = _ref9.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("Rack Space")]), _vm._v(" "), _c("select", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.rack,
                  expression: "demand.rack"
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
                    _vm.$set(_vm.demand, "rack", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }
                }
              }, [_c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("\n                        Select Rack Space\n                      ")]), _vm._v(" "), _c("option", {
                attrs: {
                  value: "6000"
                }
              }, [_vm._v("4U Space")]), _vm._v(" "), _c("option", {
                attrs: {
                  value: "40000"
                }
              }, [_vm._v("42U Rack Space/Full Rack")])]), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1) : _vm._e(), _vm._v(" "), !_vm.iplcColocation ? _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "rackQty",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref10) {
              var errors = _ref10.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("Rack Space Quantity")]), _vm._v(" "), _c("input", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.rackQty,
                  expression: "demand.rackQty"
                }],
                staticClass: "form-control",
                staticStyle: {
                  width: "100%"
                },
                attrs: {
                  type: "number"
                },
                domProps: {
                  value: _vm.demand.rackQty
                },
                on: {
                  change: function change($event) {
                    return _vm.rackAndQty();
                  },
                  input: function input($event) {
                    if ($event.target.composing) return;
                    _vm.$set(_vm.demand, "rackQty", $event.target.value);
                  }
                }
              }), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1) : _vm._e(), _vm._v(" "), !_vm.iplcColocation ? _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "Power",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref11) {
              var errors = _ref11.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("Power")]), _vm._v(" "), _c("select", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.Power,
                  expression: "demand.Power"
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
                    _vm.$set(_vm.demand, "Power", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                  }
                }
              }, [_c("option", {
                attrs: {
                  value: "",
                  selected: "selected",
                  disabled: ""
                }
              }, [_vm._v("\n                        Select Power\n                      ")]), _vm._v(" "), _c("option", {
                attrs: {
                  value: "18"
                }
              }, [_vm._v("Per Watt")])]), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1) : _vm._e(), _vm._v(" "), !_vm.iplcColocation ? _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "PowerQty",
            rules: "required|min_value:1"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref12) {
              var errors = _ref12.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", [_vm._v("Power Quantity")]), _vm._v(" "), _c("input", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.demand.PowerQty,
                  expression: "demand.PowerQty"
                }],
                staticClass: "form-control",
                staticStyle: {
                  width: "100%"
                },
                attrs: {
                  type: "number"
                },
                domProps: {
                  value: _vm.demand.PowerQty
                },
                on: {
                  change: function change($event) {
                    return _vm.powerAndQty();
                  },
                  input: function input($event) {
                    if ($event.target.composing) return;
                    _vm.$set(_vm.demand, "PowerQty", $event.target.value);
                  }
                }
              }), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1) : _vm._e(), _vm._v(" "), !_vm.iplcColocation ? _c("div", {
          staticClass: "col-md-4"
        }, [_c("div", {
          staticClass: "form-group"
        }, [_c("label", {
          attrs: {
            "for": "mrc2"
          }
        }, [_vm._v("MRC 2")]), _vm._v(" "), _c("input", {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: _vm.demand.mrc2,
            expression: "demand.mrc2"
          }],
          staticClass: "form-control",
          attrs: {
            type: "number",
            min: "0",
            id: "mrc2",
            placeholder: "Enter mrc 2"
          },
          domProps: {
            value: _vm.demand.mrc2
          },
          on: {
            input: function input($event) {
              if ($event.target.composing) return;
              _vm.$set(_vm.demand, "mrc2", $event.target.value);
            }
          }
        })])]) : _vm._e(), _vm._v(" "), _c("div", {
          staticClass: "col-md-4"
        }, [_c("ValidationProvider", {
          attrs: {
            name: "discount",
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
            name: "specialDiscount",
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
                  "for": "specialDiscount"
                }
              }, [_vm._v("Adjust/Additional Discount")]), _vm._v(" "), _c("input", {
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
              }, [_vm._v("Add/Subtract")]), _vm._v(" "), _c("select", {
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
            placeholder: "Enter Remarks"
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
            name: "Security Deposit",
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
    }], null, false, 761775008)
  })], 1) : _vm._e()])])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=style&index=0&id=6b4ceb85&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=style&index=0&id=6b4ceb85&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.bulk-tag[data-v-6b4ceb85] {\n  margin-left: 14%;\n  margin-bottom: 0px;\n  margin-top: 7px;\n}\n.content-header[data-v-6b4ceb85] {\n  padding: 5px 0px;\n}\n.modal-body[data-v-6b4ceb85] {\n  padding: 0;\n}\np[data-v-6b4ceb85] {\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=style&index=0&id=6b4ceb85&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=style&index=0&id=6b4ceb85&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationDemandNote_vue_vue_type_style_index_0_id_6b4ceb85_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ColocationDemandNote.vue?vue&type=style&index=0&id=6b4ceb85&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=style&index=0&id=6b4ceb85&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationDemandNote_vue_vue_type_style_index_0_id_6b4ceb85_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationDemandNote_vue_vue_type_style_index_0_id_6b4ceb85_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/demandNote/colocation/ColocationDemandNote.vue":
/*!********************************************************************************!*\
  !*** ./resources/js/components/demandNote/colocation/ColocationDemandNote.vue ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ColocationDemandNote_vue_vue_type_template_id_6b4ceb85_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ColocationDemandNote.vue?vue&type=template&id=6b4ceb85&scoped=true& */ "./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=template&id=6b4ceb85&scoped=true&");
/* harmony import */ var _ColocationDemandNote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ColocationDemandNote.vue?vue&type=script&lang=js& */ "./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=script&lang=js&");
/* harmony import */ var _ColocationDemandNote_vue_vue_type_style_index_0_id_6b4ceb85_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ColocationDemandNote.vue?vue&type=style&index=0&id=6b4ceb85&scoped=true&lang=css& */ "./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=style&index=0&id=6b4ceb85&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ColocationDemandNote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ColocationDemandNote_vue_vue_type_template_id_6b4ceb85_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _ColocationDemandNote_vue_vue_type_template_id_6b4ceb85_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "6b4ceb85",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/demandNote/colocation/ColocationDemandNote.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationDemandNote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ColocationDemandNote.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationDemandNote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=template&id=6b4ceb85&scoped=true&":
/*!***************************************************************************************************************************!*\
  !*** ./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=template&id=6b4ceb85&scoped=true& ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationDemandNote_vue_vue_type_template_id_6b4ceb85_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationDemandNote_vue_vue_type_template_id_6b4ceb85_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationDemandNote_vue_vue_type_template_id_6b4ceb85_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ColocationDemandNote.vue?vue&type=template&id=6b4ceb85&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=template&id=6b4ceb85&scoped=true&");


/***/ }),

/***/ "./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=style&index=0&id=6b4ceb85&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************!*\
  !*** ./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=style&index=0&id=6b4ceb85&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ColocationDemandNote_vue_vue_type_style_index_0_id_6b4ceb85_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ColocationDemandNote.vue?vue&type=style&index=0&id=6b4ceb85&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/demandNote/colocation/ColocationDemandNote.vue?vue&type=style&index=0&id=6b4ceb85&scoped=true&lang=css&");


/***/ })

}]);