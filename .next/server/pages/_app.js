"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./contexts/Web3Context.js":
/*!*********************************!*\
  !*** ./contexts/Web3Context.js ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Web3Provider\": () => (/* binding */ Web3Provider),\n/* harmony export */   \"useWeb3\": () => (/* binding */ useWeb3)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _ethereum_web3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ethereum/web3 */ \"./ethereum/web3.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ethereum_web3__WEBPACK_IMPORTED_MODULE_2__]);\n_ethereum_web3__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// contexts/Web3Context.js\n\n\n\nconst Web3Context = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});\nconst Web3Provider = ({ children  })=>{\n    const { 0: account , 1: setAccount  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const { 0: isMetaMaskInstalled , 1: setIsMetaMaskInstalled  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        function handleAccountsChanged(accounts) {\n            setAccount(accounts.length === 0 ? null : accounts[0]);\n        }\n        if (false) {}\n        return ()=>{\n            if (window.ethereum) {\n                window.ethereum.removeListener(\"accountsChanged\", handleAccountsChanged);\n            }\n        };\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Web3Context.Provider, {\n        value: {\n            account,\n            isMetaMaskInstalled\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/misaelguzmangutierrez/Downloads/tesina 2/contexts/Web3Context.js\",\n        lineNumber: 30,\n        columnNumber: 9\n    }, undefined);\n};\nconst useWeb3 = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Web3Context);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0cy9XZWIzQ29udGV4dC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsMEJBQTBCO0FBQzFCO0FBQThFO0FBQ25DO0FBRTNDLE1BQU1NLFdBQVcsaUJBQUdMLG9EQUFhLENBQUMsRUFBRSxDQUFDO0FBRTlCLE1BQU1NLFlBQVksR0FBRyxDQUFDLEVBQUVDLFFBQVEsR0FBRSxHQUFLO0lBQzFDLE1BQU0sS0FBQ0MsT0FBTyxNQUFFQyxVQUFVLE1BQUlOLCtDQUFRLENBQUMsSUFBSSxDQUFDO0lBQzVDLE1BQU0sS0FBQ08sbUJBQW1CLE1BQUVDLHNCQUFzQixNQUFJUiwrQ0FBUSxDQUFDLEtBQUssQ0FBQztJQUVyRUQsZ0RBQVMsQ0FBQyxJQUFNO1FBQ1osU0FBU1UscUJBQXFCLENBQUNDLFFBQVEsRUFBRTtZQUNyQ0osVUFBVSxDQUFDSSxRQUFRLENBQUNDLE1BQU0sS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFHRCxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBRUQsSUFBSSxLQUF1RSxFQUFFLEVBSTVFO1FBRUQsT0FBTyxJQUFNO1lBQ1QsSUFBSUUsTUFBTSxDQUFDQyxRQUFRLEVBQUU7Z0JBQ2pCRCxNQUFNLENBQUNDLFFBQVEsQ0FBQ0ssY0FBYyxDQUFDLGlCQUFpQixFQUFFVCxxQkFBcUIsQ0FBQyxDQUFDO1lBQzdFLENBQUM7UUFDTCxDQUFDLENBQUM7SUFDTixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFUCxxQkFDSSw4REFBQ1AsV0FBVyxDQUFDaUIsUUFBUTtRQUFDQyxLQUFLLEVBQUU7WUFBRWYsT0FBTztZQUFFRSxtQkFBbUI7U0FBRTtrQkFDeERILFFBQVE7Ozs7O2lCQUNVLENBQ3pCO0FBQ04sQ0FBQyxDQUFDO0FBRUssTUFBTWlCLE9BQU8sR0FBRyxJQUFNdkIsaURBQVUsQ0FBQ0ksV0FBVyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXNpbmEvLi9jb250ZXh0cy9XZWIzQ29udGV4dC5qcz84ODFkIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbnRleHRzL1dlYjNDb250ZXh0LmpzXG5pbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGdldFdlYjMgfSBmcm9tICcuLi9ldGhlcmV1bS93ZWIzJztcblxuY29uc3QgV2ViM0NvbnRleHQgPSBjcmVhdGVDb250ZXh0KHt9KTtcblxuZXhwb3J0IGNvbnN0IFdlYjNQcm92aWRlciA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgICBjb25zdCBbYWNjb3VudCwgc2V0QWNjb3VudF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbaXNNZXRhTWFza0luc3RhbGxlZCwgc2V0SXNNZXRhTWFza0luc3RhbGxlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGVBY2NvdW50c0NoYW5nZWQoYWNjb3VudHMpIHtcbiAgICAgICAgICAgIHNldEFjY291bnQoYWNjb3VudHMubGVuZ3RoID09PSAwID8gbnVsbCA6IGFjY291bnRzWzBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LmV0aGVyZXVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgc2V0SXNNZXRhTWFza0luc3RhbGxlZCh0cnVlKTtcbiAgICAgICAgICAgIHdpbmRvdy5ldGhlcmV1bS5yZXF1ZXN0KHsgbWV0aG9kOiAnZXRoX2FjY291bnRzJyB9KS50aGVuKGhhbmRsZUFjY291bnRzQ2hhbmdlZCk7XG4gICAgICAgICAgICB3aW5kb3cuZXRoZXJldW0ub24oJ2FjY291bnRzQ2hhbmdlZCcsIGhhbmRsZUFjY291bnRzQ2hhbmdlZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5ldGhlcmV1bSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5ldGhlcmV1bS5yZW1vdmVMaXN0ZW5lcignYWNjb3VudHNDaGFuZ2VkJywgaGFuZGxlQWNjb3VudHNDaGFuZ2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8V2ViM0NvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgYWNjb3VudCwgaXNNZXRhTWFza0luc3RhbGxlZCB9fT5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9XZWIzQ29udGV4dC5Qcm92aWRlcj5cbiAgICApO1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZVdlYjMgPSAoKSA9PiB1c2VDb250ZXh0KFdlYjNDb250ZXh0KTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJnZXRXZWIzIiwiV2ViM0NvbnRleHQiLCJXZWIzUHJvdmlkZXIiLCJjaGlsZHJlbiIsImFjY291bnQiLCJzZXRBY2NvdW50IiwiaXNNZXRhTWFza0luc3RhbGxlZCIsInNldElzTWV0YU1hc2tJbnN0YWxsZWQiLCJoYW5kbGVBY2NvdW50c0NoYW5nZWQiLCJhY2NvdW50cyIsImxlbmd0aCIsIndpbmRvdyIsImV0aGVyZXVtIiwicmVxdWVzdCIsIm1ldGhvZCIsInRoZW4iLCJvbiIsInJlbW92ZUxpc3RlbmVyIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInVzZVdlYjMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./contexts/Web3Context.js\n");

