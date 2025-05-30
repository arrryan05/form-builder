import {
  Link,
  Outlet
} from "/build/_shared/chunk-SEBFG7SO.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-VNQCXQXQ.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/dashboard.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\dashboard.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\dashboard.tsx"
  );
  import.meta.hot.lastModified = "1748546897498.683";
}
function Dashboard() {
  _s();
  const [ids, setIds] = (0, import_react.useState)([]);
  (0, import_react.useEffect)(() => {
    const list = JSON.parse(localStorage.getItem("form-ids") || "[]");
    setIds(list);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 max-w-2xl mx-auto space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold", children: "My Forms" }, void 0, false, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 33,
      columnNumber: 7
    }, this),
    ids.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "No forms created yet." }, void 0, false, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 35,
      columnNumber: 27
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "space-y-2", children: ids.map((id) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "border rounded p-3 flex justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
        "Form ID: ",
        id
      ] }, void 0, true, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 37,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/forms/${id}`, className: "text-blue-600 underline", children: "Fill View" }, void 0, false, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 39,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/dashboard/forms/${id}/responses`, className: "text-green-600 underline", children: "View Responses" }, void 0, false, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 42,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 38,
        columnNumber: 15
      }, this)
    ] }, id, true, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 36,
      columnNumber: 26
    }, this)) }, void 0, false, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 35,
      columnNumber: 58
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 50,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 32,
    columnNumber: 10
  }, this);
}
_s(Dashboard, "EnfQASC+5WpWlxgwezrX3rKK9FY=");
_c = Dashboard;
var _c;
$RefreshReg$(_c, "Dashboard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Dashboard as default
};
//# sourceMappingURL=/build/routes/dashboard-HQDEQ4TQ.js.map
