"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_configuration_ServiceList_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/ServiceAdd.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/ServiceAdd.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ["item"],
  data: function data() {
    return {
      loading: false,
      service: {
        id: "",
        service: ""
      }
    };
  },
  created: function created() {
    this.getData();
  },
  methods: {
    getData: function getData() {
      if (this.item) {
        this.service.id = this.item.id;
        this.service.service = this.item.service;
      }
    },
    onSubmit: function onSubmit() {
      var _this = this;
      this.loading = true;
      axios.post("/service-store", _objectSpread({}, this.service)).then(function (res) {
        _this.loading = false;
        Toast.fire({
          icon: "success",
          title: "Data Upload Successfull."
        });
        _this.$emit("executeMethod");
        $("#service-add-modal").modal("hide");
      })["catch"](function () {
        _this.loading = false;
        Swal.fire({
          icon: "warning",
          title: "wrong creidentials!"
        });
        $("#service-add-modal").modal("hide");
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/ServiceList.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/ServiceList.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ServiceAdd_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ServiceAdd.vue */ "./resources/js/components/configuration/ServiceAdd.vue");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    ServiceAdd: _ServiceAdd_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      loading: false,
      visibleModal: false,
      editItem: "",
      listData: []
    };
  },
  created: function created() {
    this.getServiceList();
  },
  methods: {
    getServiceList: function getServiceList() {
      var _this = this;
      this.loading = true;
      axios.get("/service-list").then(function (response) {
        _this.loading = false;
        _this.listData = response.data.data;
      });
    },
    edit: function edit(item) {
      this.editItem = item;
      this.visibleModal = true;
      $("#service-add-modal").modal("show");
    },
    deleteItem: function deleteItem(item) {
      var _this2 = this;
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(function (result) {
        if (result.isConfirmed) {
          axios.post("/change-service-status", {
            id: item.id
          }).then(function (response) {
            _this2.getServiceList();
            Swal.fire("Deleted!", "Service has been deleted.", "success");
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/ServiceAdd.vue?vue&type=template&id=0ff0d560&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/ServiceAdd.vue?vue&type=template&id=0ff0d560&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "modal fade",
    attrs: {
      id: "service-add-modal"
    }
  }, [_c("div", {
    staticClass: "modal-dialog modal-lg"
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "modal-body"
  }, [_c("div", {
    staticClass: "card card-primary"
  }, [_vm.loading ? _c("div", {
    staticClass: "overlay"
  }, [_c("i", {
    staticClass: "fa fa-spinner fa-spin"
  })]) : _vm._e(), _vm._v(" "), _c("div", {
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
        }, [_c("ValidationProvider", {
          attrs: {
            name: "Name",
            rules: "required"
          },
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn(_ref2) {
              var errors = _ref2.errors;
              return [_c("div", {
                staticClass: "form-group"
              }, [_c("label", {
                attrs: {
                  "for": "name"
                }
              }, [_vm._v("Service Name")]), _vm._v(" "), _c("input", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.service.service,
                  expression: "\n                                                            service.service\n                                                        "
                }],
                staticClass: "form-control",
                attrs: {
                  type: "text",
                  id: "name",
                  placeholder: "Enter name"
                },
                domProps: {
                  value: _vm.service.service
                },
                on: {
                  input: function input($event) {
                    if ($event.target.composing) return;
                    _vm.$set(_vm.service, "service", $event.target.value);
                  }
                }
              }), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1)]), _vm._v(" "), _c("div", {
          staticClass: "text-right mt-2"
        }, [_c("button", {
          staticClass: "btn btn-primary",
          attrs: {
            type: "submit"
          }
        }, [_vm._v("\n                                        Submit\n                                    ")])])])];
      }
    }])
  })], 1)])])])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "modal-header"
  }, [_c("h4", {
    staticClass: "modal-title mr-5"
  }, [_vm._v("Service Form")]), _vm._v(" "), _c("button", {
    staticClass: "close",
    attrs: {
      type: "button",
      "data-dismiss": "modal",
      "aria-label": "Close"
    }
  }, [_c("span", {
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v("×")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/ServiceList.vue?vue&type=template&id=b52cd702&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/ServiceList.vue?vue&type=template&id=b52cd702& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
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
  }, [_vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "col-md-6 text-right"
  }, [_c("button", {
    staticClass: "btn btn-outline-primary",
    attrs: {
      type: "button"
    },
    on: {
      click: function click($event) {
        return _vm.edit();
      }
    }
  }, [_c("i", {
    staticClass: "fa fa-plus mr-1"
  }), _vm._v("\n                        Add New Service\n                    ")])])])])]), _vm._v(" "), _c("section", {
    staticClass: "content"
  }, [_c("div", {
    staticClass: "container-fluid"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12"
  }, [_c("div", {
    staticClass: "card"
  }, [_vm.loading ? _c("div", {
    staticClass: "overlay"
  }, [_c("i", {
    staticClass: "fa fa-spinner fa-spin"
  })]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("table", {
    staticClass: "table table-bordered table-striped",
    attrs: {
      id: "example1"
    }
  }, [_vm._m(1), _vm._v(" "), _c("tbody", [_vm.listData.length == 0 ? _c("tr", {
    staticClass: "text-center"
  }, [_c("td", {
    attrs: {
      colspan: "2"
    }
  }), _vm._v(" "), _c("span", [_vm._v("Data Not Found")]), _vm._v(" "), _c("td", {
    attrs: {
      colspan: "2"
    }
  })]) : _vm._e(), _vm._v(" "), _vm._l(_vm.listData, function (item, index) {
    return _c("tr", {
      key: index
    }, [_c("td", [_vm._v(_vm._s(index + 1))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item.service))]), _vm._v(" "), _c("td", _vm._l(item.subservices, function (sub, i) {
      return _c("span", {
        key: i,
        staticClass: "badge badge-primary mr-1"
      }, [_vm._v(_vm._s(sub.sub_service_name))]);
    }), 0), _vm._v(" "), _c("td", [_c("button", {
      staticClass: "btn btn-success btn-sm",
      attrs: {
        type: "button",
        title: "Edit"
      },
      on: {
        click: function click($event) {
          return _vm.edit(item);
        }
      }
    }, [_c("i", {
      staticClass: "fa fa-edit action-btn-font m-0"
    })]), _vm._v(" "), _c("button", {
      staticClass: "btn btn-danger btn-sm",
      attrs: {
        type: "button",
        title: "Delete Service"
      },
      on: {
        click: function click($event) {
          return _vm.deleteItem(item);
        }
      }
    }, [_c("i", {
      staticClass: "fa fa-trash action-btn-font m-0",
      attrs: {
        "aria-hidden": "true"
      }
    })])])]);
  })], 2)])])])])])])]), _vm._v(" "), _vm.visibleModal ? _c("service-add", {
    key: "editItem",
    attrs: {
      item: _vm.editItem
    },
    on: {
      executeMethod: _vm.getServiceList
    }
  }) : _vm._e()], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "col-sm-6"
  }, [_c("h1", [_vm._v("Services List")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", [_vm._v("SL")]), _vm._v(" "), _c("th", [_vm._v("Service Name")]), _vm._v(" "), _c("th", [_vm._v("Sub Service")]), _vm._v(" "), _c("th", [_vm._v("Action")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/configuration/ServiceAdd.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/configuration/ServiceAdd.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ServiceAdd_vue_vue_type_template_id_0ff0d560_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ServiceAdd.vue?vue&type=template&id=0ff0d560&scoped=true& */ "./resources/js/components/configuration/ServiceAdd.vue?vue&type=template&id=0ff0d560&scoped=true&");
/* harmony import */ var _ServiceAdd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ServiceAdd.vue?vue&type=script&lang=js& */ "./resources/js/components/configuration/ServiceAdd.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ServiceAdd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ServiceAdd_vue_vue_type_template_id_0ff0d560_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _ServiceAdd_vue_vue_type_template_id_0ff0d560_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "0ff0d560",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/configuration/ServiceAdd.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/configuration/ServiceList.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/configuration/ServiceList.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ServiceList_vue_vue_type_template_id_b52cd702___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ServiceList.vue?vue&type=template&id=b52cd702& */ "./resources/js/components/configuration/ServiceList.vue?vue&type=template&id=b52cd702&");
/* harmony import */ var _ServiceList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ServiceList.vue?vue&type=script&lang=js& */ "./resources/js/components/configuration/ServiceList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ServiceList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ServiceList_vue_vue_type_template_id_b52cd702___WEBPACK_IMPORTED_MODULE_0__.render,
  _ServiceList_vue_vue_type_template_id_b52cd702___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/configuration/ServiceList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/configuration/ServiceAdd.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/configuration/ServiceAdd.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ServiceAdd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ServiceAdd.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/ServiceAdd.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ServiceAdd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/configuration/ServiceList.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/configuration/ServiceList.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ServiceList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ServiceList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/ServiceList.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ServiceList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/configuration/ServiceAdd.vue?vue&type=template&id=0ff0d560&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/configuration/ServiceAdd.vue?vue&type=template&id=0ff0d560&scoped=true& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ServiceAdd_vue_vue_type_template_id_0ff0d560_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ServiceAdd_vue_vue_type_template_id_0ff0d560_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ServiceAdd_vue_vue_type_template_id_0ff0d560_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ServiceAdd.vue?vue&type=template&id=0ff0d560&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/ServiceAdd.vue?vue&type=template&id=0ff0d560&scoped=true&");


/***/ }),

/***/ "./resources/js/components/configuration/ServiceList.vue?vue&type=template&id=b52cd702&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/configuration/ServiceList.vue?vue&type=template&id=b52cd702& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ServiceList_vue_vue_type_template_id_b52cd702___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ServiceList_vue_vue_type_template_id_b52cd702___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ServiceList_vue_vue_type_template_id_b52cd702___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ServiceList.vue?vue&type=template&id=b52cd702& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/ServiceList.vue?vue&type=template&id=b52cd702&");


/***/ })

}]);