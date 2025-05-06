"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWebhookHistory = void 0;
var react_1 = require("react");
var useWebhookHistory = function () {
  var _a = (0, react_1.useState)([]),
    events = _a[0],
    setEvents = _a[1];
  var _b = (0, react_1.useState)([]),
    filteredEvents = _b[0],
    setFilteredEvents = _b[1];
  var _c = (0, react_1.useState)(true),
    isLoading = _c[0],
    setIsLoading = _c[1];
  var _d = (0, react_1.useState)(null),
    error = _d[0],
    setError = _d[1];
  var _e = (0, react_1.useState)(""),
    searchTerm = _e[0],
    setSearchTerm = _e[1];
  var _f = (0, react_1.useState)("all"),
    statusFilter = _f[0],
    setStatusFilter = _f[1];
  var _g = (0, react_1.useState)("all"),
    typeFilter = _g[0],
    setTypeFilter = _g[1];
  var _h = (0, react_1.useState)(1),
    currentPage = _h[0],
    setCurrentPage = _h[1];
  var ITEMS_PER_PAGE = 10;
  (0, react_1.useEffect)(function () {
    var fetchEvents = function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var webhookEvents;
        return __generator(this, function (_a) {
          setIsLoading(true);
          try {
            webhookEvents = [
              {
                id: "1",
                webhook_id: "wh_123",
                event_type: "test_event",
                webhookType: "zapier",
                webhook_type: "zapier",
                status: "success",
                payload: { test: true },
                created_at: new Date().toISOString(),
                timestamp: new Date().toISOString(),
                targetUrl:
                  "https://hooks.zapier.com/hooks/catch/123456/abcdef/",
              },
              {
                id: "2",
                webhook_id: "wh_456",
                event_type: "campaign_created",
                webhookType: "slack",
                webhook_type: "slack",
                status: "failed",
                payload: { campaign: "Summer Sale" },
                created_at: new Date().toISOString(),
                timestamp: new Date().toISOString(),
                targetUrl:
                  "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
              },
            ];
            setEvents(webhookEvents);
            setFilteredEvents(webhookEvents);
          } catch (err) {
            setError("Failed to load webhook history.");
            console.error(err);
          } finally {
            setIsLoading(false);
          }
          return [2 /*return*/];
        });
      });
    };
    fetchEvents();
  }, []);
  (0, react_1.useEffect)(
    function () {
      var result = __spreadArray([], events, true);
      // Apply search filter
      if (searchTerm) {
        result = result.filter(function (event) {
          var _a, _b, _c;
          return (
            ((_a = event.targetUrl) === null || _a === void 0
              ? void 0
              : _a.toLowerCase().includes(searchTerm.toLowerCase())) ||
            ((_b = event.event_type) === null || _b === void 0
              ? void 0
              : _b.toLowerCase().includes(searchTerm.toLowerCase())) ||
            ((_c = event.webhookType) === null || _c === void 0
              ? void 0
              : _c.toLowerCase().includes(searchTerm.toLowerCase()))
          );
        });
      }
      // Apply status filter
      if (statusFilter !== "all") {
        result = result.filter(function (event) {
          return event.status === statusFilter;
        });
      }
      // Apply type filter
      if (typeFilter !== "all") {
        result = result.filter(function (event) {
          return event.webhookType === typeFilter;
        });
      }
      setFilteredEvents(result);
      setCurrentPage(1); // Reset to first page when filters change
    },
    [searchTerm, statusFilter, typeFilter, events],
  );
  // Calculate pagination
  var totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  var paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  return {
    events: events,
    filteredEvents: filteredEvents,
    isLoading: isLoading,
    error: error,
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
    statusFilter: statusFilter,
    setStatusFilter: setStatusFilter,
    typeFilter: typeFilter,
    setTypeFilter: setTypeFilter,
    currentPage: currentPage,
    setCurrentPage: setCurrentPage,
    totalPages: totalPages,
    paginatedEvents: paginatedEvents,
  };
};
exports.useWebhookHistory = useWebhookHistory;
