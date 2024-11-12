"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "register",
  setup(__props) {
    const phone = common_vendor.ref("");
    const verificationCode = common_vendor.ref("");
    const password = common_vendor.ref("");
    const confirmPassword = common_vendor.ref("");
    common_vendor.ref("");
    const router = common_vendor.useRouter();
    function navigateToLogin() {
      router.push({ name: "Login" });
    }
    function getVerificationCode() {
      if (!phone.value) {
        alert("请输入手机号");
        return;
      }
      alert("验证码已发送到您的手机号");
    }
    function onRegister() {
      if (!phone.value || !verificationCode.value || !password.value || !confirmPassword.value) {
        alert("请完整填写所有信息");
        return;
      }
      if (password.value !== confirmPassword.value) {
        alert("两次输入的密码不一致");
        return;
      }
      const registrationData = {
        phone: phone.value,
        verificationCode: verificationCode.value,
        password: password.value
      };
      fetch("https://your-backend-api.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registrationData)
      }).then((response) => response.json()).then((data) => {
        if (data.success) {
          alert("注册成功！");
          navigateToLogin();
        } else {
          alert(`注册失败: ${data.message}`);
        }
      }).catch((error) => {
        console.error("注册请求失败:", error);
        alert("注册请求失败，请稍后再试");
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$8,
        b: phone.value,
        c: common_vendor.o(($event) => phone.value = $event.detail.value),
        d: verificationCode.value,
        e: common_vendor.o(($event) => verificationCode.value = $event.detail.value),
        f: common_vendor.o(getVerificationCode),
        g: password.value,
        h: common_vendor.o(($event) => password.value = $event.detail.value),
        i: confirmPassword.value,
        j: common_vendor.o(($event) => confirmPassword.value = $event.detail.value),
        k: common_vendor.o(onRegister)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bac4a35d"]]);
wx.createPage(MiniProgramPage);
