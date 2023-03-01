"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_configuration_RolePermission_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/AddRole.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/AddRole.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ["rolePerData"],
  checked: Boolean,
  data: function data() {
    return {
      loading: false,
      permissionList: [],
      rpData: {
        name: "",
        permission: []
      }
    };
  },
  created: function created() {
    // alert(this.rolePerData);
    this.visibleForm = true;
    // this.getRole();
    this.getValue();
    this.getPermissions();
  },
  methods: {
    //
    getPermissions: function getPermissions() {
      var _this = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get("/get-permissions").then(function (res) {
        _this.permissionList = res.data.data;
      });
    },
    selectAll: function selectAll() {
      if (this.allSelected) {
        var selected = this.users.map(function (u) {
          return u.id;
        });
        this.selected = selected;
      } else {
        this.selected = [];
      }
    },
    //                  isChecked(id) {
    //  if(this.availableRoles[index].id === this.users[0].roles[0].id){
    //     console.log(this.availableRoles[index].id+' THE SAME ' +this.users[0].roles[0].id);
    //  }
    //   },
    getValue: function getValue() {
      if (this.rolePerData) {
        this.rpData = this.rolePerData;
      }
    },
    onSubmit: function onSubmit() {
      var _this2 = this;
      // alert('ookk');
      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/store-role", this.rpData).then(function (res) {
        _this2.loading = false;
        Toast.fire({
          icon: "success",
          title: "User Role Created Successfully."
        });
        // window.location.href = "/";
        _this2.$router.push({
          name: 'RolePermission'
        });
        $("#role-permission-modal").modal("hide");
        _this2.$emit("executeMethod");
      })["catch"](function () {
        _this2.loading = false;
        Swal.fire({
          icon: "warning",
          title: "wrong creidentials!"
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/EditRole.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/EditRole.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ["rolePerData"],
  checked: Boolean,
  data: function data() {
    return {
      loading: false,
      permissionList: [],
      rpData: {
        name: "",
        permission: []
      }
    };
  },
  created: function created() {
    // alert(this.rolePerData);
    this.visibleForm = true;
    // this.getRole();
    this.getValue();
    this.getPermissions();
  },
  methods: {
    //
    getPermissions: function getPermissions() {
      var _this = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get("/get-permissions").then(function (res) {
        _this.permissionList = res.data.data;
      });
    },
    selectAll: function selectAll() {
      if (this.allSelected) {
        var selected = this.users.map(function (u) {
          return u.id;
        });
        this.selected = selected;
      } else {
        this.selected = [];
      }
    },
    //                  isChecked(id) {
    //  if(this.availableRoles[index].id === this.users[0].roles[0].id){
    //     console.log(this.availableRoles[index].id+' THE SAME ' +this.users[0].roles[0].id);
    //  }
    //   },
    getValue: function getValue() {
      if (this.rolePerData) {
        this.rpData = this.rolePerData;
      }
    },
    onSubmit: function onSubmit() {
      var _this2 = this;
      // alert('ookk');
      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/store-role", this.rpData).then(function (res) {
        _this2.loading = false;
        Toast.fire({
          icon: "success",
          title: "User Role Created Successfully."
        });
        // window.location.href = "/";
        _this2.$router.push({
          name: 'RolePermission'
        });
        $("#role-permission-modal").modal("hide");
        _this2.$emit("executeMethod");
      })["catch"](function () {
        _this2.loading = false;
        Swal.fire({
          icon: "warning",
          title: "wrong creidentials!"
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/RolePermission.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/RolePermission.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AddRole_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddRole.vue */ "./resources/js/components/configuration/AddRole.vue");
/* harmony import */ var _EditRole_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditRole.vue */ "./resources/js/components/configuration/EditRole.vue");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    AddRole: _AddRole_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
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
    this.getRoleList();
  },
  methods: {
    edit: function edit(item) {
      this.editItem = item;
      this.visibleModal = true;
      $("#role-permission-modal").modal("show");
    },
    getRoleList: function getRoleList() {
      var _this = this;
      this.loading = true;
      axios.get("/get-role-list").then(function (response) {
        _this.loading = false;
        _this.listData = response.data.data;
      });
    },
    deleteItem: function deleteItem(item) {
      var _this2 = this;
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete Role!"
      }).then(function (result) {
        if (result.isConfirmed) {
          axios.post("/role-Delete", {
            id: item.id
          }).then(function (response) {
            _this2.getRoleList();
            Swal.fire("Deleted!", "Role  has been deleted.", "success");
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/AddRole.vue?vue&type=template&id=77531843&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/AddRole.vue?vue&type=template&id=77531843&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
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
      id: "role-permission-modal"
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
            name: "Role Name",
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
              }, [_vm._v("Role Name: " + _vm._s(_vm.rpData.name))]), _vm._v(" "), _c("input", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.rpData.name,
                  expression: "rpData.name "
                }],
                staticClass: "form-control",
                attrs: {
                  type: "text",
                  id: "name",
                  placeholder: "Enter role name"
                },
                domProps: {
                  value: _vm.rpData.name
                },
                on: {
                  input: function input($event) {
                    if ($event.target.composing) return;
                    _vm.$set(_vm.rpData, "name", $event.target.value);
                  }
                }
              }), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1)]), _vm._v(" "), _c("div", {
          staticClass: "card-body"
        }, [_c("div", {
          staticClass: "row"
        }, [_c("div", {
          staticClass: "col-xs-12 col-sm-12 col-md-12"
        }, [_c("div", {
          staticClass: "form-group"
        }, [_c("strong", [_vm._v("Permission:")]), _vm._v(" "), _c("tr", [_c("th", [_c("input", {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: _vm.allSelected,
            expression: "allSelected"
          }],
          attrs: {
            type: "checkbox"
          },
          domProps: {
            checked: Array.isArray(_vm.allSelected) ? _vm._i(_vm.allSelected, null) > -1 : _vm.allSelected
          },
          on: {
            change: [function ($event) {
              var $$a = _vm.allSelected,
                $$el = $event.target,
                $$c = $$el.checked ? true : false;
              if (Array.isArray($$a)) {
                var $$v = null,
                  $$i = _vm._i($$a, $$v);
                if ($$el.checked) {
                  $$i < 0 && (_vm.allSelected = $$a.concat([$$v]));
                } else {
                  $$i > -1 && (_vm.allSelected = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                }
              } else {
                _vm.allSelected = $$c;
              }
            }, _vm.selectAll]
          }
        })]), _vm._v(" "), _c("th", {
          attrs: {
            align: "left"
          }
        }, [_vm._v("select all")])]), _vm._v(" "), _vm._l(_vm.permissionList, function (item) {
          return _c("div", [_c("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: _vm.rpData.permission,
              expression: "rpData.permission"
            }],
            key: item.id,
            attrs: {
              type: "checkbox",
              id: item.id
            },
            domProps: {
              value: item.id,
              checked: Array.isArray(_vm.rpData.permission) ? _vm._i(_vm.rpData.permission, item.id) > -1 : _vm.rpData.permission
            },
            on: {
              change: function change($event) {
                var $$a = _vm.rpData.permission,
                  $$el = $event.target,
                  $$c = $$el.checked ? true : false;
                if (Array.isArray($$a)) {
                  var $$v = item.id,
                    $$i = _vm._i($$a, $$v);
                  if ($$el.checked) {
                    $$i < 0 && _vm.$set(_vm.rpData, "permission", $$a.concat([$$v]));
                  } else {
                    $$i > -1 && _vm.$set(_vm.rpData, "permission", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                  }
                } else {
                  _vm.$set(_vm.rpData, "permission", $$c);
                }
              }
            }
          }), _vm._v(" "), _c("label", {
            attrs: {
              "for": item.id
            }
          }, [_vm._v(" " + _vm._s(item.name) + " ")])]);
        })], 2)])]), _vm._v(" "), _c("div", {
          staticClass: "text-right"
        }, [_c("button", {
          staticClass: "btn btn-primary",
          attrs: {
            type: "submit"
          }
        }, [_vm._v("\n\n                                            Submit\n\n                                        ")])])])])];
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
  }, [_vm._v("Role & Permission Form")]), _vm._v(" "), _c("button", {
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/EditRole.vue?vue&type=template&id=1d354b78&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/EditRole.vue?vue&type=template&id=1d354b78&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
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
      id: "role-permission-modal"
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
            name: "Role Name",
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
              }, [_vm._v("Role Name: " + _vm._s(_vm.rpData.name))]), _vm._v(" "), _c("input", {
                directives: [{
                  name: "model",
                  rawName: "v-model",
                  value: _vm.rpData.name,
                  expression: "rpData.name "
                }],
                staticClass: "form-control",
                attrs: {
                  type: "text",
                  id: "name",
                  placeholder: "Enter role name"
                },
                domProps: {
                  value: _vm.rpData.name
                },
                on: {
                  input: function input($event) {
                    if ($event.target.composing) return;
                    _vm.$set(_vm.rpData, "name", $event.target.value);
                  }
                }
              }), _vm._v(" "), _c("span", {
                staticClass: "invalid-feedback d-block"
              }, [_vm._v(_vm._s(errors[0]))])])];
            }
          }], null, true)
        })], 1)]), _vm._v(" "), _c("div", {
          staticClass: "card-body"
        }, [_c("div", {
          staticClass: "row"
        }, [_c("div", {
          staticClass: "col-xs-12 col-sm-12 col-md-12"
        }, [_c("div", {
          staticClass: "form-group"
        }, [_c("strong", [_vm._v("Permission:")]), _vm._v(" "), _c("tr", [_c("th", [_c("input", {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: _vm.allSelected,
            expression: "allSelected"
          }],
          attrs: {
            type: "checkbox"
          },
          domProps: {
            checked: Array.isArray(_vm.allSelected) ? _vm._i(_vm.allSelected, null) > -1 : _vm.allSelected
          },
          on: {
            change: [function ($event) {
              var $$a = _vm.allSelected,
                $$el = $event.target,
                $$c = $$el.checked ? true : false;
              if (Array.isArray($$a)) {
                var $$v = null,
                  $$i = _vm._i($$a, $$v);
                if ($$el.checked) {
                  $$i < 0 && (_vm.allSelected = $$a.concat([$$v]));
                } else {
                  $$i > -1 && (_vm.allSelected = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                }
              } else {
                _vm.allSelected = $$c;
              }
            }, _vm.selectAll]
          }
        })]), _vm._v(" "), _c("th", {
          attrs: {
            align: "left"
          }
        }, [_vm._v("select all")])]), _vm._v(" "), _vm._l(_vm.permissionList, function (item) {
          return _c("div", [_c("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: _vm.rpData.permission,
              expression: "rpData.permission"
            }],
            key: item.id,
            attrs: {
              type: "checkbox",
              id: item.id
            },
            domProps: {
              value: item.id,
              checked: Array.isArray(_vm.rpData.permission) ? _vm._i(_vm.rpData.permission, item.id) > -1 : _vm.rpData.permission
            },
            on: {
              change: function change($event) {
                var $$a = _vm.rpData.permission,
                  $$el = $event.target,
                  $$c = $$el.checked ? true : false;
                if (Array.isArray($$a)) {
                  var $$v = item.id,
                    $$i = _vm._i($$a, $$v);
                  if ($$el.checked) {
                    $$i < 0 && _vm.$set(_vm.rpData, "permission", $$a.concat([$$v]));
                  } else {
                    $$i > -1 && _vm.$set(_vm.rpData, "permission", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                  }
                } else {
                  _vm.$set(_vm.rpData, "permission", $$c);
                }
              }
            }
          }), _vm._v(" "), _c("label", {
            attrs: {
              "for": item.id
            }
          }, [_vm._v(" " + _vm._s(item.name) + " ")])]);
        })], 2)])]), _vm._v(" "), _c("div", {
          staticClass: "text-right"
        }, [_c("button", {
          staticClass: "btn btn-primary",
          attrs: {
            type: "submit"
          }
        }, [_vm._v("\n                                            Submit\n                                        ")])])])])];
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
  }, [_vm._v("Role & Permission Form")]), _vm._v(" "), _c("button", {
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/RolePermission.vue?vue&type=template&id=7b2bb009&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/RolePermission.vue?vue&type=template&id=7b2bb009& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
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
      type: "button",
      "data-toggle": "modal",
      "data-target": "#role-permission-modal"
    },
    on: {
      click: function click($event) {
        return _vm.edit();
      }
    }
  }, [_c("i", {
    staticClass: "fa fa-plus mr-1"
  }), _vm._v("\n                        Add Role & Permission\n                    ")])])])])]), _vm._v(" "), _c("section", {
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
    }, [_c("td", [_vm._v(_vm._s(index + 1))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c("td", [_c("button", {
      staticClass: "btn btn-success btn-sm",
      attrs: {
        type: "button",
        title: "View Details"
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
        title: "Delete Role"
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
  })], 2)])])])])])])]), _vm._v(" "), _vm.visibleModal ? _c("add-role", {
    ref: "role-permission-modal",
    attrs: {
      rolePerData: _vm.editItem
    },
    on: {
      executeMethod: _vm.getRoleList
    }
  }) : _vm._e()], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "col-sm-6"
  }, [_c("h1", [_vm._v("Role & Permission")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", [_vm._v("SL")]), _vm._v(" "), _c("th", [_vm._v("Role Name")]), _vm._v(" "), _c("th", [_vm._v("Action")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/AddRole.vue?vue&type=style&index=0&id=77531843&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/AddRole.vue?vue&type=style&index=0&id=77531843&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.fa-spin[data-v-77531843] {\n    font-size: 30px;\n    margin-top: 20% !important;\n    margin-left: 46%;\n}\n.card .overlay[data-v-77531843],\n.info-box .overlay[data-v-77531843],\n.overlay-wrapper .overlay[data-v-77531843],\n.small-box .overlay[data-v-77531843] {\n    background-color: rgba(221, 221, 221, 0.7) !important;\n    display: none !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/EditRole.vue?vue&type=style&index=0&id=1d354b78&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/EditRole.vue?vue&type=style&index=0&id=1d354b78&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.fa-spin[data-v-1d354b78] {\n    font-size: 30px;\n    margin-top: 20% !important;\n    margin-left: 46%;\n}\n.card .overlay[data-v-1d354b78],\n.info-box .overlay[data-v-1d354b78],\n.overlay-wrapper .overlay[data-v-1d354b78],\n.small-box .overlay[data-v-1d354b78] {\n    background-color: rgba(221, 221, 221, 0.7) !important;\n    display: none !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/AddRole.vue?vue&type=style&index=0&id=77531843&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/AddRole.vue?vue&type=style&index=0&id=77531843&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddRole_vue_vue_type_style_index_0_id_77531843_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AddRole.vue?vue&type=style&index=0&id=77531843&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/AddRole.vue?vue&type=style&index=0&id=77531843&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddRole_vue_vue_type_style_index_0_id_77531843_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddRole_vue_vue_type_style_index_0_id_77531843_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/EditRole.vue?vue&type=style&index=0&id=1d354b78&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/EditRole.vue?vue&type=style&index=0&id=1d354b78&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditRole_vue_vue_type_style_index_0_id_1d354b78_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditRole.vue?vue&type=style&index=0&id=1d354b78&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/EditRole.vue?vue&type=style&index=0&id=1d354b78&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditRole_vue_vue_type_style_index_0_id_1d354b78_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditRole_vue_vue_type_style_index_0_id_1d354b78_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/configuration/AddRole.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/configuration/AddRole.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AddRole_vue_vue_type_template_id_77531843_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddRole.vue?vue&type=template&id=77531843&scoped=true& */ "./resources/js/components/configuration/AddRole.vue?vue&type=template&id=77531843&scoped=true&");
/* harmony import */ var _AddRole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddRole.vue?vue&type=script&lang=js& */ "./resources/js/components/configuration/AddRole.vue?vue&type=script&lang=js&");
/* harmony import */ var _AddRole_vue_vue_type_style_index_0_id_77531843_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AddRole.vue?vue&type=style&index=0&id=77531843&scoped=true&lang=css& */ "./resources/js/components/configuration/AddRole.vue?vue&type=style&index=0&id=77531843&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AddRole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddRole_vue_vue_type_template_id_77531843_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _AddRole_vue_vue_type_template_id_77531843_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "77531843",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/configuration/AddRole.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/configuration/EditRole.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/configuration/EditRole.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _EditRole_vue_vue_type_template_id_1d354b78_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditRole.vue?vue&type=template&id=1d354b78&scoped=true& */ "./resources/js/components/configuration/EditRole.vue?vue&type=template&id=1d354b78&scoped=true&");
/* harmony import */ var _EditRole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditRole.vue?vue&type=script&lang=js& */ "./resources/js/components/configuration/EditRole.vue?vue&type=script&lang=js&");
/* harmony import */ var _EditRole_vue_vue_type_style_index_0_id_1d354b78_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditRole.vue?vue&type=style&index=0&id=1d354b78&scoped=true&lang=css& */ "./resources/js/components/configuration/EditRole.vue?vue&type=style&index=0&id=1d354b78&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _EditRole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditRole_vue_vue_type_template_id_1d354b78_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _EditRole_vue_vue_type_template_id_1d354b78_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "1d354b78",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/configuration/EditRole.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/configuration/RolePermission.vue":
/*!******************************************************************!*\
  !*** ./resources/js/components/configuration/RolePermission.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RolePermission_vue_vue_type_template_id_7b2bb009___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RolePermission.vue?vue&type=template&id=7b2bb009& */ "./resources/js/components/configuration/RolePermission.vue?vue&type=template&id=7b2bb009&");
