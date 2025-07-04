import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  createHotContext
} from "/build/_shared/chunk-VNQCXQXQ.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  require_react_dom
} from "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/_index.tsx
var import_react11 = __toESM(require_react(), 1);

// node_modules/@dnd-kit/core/dist/core.esm.js
var import_react3 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// node_modules/@dnd-kit/utilities/dist/utilities.esm.js
var import_react = __toESM(require_react());
function useCombinedRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }
  return (0, import_react.useMemo)(
    () => (node) => {
      refs.forEach((ref) => ref(node));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}
var canUseDOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function isWindow(element) {
  const elementString = Object.prototype.toString.call(element);
  return elementString === "[object Window]" || // In Electron context the Window object serializes to [object global]
  elementString === "[object global]";
}
function isNode(node) {
  return "nodeType" in node;
}
function getWindow(target) {
  var _target$ownerDocument, _target$ownerDocument2;
  if (!target) {
    return window;
  }
  if (isWindow(target)) {
    return target;
  }
  if (!isNode(target)) {
    return window;
  }
  return (_target$ownerDocument = (_target$ownerDocument2 = target.ownerDocument) == null ? void 0 : _target$ownerDocument2.defaultView) != null ? _target$ownerDocument : window;
}
function isDocument(node) {
  const {
    Document
  } = getWindow(node);
  return node instanceof Document;
}
function isHTMLElement(node) {
  if (isWindow(node)) {
    return false;
  }
  return node instanceof getWindow(node).HTMLElement;
}
function isSVGElement(node) {
  return node instanceof getWindow(node).SVGElement;
}
function getOwnerDocument(target) {
  if (!target) {
    return document;
  }
  if (isWindow(target)) {
    return target.document;
  }
  if (!isNode(target)) {
    return document;
  }
  if (isDocument(target)) {
    return target;
  }
  if (isHTMLElement(target) || isSVGElement(target)) {
    return target.ownerDocument;
  }
  return document;
}
var useIsomorphicLayoutEffect = canUseDOM ? import_react.useLayoutEffect : import_react.useEffect;
function useEvent(handler) {
  const handlerRef = (0, import_react.useRef)(handler);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });
  return (0, import_react.useCallback)(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return handlerRef.current == null ? void 0 : handlerRef.current(...args);
  }, []);
}
function useInterval() {
  const intervalRef = (0, import_react.useRef)(null);
  const set = (0, import_react.useCallback)((listener, duration) => {
    intervalRef.current = setInterval(listener, duration);
  }, []);
  const clear = (0, import_react.useCallback)(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  return [set, clear];
}
function useLatestValue(value, dependencies) {
  if (dependencies === void 0) {
    dependencies = [value];
  }
  const valueRef = (0, import_react.useRef)(value);
  useIsomorphicLayoutEffect(() => {
    if (valueRef.current !== value) {
      valueRef.current = value;
    }
  }, dependencies);
  return valueRef;
}
function useLazyMemo(callback, dependencies) {
  const valueRef = (0, import_react.useRef)();
  return (0, import_react.useMemo)(
    () => {
      const newValue = callback(valueRef.current);
      valueRef.current = newValue;
      return newValue;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...dependencies]
  );
}
function useNodeRef(onChange) {
  const onChangeHandler = useEvent(onChange);
  const node = (0, import_react.useRef)(null);
  const setNodeRef = (0, import_react.useCallback)(
    (element) => {
      if (element !== node.current) {
        onChangeHandler == null ? void 0 : onChangeHandler(element, node.current);
      }
      node.current = element;
    },
    //eslint-disable-next-line
    []
  );
  return [node, setNodeRef];
}
function usePrevious(value) {
  const ref = (0, import_react.useRef)();
  (0, import_react.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
var ids = {};
function useUniqueId(prefix, value) {
  return (0, import_react.useMemo)(() => {
    if (value) {
      return value;
    }
    const id = ids[prefix] == null ? 0 : ids[prefix] + 1;
    ids[prefix] = id;
    return prefix + "-" + id;
  }, [prefix, value]);
}
function createAdjustmentFn(modifier) {
  return function(object) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }
    return adjustments.reduce((accumulator, adjustment) => {
      const entries = Object.entries(adjustment);
      for (const [key2, valueAdjustment] of entries) {
        const value = accumulator[key2];
        if (value != null) {
          accumulator[key2] = value + modifier * valueAdjustment;
        }
      }
      return accumulator;
    }, {
      ...object
    });
  };
}
var add = /* @__PURE__ */ createAdjustmentFn(1);
var subtract = /* @__PURE__ */ createAdjustmentFn(-1);
function hasViewportRelativeCoordinates(event) {
  return "clientX" in event && "clientY" in event;
}
function isKeyboardEvent(event) {
  if (!event) {
    return false;
  }
  const {
    KeyboardEvent
  } = getWindow(event.target);
  return KeyboardEvent && event instanceof KeyboardEvent;
}
function isTouchEvent(event) {
  if (!event) {
    return false;
  }
  const {
    TouchEvent
  } = getWindow(event.target);
  return TouchEvent && event instanceof TouchEvent;
}
function getEventCoordinates(event) {
  if (isTouchEvent(event)) {
    if (event.touches && event.touches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.touches[0];
      return {
        x,
        y
      };
    } else if (event.changedTouches && event.changedTouches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.changedTouches[0];
      return {
        x,
        y
      };
    }
  }
  if (hasViewportRelativeCoordinates(event)) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }
  return null;
}
var CSS = /* @__PURE__ */ Object.freeze({
  Translate: {
    toString(transform) {
      if (!transform) {
        return;
      }
      const {
        x,
        y
      } = transform;
      return "translate3d(" + (x ? Math.round(x) : 0) + "px, " + (y ? Math.round(y) : 0) + "px, 0)";
    }
  },
  Scale: {
    toString(transform) {
      if (!transform) {
        return;
      }
      const {
        scaleX,
        scaleY
      } = transform;
      return "scaleX(" + scaleX + ") scaleY(" + scaleY + ")";
    }
  },
  Transform: {
    toString(transform) {
      if (!transform) {
        return;
      }
      return [CSS.Translate.toString(transform), CSS.Scale.toString(transform)].join(" ");
    }
  },
  Transition: {
    toString(_ref) {
      let {
        property,
        duration,
        easing
      } = _ref;
      return property + " " + duration + "ms " + easing;
    }
  }
});
var SELECTOR = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
function findFirstFocusableNode(element) {
  if (element.matches(SELECTOR)) {
    return element;
  }
  return element.querySelector(SELECTOR);
}

// node_modules/@dnd-kit/accessibility/dist/accessibility.esm.js
var import_react2 = __toESM(require_react());
var hiddenStyles = {
  display: "none"
};
function HiddenText(_ref) {
  let {
    id,
    value
  } = _ref;
  return import_react2.default.createElement("div", {
    id,
    style: hiddenStyles
  }, value);
}
function LiveRegion(_ref) {
  let {
    id,
    announcement,
    ariaLiveType = "assertive"
  } = _ref;
  const visuallyHidden = {
    position: "fixed",
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(100%)",
    whiteSpace: "nowrap"
  };
  return import_react2.default.createElement("div", {
    id,
    style: visuallyHidden,
    role: "status",
    "aria-live": ariaLiveType,
    "aria-atomic": true
  }, announcement);
}
function useAnnouncement() {
  const [announcement, setAnnouncement] = (0, import_react2.useState)("");
  const announce = (0, import_react2.useCallback)((value) => {
    if (value != null) {
      setAnnouncement(value);
    }
  }, []);
  return {
    announce,
    announcement
  };
}

