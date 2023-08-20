"use strict";

var _react = _interopRequireDefault(require("react"));
var _addons = require("@storybook/addons");
var _api = require("@storybook/api");
var _components = require("@storybook/components");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ADDON_ID = 'storybook/addon-design-matcher';
var PANEL_ID = "".concat(ADDON_ID, "/panel");

// give a unique name for the panel
var DesignMatcherContainer = function DesignMatcherContainer() {
  var value = (0, _api.useParameter)("design", null);
  var item = value ? value.data : "No figma file found";
  return /*#__PURE__*/_react["default"].createElement("div", null, "This component has a figma file: ", item.url);
};
_addons.addons.register(ADDON_ID, function (api) {
  _addons.addons.add(PANEL_ID, {
    type: _addons.types.PANEL,
    title: 'Matcher for design',
    render: function render(_ref) {
      var active = _ref.active,
        key = _ref.key;
      return /*#__PURE__*/_react["default"].createElement(_components.AddonPanel, {
        active: active,
        key: key
      }, /*#__PURE__*/_react["default"].createElement(DesignMatcherContainer, null));
    }
  });
});