/***/ }),

/***/ "./ethereum/web3.js":
/*!**************************!*\
  !*** ./ethereum/web3.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getWeb3\": () => (/* binding */ getWeb3)\n/* harmony export */ });\n/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3 */ \"web3\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([web3__WEBPACK_IMPORTED_MODULE_0__]);\nweb3__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n//ethereum/web3.js\n\nlet web3;\n// Función para inicializar Web3\nconst initWeb3 = ()=>{\n    if (false) {} else {\n        // We are on the server *OR* the user is not running MetaMask\n        const provider = new web3__WEBPACK_IMPORTED_MODULE_0__[\"default\"].providers.HttpProvider(\"https://sepolia.infura.io/v3/e62dea9220264697a491ddea6b248a35\");\n        return new web3__WEBPACK_IMPORTED_MODULE_0__[\"default\"](provider);\n    }\n};\n// Exporta una función que inicializa Web3 a demanda\nconst getWeb3 = ()=>{\n    if (!web3) {\n        web3 = initWeb3();\n    }\n    return web3;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getWeb3);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ldGhlcmV1bS93ZWIzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGtCQUFrQjtBQUNNO0FBRXhCLElBQUlDLElBQUk7QUFFUixnQ0FBZ0M7QUFDaEMsTUFBTUMsUUFBUSxHQUFHLElBQU07SUFDckIsSUFBSSxLQUF1RSxFQUFFLEVBRzVFLE1BQU07UUFDTCw2REFBNkQ7UUFDN0QsTUFBTUcsUUFBUSxHQUFHLElBQUlMLG1FQUEyQixDQUM5QywrREFBK0QsQ0FDaEU7UUFDRCxPQUFPLElBQUlBLDRDQUFJLENBQUNLLFFBQVEsQ0FBQyxDQUFDO0lBQzVCLENBQUM7QUFDSCxDQUFDO0FBRUQsb0RBQW9EO0FBQzdDLE1BQU1HLE9BQU8sR0FBRyxJQUFNO0lBQzNCLElBQUksQ0FBQ1AsSUFBSSxFQUFFO1FBQ1RBLElBQUksR0FBR0MsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNELE9BQU9ELElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQztBQUVGLGlFQUFlTyxPQUFPLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXNpbmEvLi9ldGhlcmV1bS93ZWIzLmpzPzk2N2MiXSwic291cmNlc0NvbnRlbnQiOlsiLy9ldGhlcmV1bS93ZWIzLmpzXG5pbXBvcnQgV2ViMyBmcm9tICd3ZWIzJztcblxubGV0IHdlYjM7XG5cbi8vIEZ1bmNpw7NuIHBhcmEgaW5pY2lhbGl6YXIgV2ViM1xuY29uc3QgaW5pdFdlYjMgPSAoKSA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LmV0aGVyZXVtICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIFdlIGFyZSBpbiB0aGUgYnJvd3NlciBhbmQgTWV0YU1hc2sgaXMgcnVubmluZy5cbiAgICByZXR1cm4gbmV3IFdlYjMod2luZG93LmV0aGVyZXVtKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBXZSBhcmUgb24gdGhlIHNlcnZlciAqT1IqIHRoZSB1c2VyIGlzIG5vdCBydW5uaW5nIE1ldGFNYXNrXG4gICAgY29uc3QgcHJvdmlkZXIgPSBuZXcgV2ViMy5wcm92aWRlcnMuSHR0cFByb3ZpZGVyKFxuICAgICAgXCJodHRwczovL3NlcG9saWEuaW5mdXJhLmlvL3YzL2U2MmRlYTkyMjAyNjQ2OTdhNDkxZGRlYTZiMjQ4YTM1XCJcbiAgICApO1xuICAgIHJldHVybiBuZXcgV2ViMyhwcm92aWRlcik7XG4gIH1cbn07XG5cbi8vIEV4cG9ydGEgdW5hIGZ1bmNpw7NuIHF1ZSBpbmljaWFsaXphIFdlYjMgYSBkZW1hbmRhXG5leHBvcnQgY29uc3QgZ2V0V2ViMyA9ICgpID0+IHtcbiAgaWYgKCF3ZWIzKSB7XG4gICAgd2ViMyA9IGluaXRXZWIzKCk7XG4gIH1cbiAgcmV0dXJuIHdlYjM7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXRXZWIzOyJdLCJuYW1lcyI6WyJXZWIzIiwid2ViMyIsImluaXRXZWIzIiwid2luZG93IiwiZXRoZXJldW0iLCJwcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciIsImdldFdlYjMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./ethereum/web3.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _contexts_Web3Context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../contexts/Web3Context */ \"./contexts/Web3Context.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_contexts_Web3Context__WEBPACK_IMPORTED_MODULE_1__]);\n_contexts_Web3Context__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// pages/_app.js\n\n\nfunction MyApp({ Component , pageProps  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_Web3Context__WEBPACK_IMPORTED_MODULE_1__.Web3Provider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/Users/misaelguzmangutierrez/Downloads/tesina 2/pages/_app.js\",\n            lineNumber: 7,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/misaelguzmangutierrez/Downloads/tesina 2/pages/_app.js\",\n        lineNumber: 6,\n        columnNumber: 9\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxnQkFBZ0I7QUFDaEI7QUFBdUQ7QUFFdkQsU0FBU0MsS0FBSyxDQUFDLEVBQUVDLFNBQVMsR0FBRUMsU0FBUyxHQUFFLEVBQUU7SUFDckMscUJBQ0ksOERBQUNILCtEQUFZO2tCQUNULDRFQUFDRSxTQUFTO1lBQUUsR0FBR0MsU0FBUzs7Ozs7Z0JBQUk7Ozs7O1lBQ2pCLENBQ2pCO0FBQ04sQ0FBQztBQUVELGlFQUFlRixLQUFLLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXNpbmEvLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvX2FwcC5qc1xuaW1wb3J0IHsgV2ViM1Byb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dHMvV2ViM0NvbnRleHQnO1xuXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8V2ViM1Byb3ZpZGVyPlxuICAgICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgICA8L1dlYjNQcm92aWRlcj5cbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcbiJdLCJuYW1lcyI6WyJXZWIzUHJvdmlkZXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "web3":
/*!***********************!*\
  !*** external "web3" ***!
  \***********************/
/***/ ((module) => {

module.exports = import("web3");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();