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
exports.default = AdminCompanies;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var PageErrorBoundary_1 = require("@/components/errorHandling/PageErrorBoundary");
var companies_1 = require("@/components/admin/companies");
var EntityListSkeleton_1 = require("@/components/admin/EntityListSkeleton");
var useCompanyManagement_1 = require("@/hooks/admin/useCompanyManagement");
var sonner_1 = require("sonner");
function AdminCompanies() {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    isCreateDialogOpen = _a[0],
    setIsCreateDialogOpen = _a[1];
  var _b = (0, useCompanyManagement_1.useCompanyManagement)(),
    companies = _b.companies,
    isLoading = _b.isLoading,
    loadCompanies = _b.loadCompanies,
    updateCompany = _b.updateCompany,
    deleteCompany = _b.deleteCompany;
  (0, react_1.useEffect)(
    function () {
      loadCompanies();
    },
    [loadCompanies],
  );
  var handleViewUsers = function (companyId) {
    // In a real implementation, this would navigate to a filtered users view
    console.log("View users for company:", companyId);
    sonner_1.toast.info("Viewing users for company ".concat(companyId));
  };
  var handleCreateCompany = function (companyData) {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        try {
          // In a real implementation, this would call an API to create the company
          console.log("Create company:", companyData);
          sonner_1.toast.success("Company created successfully");
          setIsCreateDialogOpen(false);
          loadCompanies();
          return [2 /*return*/, Promise.resolve()];
        } catch (error) {
          sonner_1.toast.error("Failed to create company");
          return [2 /*return*/, Promise.reject(error)];
        }
        return [2 /*return*/];
      });
    });
  };
  var handleEditCompany = function (company) {
    console.log("Edit company:", company);
    sonner_1.toast.info("Editing company ".concat(company.name));
  };
  var handleDeleteCompany = function (companyId) {
    if (window.confirm("Are you sure you want to delete this company?")) {
      deleteCompany(companyId);
      sonner_1.toast.success("Company deleted successfully");
    }
  };
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)(EntityListSkeleton_1.EntityListSkeleton, {});
  }
  return (0, jsx_runtime_1.jsx)(PageErrorBoundary_1.PageErrorBoundary, {
    pageName: "Company Management",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "space-y-6",
      children: [
        (0, jsx_runtime_1.jsx)(companies_1.CompanyHeader, {
          onAddCompanyClick: function () {
            return setIsCreateDialogOpen(true);
          },
        }),
        (0, jsx_runtime_1.jsx)(companies_1.CompanyTable, {
          companies: companies,
          isLoading: isLoading,
          onViewUsers: handleViewUsers,
          onEditCompany: handleEditCompany,
          onDeleteCompany: handleDeleteCompany,
        }),
        (0, jsx_runtime_1.jsx)(companies_1.CreateCompanyDialog, {
          open: isCreateDialogOpen,
          onOpenChange: setIsCreateDialogOpen,
          onCreateCompany: handleCreateCompany,
        }),
      ],
    }),
  });
}
