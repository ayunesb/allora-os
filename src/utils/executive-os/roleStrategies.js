"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultStrategicFocuses = void 0;
exports.determineStrategicFocus = determineStrategicFocus;
// Default strategic focuses for various executive roles
exports.defaultStrategicFocuses = {
  ceo: "Aligning company vision with market opportunities",
  cfo: "Optimizing capital allocation for growth and stability",
  cmo: "Enhancing brand positioning and customer acquisition channels",
  cio: "Accelerating digital transformation initiatives",
  cto: "Developing technological competitive advantages",
  chro: "Building high-performance organizational culture",
  strategy: "Identifying new market opportunities and competitive advantages",
  sales: "Optimizing sales pipeline and conversion processes",
  operations: "Streamlining operational efficiency and scalability",
};
/**
 * Determines the strategic focus based on the executive's role
 */
function determineStrategicFocus(role) {
  var roleLower = role.toLowerCase();
  var strategicFocus = "Optimizing business performance and innovation";
  for (
    var _i = 0, _a = Object.entries(exports.defaultStrategicFocuses);
    _i < _a.length;
    _i++
  ) {
    var _b = _a[_i],
      roleKey = _b[0],
      focus_1 = _b[1];
    if (roleLower.includes(roleKey)) {
      strategicFocus = focus_1;
      break;
    }
  }
  return strategicFocus;
}
