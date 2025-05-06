"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationPrevious =
  exports.PaginationNext =
  exports.PaginationLink =
  exports.PaginationItem =
  exports.PaginationEllipsis =
  exports.PaginationContent =
  exports.Pagination =
    void 0;
var pagination_1 = require("@/components/ui/pagination");
Object.defineProperty(exports, "Pagination", {
  enumerable: true,
  get: function () {
    return pagination_1.Pagination;
  },
});
Object.defineProperty(exports, "PaginationContent", {
  enumerable: true,
  get: function () {
    return pagination_1.PaginationContent;
  },
});
Object.defineProperty(exports, "PaginationEllipsis", {
  enumerable: true,
  get: function () {
    return pagination_1.PaginationEllipsis;
  },
});
Object.defineProperty(exports, "PaginationItem", {
  enumerable: true,
  get: function () {
    return pagination_1.PaginationItem;
  },
});
Object.defineProperty(exports, "PaginationLink", {
  enumerable: true,
  get: function () {
    return pagination_1.PaginationLink;
  },
});
Object.defineProperty(exports, "PaginationNext", {
  enumerable: true,
  get: function () {
    return pagination_1.PaginationNext;
  },
});
Object.defineProperty(exports, "PaginationPrevious", {
  enumerable: true,
  get: function () {
    return pagination_1.PaginationPrevious;
  },
});
// Export default for components that import Pagination directly
exports.default = pagination_1.Pagination;
