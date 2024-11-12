"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const phone = common_vendor.ref("");
    const password = common_vendor.ref("");
    function onLogin() {
      if (!phone.value || !password.value) {
        alert("请输入手机号和密码");
      } else {
        alert("登录成功");
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$9,
        b: phone.value,
        c: common_vendor.o(($event) => phone.value = $event.detail.value),
        d: password.value,
        e: common_vendor.o(($event) => password.value = $event.detail.value),
        f: common_vendor.o(onLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
