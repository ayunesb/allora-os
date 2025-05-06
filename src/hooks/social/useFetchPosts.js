"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
var useFetchPosts = function (options) {
  if (options === void 0) {
    options = {};
  }
  var _a = (0, react_1.useState)([]),
    posts = _a[0],
    setPosts = _a[1];
  var _b = (0, react_1.useState)(false),
    loading = _b[0],
    setLoading = _b[1];
  var _c = (0, react_1.useState)(null),
    error = _c[0],
    setError = _c[1];
  var _d = (0, react_1.useState)(options.initialFilters || {}),
    filters = _d[0],
    setFilters = _d[1];
  var fetchPosts = (0, react_1.useCallback)(
    function (newFilters) {
      return __awaiter(void 0, void 0, void 0, function () {
        var activeFilters,
          query,
          searchTerm,
          dateRange,
          _a,
          data,
          error_1,
          err_1;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              activeFilters = newFilters || filters;
              setLoading(true);
              setError(null);
              _b.label = 1;
            case 1:
              _b.trys.push([1, 3, 4, 5]);
              console.log("Fetching posts with filters:", activeFilters);
              query = client_1.supabase.from("social_media_posts").select("*");
              // Apply filters
              if (activeFilters.platform) {
                query = query.eq("platform", activeFilters.platform);
              }
              if (activeFilters.content_type) {
                query = query.eq("content_type", activeFilters.content_type);
              }
              if (activeFilters.status) {
                query = query.eq("status", activeFilters.status);
              }
              if (activeFilters.campaign_id) {
                query = query.eq("campaign_id", activeFilters.campaign_id);
              }
              if (activeFilters.search_query || activeFilters.search) {
                searchTerm = activeFilters.search_query || activeFilters.search;
                query = query.or(
                  "title.ilike.%"
                    .concat(searchTerm, "%,content.ilike.%")
                    .concat(searchTerm, "%"),
                );
              }
              dateRange = activeFilters.dateRange || activeFilters.date_range;
              if (dateRange && dateRange[0] && dateRange[1]) {
                query = query.gte("scheduled_date", dateRange[0].toISOString());
                query = query.lte("scheduled_date", dateRange[1].toISOString());
              }
              return [
                4 /*yield*/,
                query.order("scheduled_date", { ascending: true }),
              ];
            case 2:
              (_a = _b.sent()), (data = _a.data), (error_1 = _a.error);
              if (error_1) throw error_1;
              console.log("Fetched posts:", data);
              setPosts(data);
              return [3 /*break*/, 5];
            case 3:
              err_1 = _b.sent();
              console.error("Error fetching social media posts:", err_1);
              setError(
                err_1 instanceof Error
                  ? err_1.message
                  : "Failed to fetch posts",
              );
              sonner_1.toast.error("Failed to load social media posts");
              return [3 /*break*/, 5];
            case 4:
              setLoading(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [filters],
  );
  var updateFilters = (0, react_1.useCallback)(function (newFilters) {
    setFilters(function (prev) {
      return __assign(__assign({}, prev), newFilters);
    });
  }, []);
  var clearFilters = (0, react_1.useCallback)(function () {
    setFilters({});
  }, []);
  // Initial fetch
  (0, react_1.useEffect)(
    function () {
      if (options.enabled !== false) {
        fetchPosts();
      }
    },
    [fetchPosts, options.enabled],
  );
  return {
    posts: posts,
    loading: loading,
    isLoading: loading,
    error: error,
    filters: filters,
    updateFilters: updateFilters,
    clearFilters: clearFilters,
    fetchPosts: fetchPosts,
    refreshPosts: fetchPosts,
  };
};
exports.default = useFetchPosts;