/* harmony import */ var _RolePermission_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RolePermission.vue?vue&type=script&lang=js& */ "./resources/js/components/configuration/RolePermission.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RolePermission_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RolePermission_vue_vue_type_template_id_7b2bb009___WEBPACK_IMPORTED_MODULE_0__.render,
  _RolePermission_vue_vue_type_template_id_7b2bb009___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/configuration/RolePermission.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/configuration/AddRole.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/configuration/AddRole.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddRole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AddRole.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/AddRole.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddRole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/configuration/EditRole.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/configuration/EditRole.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditRole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditRole.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/EditRole.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditRole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/configuration/RolePermission.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/configuration/RolePermission.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RolePermission_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RolePermission.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/RolePermission.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RolePermission_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/configuration/AddRole.vue?vue&type=template&id=77531843&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/configuration/AddRole.vue?vue&type=template&id=77531843&scoped=true& ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddRole_vue_vue_type_template_id_77531843_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddRole_vue_vue_type_template_id_77531843_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddRole_vue_vue_type_template_id_77531843_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AddRole.vue?vue&type=template&id=77531843&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/AddRole.vue?vue&type=template&id=77531843&scoped=true&");


/***/ }),

/***/ "./resources/js/components/configuration/EditRole.vue?vue&type=template&id=1d354b78&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/configuration/EditRole.vue?vue&type=template&id=1d354b78&scoped=true& ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditRole_vue_vue_type_template_id_1d354b78_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditRole_vue_vue_type_template_id_1d354b78_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditRole_vue_vue_type_template_id_1d354b78_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditRole.vue?vue&type=template&id=1d354b78&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/EditRole.vue?vue&type=template&id=1d354b78&scoped=true&");


