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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LeadsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var leads_1 = require("@/components/admin/leads");
var use_mobile_1 = require("@/hooks/use-mobile");
function LeadsPage() {
  var _this = this;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  var _a = (0, react_1.useState)([
      {
        id: "lead-1",
        name: "John Doe",
        email: "john@example.com",
        companyId: "company-1",
        company: "Acme Corp",
        status: "new",
        score: 85,
        lastContact: "2025-04-01",
        created_at: "2025-03-15",
        campaign_id: "campaign-1",
      },
      {
        id: "lead-2",
        name: "Jane Smith",
        email: "jane@example.com",
        companyId: "company-2",
        company: "XYZ Inc",
        status: "contacted",
        score: 72,
        lastContact: "2025-03-25",
        created_at: "2025-03-10",
        campaign_id: "campaign-2",
      },
      {
        id: "lead-3",
        name: "Bob Johnson",
        email: "bob@example.com",
        companyId: "company-3",
        company: "Tech Solutions",
        status: "qualified",
        score: 90,
        lastContact: "2025-04-05",
        created_at: "2025-03-20",
        campaign_id: "campaign-1",
      },
    ]),
    leads = _a[0],
    setLeads = _a[1];
  var _b = (0, react_1.useState)("name"),
    sortBy = _b[0],
    setSortBy = _b[1];
  var _c = (0, react_1.useState)("asc"),
    sortOrder = _c[0],
    setSortOrder = _c[1];
  var handleSort = function (column) {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  var handleAddLead = function () {
    console.log("Add lead clicked");
  };
  var handleDeleteLead = function (leadId) {
    console.log("Delete lead", leadId);
    setLeads(function (prev) {
      return prev.filter(function (lead) {
        return lead.id !== leadId;
      });
    });
  };
  // Add mock implementation for required props
  var handleStatusUpdate = function (leadId, status) {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        console.log("Update lead status", leadId, status);
        return [2 /*return*/, true];
      });
    });
  };
  var handleDelete = function (leadId) {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        console.log("Delete lead", leadId);
        setLeads(function (prev) {
          return prev.filter(function (lead) {
            return lead.id !== leadId;
          });
        });
        return [2 /*return*/, true];
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)(leads_1.LeadsHeader, {
        isMobileView: isMobileView,
        onAddLead: handleAddLead,
      }),
      (0, jsx_runtime_1.jsx)(leads_1.LeadsTable, {
        leads: leads,
        sortBy: sortBy,
        sortOrder: sortOrder,
        onSort: handleSort,
        isMobileView: isMobileView,
        onStatusUpdate: handleStatusUpdate,
        onDelete: handleDelete,
      }),
    ],
  });
}
