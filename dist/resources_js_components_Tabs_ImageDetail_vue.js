"use strict";
(self["webpackChunkferdiunal_nova_media"] = self["webpackChunkferdiunal_nova_media"] || []).push([["resources_js_components_Tabs_ImageDetail_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Tabs/ImageDetail.vue?vue&type=script&setup=true&lang=js":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Tabs/ImageDetail.vue?vue&type=script&setup=true&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "./resources/js/utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'ImageDetail',
  props: {
    file: {
      type: Object
    },
    editable: {
      type: Boolean,
      "default": true
    }
  },
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    var state = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return window.NovaMedia.state("library");
    });
    var mediaDetail = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return state.value.detail;
    });
    var props = __props;
    var formName = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)({
      get: function get() {
        return state.value.form.name;
      },
      set: function set(value) {
        return window.NovaMedia.commit("library", "setFormName", value);
      }
    });
    var formAltText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)({
      get: function get() {
        return state.value.form.alt_text;
      },
      set: function set(value) {
        return window.NovaMedia.commit("library", "setFormAltText", value);
      }
    });
    var onUpdate = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return window.NovaMedia.dispatch("library", "updateMedia", {
                resourceName: props.resourceName,
                resourceId: props.resourceId,
                attribute: props.field.attribute
              });
            case 2:
              window.NovaMedia.commit("drawer", "close");
            case 3:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function onUpdate() {
        return _ref2.apply(this, arguments);
      };
    }();
    var onSelect = function onSelect(event) {
      event.target.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Unable to copy', err);
        try {
          navigator.clipboard.writeText(event.target.value);
        } catch (err) {
          console.error('Unable to remove selection', err);
        }
      }
    };
    var onCloseDetail = function onCloseDetail() {
      NovaMedia.commit("library", "setDetail", undefined);
    };
    var __returned__ = {
      state: state,
      mediaDetail: mediaDetail,
      props: props,
      formName: formName,
      formAltText: formAltText,
      onUpdate: onUpdate,
      onSelect: onSelect,
      onCloseDetail: onCloseDetail,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed,
      get formatBytes() {
        return _utils__WEBPACK_IMPORTED_MODULE_1__.formatBytes;
      }
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Tabs/ImageDetail.vue?vue&type=template&id=444ed546":
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Tabs/ImageDetail.vue?vue&type=template&id=444ed546 ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var _hoisted_1 = {
  "class": "absolute z-50 mt-1.5 inset-0 bg-white flex flex-col py-1.5",
  style: {
    "height": "100dvb"
  }
};
var _hoisted_2 = {
  "class": "flex flex-row items-center gap-x-2.5 py-2.5 px-3.5 border-b border-gray-100"
};
var _hoisted_3 = {
  "class": "font-normal text-lg truncate"
};
var _hoisted_4 = {
  "class": "overflow-y-auto h-full px-6 pt-3.5 pb-8",
  style: {
    "max-height": "88dvh"
  }
};
var _hoisted_5 = {
  "class": "flex flex-col gap-y-1.5"
};
var _hoisted_6 = ["src", "srcset", "alt"];
var _hoisted_7 = {
  "class": "flex flex-col gap-y-4"
};
var _hoisted_8 = {
  "class": "grid grid-cols-8 items-start"
};
var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold col-span-3"
}, "File Name:", -1 /* HOISTED */);
var _hoisted_10 = {
  "class": "text-sm col-span-5"
};
var _hoisted_11 = {
  "class": "grid grid-cols-8 items-center"
};
var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold col-span-3"
}, "File Type:", -1 /* HOISTED */);
var _hoisted_13 = {
  "class": "text-sm col-span-5"
};
var _hoisted_14 = {
  "class": "grid grid-cols-8 items-center"
};
var _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold col-span-3"
}, "File Size:", -1 /* HOISTED */);
var _hoisted_16 = {
  "class": "text-sm col-span-5"
};
var _hoisted_17 = {
  "class": "grid grid-cols-8 items-center"
};
var _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold col-span-3"
}, "Last modification:", -1 /* HOISTED */);
var _hoisted_19 = {
  "class": "text-sm col-span-5"
};
var _hoisted_20 = {
  "class": "grid grid-cols-8 items-center"
};
var _hoisted_21 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold col-span-3"
}, "Upload Date:", -1 /* HOISTED */);
var _hoisted_22 = {
  "class": "text-sm col-span-5"
};
var _hoisted_23 = {
  "class": "grid grid-cols-8 items-center"
};
var _hoisted_24 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold col-span-3"
}, "Collection:", -1 /* HOISTED */);
var _hoisted_25 = {
  "class": "text-sm col-span-5"
};
var _hoisted_26 = {
  "class": "grid grid-cols-8 items-center"
};
var _hoisted_27 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold col-span-3"
}, "Disk:", -1 /* HOISTED */);
var _hoisted_28 = {
  "class": "text-sm col-span-5"
};
var _hoisted_29 = {
  "class": "grid grid-cols-8 items-center"
};
var _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold col-span-3"
}, "URL:", -1 /* HOISTED */);
var _hoisted_31 = ["value"];
var _hoisted_32 = {
  "class": "flex flex-col mt-5 gap-y-4"
};
var _hoisted_33 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "name",
  "class": "block text-sm font-medium leading-6 text-gray-900"
}, " File Name ", -1 /* HOISTED */);
var _hoisted_34 = {
  "class": "mt-2"
};
var _hoisted_35 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "altText",
  "class": "block text-sm font-medium leading-6 text-gray-900"
}, " Alt Text ", -1 /* HOISTED */);
var _hoisted_36 = {
  "class": "mt-2"
};
var _hoisted_37 = {
  "class": "flex flex-row items-center justify-between gap-x-4"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _$setup$mediaDetail, _$setup$mediaDetail2, _$setup$mediaDetail3, _$setup$mediaDetail4, _$setup$mediaDetail5, _$setup$mediaDetail6, _$setup$mediaDetail7, _$setup$mediaDetail8, _$setup$mediaDetail9, _$setup$mediaDetail10, _$setup$mediaDetail11, _$setup$mediaDetail12, _$setup$mediaDetail13, _$setup$mediaDetail14, _$setup$mediaDetail15, _$setup$mediaDetail16, _$setup$mediaDetail17;
  var _component_ArrowLeftIcon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ArrowLeftIcon");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  var _component_DefaultButton = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DefaultButton");
  var _component_CancelButton = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CancelButton");
  var _directive_tooltip = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDirective)("tooltip");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    onClick: $setup.onCloseDetail
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ArrowLeftIcon, {
        "class": "h-5 w-5",
        "aria-hidden": "true"
      })];
    }),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$setup$mediaDetail = $setup.mediaDetail) !== null && _$setup$mediaDetail !== void 0 && (_$setup$mediaDetail = _$setup$mediaDetail.name) !== null && _$setup$mediaDetail !== void 0 && _$setup$mediaDetail.length ? (_$setup$mediaDetail2 = $setup.mediaDetail) === null || _$setup$mediaDetail2 === void 0 ? void 0 : _$setup$mediaDetail2.name : "No Name"), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: (_$setup$mediaDetail3 = $setup.mediaDetail) === null || _$setup$mediaDetail3 === void 0 ? void 0 : _$setup$mediaDetail3.src,
    srcset: (_$setup$mediaDetail4 = $setup.mediaDetail) === null || _$setup$mediaDetail4 === void 0 ? void 0 : _$setup$mediaDetail4.srcset,
    alt: (_$setup$mediaDetail5 = $setup.mediaDetail) === null || _$setup$mediaDetail5 === void 0 ? void 0 : _$setup$mediaDetail5.name,
    "class": "w-full max-w-xs mx-auto rounded-md mb-4"
  }, null, 8 /* PROPS */, _hoisted_6), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$setup$mediaDetail6 = $setup.mediaDetail) === null || _$setup$mediaDetail6 === void 0 ? void 0 : _$setup$mediaDetail6.file_name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$setup$mediaDetail7 = $setup.mediaDetail) === null || _$setup$mediaDetail7 === void 0 ? void 0 : _$setup$mediaDetail7.mime_type), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatBytes((_$setup$mediaDetail8 = $setup.mediaDetail) === null || _$setup$mediaDetail8 === void 0 ? void 0 : _$setup$mediaDetail8.size)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$setup$mediaDetail9 = $setup.mediaDetail) === null || _$setup$mediaDetail9 === void 0 ? void 0 : _$setup$mediaDetail9.readable_updated_at), 1 /* TEXT */)])), [[_directive_tooltip, {
    content: (_$setup$mediaDetail10 = $setup.mediaDetail) === null || _$setup$mediaDetail10 === void 0 ? void 0 : _$setup$mediaDetail10.updated_at,
    delay: {
      show: 1,
      hide: 0
    }
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$setup$mediaDetail11 = $setup.mediaDetail) === null || _$setup$mediaDetail11 === void 0 ? void 0 : _$setup$mediaDetail11.readable_created_at), 1 /* TEXT */)])), [[_directive_tooltip, {
    content: (_$setup$mediaDetail12 = $setup.mediaDetail) === null || _$setup$mediaDetail12 === void 0 ? void 0 : _$setup$mediaDetail12.created_at,
    delay: {
      show: 1,
      hide: 0
    }
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$setup$mediaDetail13 = $setup.mediaDetail) === null || _$setup$mediaDetail13 === void 0 ? void 0 : _$setup$mediaDetail13.collection_name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [_hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$setup$mediaDetail14 = $setup.mediaDetail) === null || _$setup$mediaDetail14 === void 0 ? void 0 : _$setup$mediaDetail14.disk), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [_hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "class": "w-full col-span-5 form-control form-input form-control-bordered",
    value: (_$setup$mediaDetail15 = $setup.mediaDetail) === null || _$setup$mediaDetail15 === void 0 ? void 0 : _$setup$mediaDetail15.src,
    readonly: "",
    onClick: $setup.onSelect
  }, null, 8 /* PROPS */, _hoisted_31)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "name",
    "class": "w-full form-control form-input form-control-bordered",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $setup.formName = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.formName]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "altText",
    "class": "w-full form-control form-input form-control-bordered",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $setup.formAltText = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.formAltText]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DefaultButton, {
    disabled: !((_$setup$mediaDetail16 = $setup.mediaDetail) !== null && _$setup$mediaDetail16 !== void 0 && _$setup$mediaDetail16.name.length),
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bg-primary-500 w-full", [!((_$setup$mediaDetail17 = $setup.mediaDetail) !== null && _$setup$mediaDetail17 !== void 0 && _$setup$mediaDetail17.name.length) ? 'cursor-not-allowed opacity-50' : '']]),
    onClick: $setup.onUpdate
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Save ")];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["disabled", "class"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CancelButton, {
    type: "button",
    "class": "border border-gray-50 w-full",
    onClick: $setup.onCloseDetail
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Back ")];
    }),
    _: 1 /* STABLE */
  })])])])]);
}

