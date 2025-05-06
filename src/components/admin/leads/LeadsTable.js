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
exports.LeadsTable = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var table_1 = require("@/components/ui/table");
var LeadStatusBadge_1 = require("./LeadStatusBadge");
var LeadActions_1 = require("./LeadActions");
var LeadsTable = function (_a) {
  var leads = _a.leads,
    sortBy = _a.sortBy,
    sortOrder = _a.sortOrder,
    onSort = _a.onSort,
    onStatusUpdate = _a.onStatusUpdate,
    onDelete = _a.onDelete,
    isMobileView = _a.isMobileView;
  // Handle status update with void return to match component props
  var handleStatusUpdate = function (leadId, status) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, onStatusUpdate(leadId, status)];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  // Handle delete with void return to match component props
  var handleDelete = function (leadId) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, onDelete(leadId)];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)(table_1.Table, {
    children: [
      (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
        children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
          children: [
            (0, jsx_runtime_1.jsx)(table_1.TableHead, {
              className: "w-[200px] cursor-pointer",
              onClick: function () {
                return onSort("name");
              },
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center",
                children: [
                  "Name",
                  (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpDown, {
                    className: "h-4 w-4 ml-1",
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Email" }),
            (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Phone" }),
            (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Status" }),
            (0, jsx_runtime_1.jsx)(table_1.TableHead, {
              className: "cursor-pointer",
              onClick: function () {
                return onSort("created_at");
              },
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center",
                children: [
                  "Created",
                  (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpDown, {
                    className: "h-4 w-4 ml-1",
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsx)(table_1.TableHead, {
              className: "text-right",
              children: "Actions",
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(table_1.TableBody, {
        children:
          leads.length === 0
            ? (0, jsx_runtime_1.jsx)(table_1.TableRow, {
                children: (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                  colSpan: 6,
                  className: "text-center py-8 text-muted-foreground",
                  children: "No leads found",
                }),
              })
            : leads.map(function (lead) {
                return (0, jsx_runtime_1.jsxs)(
                  table_1.TableRow,
                  {
                    children: [
                      (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                        className: "font-medium",
                        children: lead.name,
                      }),
                      (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                        children: lead.email,
                      }),
                      (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                        children: lead.phone,
                      }),
                      (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                        children: (0, jsx_runtime_1.jsx)(
                          LeadStatusBadge_1.LeadStatusBadge,
                          { status: lead.status },
                        ),
                      }),
                      (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                        children: new Date(
                          lead.created_at,
                        ).toLocaleDateString(),
                      }),
                      (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                        className: "text-right",
                        children: (0, jsx_runtime_1.jsx)(
                          LeadActions_1.LeadActions,
                          {
                            leadId: lead.id,
                            onStatusUpdate: handleStatusUpdate,
                            onDelete: handleDelete,
                          },
                        ),
                      }),
                    ],
                  },
                  lead.id,
                );
              }),
      }),
    ],
  });
};
exports.LeadsTable = LeadsTable;
