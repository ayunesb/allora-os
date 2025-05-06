"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookHistoryPagination = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var WebhookHistoryPagination = function (_a) {
  var currentPage = _a.currentPage,
    totalPages = _a.totalPages,
    onPageChange = _a.onPageChange;
  var handleFirstPage = function () {
    return onPageChange(1);
  };
  var handlePrevPage = function () {
    return onPageChange(Math.max(1, currentPage - 1));
  };
  var handleNextPage = function () {
    return onPageChange(Math.min(totalPages, currentPage + 1));
  };
  var handleLastPage = function () {
    return onPageChange(totalPages);
  };
  var canGoPrev = currentPage > 1;
  var canGoNext = currentPage < totalPages;
  var getPaginationItems = function () {
    var items = [];
    var maxVisiblePages = 5;
    // Always show first page
    items.push(1);
    // Calculate range of visible pages
    var startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    var endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 2);
    // Adjust if we're at the end
    if (endPage - startPage < maxVisiblePages - 2) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 2));
    }
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      items.push("ellipsis1");
    }
    // Add visible pages
    for (var i = startPage; i <= endPage; i++) {
      items.push(i);
    }
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      items.push("ellipsis2");
    }
    // Always show last page if it's not the first page
    if (totalPages > 1) {
      items.push(totalPages);
    }
    return items;
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex items-center gap-1",
    children: [
      (0, jsx_runtime_1.jsx)(button_1.Button, {
        variant: "outline",
        size: "icon",
        onClick: handleFirstPage,
        disabled: !canGoPrev,
        className: "h-8 w-8",
        children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronsLeft, {
          className: "h-4 w-4",
        }),
      }),
      (0, jsx_runtime_1.jsx)(button_1.Button, {
        variant: "outline",
        size: "icon",
        onClick: handlePrevPage,
        disabled: !canGoPrev,
        className: "h-8 w-8",
        children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, {
          className: "h-4 w-4",
        }),
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "flex items-center gap-1 px-1",
        children: getPaginationItems().map(function (item, index) {
          return (0, jsx_runtime_1.jsx)(
            react_1.default.Fragment,
            {
              children:
                item === "ellipsis1" || item === "ellipsis2"
                  ? (0, jsx_runtime_1.jsx)("div", {
                      className: "px-2 py-1",
                      children: "...",
                    })
                  : (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: currentPage === item ? "default" : "outline",
                      size: "sm",
                      className: "h-8 w-8",
                      onClick: function () {
                        return typeof item === "number" && onPageChange(item);
                      },
                      children: item,
                    }),
            },
            index,
          );
        }),
      }),
      (0, jsx_runtime_1.jsx)(button_1.Button, {
        variant: "outline",
        size: "icon",
        onClick: handleNextPage,
        disabled: !canGoNext,
        className: "h-8 w-8",
        children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, {
          className: "h-4 w-4",
        }),
      }),
      (0, jsx_runtime_1.jsx)(button_1.Button, {
        variant: "outline",
        size: "icon",
        onClick: handleLastPage,
        disabled: !canGoNext,
        className: "h-8 w-8",
        children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronsRight, {
          className: "h-4 w-4",
        }),
      }),
    ],
  });
};
exports.WebhookHistoryPagination = WebhookHistoryPagination;
