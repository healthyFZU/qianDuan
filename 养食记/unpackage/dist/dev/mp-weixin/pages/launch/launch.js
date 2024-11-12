"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "launch",
  setup(__props) {
    function onImageClick() {
      common_vendor.wx$1.navigateTo({
        url: "/pages/main/main"
        // 假设跳转到的页面路径是 '/pages/main/main'
      });
    }
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(onImageClick)
      };
    };
  }
};
wx.createPage(_sfc_main);