// node_modules/@dnd-kit/core/dist/core.esm.js
var DndMonitorContext = /* @__PURE__ */ (0, import_react3.createContext)(null);
function useDndMonitor(listener) {
  const registerListener = (0, import_react3.useContext)(DndMonitorContext);
  (0, import_react3.useEffect)(() => {
    if (!registerListener) {
      throw new Error("useDndMonitor must be used within a children of <DndContext>");
    }
    const unsubscribe = registerListener(listener);
    return unsubscribe;
  }, [listener, registerListener]);
}
function useDndMonitorProvider() {
  const [listeners] = (0, import_react3.useState)(() => /* @__PURE__ */ new Set());
  const registerListener = (0, import_react3.useCallback)((listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, [listeners]);
  const dispatch = (0, import_react3.useCallback)((_ref) => {
    let {
      type,
      event
    } = _ref;
    listeners.forEach((listener) => {
      var _listener$type;
      return (_listener$type = listener[type]) == null ? void 0 : _listener$type.call(listener, event);
    });
  }, [listeners]);
  return [dispatch, registerListener];
}
var defaultScreenReaderInstructions = {
  draggable: "\n    To pick up a draggable item, press the space bar.\n    While dragging, use the arrow keys to move the item.\n    Press space again to drop the item in its new position, or press escape to cancel.\n  "
};
var defaultAnnouncements = {
  onDragStart(_ref) {
    let {
      active
    } = _ref;
    return "Picked up draggable item " + active.id + ".";
  },
  onDragOver(_ref2) {
    let {
      active,
      over
    } = _ref2;
    if (over) {
      return "Draggable item " + active.id + " was moved over droppable area " + over.id + ".";
    }
    return "Draggable item " + active.id + " is no longer over a droppable area.";
  },
  onDragEnd(_ref3) {
    let {
      active,
      over
    } = _ref3;
    if (over) {
      return "Draggable item " + active.id + " was dropped over droppable area " + over.id;
    }
    return "Draggable item " + active.id + " was dropped.";
  },
  onDragCancel(_ref4) {
    let {
      active
    } = _ref4;
    return "Dragging was cancelled. Draggable item " + active.id + " was dropped.";
  }
};
function Accessibility(_ref) {
  let {
    announcements = defaultAnnouncements,
    container,
    hiddenTextDescribedById,
    screenReaderInstructions = defaultScreenReaderInstructions
  } = _ref;
  const {
    announce,
    announcement
  } = useAnnouncement();
  const liveRegionId = useUniqueId("DndLiveRegion");
  const [mounted, setMounted] = (0, import_react3.useState)(false);
  (0, import_react3.useEffect)(() => {
    setMounted(true);
  }, []);
  useDndMonitor((0, import_react3.useMemo)(() => ({
    onDragStart(_ref2) {
      let {
        active
      } = _ref2;
      announce(announcements.onDragStart({
        active
      }));
    },
    onDragMove(_ref3) {
      let {
        active,
        over
      } = _ref3;
      if (announcements.onDragMove) {
        announce(announcements.onDragMove({
          active,
          over
        }));
      }
    },
    onDragOver(_ref4) {
      let {
        active,
        over
      } = _ref4;
      announce(announcements.onDragOver({
        active,
        over
      }));
    },
    onDragEnd(_ref5) {
      let {
        active,
        over
      } = _ref5;
      announce(announcements.onDragEnd({
        active,
        over
      }));
    },
    onDragCancel(_ref6) {
      let {
        active,
        over
      } = _ref6;
      announce(announcements.onDragCancel({
        active,
        over
      }));
    }
  }), [announce, announcements]));
  if (!mounted) {
    return null;
  }
  const markup = import_react3.default.createElement(import_react3.default.Fragment, null, import_react3.default.createElement(HiddenText, {
    id: hiddenTextDescribedById,
    value: screenReaderInstructions.draggable
  }), import_react3.default.createElement(LiveRegion, {
    id: liveRegionId,
    announcement
  }));
  return container ? (0, import_react_dom.createPortal)(markup, container) : markup;
}
var Action;
(function(Action2) {
  Action2["DragStart"] = "dragStart";
  Action2["DragMove"] = "dragMove";
  Action2["DragEnd"] = "dragEnd";
  Action2["DragCancel"] = "dragCancel";
  Action2["DragOver"] = "dragOver";
  Action2["RegisterDroppable"] = "registerDroppable";
  Action2["SetDroppableDisabled"] = "setDroppableDisabled";
  Action2["UnregisterDroppable"] = "unregisterDroppable";
})(Action || (Action = {}));
function noop() {
}
function useSensor(sensor, options) {
  return (0, import_react3.useMemo)(
    () => ({
      sensor,
      options: options != null ? options : {}
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sensor, options]
  );
}
function useSensors() {
  for (var _len = arguments.length, sensors = new Array(_len), _key = 0; _key < _len; _key++) {
    sensors[_key] = arguments[_key];
  }
  return (0, import_react3.useMemo)(
    () => [...sensors].filter((sensor) => sensor != null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...sensors]
  );
}
var defaultCoordinates = /* @__PURE__ */ Object.freeze({
  x: 0,
  y: 0
});
function distanceBetween(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
function getRelativeTransformOrigin(event, rect) {
  const eventCoordinates = getEventCoordinates(event);
  if (!eventCoordinates) {
    return "0 0";
  }
  const transformOrigin = {
    x: (eventCoordinates.x - rect.left) / rect.width * 100,
    y: (eventCoordinates.y - rect.top) / rect.height * 100
  };
  return transformOrigin.x + "% " + transformOrigin.y + "%";
}
function sortCollisionsAsc(_ref, _ref2) {
  let {
    data: {
      value: a
    }
  } = _ref;
  let {
    data: {
      value: b
    }
  } = _ref2;
  return a - b;
}
function sortCollisionsDesc(_ref3, _ref4) {
  let {
    data: {
      value: a
    }
  } = _ref3;
  let {
    data: {
      value: b
    }
  } = _ref4;
  return b - a;
}
function getFirstCollision(collisions, property) {
  if (!collisions || collisions.length === 0) {
    return null;
  }
  const [firstCollision] = collisions;
  return property ? firstCollision[property] : firstCollision;
}
function centerOfRectangle(rect, left, top) {
  if (left === void 0) {
    left = rect.left;
  }
  if (top === void 0) {
    top = rect.top;
  }
  return {
    x: left + rect.width * 0.5,
    y: top + rect.height * 0.5
  };
}
var closestCenter = (_ref) => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const centerRect = centerOfRectangle(collisionRect, collisionRect.left, collisionRect.top);
  const collisions = [];
  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);
    if (rect) {
      const distBetween = distanceBetween(centerOfRectangle(rect), centerRect);
      collisions.push({
        id,
        data: {
          droppableContainer,
          value: distBetween
        }
      });
    }
  }
  return collisions.sort(sortCollisionsAsc);
};
function getIntersectionRatio(entry, target) {
  const top = Math.max(target.top, entry.top);
  const left = Math.max(target.left, entry.left);
  const right = Math.min(target.left + target.width, entry.left + entry.width);
  const bottom = Math.min(target.top + target.height, entry.top + entry.height);
  const width = right - left;
  const height = bottom - top;
  if (left < right && top < bottom) {
    const targetArea = target.width * target.height;
    const entryArea = entry.width * entry.height;
    const intersectionArea = width * height;
    const intersectionRatio = intersectionArea / (targetArea + entryArea - intersectionArea);
    return Number(intersectionRatio.toFixed(4));
  }
  return 0;
}
var rectIntersection = (_ref) => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const collisions = [];
  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);
    if (rect) {
      const intersectionRatio = getIntersectionRatio(rect, collisionRect);
      if (intersectionRatio > 0) {
        collisions.push({
          id,
          data: {
            droppableContainer,
            value: intersectionRatio
          }
        });
      }
    }
  }
  return collisions.sort(sortCollisionsDesc);
};
function adjustScale(transform, rect1, rect2) {
  return {
    ...transform,
    scaleX: rect1 && rect2 ? rect1.width / rect2.width : 1,
    scaleY: rect1 && rect2 ? rect1.height / rect2.height : 1
  };
}
function getRectDelta(rect1, rect2) {
  return rect1 && rect2 ? {
    x: rect1.left - rect2.left,
    y: rect1.top - rect2.top
  } : defaultCoordinates;
}
function createRectAdjustmentFn(modifier) {
  return function adjustClientRect(rect) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }
    return adjustments.reduce((acc, adjustment) => ({
      ...acc,
      top: acc.top + modifier * adjustment.y,
      bottom: acc.bottom + modifier * adjustment.y,
      left: acc.left + modifier * adjustment.x,
      right: acc.right + modifier * adjustment.x
    }), {
      ...rect
    });
  };
}
var getAdjustedRect = /* @__PURE__ */ createRectAdjustmentFn(1);
function parseTransform(transform) {
  if (transform.startsWith("matrix3d(")) {
    const transformArray = transform.slice(9, -1).split(/, /);
    return {
      x: +transformArray[12],
      y: +transformArray[13],
      scaleX: +transformArray[0],
      scaleY: +transformArray[5]
    };
  } else if (transform.startsWith("matrix(")) {
    const transformArray = transform.slice(7, -1).split(/, /);
    return {
      x: +transformArray[4],
      y: +transformArray[5],
      scaleX: +transformArray[0],
      scaleY: +transformArray[3]
    };
  }
  return null;
}
function inverseTransform(rect, transform, transformOrigin) {
  const parsedTransform = parseTransform(transform);
  if (!parsedTransform) {
    return rect;
  }
  const {
    scaleX,
    scaleY,
    x: translateX,
    y: translateY
  } = parsedTransform;
  const x = rect.left - translateX - (1 - scaleX) * parseFloat(transformOrigin);
  const y = rect.top - translateY - (1 - scaleY) * parseFloat(transformOrigin.slice(transformOrigin.indexOf(" ") + 1));
  const w = scaleX ? rect.width / scaleX : rect.width;
  const h = scaleY ? rect.height / scaleY : rect.height;
  return {
    width: w,
    height: h,
    top: y,
    right: x + w,
    bottom: y + h,
    left: x
  };
}
var defaultOptions = {
  ignoreTransform: false
};
function getClientRect(element, options) {
  if (options === void 0) {
    options = defaultOptions;
  }
  let rect = element.getBoundingClientRect();
  if (options.ignoreTransform) {
    const {
      transform,
      transformOrigin
    } = getWindow(element).getComputedStyle(element);
    if (transform) {
      rect = inverseTransform(rect, transform, transformOrigin);
    }
  }
  const {
    top,
    left,
    width,
    height,
    bottom,
    right
  } = rect;
  return {
    top,
    left,
    width,
    height,
    bottom,
    right
  };
}
function getTransformAgnosticClientRect(element) {
  return getClientRect(element, {
    ignoreTransform: true
  });
}
function getWindowClientRect(element) {
  const width = element.innerWidth;
  const height = element.innerHeight;
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height
  };
}
function isFixed(node, computedStyle) {
  if (computedStyle === void 0) {
    computedStyle = getWindow(node).getComputedStyle(node);
  }
  return computedStyle.position === "fixed";
}
function isScrollable(element, computedStyle) {
  if (computedStyle === void 0) {
    computedStyle = getWindow(element).getComputedStyle(element);
  }
  const overflowRegex = /(auto|scroll|overlay)/;
  const properties2 = ["overflow", "overflowX", "overflowY"];
  return properties2.some((property) => {
    const value = computedStyle[property];
    return typeof value === "string" ? overflowRegex.test(value) : false;
  });
}
function getScrollableAncestors(element, limit) {
  const scrollParents = [];
  function findScrollableAncestors(node) {
    if (limit != null && scrollParents.length >= limit) {
      return scrollParents;
    }
    if (!node) {
      return scrollParents;
    }
    if (isDocument(node) && node.scrollingElement != null && !scrollParents.includes(node.scrollingElement)) {
      scrollParents.push(node.scrollingElement);
      return scrollParents;
    }
    if (!isHTMLElement(node) || isSVGElement(node)) {
      return scrollParents;
    }
    if (scrollParents.includes(node)) {
      return scrollParents;
    }
    const computedStyle = getWindow(element).getComputedStyle(node);
    if (node !== element) {
      if (isScrollable(node, computedStyle)) {
        scrollParents.push(node);
      }
    }
    if (isFixed(node, computedStyle)) {
      return scrollParents;
    }
    return findScrollableAncestors(node.parentNode);
  }
  if (!element) {
    return scrollParents;
  }
  return findScrollableAncestors(element);
}
function getFirstScrollableAncestor(node) {
  const [firstScrollableAncestor] = getScrollableAncestors(node, 1);
  return firstScrollableAncestor != null ? firstScrollableAncestor : null;
}
function getScrollableElement(element) {
  if (!canUseDOM || !element) {
    return null;
  }
  if (isWindow(element)) {
    return element;
  }
  if (!isNode(element)) {
    return null;
  }
  if (isDocument(element) || element === getOwnerDocument(element).scrollingElement) {
    return window;
  }
  if (isHTMLElement(element)) {
    return element;
  }
  return null;
}
function getScrollXCoordinate(element) {
  if (isWindow(element)) {
    return element.scrollX;
  }
  return element.scrollLeft;
}
function getScrollYCoordinate(element) {
  if (isWindow(element)) {
    return element.scrollY;
  }
  return element.scrollTop;
}
function getScrollCoordinates(element) {
  return {
    x: getScrollXCoordinate(element),
    y: getScrollYCoordinate(element)
  };
}
var Direction;
(function(Direction2) {
  Direction2[Direction2["Forward"] = 1] = "Forward";
  Direction2[Direction2["Backward"] = -1] = "Backward";
})(Direction || (Direction = {}));
function isDocumentScrollingElement(element) {
  if (!canUseDOM || !element) {
    return false;
  }
  return element === document.scrollingElement;
}
function getScrollPosition(scrollingContainer) {
  const minScroll = {
    x: 0,
    y: 0
  };
  const dimensions = isDocumentScrollingElement(scrollingContainer) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: scrollingContainer.clientHeight,
    width: scrollingContainer.clientWidth
  };
  const maxScroll = {
    x: scrollingContainer.scrollWidth - dimensions.width,
    y: scrollingContainer.scrollHeight - dimensions.height
  };
  const isTop = scrollingContainer.scrollTop <= minScroll.y;
  const isLeft = scrollingContainer.scrollLeft <= minScroll.x;
  const isBottom = scrollingContainer.scrollTop >= maxScroll.y;
  const isRight = scrollingContainer.scrollLeft >= maxScroll.x;
  return {
    isTop,
    isLeft,
    isBottom,
    isRight,
    maxScroll,
    minScroll
  };
}
var defaultThreshold = {
  x: 0.2,
  y: 0.2
};
function getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, _ref, acceleration, thresholdPercentage) {
  let {
    top,
    left,
    right,
    bottom
  } = _ref;
  if (acceleration === void 0) {
    acceleration = 10;
  }
  if (thresholdPercentage === void 0) {
    thresholdPercentage = defaultThreshold;
  }
  const {
    isTop,
    isBottom,
    isLeft,
    isRight
  } = getScrollPosition(scrollContainer);
  const direction = {
    x: 0,
    y: 0
  };
  const speed = {
    x: 0,
    y: 0
  };
  const threshold = {
    height: scrollContainerRect.height * thresholdPercentage.y,
    width: scrollContainerRect.width * thresholdPercentage.x
  };
  if (!isTop && top <= scrollContainerRect.top + threshold.height) {
    direction.y = Direction.Backward;
    speed.y = acceleration * Math.abs((scrollContainerRect.top + threshold.height - top) / threshold.height);
  } else if (!isBottom && bottom >= scrollContainerRect.bottom - threshold.height) {
    direction.y = Direction.Forward;
    speed.y = acceleration * Math.abs((scrollContainerRect.bottom - threshold.height - bottom) / threshold.height);
  }
  if (!isRight && right >= scrollContainerRect.right - threshold.width) {
    direction.x = Direction.Forward;
    speed.x = acceleration * Math.abs((scrollContainerRect.right - threshold.width - right) / threshold.width);
  } else if (!isLeft && left <= scrollContainerRect.left + threshold.width) {
    direction.x = Direction.Backward;
    speed.x = acceleration * Math.abs((scrollContainerRect.left + threshold.width - left) / threshold.width);
  }
  return {
    direction,
    speed
  };
}
function getScrollElementRect(element) {
  if (element === document.scrollingElement) {
    const {
      innerWidth,
      innerHeight
    } = window;
    return {
      top: 0,
      left: 0,
      right: innerWidth,
      bottom: innerHeight,
      width: innerWidth,
      height: innerHeight
    };
  }
  const {
    top,
    left,
    right,
    bottom
  } = element.getBoundingClientRect();
  return {
    top,
    left,
    right,
    bottom,
    width: element.clientWidth,
    height: element.clientHeight
  };
}
function getScrollOffsets(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return add(acc, getScrollCoordinates(node));
  }, defaultCoordinates);
}
function getScrollXOffset(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return acc + getScrollXCoordinate(node);
  }, 0);
}
function getScrollYOffset(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return acc + getScrollYCoordinate(node);
  }, 0);
}
function scrollIntoViewIfNeeded(element, measure) {
  if (measure === void 0) {
    measure = getClientRect;
  }
  if (!element) {
    return;
  }
  const {
    top,
    left,
    bottom,
    right
  } = measure(element);
  const firstScrollableAncestor = getFirstScrollableAncestor(element);
  if (!firstScrollableAncestor) {
    return;
  }
  if (bottom <= 0 || right <= 0 || top >= window.innerHeight || left >= window.innerWidth) {
    element.scrollIntoView({
      block: "center",
      inline: "center"
    });
  }
}
var properties = [["x", ["left", "right"], getScrollXOffset], ["y", ["top", "bottom"], getScrollYOffset]];
var Rect = class {
  constructor(rect, element) {
    this.rect = void 0;
    this.width = void 0;
    this.height = void 0;
    this.top = void 0;
    this.bottom = void 0;
    this.right = void 0;
    this.left = void 0;
    const scrollableAncestors = getScrollableAncestors(element);
    const scrollOffsets = getScrollOffsets(scrollableAncestors);
    this.rect = {
      ...rect
    };
    this.width = rect.width;
    this.height = rect.height;
    for (const [axis, keys, getScrollOffset] of properties) {
      for (const key2 of keys) {
        Object.defineProperty(this, key2, {
          get: () => {
            const currentOffsets = getScrollOffset(scrollableAncestors);
            const scrollOffsetsDeltla = scrollOffsets[axis] - currentOffsets;
            return this.rect[key2] + scrollOffsetsDeltla;
          },
          enumerable: true
        });
      }
    }
    Object.defineProperty(this, "rect", {
      enumerable: false
    });
  }
};
var Listeners = class {
  constructor(target) {
    this.target = void 0;
    this.listeners = [];
    this.removeAll = () => {
      this.listeners.forEach((listener) => {
        var _this$target;
        return (_this$target = this.target) == null ? void 0 : _this$target.removeEventListener(...listener);
      });
    };
    this.target = target;
  }
  add(eventName, handler, options) {
    var _this$target2;
    (_this$target2 = this.target) == null ? void 0 : _this$target2.addEventListener(eventName, handler, options);
    this.listeners.push([eventName, handler, options]);
  }
};
function getEventListenerTarget(target) {
  const {
    EventTarget
  } = getWindow(target);
  return target instanceof EventTarget ? target : getOwnerDocument(target);
}
function hasExceededDistance(delta, measurement) {
  const dx = Math.abs(delta.x);
  const dy = Math.abs(delta.y);
  if (typeof measurement === "number") {
    return Math.sqrt(dx ** 2 + dy ** 2) > measurement;
  }
  if ("x" in measurement && "y" in measurement) {
    return dx > measurement.x && dy > measurement.y;
  }
  if ("x" in measurement) {
    return dx > measurement.x;
  }
  if ("y" in measurement) {
    return dy > measurement.y;
  }
  return false;
}
var EventName;
(function(EventName2) {
  EventName2["Click"] = "click";
  EventName2["DragStart"] = "dragstart";
  EventName2["Keydown"] = "keydown";
  EventName2["ContextMenu"] = "contextmenu";
  EventName2["Resize"] = "resize";
  EventName2["SelectionChange"] = "selectionchange";
  EventName2["VisibilityChange"] = "visibilitychange";
})(EventName || (EventName = {}));
function preventDefault(event) {
  event.preventDefault();
}
function stopPropagation(event) {
  event.stopPropagation();
}
var KeyboardCode;
(function(KeyboardCode2) {
  KeyboardCode2["Space"] = "Space";
  KeyboardCode2["Down"] = "ArrowDown";
  KeyboardCode2["Right"] = "ArrowRight";
  KeyboardCode2["Left"] = "ArrowLeft";
  KeyboardCode2["Up"] = "ArrowUp";
  KeyboardCode2["Esc"] = "Escape";
  KeyboardCode2["Enter"] = "Enter";
  KeyboardCode2["Tab"] = "Tab";
})(KeyboardCode || (KeyboardCode = {}));
var defaultKeyboardCodes = {
  start: [KeyboardCode.Space, KeyboardCode.Enter],
  cancel: [KeyboardCode.Esc],
  end: [KeyboardCode.Space, KeyboardCode.Enter, KeyboardCode.Tab]
};
var defaultKeyboardCoordinateGetter = (event, _ref) => {
  let {
    currentCoordinates
  } = _ref;
  switch (event.code) {
    case KeyboardCode.Right:
      return {
        ...currentCoordinates,
        x: currentCoordinates.x + 25
      };
    case KeyboardCode.Left:
      return {
        ...currentCoordinates,
        x: currentCoordinates.x - 25
      };
    case KeyboardCode.Down:
      return {
        ...currentCoordinates,
        y: currentCoordinates.y + 25
      };
    case KeyboardCode.Up:
      return {
        ...currentCoordinates,
        y: currentCoordinates.y - 25
      };
  }
  return void 0;
};
var KeyboardSensor = class {
  constructor(props) {
    this.props = void 0;
    this.autoScrollEnabled = false;
    this.referenceCoordinates = void 0;
    this.listeners = void 0;
    this.windowListeners = void 0;
    this.props = props;
    const {
      event: {
        target
      }
    } = props;
    this.props = props;
    this.listeners = new Listeners(getOwnerDocument(target));
    this.windowListeners = new Listeners(getWindow(target));
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.attach();
  }
  attach() {
    this.handleStart();
    this.windowListeners.add(EventName.Resize, this.handleCancel);
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
    setTimeout(() => this.listeners.add(EventName.Keydown, this.handleKeyDown));
  }
  handleStart() {
    const {
      activeNode,
      onStart
    } = this.props;
    const node = activeNode.node.current;
    if (node) {
      scrollIntoViewIfNeeded(node);
    }
    onStart(defaultCoordinates);
  }
  handleKeyDown(event) {
    if (isKeyboardEvent(event)) {
      const {
        active,
        context,
        options
      } = this.props;
      const {
        keyboardCodes = defaultKeyboardCodes,
        coordinateGetter = defaultKeyboardCoordinateGetter,
        scrollBehavior = "smooth"
      } = options;
      const {
        code
      } = event;
      if (keyboardCodes.end.includes(code)) {
        this.handleEnd(event);
        return;
      }
      if (keyboardCodes.cancel.includes(code)) {
        this.handleCancel(event);
        return;
      }
      const {
        collisionRect
      } = context.current;
      const currentCoordinates = collisionRect ? {
        x: collisionRect.left,
        y: collisionRect.top
      } : defaultCoordinates;
      if (!this.referenceCoordinates) {
        this.referenceCoordinates = currentCoordinates;
      }
      const newCoordinates = coordinateGetter(event, {
        active,
        context: context.current,
        currentCoordinates
      });
      if (newCoordinates) {
        const coordinatesDelta = subtract(newCoordinates, currentCoordinates);
        const scrollDelta = {
          x: 0,
          y: 0
        };
        const {
          scrollableAncestors
        } = context.current;
        for (const scrollContainer of scrollableAncestors) {
          const direction = event.code;
          const {
            isTop,
            isRight,
            isLeft,
            isBottom,
            maxScroll,
            minScroll
          } = getScrollPosition(scrollContainer);
          const scrollElementRect = getScrollElementRect(scrollContainer);
          const clampedCoordinates = {
            x: Math.min(direction === KeyboardCode.Right ? scrollElementRect.right - scrollElementRect.width / 2 : scrollElementRect.right, Math.max(direction === KeyboardCode.Right ? scrollElementRect.left : scrollElementRect.left + scrollElementRect.width / 2, newCoordinates.x)),
            y: Math.min(direction === KeyboardCode.Down ? scrollElementRect.bottom - scrollElementRect.height / 2 : scrollElementRect.bottom, Math.max(direction === KeyboardCode.Down ? scrollElementRect.top : scrollElementRect.top + scrollElementRect.height / 2, newCoordinates.y))
          };
          const canScrollX = direction === KeyboardCode.Right && !isRight || direction === KeyboardCode.Left && !isLeft;
          const canScrollY = direction === KeyboardCode.Down && !isBottom || direction === KeyboardCode.Up && !isTop;
          if (canScrollX && clampedCoordinates.x !== newCoordinates.x) {
            const newScrollCoordinates = scrollContainer.scrollLeft + coordinatesDelta.x;
            const canScrollToNewCoordinates = direction === KeyboardCode.Right && newScrollCoordinates <= maxScroll.x || direction === KeyboardCode.Left && newScrollCoordinates >= minScroll.x;
            if (canScrollToNewCoordinates && !coordinatesDelta.y) {
              scrollContainer.scrollTo({
                left: newScrollCoordinates,
                behavior: scrollBehavior
              });
              return;
            }
            if (canScrollToNewCoordinates) {
              scrollDelta.x = scrollContainer.scrollLeft - newScrollCoordinates;
            } else {
              scrollDelta.x = direction === KeyboardCode.Right ? scrollContainer.scrollLeft - maxScroll.x : scrollContainer.scrollLeft - minScroll.x;
            }
            if (scrollDelta.x) {
              scrollContainer.scrollBy({
                left: -scrollDelta.x,
                behavior: scrollBehavior
              });
            }
            break;
          } else if (canScrollY && clampedCoordinates.y !== newCoordinates.y) {
            const newScrollCoordinates = scrollContainer.scrollTop + coordinatesDelta.y;
            const canScrollToNewCoordinates = direction === KeyboardCode.Down && newScrollCoordinates <= maxScroll.y || direction === KeyboardCode.Up && newScrollCoordinates >= minScroll.y;
            if (canScrollToNewCoordinates && !coordinatesDelta.x) {
              scrollContainer.scrollTo({
                top: newScrollCoordinates,
                behavior: scrollBehavior
              });
              return;
            }
            if (canScrollToNewCoordinates) {
              scrollDelta.y = scrollContainer.scrollTop - newScrollCoordinates;
            } else {
              scrollDelta.y = direction === KeyboardCode.Down ? scrollContainer.scrollTop - maxScroll.y : scrollContainer.scrollTop - minScroll.y;
            }
            if (scrollDelta.y) {
              scrollContainer.scrollBy({
                top: -scrollDelta.y,
                behavior: scrollBehavior
              });
            }
            break;
          }
        }
        this.handleMove(event, add(subtract(newCoordinates, this.referenceCoordinates), scrollDelta));
      }
    }
  }
  handleMove(event, coordinates) {
    const {
      onMove
    } = this.props;
    event.preventDefault();
    onMove(coordinates);
  }
  handleEnd(event) {
    const {
      onEnd
    } = this.props;
    event.preventDefault();
    this.detach();
    onEnd();
  }
  handleCancel(event) {
    const {
      onCancel
    } = this.props;
    event.preventDefault();
    this.detach();
    onCancel();
  }
  detach() {
    this.listeners.removeAll();
    this.windowListeners.removeAll();
  }
};
KeyboardSensor.activators = [{
  eventName: "onKeyDown",
  handler: (event, _ref, _ref2) => {
    let {
      keyboardCodes = defaultKeyboardCodes,
      onActivation
    } = _ref;
    let {
      active
    } = _ref2;
    const {
      code
    } = event.nativeEvent;
    if (keyboardCodes.start.includes(code)) {
      const activator = active.activatorNode.current;
      if (activator && event.target !== activator) {
        return false;
      }
      event.preventDefault();
      onActivation == null ? void 0 : onActivation({
        event: event.nativeEvent
      });
      return true;
    }
    return false;
  }
}];
function isDistanceConstraint(constraint) {
  return Boolean(constraint && "distance" in constraint);
}
function isDelayConstraint(constraint) {
  return Boolean(constraint && "delay" in constraint);
}
var AbstractPointerSensor = class {
  constructor(props, events2, listenerTarget) {
    var _getEventCoordinates;
    if (listenerTarget === void 0) {
      listenerTarget = getEventListenerTarget(props.event.target);
    }
    this.props = void 0;
    this.events = void 0;
    this.autoScrollEnabled = true;
    this.document = void 0;
    this.activated = false;
    this.initialCoordinates = void 0;
    this.timeoutId = null;
    this.listeners = void 0;
    this.documentListeners = void 0;
    this.windowListeners = void 0;
    this.props = props;
    this.events = events2;
    const {
      event
    } = props;
    const {
      target
    } = event;
    this.props = props;
    this.events = events2;
    this.document = getOwnerDocument(target);
    this.documentListeners = new Listeners(this.document);
    this.listeners = new Listeners(listenerTarget);
    this.windowListeners = new Listeners(getWindow(target));
    this.initialCoordinates = (_getEventCoordinates = getEventCoordinates(event)) != null ? _getEventCoordinates : defaultCoordinates;
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.removeTextSelection = this.removeTextSelection.bind(this);
    this.attach();
  }
  attach() {
    const {
      events: events2,
      props: {
        options: {
          activationConstraint,
          bypassActivationConstraint
        }
      }
    } = this;
    this.listeners.add(events2.move.name, this.handleMove, {
      passive: false
    });
    this.listeners.add(events2.end.name, this.handleEnd);
    if (events2.cancel) {
      this.listeners.add(events2.cancel.name, this.handleCancel);
    }
    this.windowListeners.add(EventName.Resize, this.handleCancel);
    this.windowListeners.add(EventName.DragStart, preventDefault);
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
    this.windowListeners.add(EventName.ContextMenu, preventDefault);
    this.documentListeners.add(EventName.Keydown, this.handleKeydown);
    if (activationConstraint) {
      if (bypassActivationConstraint != null && bypassActivationConstraint({
        event: this.props.event,
        activeNode: this.props.activeNode,
        options: this.props.options
      })) {
        return this.handleStart();
      }
      if (isDelayConstraint(activationConstraint)) {
        this.timeoutId = setTimeout(this.handleStart, activationConstraint.delay);
        this.handlePending(activationConstraint);
        return;
      }
      if (isDistanceConstraint(activationConstraint)) {
        this.handlePending(activationConstraint);
        return;
      }
    }
    this.handleStart();
  }
  detach() {
    this.listeners.removeAll();
    this.windowListeners.removeAll();
    setTimeout(this.documentListeners.removeAll, 50);
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
  handlePending(constraint, offset) {
    const {
      active,
      onPending
    } = this.props;
    onPending(active, constraint, this.initialCoordinates, offset);
  }
  handleStart() {
    const {
      initialCoordinates
    } = this;
    const {
      onStart
    } = this.props;
    if (initialCoordinates) {
      this.activated = true;
      this.documentListeners.add(EventName.Click, stopPropagation, {
        capture: true
      });
      this.removeTextSelection();
      this.documentListeners.add(EventName.SelectionChange, this.removeTextSelection);
      onStart(initialCoordinates);
    }
  }
  handleMove(event) {
    var _getEventCoordinates2;
    const {
      activated,
      initialCoordinates,
      props
    } = this;
    const {
      onMove,
      options: {
        activationConstraint
      }
    } = props;
    if (!initialCoordinates) {
      return;
    }
    const coordinates = (_getEventCoordinates2 = getEventCoordinates(event)) != null ? _getEventCoordinates2 : defaultCoordinates;
    const delta = subtract(initialCoordinates, coordinates);
    if (!activated && activationConstraint) {
      if (isDistanceConstraint(activationConstraint)) {
        if (activationConstraint.tolerance != null && hasExceededDistance(delta, activationConstraint.tolerance)) {
          return this.handleCancel();
        }
        if (hasExceededDistance(delta, activationConstraint.distance)) {
          return this.handleStart();
        }
      }
      if (isDelayConstraint(activationConstraint)) {
        if (hasExceededDistance(delta, activationConstraint.tolerance)) {
          return this.handleCancel();
        }
      }
      this.handlePending(activationConstraint, delta);
      return;
    }
    if (event.cancelable) {
      event.preventDefault();
    }
    onMove(coordinates);
  }
  handleEnd() {
    const {
      onAbort,
      onEnd
    } = this.props;
    this.detach();
    if (!this.activated) {
      onAbort(this.props.active);
    }
    onEnd();
  }
  handleCancel() {
    const {
      onAbort,
      onCancel
    } = this.props;
    this.detach();
    if (!this.activated) {
      onAbort(this.props.active);
    }
    onCancel();
  }
  handleKeydown(event) {
    if (event.code === KeyboardCode.Esc) {
      this.handleCancel();
    }
  }
  removeTextSelection() {
    var _this$document$getSel;
    (_this$document$getSel = this.document.getSelection()) == null ? void 0 : _this$document$getSel.removeAllRanges();
  }
};
var events = {
  cancel: {
    name: "pointercancel"
  },
  move: {
    name: "pointermove"
  },
  end: {
    name: "pointerup"
  }
};
var PointerSensor = class extends AbstractPointerSensor {
  constructor(props) {
    const {
      event
    } = props;
    const listenerTarget = getOwnerDocument(event.target);
    super(props, events, listenerTarget);
  }
};
PointerSensor.activators = [{
  eventName: "onPointerDown",
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    if (!event.isPrimary || event.button !== 0) {
      return false;
    }
    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];
var events$1 = {
  move: {
    name: "mousemove"
  },
  end: {
    name: "mouseup"
  }
};
var MouseButton;
(function(MouseButton2) {
  MouseButton2[MouseButton2["RightClick"] = 2] = "RightClick";
})(MouseButton || (MouseButton = {}));
var MouseSensor = class extends AbstractPointerSensor {
  constructor(props) {
    super(props, events$1, getOwnerDocument(props.event.target));
  }
};
MouseSensor.activators = [{
  eventName: "onMouseDown",
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    if (event.button === MouseButton.RightClick) {
      return false;
    }
    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];
var events$2 = {
  cancel: {
    name: "touchcancel"
  },
  move: {
    name: "touchmove"
  },
  end: {
    name: "touchend"
  }
};
var TouchSensor = class extends AbstractPointerSensor {
  constructor(props) {
    super(props, events$2);
  }
  static setup() {
    window.addEventListener(events$2.move.name, noop2, {
      capture: false,
      passive: false
    });
    return function teardown() {
      window.removeEventListener(events$2.move.name, noop2);
    };
    function noop2() {
    }
  }
};
TouchSensor.activators = [{
  eventName: "onTouchStart",
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    const {
      touches
    } = event;
    if (touches.length > 1) {
      return false;
    }
    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];
var AutoScrollActivator;
(function(AutoScrollActivator2) {
  AutoScrollActivator2[AutoScrollActivator2["Pointer"] = 0] = "Pointer";
  AutoScrollActivator2[AutoScrollActivator2["DraggableRect"] = 1] = "DraggableRect";
})(AutoScrollActivator || (AutoScrollActivator = {}));
var TraversalOrder;
(function(TraversalOrder2) {
  TraversalOrder2[TraversalOrder2["TreeOrder"] = 0] = "TreeOrder";
  TraversalOrder2[TraversalOrder2["ReversedTreeOrder"] = 1] = "ReversedTreeOrder";
})(TraversalOrder || (TraversalOrder = {}));
function useAutoScroller(_ref) {
  let {
    acceleration,
    activator = AutoScrollActivator.Pointer,
    canScroll,
    draggingRect,
    enabled,
    interval = 5,
    order = TraversalOrder.TreeOrder,
    pointerCoordinates,
    scrollableAncestors,
    scrollableAncestorRects,
    delta,
    threshold
  } = _ref;
  const scrollIntent = useScrollIntent({
    delta,
    disabled: !enabled
  });
  const [setAutoScrollInterval, clearAutoScrollInterval] = useInterval();
  const scrollSpeed = (0, import_react3.useRef)({
    x: 0,
    y: 0
  });
  const scrollDirection = (0, import_react3.useRef)({
    x: 0,
    y: 0
  });
  const rect = (0, import_react3.useMemo)(() => {
    switch (activator) {
      case AutoScrollActivator.Pointer:
        return pointerCoordinates ? {
          top: pointerCoordinates.y,
          bottom: pointerCoordinates.y,
          left: pointerCoordinates.x,
          right: pointerCoordinates.x
        } : null;
      case AutoScrollActivator.DraggableRect:
        return draggingRect;
    }
  }, [activator, draggingRect, pointerCoordinates]);
  const scrollContainerRef = (0, import_react3.useRef)(null);
  const autoScroll = (0, import_react3.useCallback)(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }
    const scrollLeft = scrollSpeed.current.x * scrollDirection.current.x;
    const scrollTop = scrollSpeed.current.y * scrollDirection.current.y;
    scrollContainer.scrollBy(scrollLeft, scrollTop);
  }, []);
  const sortedScrollableAncestors = (0, import_react3.useMemo)(() => order === TraversalOrder.TreeOrder ? [...scrollableAncestors].reverse() : scrollableAncestors, [order, scrollableAncestors]);
  (0, import_react3.useEffect)(
    () => {
      if (!enabled || !scrollableAncestors.length || !rect) {
        clearAutoScrollInterval();
        return;
      }
      for (const scrollContainer of sortedScrollableAncestors) {
        if ((canScroll == null ? void 0 : canScroll(scrollContainer)) === false) {
          continue;
        }
        const index = scrollableAncestors.indexOf(scrollContainer);
        const scrollContainerRect = scrollableAncestorRects[index];
        if (!scrollContainerRect) {
          continue;
        }
        const {
          direction,
          speed
        } = getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, rect, acceleration, threshold);
        for (const axis of ["x", "y"]) {
          if (!scrollIntent[axis][direction[axis]]) {
            speed[axis] = 0;
            direction[axis] = 0;
          }
        }
        if (speed.x > 0 || speed.y > 0) {
          clearAutoScrollInterval();
          scrollContainerRef.current = scrollContainer;
          setAutoScrollInterval(autoScroll, interval);
          scrollSpeed.current = speed;
          scrollDirection.current = direction;
          return;
        }
      }
      scrollSpeed.current = {
        x: 0,
        y: 0
      };
      scrollDirection.current = {
        x: 0,
        y: 0
      };
      clearAutoScrollInterval();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      acceleration,
      autoScroll,
      canScroll,
      clearAutoScrollInterval,
      enabled,
      interval,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(rect),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(scrollIntent),
      setAutoScrollInterval,
      scrollableAncestors,
      sortedScrollableAncestors,
      scrollableAncestorRects,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(threshold)
    ]
  );
}
var defaultScrollIntent = {
  x: {
    [Direction.Backward]: false,
    [Direction.Forward]: false
  },
  y: {
    [Direction.Backward]: false,
    [Direction.Forward]: false
  }
};
function useScrollIntent(_ref2) {
  let {
    delta,
    disabled
  } = _ref2;
  const previousDelta = usePrevious(delta);
  return useLazyMemo((previousIntent) => {
    if (disabled || !previousDelta || !previousIntent) {
      return defaultScrollIntent;
    }
    const direction = {
      x: Math.sign(delta.x - previousDelta.x),
      y: Math.sign(delta.y - previousDelta.y)
    };
    return {
      x: {
        [Direction.Backward]: previousIntent.x[Direction.Backward] || direction.x === -1,
        [Direction.Forward]: previousIntent.x[Direction.Forward] || direction.x === 1
      },
      y: {
        [Direction.Backward]: previousIntent.y[Direction.Backward] || direction.y === -1,
        [Direction.Forward]: previousIntent.y[Direction.Forward] || direction.y === 1
      }
    };
  }, [disabled, delta, previousDelta]);
}
function useCachedNode(draggableNodes, id) {
  const draggableNode = id != null ? draggableNodes.get(id) : void 0;
  const node = draggableNode ? draggableNode.node.current : null;
  return useLazyMemo((cachedNode) => {
    var _ref;
    if (id == null) {
      return null;
    }
    return (_ref = node != null ? node : cachedNode) != null ? _ref : null;
  }, [node, id]);
}
function useCombineActivators(sensors, getSyntheticHandler) {
  return (0, import_react3.useMemo)(() => sensors.reduce((accumulator, sensor) => {
    const {
      sensor: Sensor
    } = sensor;
    const sensorActivators = Sensor.activators.map((activator) => ({
      eventName: activator.eventName,
      handler: getSyntheticHandler(activator.handler, sensor)
    }));
    return [...accumulator, ...sensorActivators];
  }, []), [sensors, getSyntheticHandler]);
}
var MeasuringStrategy;
(function(MeasuringStrategy2) {
  MeasuringStrategy2[MeasuringStrategy2["Always"] = 0] = "Always";
  MeasuringStrategy2[MeasuringStrategy2["BeforeDragging"] = 1] = "BeforeDragging";
  MeasuringStrategy2[MeasuringStrategy2["WhileDragging"] = 2] = "WhileDragging";
})(MeasuringStrategy || (MeasuringStrategy = {}));
var MeasuringFrequency;
(function(MeasuringFrequency2) {
  MeasuringFrequency2["Optimized"] = "optimized";
})(MeasuringFrequency || (MeasuringFrequency = {}));
var defaultValue = /* @__PURE__ */ new Map();
function useDroppableMeasuring(containers, _ref) {
  let {
    dragging,
    dependencies,
    config
  } = _ref;
  const [queue, setQueue] = (0, import_react3.useState)(null);
  const {
    frequency,
    measure,
    strategy
  } = config;
  const containersRef = (0, import_react3.useRef)(containers);
  const disabled = isDisabled();
  const disabledRef = useLatestValue(disabled);
  const measureDroppableContainers = (0, import_react3.useCallback)(function(ids2) {
    if (ids2 === void 0) {
      ids2 = [];
    }
    if (disabledRef.current) {
      return;
    }
    setQueue((value) => {
      if (value === null) {
        return ids2;
      }
      return value.concat(ids2.filter((id) => !value.includes(id)));
    });
  }, [disabledRef]);
  const timeoutId = (0, import_react3.useRef)(null);
  const droppableRects = useLazyMemo((previousValue) => {
    if (disabled && !dragging) {
      return defaultValue;
    }
    if (!previousValue || previousValue === defaultValue || containersRef.current !== containers || queue != null) {
      const map = /* @__PURE__ */ new Map();
      for (let container of containers) {
        if (!container) {
          continue;
        }
        if (queue && queue.length > 0 && !queue.includes(container.id) && container.rect.current) {
          map.set(container.id, container.rect.current);
          continue;
        }
        const node = container.node.current;
        const rect = node ? new Rect(measure(node), node) : null;
        container.rect.current = rect;
        if (rect) {
          map.set(container.id, rect);
        }
      }
      return map;
    }
    return previousValue;
  }, [containers, queue, dragging, disabled, measure]);
  (0, import_react3.useEffect)(() => {
    containersRef.current = containers;
  }, [containers]);
  (0, import_react3.useEffect)(
    () => {
      if (disabled) {
        return;
      }
      measureDroppableContainers();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dragging, disabled]
  );
  (0, import_react3.useEffect)(
    () => {
      if (queue && queue.length > 0) {
        setQueue(null);
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(queue)]
  );
  (0, import_react3.useEffect)(
    () => {
      if (disabled || typeof frequency !== "number" || timeoutId.current !== null) {
        return;
      }
      timeoutId.current = setTimeout(() => {
        measureDroppableContainers();
        timeoutId.current = null;
      }, frequency);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [frequency, disabled, measureDroppableContainers, ...dependencies]
  );
  return {
    droppableRects,
    measureDroppableContainers,
    measuringScheduled: queue != null
  };
  function isDisabled() {
    switch (strategy) {
      case MeasuringStrategy.Always:
        return false;
      case MeasuringStrategy.BeforeDragging:
        return dragging;
      default:
        return !dragging;
    }
  }
}
function useInitialValue(value, computeFn) {
  return useLazyMemo((previousValue) => {
    if (!value) {
      return null;
    }
    if (previousValue) {
      return previousValue;
    }
    return typeof computeFn === "function" ? computeFn(value) : value;
  }, [computeFn, value]);
}
function useInitialRect(node, measure) {
  return useInitialValue(node, measure);
}
function useMutationObserver(_ref) {
  let {
    callback,
    disabled
  } = _ref;
  const handleMutations = useEvent(callback);
  const mutationObserver = (0, import_react3.useMemo)(() => {
    if (disabled || typeof window === "undefined" || typeof window.MutationObserver === "undefined") {
      return void 0;
    }
    const {
      MutationObserver
    } = window;
    return new MutationObserver(handleMutations);
  }, [handleMutations, disabled]);
  (0, import_react3.useEffect)(() => {
    return () => mutationObserver == null ? void 0 : mutationObserver.disconnect();
  }, [mutationObserver]);
  return mutationObserver;
}
function useResizeObserver(_ref) {
  let {
    callback,
    disabled
  } = _ref;
  const handleResize = useEvent(callback);
  const resizeObserver = (0, import_react3.useMemo)(
    () => {
      if (disabled || typeof window === "undefined" || typeof window.ResizeObserver === "undefined") {
        return void 0;
      }
      const {
        ResizeObserver
      } = window;
      return new ResizeObserver(handleResize);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled]
  );
  (0, import_react3.useEffect)(() => {
    return () => resizeObserver == null ? void 0 : resizeObserver.disconnect();
  }, [resizeObserver]);
  return resizeObserver;
}
function defaultMeasure(element) {
  return new Rect(getClientRect(element), element);
}
function useRect(element, measure, fallbackRect) {
  if (measure === void 0) {
    measure = defaultMeasure;
  }
  const [rect, setRect] = (0, import_react3.useState)(null);
  function measureRect() {
    setRect((currentRect) => {
      if (!element) {
        return null;
      }
      if (element.isConnected === false) {
        var _ref;
        return (_ref = currentRect != null ? currentRect : fallbackRect) != null ? _ref : null;
      }
      const newRect = measure(element);
      if (JSON.stringify(currentRect) === JSON.stringify(newRect)) {
        return currentRect;
      }
      return newRect;
    });
  }
  const mutationObserver = useMutationObserver({
    callback(records) {
      if (!element) {
        return;
      }
      for (const record of records) {
        const {
          type,
          target
        } = record;
        if (type === "childList" && target instanceof HTMLElement && target.contains(element)) {
          measureRect();
          break;
        }
      }
    }
  });
  const resizeObserver = useResizeObserver({
    callback: measureRect
  });
  useIsomorphicLayoutEffect(() => {
    measureRect();
    if (element) {
      resizeObserver == null ? void 0 : resizeObserver.observe(element);
      mutationObserver == null ? void 0 : mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
      mutationObserver == null ? void 0 : mutationObserver.disconnect();
    }
  }, [element]);
  return rect;
}
function useRectDelta(rect) {
  const initialRect = useInitialValue(rect);
  return getRectDelta(rect, initialRect);
}
var defaultValue$1 = [];
function useScrollableAncestors(node) {
  const previousNode = (0, import_react3.useRef)(node);
  const ancestors = useLazyMemo((previousValue) => {
    if (!node) {
      return defaultValue$1;
    }
    if (previousValue && previousValue !== defaultValue$1 && node && previousNode.current && node.parentNode === previousNode.current.parentNode) {
      return previousValue;
    }
    return getScrollableAncestors(node);
  }, [node]);
  (0, import_react3.useEffect)(() => {
    previousNode.current = node;
  }, [node]);
  return ancestors;
}
function useScrollOffsets(elements) {
  const [scrollCoordinates, setScrollCoordinates] = (0, import_react3.useState)(null);
  const prevElements = (0, import_react3.useRef)(elements);
  const handleScroll = (0, import_react3.useCallback)((event) => {
    const scrollingElement = getScrollableElement(event.target);
    if (!scrollingElement) {
      return;
    }
    setScrollCoordinates((scrollCoordinates2) => {
      if (!scrollCoordinates2) {
        return null;
      }
      scrollCoordinates2.set(scrollingElement, getScrollCoordinates(scrollingElement));
      return new Map(scrollCoordinates2);
    });
  }, []);
  (0, import_react3.useEffect)(() => {
    const previousElements = prevElements.current;
    if (elements !== previousElements) {
      cleanup(previousElements);
      const entries = elements.map((element) => {
        const scrollableElement = getScrollableElement(element);
        if (scrollableElement) {
          scrollableElement.addEventListener("scroll", handleScroll, {
            passive: true
          });
          return [scrollableElement, getScrollCoordinates(scrollableElement)];
        }
        return null;
      }).filter((entry) => entry != null);
      setScrollCoordinates(entries.length ? new Map(entries) : null);
      prevElements.current = elements;
    }
    return () => {
      cleanup(elements);
      cleanup(previousElements);
    };
    function cleanup(elements2) {
      elements2.forEach((element) => {
        const scrollableElement = getScrollableElement(element);
        scrollableElement == null ? void 0 : scrollableElement.removeEventListener("scroll", handleScroll);
      });
    }
  }, [handleScroll, elements]);
  return (0, import_react3.useMemo)(() => {
    if (elements.length) {
      return scrollCoordinates ? Array.from(scrollCoordinates.values()).reduce((acc, coordinates) => add(acc, coordinates), defaultCoordinates) : getScrollOffsets(elements);
    }
    return defaultCoordinates;
  }, [elements, scrollCoordinates]);
}
function useScrollOffsetsDelta(scrollOffsets, dependencies) {
  if (dependencies === void 0) {
    dependencies = [];
  }
  const initialScrollOffsets = (0, import_react3.useRef)(null);
  (0, import_react3.useEffect)(
    () => {
      initialScrollOffsets.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );
  (0, import_react3.useEffect)(() => {
    const hasScrollOffsets = scrollOffsets !== defaultCoordinates;
    if (hasScrollOffsets && !initialScrollOffsets.current) {
      initialScrollOffsets.current = scrollOffsets;
    }
    if (!hasScrollOffsets && initialScrollOffsets.current) {
      initialScrollOffsets.current = null;
    }
  }, [scrollOffsets]);
  return initialScrollOffsets.current ? subtract(scrollOffsets, initialScrollOffsets.current) : defaultCoordinates;
}
function useSensorSetup(sensors) {
  (0, import_react3.useEffect)(
    () => {
      if (!canUseDOM) {
        return;
      }
      const teardownFns = sensors.map((_ref) => {
        let {
          sensor
        } = _ref;
        return sensor.setup == null ? void 0 : sensor.setup();
      });
      return () => {
        for (const teardown of teardownFns) {
          teardown == null ? void 0 : teardown();
        }
      };
    },
    // TO-DO: Sensors length could theoretically change which would not be a valid dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    sensors.map((_ref2) => {
      let {
        sensor
      } = _ref2;
      return sensor;
    })
  );
}
function useSyntheticListeners(listeners, id) {
  return (0, import_react3.useMemo)(() => {
    return listeners.reduce((acc, _ref) => {
      let {
        eventName,
        handler
      } = _ref;
      acc[eventName] = (event) => {
        handler(event, id);
      };
      return acc;
    }, {});
  }, [listeners, id]);
}
function useWindowRect(element) {
  return (0, import_react3.useMemo)(() => element ? getWindowClientRect(element) : null, [element]);
}
var defaultValue$2 = [];
function useRects(elements, measure) {
  if (measure === void 0) {
    measure = getClientRect;
  }
  const [firstElement] = elements;
  const windowRect = useWindowRect(firstElement ? getWindow(firstElement) : null);
  const [rects, setRects] = (0, import_react3.useState)(defaultValue$2);
  function measureRects() {
    setRects(() => {
      if (!elements.length) {
        return defaultValue$2;
      }
      return elements.map((element) => isDocumentScrollingElement(element) ? windowRect : new Rect(measure(element), element));
    });
  }
  const resizeObserver = useResizeObserver({
    callback: measureRects
  });
  useIsomorphicLayoutEffect(() => {
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
    measureRects();
    elements.forEach((element) => resizeObserver == null ? void 0 : resizeObserver.observe(element));
  }, [elements]);
  return rects;
}
function getMeasurableNode(node) {
  if (!node) {
    return null;
  }
  if (node.children.length > 1) {
    return node;
  }
  const firstChild = node.children[0];
  return isHTMLElement(firstChild) ? firstChild : node;
}
function useDragOverlayMeasuring(_ref) {
  let {
    measure
  } = _ref;
  const [rect, setRect] = (0, import_react3.useState)(null);
  const handleResize = (0, import_react3.useCallback)((entries) => {
    for (const {
      target
    } of entries) {
      if (isHTMLElement(target)) {
        setRect((rect2) => {
          const newRect = measure(target);
          return rect2 ? {
            ...rect2,
            width: newRect.width,
            height: newRect.height
          } : newRect;
        });
        break;
      }
    }
  }, [measure]);
  const resizeObserver = useResizeObserver({
    callback: handleResize
  });
  const handleNodeChange = (0, import_react3.useCallback)((element) => {
    const node = getMeasurableNode(element);
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
    if (node) {
      resizeObserver == null ? void 0 : resizeObserver.observe(node);
    }
    setRect(node ? measure(node) : null);
  }, [measure, resizeObserver]);
  const [nodeRef, setRef] = useNodeRef(handleNodeChange);
  return (0, import_react3.useMemo)(() => ({
    nodeRef,
    rect,
    setRef
  }), [rect, nodeRef, setRef]);
}
var defaultSensors = [{
  sensor: PointerSensor,
  options: {}
}, {
  sensor: KeyboardSensor,
  options: {}
}];
var defaultData = {
  current: {}
};
var defaultMeasuringConfiguration = {
  draggable: {
    measure: getTransformAgnosticClientRect
  },
  droppable: {
    measure: getTransformAgnosticClientRect,
    strategy: MeasuringStrategy.WhileDragging,
    frequency: MeasuringFrequency.Optimized
  },
  dragOverlay: {
    measure: getClientRect
  }
};
var DroppableContainersMap = class extends Map {
  get(id) {
    var _super$get;
    return id != null ? (_super$get = super.get(id)) != null ? _super$get : void 0 : void 0;
  }
  toArray() {
    return Array.from(this.values());
  }
  getEnabled() {
    return this.toArray().filter((_ref) => {
      let {
        disabled
      } = _ref;
      return !disabled;
    });
  }
  getNodeFor(id) {
    var _this$get$node$curren, _this$get;
    return (_this$get$node$curren = (_this$get = this.get(id)) == null ? void 0 : _this$get.node.current) != null ? _this$get$node$curren : void 0;
  }
};
var defaultPublicContext = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: /* @__PURE__ */ new Map(),
  droppableRects: /* @__PURE__ */ new Map(),
  droppableContainers: /* @__PURE__ */ new DroppableContainersMap(),
  over: null,
  dragOverlay: {
    nodeRef: {
      current: null
    },
    rect: null,
    setRef: noop
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: defaultMeasuringConfiguration,
  measureDroppableContainers: noop,
  windowRect: null,
  measuringScheduled: false
};
var defaultInternalContext = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
    draggable: ""
  },
  dispatch: noop,
  draggableNodes: /* @__PURE__ */ new Map(),
  over: null,
  measureDroppableContainers: noop
};
var InternalContext = /* @__PURE__ */ (0, import_react3.createContext)(defaultInternalContext);
var PublicContext = /* @__PURE__ */ (0, import_react3.createContext)(defaultPublicContext);
function getInitialState() {
  return {
    draggable: {
      active: null,
      initialCoordinates: {
        x: 0,
        y: 0
      },
      nodes: /* @__PURE__ */ new Map(),
      translate: {
        x: 0,
        y: 0
      }
    },
    droppable: {
      containers: new DroppableContainersMap()
    }
  };
}
function reducer(state, action) {
  switch (action.type) {
    case Action.DragStart:
      return {
        ...state,
        draggable: {
          ...state.draggable,
          initialCoordinates: action.initialCoordinates,
          active: action.active
        }
      };
    case Action.DragMove:
      if (state.draggable.active == null) {
        return state;
      }
      return {
        ...state,
        draggable: {
          ...state.draggable,
          translate: {
            x: action.coordinates.x - state.draggable.initialCoordinates.x,
            y: action.coordinates.y - state.draggable.initialCoordinates.y
          }
        }
      };
    case Action.DragEnd:
    case Action.DragCancel:
      return {
        ...state,
        draggable: {
          ...state.draggable,
          active: null,
          initialCoordinates: {
            x: 0,
            y: 0
          },
          translate: {
            x: 0,
            y: 0
          }
        }
      };
    case Action.RegisterDroppable: {
      const {
        element
      } = action;
      const {
        id
      } = element;
      const containers = new DroppableContainersMap(state.droppable.containers);
      containers.set(id, element);
      return {
        ...state,
        droppable: {
          ...state.droppable,
          containers
        }
      };
    }
    case Action.SetDroppableDisabled: {
      const {
        id,
        key: key2,
        disabled
      } = action;
      const element = state.droppable.containers.get(id);
      if (!element || key2 !== element.key) {
        return state;
      }
      const containers = new DroppableContainersMap(state.droppable.containers);
      containers.set(id, {
        ...element,
        disabled
      });
      return {
        ...state,
        droppable: {
          ...state.droppable,
          containers
        }
      };
    }
    case Action.UnregisterDroppable: {
      const {
        id,
        key: key2
      } = action;
      const element = state.droppable.containers.get(id);
      if (!element || key2 !== element.key) {
        return state;
      }
      const containers = new DroppableContainersMap(state.droppable.containers);
      containers.delete(id);
      return {
        ...state,
        droppable: {
          ...state.droppable,
          containers
        }
      };
    }
    default: {
      return state;
    }
  }
}
function RestoreFocus(_ref) {
  let {
    disabled
  } = _ref;
  const {
    active,
    activatorEvent,
    draggableNodes
  } = (0, import_react3.useContext)(InternalContext);
  const previousActivatorEvent = usePrevious(activatorEvent);
  const previousActiveId = usePrevious(active == null ? void 0 : active.id);
  (0, import_react3.useEffect)(() => {
    if (disabled) {
      return;
    }
    if (!activatorEvent && previousActivatorEvent && previousActiveId != null) {
      if (!isKeyboardEvent(previousActivatorEvent)) {
        return;
      }
      if (document.activeElement === previousActivatorEvent.target) {
        return;
      }
      const draggableNode = draggableNodes.get(previousActiveId);
      if (!draggableNode) {
        return;
      }
      const {
        activatorNode,
        node
      } = draggableNode;
      if (!activatorNode.current && !node.current) {
        return;
      }
      requestAnimationFrame(() => {
        for (const element of [activatorNode.current, node.current]) {
          if (!element) {
            continue;
          }
          const focusableNode = findFirstFocusableNode(element);
          if (focusableNode) {
            focusableNode.focus();
            break;
          }
        }
      });
    }
  }, [activatorEvent, disabled, draggableNodes, previousActiveId, previousActivatorEvent]);
  return null;
}
function applyModifiers(modifiers, _ref) {
  let {
    transform,
    ...args
  } = _ref;
  return modifiers != null && modifiers.length ? modifiers.reduce((accumulator, modifier) => {
    return modifier({
      transform: accumulator,
      ...args
    });
  }, transform) : transform;
}
function useMeasuringConfiguration(config) {
  return (0, import_react3.useMemo)(
    () => ({
      draggable: {
        ...defaultMeasuringConfiguration.draggable,
        ...config == null ? void 0 : config.draggable
      },
      droppable: {
        ...defaultMeasuringConfiguration.droppable,
        ...config == null ? void 0 : config.droppable
      },
      dragOverlay: {
        ...defaultMeasuringConfiguration.dragOverlay,
        ...config == null ? void 0 : config.dragOverlay
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config == null ? void 0 : config.draggable, config == null ? void 0 : config.droppable, config == null ? void 0 : config.dragOverlay]
  );
}
function useLayoutShiftScrollCompensation(_ref) {
  let {
    activeNode,
    measure,
    initialRect,
    config = true
  } = _ref;
  const initialized = (0, import_react3.useRef)(false);
  const {
    x,
    y
  } = typeof config === "boolean" ? {
    x: config,
    y: config
  } : config;
  useIsomorphicLayoutEffect(() => {
    const disabled = !x && !y;
    if (disabled || !activeNode) {
      initialized.current = false;
      return;
    }
    if (initialized.current || !initialRect) {
      return;
    }
    const node = activeNode == null ? void 0 : activeNode.node.current;
    if (!node || node.isConnected === false) {
      return;
    }
    const rect = measure(node);
    const rectDelta = getRectDelta(rect, initialRect);
    if (!x) {
      rectDelta.x = 0;
    }
    if (!y) {
      rectDelta.y = 0;
    }
    initialized.current = true;
    if (Math.abs(rectDelta.x) > 0 || Math.abs(rectDelta.y) > 0) {
      const firstScrollableAncestor = getFirstScrollableAncestor(node);
      if (firstScrollableAncestor) {
        firstScrollableAncestor.scrollBy({
          top: rectDelta.y,
          left: rectDelta.x
        });
      }
    }
  }, [activeNode, x, y, initialRect, measure]);
}
var ActiveDraggableContext = /* @__PURE__ */ (0, import_react3.createContext)({
  ...defaultCoordinates,
  scaleX: 1,
  scaleY: 1
});
var Status;
(function(Status2) {
  Status2[Status2["Uninitialized"] = 0] = "Uninitialized";
  Status2[Status2["Initializing"] = 1] = "Initializing";
  Status2[Status2["Initialized"] = 2] = "Initialized";
})(Status || (Status = {}));
var DndContext = /* @__PURE__ */ (0, import_react3.memo)(function DndContext2(_ref) {
  var _sensorContext$curren, _dragOverlay$nodeRef$, _dragOverlay$rect, _over$rect;
  let {
    id,
    accessibility,
    autoScroll = true,
    children,
    sensors = defaultSensors,
    collisionDetection = rectIntersection,
    measuring,
    modifiers,
    ...props
  } = _ref;
  const store = (0, import_react3.useReducer)(reducer, void 0, getInitialState);
  const [state, dispatch] = store;
  const [dispatchMonitorEvent, registerMonitorListener] = useDndMonitorProvider();
  const [status, setStatus] = (0, import_react3.useState)(Status.Uninitialized);
  const isInitialized = status === Status.Initialized;
  const {
    draggable: {
      active: activeId,
      nodes: draggableNodes,
      translate
    },
    droppable: {
      containers: droppableContainers
    }
  } = state;
  const node = activeId != null ? draggableNodes.get(activeId) : null;
  const activeRects = (0, import_react3.useRef)({
    initial: null,
    translated: null
  });
  const active = (0, import_react3.useMemo)(() => {
    var _node$data;
    return activeId != null ? {
      id: activeId,
      // It's possible for the active node to unmount while dragging
      data: (_node$data = node == null ? void 0 : node.data) != null ? _node$data : defaultData,
      rect: activeRects
    } : null;
  }, [activeId, node]);
  const activeRef = (0, import_react3.useRef)(null);
  const [activeSensor, setActiveSensor] = (0, import_react3.useState)(null);
  const [activatorEvent, setActivatorEvent] = (0, import_react3.useState)(null);
  const latestProps = useLatestValue(props, Object.values(props));
  const draggableDescribedById = useUniqueId("DndDescribedBy", id);
  const enabledDroppableContainers = (0, import_react3.useMemo)(() => droppableContainers.getEnabled(), [droppableContainers]);
  const measuringConfiguration = useMeasuringConfiguration(measuring);
  const {
    droppableRects,
    measureDroppableContainers,
    measuringScheduled
  } = useDroppableMeasuring(enabledDroppableContainers, {
    dragging: isInitialized,
    dependencies: [translate.x, translate.y],
    config: measuringConfiguration.droppable
  });
  const activeNode = useCachedNode(draggableNodes, activeId);
  const activationCoordinates = (0, import_react3.useMemo)(() => activatorEvent ? getEventCoordinates(activatorEvent) : null, [activatorEvent]);
  const autoScrollOptions = getAutoScrollerOptions();
  const initialActiveNodeRect = useInitialRect(activeNode, measuringConfiguration.draggable.measure);
  useLayoutShiftScrollCompensation({
    activeNode: activeId != null ? draggableNodes.get(activeId) : null,
    config: autoScrollOptions.layoutShiftCompensation,
    initialRect: initialActiveNodeRect,
    measure: measuringConfiguration.draggable.measure
  });
  const activeNodeRect = useRect(activeNode, measuringConfiguration.draggable.measure, initialActiveNodeRect);
  const containerNodeRect = useRect(activeNode ? activeNode.parentElement : null);
  const sensorContext = (0, import_react3.useRef)({
    activatorEvent: null,
    active: null,
    activeNode,
    collisionRect: null,
    collisions: null,
    droppableRects,
    draggableNodes,
    draggingNode: null,
    draggingNodeRect: null,
    droppableContainers,
    over: null,
    scrollableAncestors: [],
    scrollAdjustedTranslate: null
  });
  const overNode = droppableContainers.getNodeFor((_sensorContext$curren = sensorContext.current.over) == null ? void 0 : _sensorContext$curren.id);
  const dragOverlay = useDragOverlayMeasuring({
    measure: measuringConfiguration.dragOverlay.measure
  });
  const draggingNode = (_dragOverlay$nodeRef$ = dragOverlay.nodeRef.current) != null ? _dragOverlay$nodeRef$ : activeNode;
  const draggingNodeRect = isInitialized ? (_dragOverlay$rect = dragOverlay.rect) != null ? _dragOverlay$rect : activeNodeRect : null;
  const usesDragOverlay = Boolean(dragOverlay.nodeRef.current && dragOverlay.rect);
  const nodeRectDelta = useRectDelta(usesDragOverlay ? null : activeNodeRect);
  const windowRect = useWindowRect(draggingNode ? getWindow(draggingNode) : null);
  const scrollableAncestors = useScrollableAncestors(isInitialized ? overNode != null ? overNode : activeNode : null);
  const scrollableAncestorRects = useRects(scrollableAncestors);
  const modifiedTranslate = applyModifiers(modifiers, {
    transform: {
      x: translate.x - nodeRectDelta.x,
      y: translate.y - nodeRectDelta.y,
      scaleX: 1,
      scaleY: 1
    },
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggingNodeRect,
    over: sensorContext.current.over,
    overlayNodeRect: dragOverlay.rect,
    scrollableAncestors,
    scrollableAncestorRects,
    windowRect
  });
  const pointerCoordinates = activationCoordinates ? add(activationCoordinates, translate) : null;
  const scrollOffsets = useScrollOffsets(scrollableAncestors);
  const scrollAdjustment = useScrollOffsetsDelta(scrollOffsets);
  const activeNodeScrollDelta = useScrollOffsetsDelta(scrollOffsets, [activeNodeRect]);
  const scrollAdjustedTranslate = add(modifiedTranslate, scrollAdjustment);
  const collisionRect = draggingNodeRect ? getAdjustedRect(draggingNodeRect, modifiedTranslate) : null;
  const collisions = active && collisionRect ? collisionDetection({
    active,
    collisionRect,
    droppableRects,
    droppableContainers: enabledDroppableContainers,
    pointerCoordinates
  }) : null;
  const overId = getFirstCollision(collisions, "id");
  const [over, setOver] = (0, import_react3.useState)(null);
  const appliedTranslate = usesDragOverlay ? modifiedTranslate : add(modifiedTranslate, activeNodeScrollDelta);
  const transform = adjustScale(appliedTranslate, (_over$rect = over == null ? void 0 : over.rect) != null ? _over$rect : null, activeNodeRect);
  const activeSensorRef = (0, import_react3.useRef)(null);
  const instantiateSensor = (0, import_react3.useCallback)(
    (event, _ref2) => {
      let {
        sensor: Sensor,
        options
      } = _ref2;
      if (activeRef.current == null) {
        return;
      }
      const activeNode2 = draggableNodes.get(activeRef.current);
      if (!activeNode2) {
        return;
      }
      const activatorEvent2 = event.nativeEvent;
      const sensorInstance = new Sensor({
        active: activeRef.current,
        activeNode: activeNode2,
        event: activatorEvent2,
        options,
        // Sensors need to be instantiated with refs for arguments that change over time
        // otherwise they are frozen in time with the stale arguments
        context: sensorContext,
        onAbort(id2) {
          const draggableNode = draggableNodes.get(id2);
          if (!draggableNode) {
            return;
          }
          const {
            onDragAbort
          } = latestProps.current;
          const event2 = {
            id: id2
          };
          onDragAbort == null ? void 0 : onDragAbort(event2);
          dispatchMonitorEvent({
            type: "onDragAbort",
            event: event2
          });
        },
        onPending(id2, constraint, initialCoordinates, offset) {
          const draggableNode = draggableNodes.get(id2);
          if (!draggableNode) {
            return;
          }
          const {
            onDragPending
          } = latestProps.current;
          const event2 = {
            id: id2,
            constraint,
            initialCoordinates,
            offset
          };
          onDragPending == null ? void 0 : onDragPending(event2);
          dispatchMonitorEvent({
            type: "onDragPending",
            event: event2
          });
        },
        onStart(initialCoordinates) {
          const id2 = activeRef.current;
          if (id2 == null) {
            return;
          }
          const draggableNode = draggableNodes.get(id2);
          if (!draggableNode) {
            return;
          }
          const {
            onDragStart
          } = latestProps.current;
          const event2 = {
            activatorEvent: activatorEvent2,
            active: {
              id: id2,
              data: draggableNode.data,
              rect: activeRects
            }
          };
          (0, import_react_dom.unstable_batchedUpdates)(() => {
            onDragStart == null ? void 0 : onDragStart(event2);
            setStatus(Status.Initializing);
            dispatch({
              type: Action.DragStart,
              initialCoordinates,
              active: id2
            });
            dispatchMonitorEvent({
              type: "onDragStart",
              event: event2
            });
            setActiveSensor(activeSensorRef.current);
            setActivatorEvent(activatorEvent2);
          });
        },
        onMove(coordinates) {
          dispatch({
            type: Action.DragMove,
            coordinates
          });
        },
        onEnd: createHandler(Action.DragEnd),
        onCancel: createHandler(Action.DragCancel)
      });
      activeSensorRef.current = sensorInstance;
      function createHandler(type) {
        return async function handler() {
          const {
            active: active2,
            collisions: collisions2,
            over: over2,
            scrollAdjustedTranslate: scrollAdjustedTranslate2
          } = sensorContext.current;
          let event2 = null;
          if (active2 && scrollAdjustedTranslate2) {
            const {
              cancelDrop
            } = latestProps.current;
            event2 = {
              activatorEvent: activatorEvent2,
              active: active2,
              collisions: collisions2,
              delta: scrollAdjustedTranslate2,
              over: over2
            };
            if (type === Action.DragEnd && typeof cancelDrop === "function") {
              const shouldCancel = await Promise.resolve(cancelDrop(event2));
              if (shouldCancel) {
                type = Action.DragCancel;
              }
            }
          }
          activeRef.current = null;
          (0, import_react_dom.unstable_batchedUpdates)(() => {
            dispatch({
              type
            });
            setStatus(Status.Uninitialized);
            setOver(null);
            setActiveSensor(null);
            setActivatorEvent(null);
            activeSensorRef.current = null;
            const eventName = type === Action.DragEnd ? "onDragEnd" : "onDragCancel";
            if (event2) {
              const handler2 = latestProps.current[eventName];
              handler2 == null ? void 0 : handler2(event2);
              dispatchMonitorEvent({
                type: eventName,
                event: event2
              });
            }
          });
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [draggableNodes]
  );
  const bindActivatorToSensorInstantiator = (0, import_react3.useCallback)((handler, sensor) => {
    return (event, active2) => {
      const nativeEvent = event.nativeEvent;
      const activeDraggableNode = draggableNodes.get(active2);
      if (
        // Another sensor is already instantiating
        activeRef.current !== null || // No active draggable
        !activeDraggableNode || // Event has already been captured
        nativeEvent.dndKit || nativeEvent.defaultPrevented
      ) {
        return;
      }
      const activationContext = {
        active: activeDraggableNode
      };
      const shouldActivate = handler(event, sensor.options, activationContext);
      if (shouldActivate === true) {
        nativeEvent.dndKit = {
          capturedBy: sensor.sensor
        };
        activeRef.current = active2;
        instantiateSensor(event, sensor);
      }
    };
  }, [draggableNodes, instantiateSensor]);
  const activators = useCombineActivators(sensors, bindActivatorToSensorInstantiator);
  useSensorSetup(sensors);
  useIsomorphicLayoutEffect(() => {
    if (activeNodeRect && status === Status.Initializing) {
      setStatus(Status.Initialized);
    }
  }, [activeNodeRect, status]);
  (0, import_react3.useEffect)(
    () => {
      const {
        onDragMove
      } = latestProps.current;
      const {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        over: over2
      } = sensorContext.current;
      if (!active2 || !activatorEvent2) {
        return;
      }
      const event = {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        delta: {
          x: scrollAdjustedTranslate.x,
          y: scrollAdjustedTranslate.y
        },
        over: over2
      };
      (0, import_react_dom.unstable_batchedUpdates)(() => {
        onDragMove == null ? void 0 : onDragMove(event);
        dispatchMonitorEvent({
          type: "onDragMove",
          event
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrollAdjustedTranslate.x, scrollAdjustedTranslate.y]
  );
  (0, import_react3.useEffect)(
    () => {
      const {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        droppableContainers: droppableContainers2,
        scrollAdjustedTranslate: scrollAdjustedTranslate2
      } = sensorContext.current;
      if (!active2 || activeRef.current == null || !activatorEvent2 || !scrollAdjustedTranslate2) {
        return;
      }
      const {
        onDragOver
      } = latestProps.current;
      const overContainer = droppableContainers2.get(overId);
      const over2 = overContainer && overContainer.rect.current ? {
        id: overContainer.id,
        rect: overContainer.rect.current,
        data: overContainer.data,
        disabled: overContainer.disabled
      } : null;
      const event = {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        delta: {
          x: scrollAdjustedTranslate2.x,
          y: scrollAdjustedTranslate2.y
        },
        over: over2
      };
      (0, import_react_dom.unstable_batchedUpdates)(() => {
        setOver(over2);
        onDragOver == null ? void 0 : onDragOver(event);
        dispatchMonitorEvent({
          type: "onDragOver",
          event
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [overId]
  );
  useIsomorphicLayoutEffect(() => {
    sensorContext.current = {
      activatorEvent,
      active,
      activeNode,
      collisionRect,
      collisions,
      droppableRects,
      draggableNodes,
      draggingNode,
      draggingNodeRect,
      droppableContainers,
      over,
      scrollableAncestors,
      scrollAdjustedTranslate
    };
    activeRects.current = {
      initial: draggingNodeRect,
      translated: collisionRect
    };
  }, [active, activeNode, collisions, collisionRect, draggableNodes, draggingNode, draggingNodeRect, droppableRects, droppableContainers, over, scrollableAncestors, scrollAdjustedTranslate]);
  useAutoScroller({
    ...autoScrollOptions,
    delta: translate,
    draggingRect: collisionRect,
    pointerCoordinates,
    scrollableAncestors,
    scrollableAncestorRects
  });
  const publicContext = (0, import_react3.useMemo)(() => {
    const context = {
      active,
      activeNode,
      activeNodeRect,
      activatorEvent,
      collisions,
      containerNodeRect,
      dragOverlay,
      draggableNodes,
      droppableContainers,
      droppableRects,
      over,
      measureDroppableContainers,
      scrollableAncestors,
      scrollableAncestorRects,
      measuringConfiguration,
      measuringScheduled,
      windowRect
    };
    return context;
  }, [active, activeNode, activeNodeRect, activatorEvent, collisions, containerNodeRect, dragOverlay, draggableNodes, droppableContainers, droppableRects, over, measureDroppableContainers, scrollableAncestors, scrollableAncestorRects, measuringConfiguration, measuringScheduled, windowRect]);
  const internalContext = (0, import_react3.useMemo)(() => {
    const context = {
      activatorEvent,
      activators,
      active,
      activeNodeRect,
      ariaDescribedById: {
        draggable: draggableDescribedById
      },
      dispatch,
      draggableNodes,
      over,
      measureDroppableContainers
    };
    return context;
  }, [activatorEvent, activators, active, activeNodeRect, dispatch, draggableDescribedById, draggableNodes, over, measureDroppableContainers]);
  return import_react3.default.createElement(DndMonitorContext.Provider, {
    value: registerMonitorListener
  }, import_react3.default.createElement(InternalContext.Provider, {
    value: internalContext
  }, import_react3.default.createElement(PublicContext.Provider, {
    value: publicContext
  }, import_react3.default.createElement(ActiveDraggableContext.Provider, {
    value: transform
  }, children)), import_react3.default.createElement(RestoreFocus, {
    disabled: (accessibility == null ? void 0 : accessibility.restoreFocus) === false
  })), import_react3.default.createElement(Accessibility, {
    ...accessibility,
    hiddenTextDescribedById: draggableDescribedById
  }));
  function getAutoScrollerOptions() {
    const activeSensorDisablesAutoscroll = (activeSensor == null ? void 0 : activeSensor.autoScrollEnabled) === false;
    const autoScrollGloballyDisabled = typeof autoScroll === "object" ? autoScroll.enabled === false : autoScroll === false;
    const enabled = isInitialized && !activeSensorDisablesAutoscroll && !autoScrollGloballyDisabled;
    if (typeof autoScroll === "object") {
      return {
        ...autoScroll,
        enabled
      };
    }
    return {
      enabled
    };
  }
});
var NullContext = /* @__PURE__ */ (0, import_react3.createContext)(null);
var defaultRole = "button";
var ID_PREFIX = "Draggable";
function useDraggable(_ref) {
  let {
    id,
    data,
    disabled = false,
    attributes
  } = _ref;
  const key2 = useUniqueId(ID_PREFIX);
  const {
    activators,
    activatorEvent,
    active,
    activeNodeRect,
    ariaDescribedById,
    draggableNodes,
    over
  } = (0, import_react3.useContext)(InternalContext);
  const {
    role = defaultRole,
    roleDescription = "draggable",
    tabIndex = 0
  } = attributes != null ? attributes : {};
  const isDragging = (active == null ? void 0 : active.id) === id;
  const transform = (0, import_react3.useContext)(isDragging ? ActiveDraggableContext : NullContext);
  const [node, setNodeRef] = useNodeRef();
  const [activatorNode, setActivatorNodeRef] = useNodeRef();
  const listeners = useSyntheticListeners(activators, id);
  const dataRef = useLatestValue(data);
  useIsomorphicLayoutEffect(
    () => {
      draggableNodes.set(id, {
        id,
        key: key2,
        node,
        activatorNode,
        data: dataRef
      });
      return () => {
        const node2 = draggableNodes.get(id);
        if (node2 && node2.key === key2) {
          draggableNodes.delete(id);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [draggableNodes, id]
  );
  const memoizedAttributes = (0, import_react3.useMemo)(() => ({
    role,
    tabIndex,
    "aria-disabled": disabled,
    "aria-pressed": isDragging && role === defaultRole ? true : void 0,
    "aria-roledescription": roleDescription,
    "aria-describedby": ariaDescribedById.draggable
  }), [disabled, role, tabIndex, isDragging, roleDescription, ariaDescribedById.draggable]);
  return {
    active,
    activatorEvent,
    activeNodeRect,
    attributes: memoizedAttributes,
    isDragging,
    listeners: disabled ? void 0 : listeners,
    node,
    over,
    setNodeRef,
    setActivatorNodeRef,
    transform
  };
}
function useDndContext() {
  return (0, import_react3.useContext)(PublicContext);
}
var ID_PREFIX$1 = "Droppable";
var defaultResizeObserverConfig = {
  timeout: 25
};
function useDroppable(_ref) {
  let {
    data,
    disabled = false,
    id,
    resizeObserverConfig
  } = _ref;
  const key2 = useUniqueId(ID_PREFIX$1);
  const {
    active,
    dispatch,
    over,
    measureDroppableContainers
  } = (0, import_react3.useContext)(InternalContext);
  const previous = (0, import_react3.useRef)({
    disabled
  });
  const resizeObserverConnected = (0, import_react3.useRef)(false);
  const rect = (0, import_react3.useRef)(null);
  const callbackId = (0, import_react3.useRef)(null);
  const {
    disabled: resizeObserverDisabled,
    updateMeasurementsFor,
    timeout: resizeObserverTimeout
  } = {
    ...defaultResizeObserverConfig,
    ...resizeObserverConfig
  };
  const ids2 = useLatestValue(updateMeasurementsFor != null ? updateMeasurementsFor : id);
  const handleResize = (0, import_react3.useCallback)(
    () => {
      if (!resizeObserverConnected.current) {
        resizeObserverConnected.current = true;
        return;
      }
      if (callbackId.current != null) {
        clearTimeout(callbackId.current);
      }
      callbackId.current = setTimeout(() => {
        measureDroppableContainers(Array.isArray(ids2.current) ? ids2.current : [ids2.current]);
        callbackId.current = null;
      }, resizeObserverTimeout);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [resizeObserverTimeout]
  );
  const resizeObserver = useResizeObserver({
    callback: handleResize,
    disabled: resizeObserverDisabled || !active
  });
  const handleNodeChange = (0, import_react3.useCallback)((newElement, previousElement) => {
    if (!resizeObserver) {
      return;
    }
    if (previousElement) {
      resizeObserver.unobserve(previousElement);
      resizeObserverConnected.current = false;
    }
    if (newElement) {
      resizeObserver.observe(newElement);
    }
  }, [resizeObserver]);
  const [nodeRef, setNodeRef] = useNodeRef(handleNodeChange);
  const dataRef = useLatestValue(data);
  (0, import_react3.useEffect)(() => {
    if (!resizeObserver || !nodeRef.current) {
      return;
    }
    resizeObserver.disconnect();
    resizeObserverConnected.current = false;
    resizeObserver.observe(nodeRef.current);
  }, [nodeRef, resizeObserver]);
  (0, import_react3.useEffect)(
    () => {
      dispatch({
        type: Action.RegisterDroppable,
        element: {
          id,
          key: key2,
          disabled,
          node: nodeRef,
          rect,
          data: dataRef
        }
      });
      return () => dispatch({
        type: Action.UnregisterDroppable,
        key: key2,
        id
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );
  (0, import_react3.useEffect)(() => {
    if (disabled !== previous.current.disabled) {
      dispatch({
        type: Action.SetDroppableDisabled,
        id,
        key: key2,
        disabled
      });
      previous.current.disabled = disabled;
    }
  }, [id, key2, disabled, dispatch]);
  return {
    active,
    rect,
    isOver: (over == null ? void 0 : over.id) === id,
    node: nodeRef,
    over,
    setNodeRef
  };
}
function AnimationManager(_ref) {
  let {
    animation,
    children
  } = _ref;
  const [clonedChildren, setClonedChildren] = (0, import_react3.useState)(null);
  const [element, setElement] = (0, import_react3.useState)(null);
  const previousChildren = usePrevious(children);
  if (!children && !clonedChildren && previousChildren) {
    setClonedChildren(previousChildren);
  }
  useIsomorphicLayoutEffect(() => {
    if (!element) {
      return;
    }
    const key2 = clonedChildren == null ? void 0 : clonedChildren.key;
    const id = clonedChildren == null ? void 0 : clonedChildren.props.id;
    if (key2 == null || id == null) {
      setClonedChildren(null);
      return;
    }
    Promise.resolve(animation(id, element)).then(() => {
      setClonedChildren(null);
    });
  }, [animation, clonedChildren, element]);
  return import_react3.default.createElement(import_react3.default.Fragment, null, children, clonedChildren ? (0, import_react3.cloneElement)(clonedChildren, {
    ref: setElement
  }) : null);
}
var defaultTransform = {
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1
};
function NullifiedContextProvider(_ref) {
  let {
    children
  } = _ref;
  return import_react3.default.createElement(InternalContext.Provider, {
    value: defaultInternalContext
  }, import_react3.default.createElement(ActiveDraggableContext.Provider, {
    value: defaultTransform
  }, children));
}
var baseStyles = {
  position: "fixed",
  touchAction: "none"
};
var defaultTransition = (activatorEvent) => {
  const isKeyboardActivator = isKeyboardEvent(activatorEvent);
  return isKeyboardActivator ? "transform 250ms ease" : void 0;
};
var PositionedOverlay = /* @__PURE__ */ (0, import_react3.forwardRef)((_ref, ref) => {
  let {
    as,
    activatorEvent,
    adjustScale: adjustScale2,
    children,
    className,
    rect,
    style,
    transform,
    transition = defaultTransition
  } = _ref;
  if (!rect) {
    return null;
  }
  const scaleAdjustedTransform = adjustScale2 ? transform : {
    ...transform,
    scaleX: 1,
    scaleY: 1
  };
  const styles = {
    ...baseStyles,
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    transform: CSS.Transform.toString(scaleAdjustedTransform),
    transformOrigin: adjustScale2 && activatorEvent ? getRelativeTransformOrigin(activatorEvent, rect) : void 0,
    transition: typeof transition === "function" ? transition(activatorEvent) : transition,
    ...style
  };
  return import_react3.default.createElement(as, {
    className,
    style: styles,
    ref
  }, children);
});
var defaultDropAnimationSideEffects = (options) => (_ref) => {
  let {
    active,
    dragOverlay
  } = _ref;
  const originalStyles = {};
  const {
    styles,
    className
  } = options;
  if (styles != null && styles.active) {
    for (const [key2, value] of Object.entries(styles.active)) {
      if (value === void 0) {
        continue;
      }
      originalStyles[key2] = active.node.style.getPropertyValue(key2);
      active.node.style.setProperty(key2, value);
    }
  }
  if (styles != null && styles.dragOverlay) {
    for (const [key2, value] of Object.entries(styles.dragOverlay)) {
      if (value === void 0) {
        continue;
      }
      dragOverlay.node.style.setProperty(key2, value);
    }
  }
  if (className != null && className.active) {
    active.node.classList.add(className.active);
  }
  if (className != null && className.dragOverlay) {
    dragOverlay.node.classList.add(className.dragOverlay);
  }
  return function cleanup() {
    for (const [key2, value] of Object.entries(originalStyles)) {
      active.node.style.setProperty(key2, value);
    }
    if (className != null && className.active) {
      active.node.classList.remove(className.active);
    }
  };
};
var defaultKeyframeResolver = (_ref2) => {
  let {
    transform: {
      initial,
      final
    }
  } = _ref2;
  return [{
    transform: CSS.Transform.toString(initial)
  }, {
    transform: CSS.Transform.toString(final)
  }];
};
var defaultDropAnimationConfiguration = {
  duration: 250,
  easing: "ease",
  keyframes: defaultKeyframeResolver,
  sideEffects: /* @__PURE__ */ defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0"
      }
    }
  })
};
function useDropAnimation(_ref3) {
  let {
    config,
    draggableNodes,
    droppableContainers,
    measuringConfiguration
  } = _ref3;
  return useEvent((id, node) => {
    if (config === null) {
      return;
    }
    const activeDraggable = draggableNodes.get(id);
    if (!activeDraggable) {
      return;
    }
    const activeNode = activeDraggable.node.current;
    if (!activeNode) {
      return;
    }
    const measurableNode = getMeasurableNode(node);
    if (!measurableNode) {
      return;
    }
    const {
      transform
    } = getWindow(node).getComputedStyle(node);
    const parsedTransform = parseTransform(transform);
    if (!parsedTransform) {
      return;
    }
    const animation = typeof config === "function" ? config : createDefaultDropAnimation(config);
    scrollIntoViewIfNeeded(activeNode, measuringConfiguration.draggable.measure);
    return animation({
      active: {
        id,
        data: activeDraggable.data,
        node: activeNode,
        rect: measuringConfiguration.draggable.measure(activeNode)
      },
      draggableNodes,
      dragOverlay: {
        node,
        rect: measuringConfiguration.dragOverlay.measure(measurableNode)
      },
      droppableContainers,
      measuringConfiguration,
      transform: parsedTransform
    });
  });
}
function createDefaultDropAnimation(options) {
  const {
    duration,
    easing,
    sideEffects,
    keyframes
  } = {
    ...defaultDropAnimationConfiguration,
    ...options
  };
  return (_ref4) => {
    let {
      active,
      dragOverlay,
      transform,
      ...rest
    } = _ref4;
    if (!duration) {
      return;
    }
    const delta = {
      x: dragOverlay.rect.left - active.rect.left,
      y: dragOverlay.rect.top - active.rect.top
    };
    const scale = {
      scaleX: transform.scaleX !== 1 ? active.rect.width * transform.scaleX / dragOverlay.rect.width : 1,
      scaleY: transform.scaleY !== 1 ? active.rect.height * transform.scaleY / dragOverlay.rect.height : 1
    };
    const finalTransform = {
      x: transform.x - delta.x,
      y: transform.y - delta.y,
      ...scale
    };
    const animationKeyframes = keyframes({
      ...rest,
      active,
      dragOverlay,
      transform: {
        initial: transform,
        final: finalTransform
      }
    });
    const [firstKeyframe] = animationKeyframes;
    const lastKeyframe = animationKeyframes[animationKeyframes.length - 1];
    if (JSON.stringify(firstKeyframe) === JSON.stringify(lastKeyframe)) {
      return;
    }
    const cleanup = sideEffects == null ? void 0 : sideEffects({
      active,
      dragOverlay,
      ...rest
    });
    const animation = dragOverlay.node.animate(animationKeyframes, {
      duration,
      easing,
      fill: "forwards"
    });
    return new Promise((resolve) => {
      animation.onfinish = () => {
        cleanup == null ? void 0 : cleanup();
        resolve();
      };
    });
  };
}
var key = 0;
function useKey(id) {
  return (0, import_react3.useMemo)(() => {
    if (id == null) {
      return;
    }
    key++;
    return key;
  }, [id]);
}
var DragOverlay = /* @__PURE__ */ import_react3.default.memo((_ref) => {
  let {
    adjustScale: adjustScale2 = false,
    children,
    dropAnimation: dropAnimationConfig,
    style,
    transition,
    modifiers,
    wrapperElement = "div",
    className,
    zIndex = 999
  } = _ref;
  const {
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggableNodes,
    droppableContainers,
    dragOverlay,
    over,
    measuringConfiguration,
    scrollableAncestors,
    scrollableAncestorRects,
    windowRect
  } = useDndContext();
  const transform = (0, import_react3.useContext)(ActiveDraggableContext);
  const key2 = useKey(active == null ? void 0 : active.id);
  const modifiedTransform = applyModifiers(modifiers, {
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggingNodeRect: dragOverlay.rect,
    over,
    overlayNodeRect: dragOverlay.rect,
    scrollableAncestors,
    scrollableAncestorRects,
    transform,
    windowRect
  });
  const initialRect = useInitialValue(activeNodeRect);
  const dropAnimation = useDropAnimation({
    config: dropAnimationConfig,
    draggableNodes,
    droppableContainers,
    measuringConfiguration
  });
  const ref = initialRect ? dragOverlay.setRef : void 0;
  return import_react3.default.createElement(NullifiedContextProvider, null, import_react3.default.createElement(AnimationManager, {
    animation: dropAnimation
  }, active && key2 ? import_react3.default.createElement(PositionedOverlay, {
    key: key2,
    id: active.id,
    ref,
    as: wrapperElement,
    activatorEvent,
    adjustScale: adjustScale2,
    className,
    transition,
    rect: initialRect,
    style: {
      zIndex,
      ...style
    },
    transform: modifiedTransform
  }, children) : null));
});

// node_modules/@dnd-kit/sortable/dist/sortable.esm.js
var import_react4 = __toESM(require_react());
function arrayMove(array, from, to) {
  const newArray = array.slice();
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
  return newArray;
}
function getSortedRects(items, rects) {
  return items.reduce((accumulator, id, index) => {
    const rect = rects.get(id);
    if (rect) {
      accumulator[index] = rect;
    }
    return accumulator;
  }, Array(items.length));
}
function isValidIndex(index) {
  return index !== null && index >= 0;
}
function itemsEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
function normalizeDisabled(disabled) {
  if (typeof disabled === "boolean") {
    return {
      draggable: disabled,
      droppable: disabled
    };
  }
  return disabled;
}
var rectSortingStrategy = (_ref) => {
  let {
    rects,
    activeIndex,
    overIndex,
    index
  } = _ref;
  const newRects = arrayMove(rects, overIndex, activeIndex);
  const oldRect = rects[index];
  const newRect = newRects[index];
  if (!newRect || !oldRect) {
    return null;
  }
  return {
    x: newRect.left - oldRect.left,
    y: newRect.top - oldRect.top,
    scaleX: newRect.width / oldRect.width,
    scaleY: newRect.height / oldRect.height
  };
};
var defaultScale$1 = {
  scaleX: 1,
  scaleY: 1
};
var verticalListSortingStrategy = (_ref) => {
  var _rects$activeIndex;
  let {
    activeIndex,
    activeNodeRect: fallbackActiveRect,
    index,
    rects,
    overIndex
  } = _ref;
  const activeNodeRect = (_rects$activeIndex = rects[activeIndex]) != null ? _rects$activeIndex : fallbackActiveRect;
  if (!activeNodeRect) {
    return null;
  }
  if (index === activeIndex) {
    const overIndexRect = rects[overIndex];
    if (!overIndexRect) {
      return null;
    }
    return {
      x: 0,
      y: activeIndex < overIndex ? overIndexRect.top + overIndexRect.height - (activeNodeRect.top + activeNodeRect.height) : overIndexRect.top - activeNodeRect.top,
      ...defaultScale$1
    };
  }
  const itemGap = getItemGap$1(rects, index, activeIndex);
  if (index > activeIndex && index <= overIndex) {
    return {
      x: 0,
      y: -activeNodeRect.height - itemGap,
      ...defaultScale$1
    };
  }
  if (index < activeIndex && index >= overIndex) {
    return {
      x: 0,
      y: activeNodeRect.height + itemGap,
      ...defaultScale$1
    };
  }
  return {
    x: 0,
    y: 0,
    ...defaultScale$1
  };
};
function getItemGap$1(clientRects, index, activeIndex) {
  const currentRect = clientRects[index];
  const previousRect = clientRects[index - 1];
  const nextRect = clientRects[index + 1];
  if (!currentRect) {
    return 0;
  }
  if (activeIndex < index) {
    return previousRect ? currentRect.top - (previousRect.top + previousRect.height) : nextRect ? nextRect.top - (currentRect.top + currentRect.height) : 0;
  }
  return nextRect ? nextRect.top - (currentRect.top + currentRect.height) : previousRect ? currentRect.top - (previousRect.top + previousRect.height) : 0;
}
var ID_PREFIX2 = "Sortable";
var Context = /* @__PURE__ */ import_react4.default.createContext({
  activeIndex: -1,
  containerId: ID_PREFIX2,
  disableTransforms: false,
  items: [],
  overIndex: -1,
  useDragOverlay: false,
  sortedRects: [],
  strategy: rectSortingStrategy,
  disabled: {
    draggable: false,
    droppable: false
  }
});
function SortableContext(_ref) {
  let {
    children,
    id,
    items: userDefinedItems,
    strategy = rectSortingStrategy,
    disabled: disabledProp = false
  } = _ref;
  const {
    active,
    dragOverlay,
    droppableRects,
    over,
    measureDroppableContainers
  } = useDndContext();
  const containerId = useUniqueId(ID_PREFIX2, id);
  const useDragOverlay = Boolean(dragOverlay.rect !== null);
  const items = (0, import_react4.useMemo)(() => userDefinedItems.map((item) => typeof item === "object" && "id" in item ? item.id : item), [userDefinedItems]);
  const isDragging = active != null;
  const activeIndex = active ? items.indexOf(active.id) : -1;
  const overIndex = over ? items.indexOf(over.id) : -1;
  const previousItemsRef = (0, import_react4.useRef)(items);
  const itemsHaveChanged = !itemsEqual(items, previousItemsRef.current);
  const disableTransforms = overIndex !== -1 && activeIndex === -1 || itemsHaveChanged;
  const disabled = normalizeDisabled(disabledProp);
  useIsomorphicLayoutEffect(() => {
    if (itemsHaveChanged && isDragging) {
      measureDroppableContainers(items);
    }
  }, [itemsHaveChanged, items, isDragging, measureDroppableContainers]);
  (0, import_react4.useEffect)(() => {
    previousItemsRef.current = items;
  }, [items]);
  const contextValue = (0, import_react4.useMemo)(
    () => ({
      activeIndex,
      containerId,
      disabled,
      disableTransforms,
      items,
      overIndex,
      useDragOverlay,
      sortedRects: getSortedRects(items, droppableRects),
      strategy
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeIndex, containerId, disabled.draggable, disabled.droppable, disableTransforms, items, overIndex, droppableRects, useDragOverlay, strategy]
  );
  return import_react4.default.createElement(Context.Provider, {
    value: contextValue
  }, children);
}
var defaultNewIndexGetter = (_ref) => {
  let {
    id,
    items,
    activeIndex,
    overIndex
  } = _ref;
  return arrayMove(items, activeIndex, overIndex).indexOf(id);
};
var defaultAnimateLayoutChanges = (_ref2) => {
  let {
    containerId,
    isSorting,
    wasDragging,
    index,
    items,
    newIndex,
    previousItems,
    previousContainerId,
    transition
  } = _ref2;
  if (!transition || !wasDragging) {
    return false;
  }
  if (previousItems !== items && index === newIndex) {
    return false;
  }
  if (isSorting) {
    return true;
  }
  return newIndex !== index && containerId === previousContainerId;
};
var defaultTransition2 = {
  duration: 200,
  easing: "ease"
};
var transitionProperty = "transform";
var disabledTransition = /* @__PURE__ */ CSS.Transition.toString({
  property: transitionProperty,
  duration: 0,
  easing: "linear"
});
var defaultAttributes = {
  roleDescription: "sortable"
};
function useDerivedTransform(_ref) {
  let {
    disabled,
    index,
    node,
    rect
  } = _ref;
  const [derivedTransform, setDerivedtransform] = (0, import_react4.useState)(null);
  const previousIndex = (0, import_react4.useRef)(index);
  useIsomorphicLayoutEffect(() => {
    if (!disabled && index !== previousIndex.current && node.current) {
      const initial = rect.current;
      if (initial) {
        const current = getClientRect(node.current, {
          ignoreTransform: true
        });
        const delta = {
          x: initial.left - current.left,
          y: initial.top - current.top,
          scaleX: initial.width / current.width,
          scaleY: initial.height / current.height
        };
        if (delta.x || delta.y) {
          setDerivedtransform(delta);
        }
      }
    }
    if (index !== previousIndex.current) {
      previousIndex.current = index;
    }
  }, [disabled, index, node, rect]);
  (0, import_react4.useEffect)(() => {
    if (derivedTransform) {
      setDerivedtransform(null);
    }
  }, [derivedTransform]);
  return derivedTransform;
}
function useSortable(_ref) {
  let {
    animateLayoutChanges = defaultAnimateLayoutChanges,
    attributes: userDefinedAttributes,
    disabled: localDisabled,
    data: customData,
    getNewIndex = defaultNewIndexGetter,
    id,
    strategy: localStrategy,
    resizeObserverConfig,
    transition = defaultTransition2
  } = _ref;
  const {
    items,
    containerId,
    activeIndex,
    disabled: globalDisabled,
    disableTransforms,
    sortedRects,
    overIndex,
    useDragOverlay,
    strategy: globalStrategy
  } = (0, import_react4.useContext)(Context);
  const disabled = normalizeLocalDisabled(localDisabled, globalDisabled);
  const index = items.indexOf(id);
  const data = (0, import_react4.useMemo)(() => ({
    sortable: {
      containerId,
      index,
      items
    },
    ...customData
  }), [containerId, customData, index, items]);
  const itemsAfterCurrentSortable = (0, import_react4.useMemo)(() => items.slice(items.indexOf(id)), [items, id]);
  const {
    rect,
    node,
    isOver,
    setNodeRef: setDroppableNodeRef
  } = useDroppable({
    id,
    data,
    disabled: disabled.droppable,
    resizeObserverConfig: {
      updateMeasurementsFor: itemsAfterCurrentSortable,
      ...resizeObserverConfig
    }
  });
  const {
    active,
    activatorEvent,
    activeNodeRect,
    attributes,
    setNodeRef: setDraggableNodeRef,
    listeners,
    isDragging,
    over,
    setActivatorNodeRef,
    transform
  } = useDraggable({
    id,
    data,
    attributes: {
      ...defaultAttributes,
      ...userDefinedAttributes
    },
    disabled: disabled.draggable
  });
  const setNodeRef = useCombinedRefs(setDroppableNodeRef, setDraggableNodeRef);
  const isSorting = Boolean(active);
  const displaceItem = isSorting && !disableTransforms && isValidIndex(activeIndex) && isValidIndex(overIndex);
  const shouldDisplaceDragSource = !useDragOverlay && isDragging;
  const dragSourceDisplacement = shouldDisplaceDragSource && displaceItem ? transform : null;
  const strategy = localStrategy != null ? localStrategy : globalStrategy;
  const finalTransform = displaceItem ? dragSourceDisplacement != null ? dragSourceDisplacement : strategy({
    rects: sortedRects,
    activeNodeRect,
    activeIndex,
    overIndex,
    index
  }) : null;
  const newIndex = isValidIndex(activeIndex) && isValidIndex(overIndex) ? getNewIndex({
    id,
    items,
    activeIndex,
    overIndex
  }) : index;
  const activeId = active == null ? void 0 : active.id;
  const previous = (0, import_react4.useRef)({
    activeId,
    items,
    newIndex,
    containerId
  });
  const itemsHaveChanged = items !== previous.current.items;
  const shouldAnimateLayoutChanges = animateLayoutChanges({
    active,
    containerId,
    isDragging,
    isSorting,
    id,
    index,
    items,
    newIndex: previous.current.newIndex,
    previousItems: previous.current.items,
    previousContainerId: previous.current.containerId,
    transition,
    wasDragging: previous.current.activeId != null
  });
  const derivedTransform = useDerivedTransform({
    disabled: !shouldAnimateLayoutChanges,
    index,
    node,
    rect
  });
  (0, import_react4.useEffect)(() => {
    if (isSorting && previous.current.newIndex !== newIndex) {
      previous.current.newIndex = newIndex;
    }
    if (containerId !== previous.current.containerId) {
      previous.current.containerId = containerId;
    }
    if (items !== previous.current.items) {
      previous.current.items = items;
    }
  }, [isSorting, newIndex, containerId, items]);
  (0, import_react4.useEffect)(() => {
    if (activeId === previous.current.activeId) {
      return;
    }
    if (activeId != null && previous.current.activeId == null) {
      previous.current.activeId = activeId;
      return;
    }
    const timeoutId = setTimeout(() => {
      previous.current.activeId = activeId;
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [activeId]);
  return {
    active,
    activeIndex,
    attributes,
    data,
    rect,
    index,
    newIndex,
    items,
    isOver,
    isSorting,
    isDragging,
    listeners,
    node,
    overIndex,
    over,
    setNodeRef,
    setActivatorNodeRef,
    setDroppableNodeRef,
    setDraggableNodeRef,
    transform: derivedTransform != null ? derivedTransform : finalTransform,
    transition: getTransition()
  };
  function getTransition() {
    if (
      // Temporarily disable transitions for a single frame to set up derived transforms
      derivedTransform || // Or to prevent items jumping to back to their "new" position when items change
      itemsHaveChanged && previous.current.newIndex === index
    ) {
      return disabledTransition;
    }
    if (shouldDisplaceDragSource && !isKeyboardEvent(activatorEvent) || !transition) {
      return void 0;
    }
    if (isSorting || shouldAnimateLayoutChanges) {
      return CSS.Transition.toString({
        ...transition,
        property: transitionProperty
      });
    }
    return void 0;
  }
}
function normalizeLocalDisabled(localDisabled, globalDisabled) {
  var _localDisabled$dragga, _localDisabled$droppa;
  if (typeof localDisabled === "boolean") {
    return {
      draggable: localDisabled,
      // Backwards compatibility
      droppable: false
    };
  }
  return {
    draggable: (_localDisabled$dragga = localDisabled == null ? void 0 : localDisabled.draggable) != null ? _localDisabled$dragga : globalDisabled.draggable,
    droppable: (_localDisabled$droppa = localDisabled == null ? void 0 : localDisabled.droppable) != null ? _localDisabled$droppa : globalDisabled.droppable
  };
}
var directions = [KeyboardCode.Down, KeyboardCode.Right, KeyboardCode.Up, KeyboardCode.Left];

// node_modules/zustand/esm/vanilla.mjs
var createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState2 = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState: getInitialState2, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
var createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;

// node_modules/zustand/esm/react.mjs
var import_react5 = __toESM(require_react(), 1);
var identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = import_react5.default.useSyncExternalStore(
    api.subscribe,
    () => selector(api.getState()),
    () => selector(api.getInitialState())
  );
  import_react5.default.useDebugValue(slice);
  return slice;
}
var createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
var create = (createState) => createState ? createImpl(createState) : createImpl;

// app/stores/theme.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\stores\\theme.ts"
  );
  import.meta.hot.lastModified = "1748442147838.3357";
}
var useThemeStore = create((set) => ({
  theme: "light",
  toggle: () => set((state) => {
    const next = state.theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", next === "dark");
    return { theme: next };
  })
}));

// node_modules/nanoid/url-alphabet/index.js
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

// node_modules/nanoid/index.browser.js
var nanoid = (size = 21) => {
  let id = "";
  let bytes = crypto.getRandomValues(new Uint8Array(size |= 0));
  while (size--) {
    id += urlAlphabet[bytes[size] & 63];
  }
  return id;
};

// app/stores/form.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\stores\\form.ts"
  );
  import.meta.hot.lastModified = "1748707315190.4539";
}
var useFormStore = create((set, get) => {
  console.log("\u23F3 [form store] initializing\u2026");
  const firstStepId = nanoid();
  return {
    title: "Untitled Multi-Step Form",
    steps: [{ id: firstStepId, title: "Step 1", fieldIds: [] }],
    selectedStep: firstStepId,
    fields: [],
    selectedFieldId: null,
    // ─── Step Actions ────────────────────────────────────────────
    addStep: (title) => {
      const newId = nanoid();
      const newStep = { id: newId, title, fieldIds: [] };
      set((state) => ({
        steps: [...state.steps, newStep],
        selectedStep: state.selectedStep || newId
      }));
    },
    selectStep: (stepId) => set({ selectedStep: stepId, selectedFieldId: null }),
    renameStep: (stepId, newTitle) => set((state) => ({
      steps: state.steps.map(
        (s) => s.id === stepId ? { ...s, title: newTitle } : s
      )
    })),
    deleteStep: (stepId) => set((state) => {
      if (state.steps.length === 1)
        return {};
      const toRemove = new Set(
        state.steps.find((s) => s.id === stepId).fieldIds
      );
      const newFields = state.fields.filter((f) => !toRemove.has(f.id));
      const newSteps = state.steps.filter((s) => s.id !== stepId);
      const newSelected = state.selectedStep === stepId ? newSteps[0].id : state.selectedStep;
      return {
        steps: newSteps,
        fields: newFields,
        selectedStep: newSelected,
        selectedFieldId: null
      };
    }),
    // ─── Field Actions ──────────────────────────────────────────────
    addField: (type) => {
      const stepId = get().selectedStep;
      if (!stepId)
        return;
      const newId = nanoid();
      const newField = {
        id: newId,
        type,
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
        placeholder: "",
        required: false,
        helpText: "",
        minLength: void 0,
        maxLength: void 0,
        pattern: "",
        options: type === "dropdown" || type === "checkbox" ? [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" }
        ] : void 0,
        stepId
      };
      set((state) => ({
        fields: [...state.fields, newField],
        steps: state.steps.map(
          (s) => s.id === stepId ? { ...s, fieldIds: [...s.fieldIds, newId] } : s
        )
      }));
    },
    moveFieldWithinStep: (fromIndex, toIndex) => set((state) => {
      const stepId = state.selectedStep;
      if (!stepId)
        return {};
      const step = state.steps.find((s) => s.id === stepId);
      const ids2 = [...step.fieldIds];
      const [moved] = ids2.splice(fromIndex, 1);
      ids2.splice(toIndex, 0, moved);
      const newSteps = state.steps.map(
        (s) => s.id === stepId ? { ...s, fieldIds: ids2 } : s
      );
      const otherFields = state.fields.filter((f) => f.stepId !== stepId);
      const stepFieldsInOrder = ids2.map((fid) => state.fields.find((f) => f.id === fid)).filter(Boolean);
      const newFields = [...otherFields, ...stepFieldsInOrder];
      return { steps: newSteps, fields: newFields };
    }),
    selectField: (fieldId) => set({ selectedFieldId: fieldId }),
    updateField: (fieldId, changes) => set((state) => ({
      fields: state.fields.map(
        (f) => f.id === fieldId ? { ...f, ...changes } : f
      )
    })),
    // ─── Template Loader ────────────────────────────────────────────
    loadTemplate: (template) => {
      console.log("\u2611\uFE0F [form store] loadTemplate");
      const stepId = nanoid();
      const newStep = { id: stepId, title: template.title, fieldIds: [] };
      const newFields = template.fields.map((f) => ({
        ...f,
        id: nanoid(),
        stepId
      }));
      newStep.fieldIds = newFields.map((f) => f.id);
      set(() => ({
        title: template.title,
        steps: [newStep],
        selectedStep: stepId,
        fields: newFields,
        selectedFieldId: null
      }));
    },
    // ─── Phase 4: Save / Load to localStorage under key “form-{key}” ───
    saveToLocal: (key2) => {
      const { title, steps, fields } = get();
      const payload = { title, fields };
      localStorage.setItem(`form-${key2}`, JSON.stringify(payload));
      alert(`Form saved as \u201C${key2}\u201D`);
    },
    loadFromLocal: (key2) => {
      try {
        const raw = localStorage.getItem(`form-${key2}`);
        if (!raw) {
          alert(`No form found under key \u201C${key2}\u201D`);
          return;
        }
        const { title, fields } = JSON.parse(raw);
        const stepId = nanoid();
        const reconstructedFields = fields.map((f) => ({
          ...f,
          id: nanoid(),
          stepId
        }));
        const newStep = {
          id: stepId,
          title,
          fieldIds: reconstructedFields.map((f) => f.id)
        };
        set(() => ({
          title,
          steps: [newStep],
          selectedStep: stepId,
          fields: reconstructedFields,
          selectedFieldId: null
        }));
        alert(`Form loaded from \u201C${key2}\u201D`);
      } catch {
        alert(`Failed to parse form data for key \u201C${key2}\u201D`);
      }
    }
  };
});

// app/components/FieldPalette.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\FieldPalette.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\FieldPalette.tsx"
  );
  import.meta.hot.lastModified = "1748456924862.9697";
}
var SUPPORTED_FIELDS = ["text", "textarea", "dropdown", "checkbox", "date"];
function FieldPalette() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "font-semibold mb-2", children: "Add Field" }, void 0, false, {
      fileName: "app/components/FieldPalette.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col", children: SUPPORTED_FIELDS.map((type) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PaletteItem, { type }, type, false, {
      fileName: "app/components/FieldPalette.tsx",
      lineNumber: 29,
      columnNumber: 39
    }, this)) }, void 0, false, {
      fileName: "app/components/FieldPalette.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/FieldPalette.tsx",
    lineNumber: 26,
    columnNumber: 10
  }, this);
}
_c = FieldPalette;
function PaletteItem({
  type
}) {
  _s();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform
  } = useDraggable({
    id: `palette-${type}`,
    data: {
      type
    }
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
  } : void 0;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { ref: setNodeRef, style, ...listeners, ...attributes, onPointerDown: () => console.log(`[Palette] pointer down on ${type}`), className: "p-2 m-1 border rounded cursor-grab dark:bg-gray-800", children: type }, void 0, false, {
    fileName: "app/components/FieldPalette.tsx",
    lineNumber: 52,
    columnNumber: 10
  }, this);
}
_s(PaletteItem, "KToSDLllTTEzOm4MO+FGxu29k4s=", false, function() {
  return [useDraggable];
});
_c2 = PaletteItem;
var _c;
var _c2;
$RefreshReg$(_c, "FieldPalette");
$RefreshReg$(_c2, "PaletteItem");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/FieldCanvas.tsx
var import_react6 = __toESM(require_react(), 1);
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\FieldCanvas.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
var _s22 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\FieldCanvas.tsx"
  );
  import.meta.hot.lastModified = "1748707400146.6604";
}
function FieldCanvas() {
  _s2();
  const allFields = useFormStore((s) => s.fields);
  const selectedStep = useFormStore((s) => s.selectedStep);
  const fields = (0, import_react6.useMemo)(() => allFields.filter((f) => f.stepId === selectedStep), [allFields, selectedStep]);
  console.log("\u{1F5C4}\uFE0F fieldcanvas");
  const moveFieldWithinStep = useFormStore((s) => s.moveFieldWithinStep);
  const [overlayContent, setOverlayContent] = (0, import_react6.useState)(null);
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5
    }
  }));
  function handleDragStart(e) {
    const f = fields.find((f2) => f2.id === e.active.id);
    if (f) {
      setOverlayContent(/* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "p-2 bg-blue-200 rounded", children: f.label }, void 0, false, {
        fileName: "app/components/FieldCanvas.tsx",
        lineNumber: 46,
        columnNumber: 25
      }, this));
    }
  }
  function handleDragEnd(e) {
    setOverlayContent(null);
    const {
      active,
      over
    } = e;
    if (!over)
      return;
    if (active.id === over.id)
      return;
    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);
    if (oldIndex > -1 && newIndex > -1) {
      moveFieldWithinStep(oldIndex, newIndex);
    }
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(DndContext, { sensors, collisionDetection: closestCenter, onDragStart: handleDragStart, onDragEnd: handleDragEnd, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(SortableContext, { items: fields.map((f) => f.id), strategy: verticalListSortingStrategy, children: fields.map((field) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(SortableField, { field }, field.id, false, {
      fileName: "app/components/FieldCanvas.tsx",
      lineNumber: 65,
      columnNumber: 30
    }, this)) }, void 0, false, {
      fileName: "app/components/FieldCanvas.tsx",
      lineNumber: 64,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(DragOverlay, { dropAnimation: {
      duration: 150
    }, children: overlayContent }, void 0, false, {
      fileName: "app/components/FieldCanvas.tsx",
      lineNumber: 68,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/FieldCanvas.tsx",
    lineNumber: 63,
    columnNumber: 10
  }, this);
}
_s2(FieldCanvas, "7PayEH4ecthmRtM7oX2N8Zm5OTc=", false, function() {
  return [useFormStore, useFormStore, useFormStore, useSensors, useSensor];
});
_c3 = FieldCanvas;
function SortableField({
  field
}) {
  _s22();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: field.id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  const selectField = useFormStore((s) => s.selectField);
  const selectedFieldId = useFormStore((s) => s.selectedFieldId);
  const isSelected = selectedFieldId === field.id;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { ref: setNodeRef, style, ...attributes, ...listeners, onClick: () => selectField(field.id), className: `p-4 mb-2 border rounded cursor-move bg-white dark:bg-gray-800 ${isSelected ? "border-blue-500 bg-blue-100 dark:bg-blue-900" : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "font-medium", children: field.label }, void 0, false, {
      fileName: "app/components/FieldCanvas.tsx",
      lineNumber: 100,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "text-xs text-gray-500", children: field.type }, void 0, false, {
      fileName: "app/components/FieldCanvas.tsx",
      lineNumber: 101,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/FieldCanvas.tsx",
    lineNumber: 99,
    columnNumber: 10
  }, this);
}
_s22(SortableField, "vDLDr8NW8uwii73lVCPVvMOkrzs=", false, function() {
  return [useSortable, useFormStore, useFormStore];
});
_c22 = SortableField;
var _c3;
var _c22;
$RefreshReg$(_c3, "FieldCanvas");
$RefreshReg$(_c22, "SortableField");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/FieldConfigPanel.tsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\FieldConfigPanel.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s3 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\FieldConfigPanel.tsx"
  );
  import.meta.hot.lastModified = "1748707433060.6406";
}
function FieldConfigPanel() {
  _s3();
  const selectedFieldId = useFormStore((s) => s.selectedFieldId);
  const field = useFormStore((s) => s.fields.find((f) => f.id === selectedFieldId));
  console.log("\u{1F504} [FieldConfigPanel] render");
  const updateField = useFormStore((s) => s.updateField);
  if (!field) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "p-2 text-gray-500 dark:text-gray-400", children: "Select a field to edit its properties" }, void 0, false, {
      fileName: "app/components/FieldConfigPanel.tsx",
      lineNumber: 31,
      columnNumber: 12
    }, this);
  }
  const onChange = (key2) => (e) => {
    const value = key2 === "required" ? e.target.checked : e.target.value;
    updateField(field.id, {
      [key2]: value
    });
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "p-2 bg-white dark:bg-gray-800 rounded shadow space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h3", { className: "text-lg font-semibold", children: "Field Properties" }, void 0, false, {
      fileName: "app/components/FieldConfigPanel.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-sm", children: "Label" }, void 0, false, {
        fileName: "app/components/FieldConfigPanel.tsx",
        lineNumber: 45,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { type: "text", value: field.label, onChange: onChange("label"), className: "mt-1 block w-full border rounded p-1 bg-gray-50 dark:bg-gray-700" }, void 0, false, {
        fileName: "app/components/FieldConfigPanel.tsx",
        lineNumber: 46,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/FieldConfigPanel.tsx",
      lineNumber: 44,
      columnNumber: 7
    }, this),
    ["text", "textarea"].includes(field.type) && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-sm", children: "Placeholder" }, void 0, false, {
        fileName: "app/components/FieldConfigPanel.tsx",
        lineNumber: 50,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { type: "text", value: field.placeholder || "", onChange: onChange("placeholder"), className: "mt-1 block w-full border rounded p-1 bg-gray-50 dark:bg-gray-700" }, void 0, false, {
        fileName: "app/components/FieldConfigPanel.tsx",
        lineNumber: 51,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/FieldConfigPanel.tsx",
      lineNumber: 49,
      columnNumber: 53
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { type: "checkbox", id: "required", checked: field.required || false, onChange: onChange("required"), className: "mr-2" }, void 0, false, {
        fileName: "app/components/FieldConfigPanel.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { htmlFor: "required", className: "text-sm", children: "Required" }, void 0, false, {
        fileName: "app/components/FieldConfigPanel.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/FieldConfigPanel.tsx",
      lineNumber: 54,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-sm", children: "Help Text" }, void 0, false, {
        fileName: "app/components/FieldConfigPanel.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("textarea", { value: field.helpText || "", onChange: onChange("helpText"), className: "mt-1 block w-full border rounded p-1 bg-gray-50 dark:bg-gray-700" }, void 0, false, {
        fileName: "app/components/FieldConfigPanel.tsx",
        lineNumber: 63,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/FieldConfigPanel.tsx",
      lineNumber: 61,
      columnNumber: 7
    }, this),
    ["text", "textarea"].includes(field.type) && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_jsx_dev_runtime3.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-sm", children: "Min Length" }, void 0, false, {
            fileName: "app/components/FieldConfigPanel.tsx",
            lineNumber: 69,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { type: "number", value: field.minLength || "", onChange: (e) => updateField(field.id, {
            minLength: +e.target.value
          }), className: "mt-1 block w-full border rounded p-1 bg-gray-50 dark:bg-gray-700" }, void 0, false, {
            fileName: "app/components/FieldConfigPanel.tsx",
            lineNumber: 70,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/FieldConfigPanel.tsx",
          lineNumber: 68,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-sm", children: "Max Length" }, void 0, false, {
            fileName: "app/components/FieldConfigPanel.tsx",
            lineNumber: 75,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { type: "number", value: field.maxLength || "", onChange: (e) => updateField(field.id, {
            maxLength: +e.target.value
          }), className: "mt-1 block w-full border rounded p-1 bg-gray-50 dark:bg-gray-700" }, void 0, false, {
            fileName: "app/components/FieldConfigPanel.tsx",
            lineNumber: 76,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/FieldConfigPanel.tsx",
          lineNumber: 74,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/FieldConfigPanel.tsx",
        lineNumber: 67,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-sm", children: "Pattern (regex)" }, void 0, false, {
          fileName: "app/components/FieldConfigPanel.tsx",
          lineNumber: 82,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { type: "text", value: field.pattern || "", onChange: onChange("pattern"), className: "mt-1 block w-full border rounded p-1 bg-gray-50 dark:bg-gray-700" }, void 0, false, {
          fileName: "app/components/FieldConfigPanel.tsx",
          lineNumber: 83,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/FieldConfigPanel.tsx",
        lineNumber: 81,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/FieldConfigPanel.tsx",
      lineNumber: 66,
      columnNumber: 53
    }, this),
    ["dropdown", "checkbox"].includes(field.type) && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-sm", children: "Options (comma-separated)" }, void 0, false, {
        fileName: "app/components/FieldConfigPanel.tsx",
        lineNumber: 88,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { type: "text", value: field.options?.map((o) => o.label).join(", ") || "", onChange: (e) => updateField(field.id, {
        options: e.target.value.split(",").map((s) => ({
          label: s.trim(),
          value: s.trim().toLowerCase().replace(/\s+/g, "_")
        }))
      }), className: "mt-1 block w-full border rounded p-1 bg-gray-50 dark:bg-gray-700" }, void 0, false, {
        fileName: "app/components/FieldConfigPanel.tsx",
        lineNumber: 89,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/FieldConfigPanel.tsx",
      lineNumber: 87,
      columnNumber: 57
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/FieldConfigPanel.tsx",
    lineNumber: 41,
    columnNumber: 10
  }, this);
}
_s3(FieldConfigPanel, "4h3nmNDKInAMYNDVa1Ulst+Q49g=", false, function() {
  return [useFormStore, useFormStore, useFormStore];
});
_c4 = FieldConfigPanel;
var _c4;
$RefreshReg$(_c4, "FieldConfigPanel");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/StepTabs.tsx
var import_react7 = __toESM(require_react(), 1);
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\StepTabs.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s4 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\StepTabs.tsx"
  );
  import.meta.hot.lastModified = "1748704117548.8457";
}
function StepTabs() {
  _s4();
  const steps = useFormStore((s) => s.steps);
  const selectedStep = useFormStore((s) => s.selectedStep);
  console.log("\u{1F5C4}\uFE0F steptab");
  const selectStep = useFormStore((s) => s.selectStep);
  const addStep = useFormStore((s) => s.addStep);
  const deleteStep = useFormStore((s) => s.deleteStep);
  const renameStep = useFormStore((s) => s.renameStep);
  const [editingStepId, setEditingStepId] = (0, import_react7.useState)(null);
  const [tempTitle, setTempTitle] = (0, import_react7.useState)("");
  const onEdit = (stepId, currentTitle) => {
    setEditingStepId(stepId);
    setTempTitle(currentTitle);
  };
  const onSave = (stepId) => {
    renameStep(stepId, tempTitle || "Untitled Step");
    setEditingStepId(null);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex items-center space-x-2 border-b border-gray-300 dark:border-gray-700 pb-2 mb-4", children: [
    steps.map((step) => {
      const isSelected = step.id === selectedStep;
      return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex items-center space-x-1", children: [
        editingStepId === step.id ? /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("input", { value: tempTitle, onChange: (e) => setTempTitle(e.target.value), onBlur: () => onSave(step.id), onKeyDown: (e) => {
          if (e.key === "Enter")
            onSave(step.id);
        }, className: "border-b border-gray-400 bg-transparent px-1 focus:outline-none", autoFocus: true }, void 0, false, {
          fileName: "app/components/StepTabs.tsx",
          lineNumber: 49,
          columnNumber: 42
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("button", { onClick: () => selectStep(step.id), className: `px-3 py-1 rounded ${isSelected ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`, children: step.title }, void 0, false, {
          fileName: "app/components/StepTabs.tsx",
          lineNumber: 51,
          columnNumber: 103
        }, this),
        isSelected && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex items-center space-x-1", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("button", { title: "Rename", onClick: () => onEdit(step.id, step.title), className: "text-gray-500 hover:text-gray-800 dark:hover:text-gray-300", children: "\u270F\uFE0F" }, void 0, false, {
            fileName: "app/components/StepTabs.tsx",
            lineNumber: 55,
            columnNumber: 17
          }, this),
          steps.length > 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("button", { title: "Delete Step", onClick: () => deleteStep(step.id), className: "text-red-500 hover:text-red-800", children: "\u{1F5D1}\uFE0F" }, void 0, false, {
            fileName: "app/components/StepTabs.tsx",
            lineNumber: 58,
            columnNumber: 38
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/StepTabs.tsx",
          lineNumber: 54,
          columnNumber: 28
        }, this)
      ] }, step.id, true, {
        fileName: "app/components/StepTabs.tsx",
        lineNumber: 48,
        columnNumber: 14
      }, this);
    }),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("button", { onClick: () => addStep(`Step ${steps.length + 1}`), className: "ml-4 px-2 py-1 bg-green-600 text-white rounded", children: "+ Step" }, void 0, false, {
      fileName: "app/components/StepTabs.tsx",
      lineNumber: 65,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/StepTabs.tsx",
    lineNumber: 45,
    columnNumber: 10
  }, this);
}
_s4(StepTabs, "ThcN8aONGIr6yyRE5z9Gpw5q3Ng=", false, function() {
  return [useFormStore, useFormStore, useFormStore, useFormStore, useFormStore, useFormStore];
});
_c5 = StepTabs;
var _c5;
$RefreshReg$(_c5, "StepTabs");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/MultiStepPreview.tsx
var import_react8 = __toESM(require_react(), 1);
var import_jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\MultiStepPreview.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s5 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\MultiStepPreview.tsx"
  );
  import.meta.hot.lastModified = "1748707490067.861";
}
function MultiStepPreview() {
  _s5();
  const steps = useFormStore((s) => s.steps);
  const fields = useFormStore((s) => s.fields);
  console.log("\u{1F504} [MultiStepPreview] render");
  const [currentStepIdx, setCurrentStepIdx] = (0, import_react8.useState)(0);
  const step = steps[currentStepIdx];
  const stepFields = fields.filter((f) => f.stepId === step.id);
  const [values, setValues] = (0, import_react8.useState)({});
  const [errors, setErrors] = (0, import_react8.useState)({});
  function validateField(f, v) {
    if (f.required && !v)
      return "Required";
    if (f.minLength && v.length < f.minLength)
      return `Min length: ${f.minLength}`;
    if (f.maxLength && v.length > f.maxLength)
      return `Max length: ${f.maxLength}`;
    if (f.pattern) {
      const re = new RegExp(f.pattern);
      if (!re.test(v))
        return "Invalid format";
    }
    return "";
  }
  const onChange = (f) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((prev) => ({
      ...prev,
      [f.id]: v
    }));
    const err = validateField(f, v);
    setErrors((prev) => ({
      ...prev,
      [f.id]: err
    }));
  };
  const goNext = () => {
    const newErrors = {};
    let hasError = false;
    stepFields.forEach((f) => {
      const v = values[f.id];
      const err = validateField(f, v);
      if (err) {
        newErrors[f.id] = err;
        hasError = true;
      }
    });
    setErrors((prev) => ({
      ...prev,
      ...newErrors
    }));
    if (hasError)
      return;
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      alert("All steps validated! You can now submit.");
    }
  };
  const goPrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "space-y-4 w-full max-w-lg mx-auto p-4 bg-gray-50 dark:bg-gray-800 rounded shadow", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: [
      "Step ",
      currentStepIdx + 1,
      " of ",
      steps.length,
      ": ",
      step.title
    ] }, void 0, true, {
      fileName: "app/components/MultiStepPreview.tsx",
      lineNumber: 84,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "space-y-4", children: stepFields.map((f) => /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("label", { className: "font-medium text-gray-700 dark:text-gray-200", children: [
        f.label,
        f.required && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-red-500 ml-1", children: "*" }, void 0, false, {
          fileName: "app/components/MultiStepPreview.tsx",
          lineNumber: 92,
          columnNumber: 30
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/MultiStepPreview.tsx",
        lineNumber: 90,
        columnNumber: 13
      }, this),
      f.type === "text" && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("input", { type: "text", placeholder: f.placeholder, value: values[f.id] || "", onChange: onChange(f), className: "mt-1 border rounded p-2 bg-white dark:bg-gray-700" }, void 0, false, {
        fileName: "app/components/MultiStepPreview.tsx",
        lineNumber: 95,
        columnNumber: 35
      }, this),
      f.type === "textarea" && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("textarea", { placeholder: f.placeholder, value: values[f.id] || "", onChange: onChange(f), className: "mt-1 border rounded p-2 bg-white dark:bg-gray-700" }, void 0, false, {
        fileName: "app/components/MultiStepPreview.tsx",
        lineNumber: 96,
        columnNumber: 39
      }, this),
      f.type === "date" && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("input", { type: "date", value: values[f.id] || "", onChange: onChange(f), className: "mt-1 border rounded p-2 bg-white dark:bg-gray-700" }, void 0, false, {
        fileName: "app/components/MultiStepPreview.tsx",
        lineNumber: 97,
        columnNumber: 35
      }, this),
      f.type === "dropdown" && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("select", { value: values[f.id] || "", onChange: onChange(f), className: "mt-1 border rounded p-2 bg-white dark:bg-gray-700", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("option", { value: "", children: "Select\u2026" }, void 0, false, {
          fileName: "app/components/MultiStepPreview.tsx",
          lineNumber: 99,
          columnNumber: 17
        }, this),
        f.options?.map((o) => /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("option", { value: o.value, children: o.label }, o.value, false, {
          fileName: "app/components/MultiStepPreview.tsx",
          lineNumber: 100,
          columnNumber: 38
        }, this))
      ] }, void 0, true, {
        fileName: "app/components/MultiStepPreview.tsx",
        lineNumber: 98,
        columnNumber: 39
      }, this),
      f.type === "checkbox" && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("input", { type: "checkbox", checked: values[f.id] || false, onChange: onChange(f), className: "mr-2" }, void 0, false, {
          fileName: "app/components/MultiStepPreview.tsx",
          lineNumber: 105,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-gray-700 dark:text-gray-200", children: f.helpText }, void 0, false, {
          fileName: "app/components/MultiStepPreview.tsx",
          lineNumber: 106,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/MultiStepPreview.tsx",
        lineNumber: 104,
        columnNumber: 39
      }, this),
      errors[f.id] && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-sm text-red-600 mt-1", children: errors[f.id] }, void 0, false, {
        fileName: "app/components/MultiStepPreview.tsx",
        lineNumber: 111,
        columnNumber: 30
      }, this)
    ] }, f.id, true, {
      fileName: "app/components/MultiStepPreview.tsx",
      lineNumber: 89,
      columnNumber: 30
    }, this)) }, void 0, false, {
      fileName: "app/components/MultiStepPreview.tsx",
      lineNumber: 88,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex justify-between mt-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("button", { onClick: goPrev, disabled: currentStepIdx === 0, className: `px-4 py-2 rounded ${currentStepIdx === 0 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-gray-600 text-white hover:bg-gray-700"}`, children: "\u2190 Previous" }, void 0, false, {
        fileName: "app/components/MultiStepPreview.tsx",
        lineNumber: 116,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("button", { onClick: goNext, className: "px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700", children: currentStepIdx === steps.length - 1 ? "Submit" : "Next \u2192" }, void 0, false, {
        fileName: "app/components/MultiStepPreview.tsx",
        lineNumber: 119,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/MultiStepPreview.tsx",
      lineNumber: 115,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/MultiStepPreview.tsx",
    lineNumber: 83,
    columnNumber: 10
  }, this);
}
_s5(MultiStepPreview, "2zZtrRStjUiX+jqMhUVIsPAB1jE=", false, function() {
  return [useFormStore, useFormStore];
});
_c6 = MultiStepPreview;
var _c6;
$RefreshReg$(_c6, "MultiStepPreview");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/TemplateLoader.tsx
var import_react9 = __toESM(require_react(), 1);

// app/utils/templates.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\utils\\templates.ts"
  );
  import.meta.hot.lastModified = "1748702835898.297";
}
var CONTACT_US = {
  title: "Contact Us",
  fields: [
    {
      // no `id` or `stepId` here—store will assign them
      type: "text",
      label: "Name",
      placeholder: "Your name",
      required: true,
      helpText: "",
      minLength: void 0,
      maxLength: void 0,
      pattern: "",
      options: void 0
    },
    {
      type: "text",
      label: "Email",
      placeholder: "you@example.com",
      required: true,
      helpText: "",
      minLength: void 0,
      maxLength: void 0,
      pattern: "\\S+@\\S+\\.\\S+",
      options: void 0
    },
    {
      type: "textarea",
      label: "Message",
      placeholder: "How can we help?",
      required: true,
      helpText: "",
      minLength: void 0,
      maxLength: void 0,
      pattern: "",
      options: void 0
    }
  ]
};
var FEEDBACK = {
  title: "Feedback",
  fields: [
    {
      type: "dropdown",
      label: "Rating",
      placeholder: void 0,
      required: true,
      helpText: "",
      options: [
        { label: "\u{1F44D} Good", value: "good" },
        { label: "\u{1F44E} Bad", value: "bad" }
      ],
      minLength: void 0,
      maxLength: void 0,
      pattern: ""
    },
    {
      type: "textarea",
      label: "Comments",
      placeholder: "Your comments\u2026",
      required: false,
      helpText: "Optional",
      options: void 0,
      minLength: void 0,
      maxLength: void 0,
      pattern: ""
    }
  ]
};

// app/components/TemplateLoader.tsx
var import_jsx_dev_runtime6 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\TemplateLoader.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s6 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\TemplateLoader.tsx"
  );
  import.meta.hot.lastModified = "1748703066872.9978";
}
var TEMPLATES = [{
  name: "Contact Us",
  data: CONTACT_US
}, {
  name: "Feedback",
  data: FEEDBACK
}];
function TemplateLoader() {
  _s6();
  const loadTemplate = useFormStore((s) => s.loadTemplate);
  const [choice, setChoice] = (0, import_react9.useState)(TEMPLATES[0].name);
  const apply = () => {
    const tpl = TEMPLATES.find((t) => t.name === choice);
    if (tpl) {
      loadTemplate(tpl.data);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "mb-6 space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h3", { className: "font-semibold", children: "Load Template" }, void 0, false, {
      fileName: "app/components/TemplateLoader.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("select", { value: choice, onChange: (e) => setChoice(e.target.value), className: "w-full border rounded p-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200", children: TEMPLATES.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("option", { value: t.name, children: t.name }, t.name, false, {
      fileName: "app/components/TemplateLoader.tsx",
      lineNumber: 47,
      columnNumber: 29
    }, this)) }, void 0, false, {
      fileName: "app/components/TemplateLoader.tsx",
      lineNumber: 46,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("button", { onClick: apply, className: "w-full bg-purple-600 text-white rounded px-2 py-1", children: "Load" }, void 0, false, {
      fileName: "app/components/TemplateLoader.tsx",
      lineNumber: 51,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/TemplateLoader.tsx",
    lineNumber: 44,
    columnNumber: 10
  }, this);
}
_s6(TemplateLoader, "zDVeMTDmOL5nTCaFTF1gloKTIbw=", false, function() {
  return [useFormStore];
});
_c7 = TemplateLoader;
var _c7;
$RefreshReg$(_c7, "TemplateLoader");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/SaveLoadControls.tsx
var import_react10 = __toESM(require_react(), 1);
var import_jsx_dev_runtime7 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\SaveLoadControls.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s7 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\SaveLoadControls.tsx"
  );
  import.meta.hot.lastModified = "1748707502290.8657";
}
function SaveLoadControls() {
  _s7();
  const saveToLocal = useFormStore((s) => s.saveToLocal);
  const loadFromLocal = useFormStore((s) => s.loadFromLocal);
  const [key2, setKey] = (0, import_react10.useState)("");
  const onSave = () => {
    if (!key2.trim()) {
      alert("Please enter a non-empty key to save.");
      return;
    }
    saveToLocal(key2.trim());
  };
  const onLoad = () => {
    if (!key2.trim()) {
      alert("Please enter a key to load.");
      return;
    }
    loadFromLocal(key2.trim());
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex space-x-2 items-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("input", { type: "text", placeholder: "form key", value: key2, onChange: (e) => setKey(e.target.value), className: "border rounded px-2 py-1 text-sm w-32 bg-gray-50 dark:bg-gray-700" }, void 0, false, {
      fileName: "app/components/SaveLoadControls.tsx",
      lineNumber: 46,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("button", { onClick: onSave, className: "bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700", children: "Save" }, void 0, false, {
      fileName: "app/components/SaveLoadControls.tsx",
      lineNumber: 47,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("button", { onClick: onLoad, className: "bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700", children: "Load" }, void 0, false, {
      fileName: "app/components/SaveLoadControls.tsx",
      lineNumber: 50,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/SaveLoadControls.tsx",
    lineNumber: 45,
    columnNumber: 10
  }, this);
}
_s7(SaveLoadControls, "VRsC0xB1Yg19nuueL4wOje1QHlA=", false, function() {
  return [useFormStore, useFormStore];
});
_c8 = SaveLoadControls;
var _c8;
$RefreshReg$(_c8, "SaveLoadControls");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/_index.tsx
var import_jsx_dev_runtime8 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s8 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_index.tsx"
  );
  import.meta.hot.lastModified = "1748707146136.577";
}
function Index() {
  _s8();
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);
  console.log("\u{1F504} [Index] render");
  const fields = useFormStore((s) => s.fields);
  const addField = useFormStore((s) => s.addField);
  const moveFieldWithinStep = useFormStore((s) => s.moveFieldWithinStep);
  const [mode, setMode] = (0, import_react11.useState)("desktop");
  const widths = {
    desktop: "w-[768px]",
    tablet: "w-[512px]",
    mobile: "w-[320px]"
  };
  const [overlayContent, setOverlayContent] = (0, import_react11.useState)(null);
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5
    }
  }), useSensor(MouseSensor));
  function handleDragStart(e) {
    const type = e.active.data.current?.type;
    if (type) {
      setOverlayContent(/* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "p-2 bg-blue-200 rounded", children: type }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 206,
        columnNumber: 25
      }, this));
    }
  }
  function handleDragEnd(e) {
    const {
      active,
      over
    } = e;
    setOverlayContent(null);
    if (active.data.current?.type) {
      addField(active.data.current.type);
      return;
    }
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      if (oldIndex > -1 && newIndex > -1) {
        moveFieldWithinStep(oldIndex, newIndex);
      }
    }
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("header", { className: "flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("h1", { className: "text-xl font-bold", children: "Multi-Step Form Builder" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 235,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 234,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex-1 flex justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(SaveLoadControls, {}, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 238,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 237,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex-1 flex justify-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("button", { onClick: toggle, className: "px-3 py-1 rounded bg-gray-200 dark:bg-gray-700", children: [
        theme === "light" ? "Dark" : "Light",
        " Mode"
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 241,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 240,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 233,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(DndContext, { sensors, collisionDetection: closestCenter, onDragStart: handleDragStart, onDragEnd: handleDragEnd, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("main", { className: "grid grid-cols-1 grid-rows-[auto_auto_auto] md:grid-cols-[280px_1fr_1.5fr] md:grid-rows-none gap-4 flex-1 p-4 overflow-hidden", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("aside", { className: "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 overflow-auto space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(TemplateLoader, {}, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 252,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(FieldPalette, {}, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 253,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(FieldConfigPanel, {}, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 254,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 251,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("section", { className: "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 overflow-auto flex flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(StepTabs, {}, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 259,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex-1 overflow-auto p-2 bg-gray-50 dark:bg-gray-900 rounded shadow", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(SortableContext, { items: fields.map((f) => f.id), strategy: verticalListSortingStrategy, children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(FieldCanvas, {}, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 262,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 261,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 260,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 258,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("section", { className: "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 overflow-auto flex flex-col items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "mb-4 space-x-2", children: ["desktop", "tablet", "mobile"].map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("button", { onClick: () => setMode(m), className: `px-2 py-1 border rounded ${mode === m ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`, children: m.charAt(0).toUpperCase() + m.slice(1) }, m, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 271,
            columnNumber: 57
          }, this)) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 270,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: `border p-4 ${widths[mode]} mx-auto`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(MultiStepPreview, {}, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 278,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 277,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 268,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 249,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(DragOverlay, { dropAnimation: {
        duration: 150
      }, children: overlayContent }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 283,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 248,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 231,
    columnNumber: 10
  }, this);
}
_s8(Index, "EjfUIOS7DRBlDzbOFguRc527UpQ=", false, function() {
  return [useThemeStore, useThemeStore, useFormStore, useFormStore, useFormStore, useSensors, useSensor, useSensor];
});
_c9 = Index;
var _c9;
$RefreshReg$(_c9, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default
};
//# sourceMappingURL=/build/routes/_index-QWCA5UMT.js.map