/***/ }),

/***/ "./resources/js/components/Tabs/ImageDetail.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/Tabs/ImageDetail.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ImageDetail_vue_vue_type_template_id_444ed546__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageDetail.vue?vue&type=template&id=444ed546 */ "./resources/js/components/Tabs/ImageDetail.vue?vue&type=template&id=444ed546");
/* harmony import */ var _ImageDetail_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ImageDetail.vue?vue&type=script&setup=true&lang=js */ "./resources/js/components/Tabs/ImageDetail.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _Users_ferdiunal_apps_pm_nova_components_NovaMedia_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Users_ferdiunal_apps_pm_nova_components_NovaMedia_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_ImageDetail_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ImageDetail_vue_vue_type_template_id_444ed546__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/Tabs/ImageDetail.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Tabs/ImageDetail.vue?vue&type=script&setup=true&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/Tabs/ImageDetail.vue?vue&type=script&setup=true&lang=js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ImageDetail_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ImageDetail_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ImageDetail.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Tabs/ImageDetail.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/components/Tabs/ImageDetail.vue?vue&type=template&id=444ed546":
/*!************************************************************************************!*\
  !*** ./resources/js/components/Tabs/ImageDetail.vue?vue&type=template&id=444ed546 ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ImageDetail_vue_vue_type_template_id_444ed546__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ImageDetail_vue_vue_type_template_id_444ed546__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ImageDetail.vue?vue&type=template&id=444ed546 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Tabs/ImageDetail.vue?vue&type=template&id=444ed546");


/***/ })

}]);