/***/ }),

/***/ "./resources/js/components/configuration/RolePermission.vue?vue&type=template&id=7b2bb009&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/configuration/RolePermission.vue?vue&type=template&id=7b2bb009& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RolePermission_vue_vue_type_template_id_7b2bb009___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RolePermission_vue_vue_type_template_id_7b2bb009___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RolePermission_vue_vue_type_template_id_7b2bb009___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RolePermission.vue?vue&type=template&id=7b2bb009& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/RolePermission.vue?vue&type=template&id=7b2bb009&");


/***/ }),

/***/ "./resources/js/components/configuration/AddRole.vue?vue&type=style&index=0&id=77531843&scoped=true&lang=css&":
/*!********************************************************************************************************************!*\
  !*** ./resources/js/components/configuration/AddRole.vue?vue&type=style&index=0&id=77531843&scoped=true&lang=css& ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddRole_vue_vue_type_style_index_0_id_77531843_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AddRole.vue?vue&type=style&index=0&id=77531843&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/AddRole.vue?vue&type=style&index=0&id=77531843&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/js/components/configuration/EditRole.vue?vue&type=style&index=0&id=1d354b78&scoped=true&lang=css&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/components/configuration/EditRole.vue?vue&type=style&index=0&id=1d354b78&scoped=true&lang=css& ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditRole_vue_vue_type_style_index_0_id_1d354b78_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditRole.vue?vue&type=style&index=0&id=1d354b78&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/EditRole.vue?vue&type=style&index=0&id=1d354b78&scoped=true&lang=css&");


/***/ })

}]);