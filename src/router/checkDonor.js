import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: "top-right" });

export default function (to, from, next) {
    if (import.meta.env.VITE_SKIP_TOKEN === "true") {
    console.log("⚙️ DEV MODE: Bỏ qua checkToken (admin)");
    return next();
  }
  const token = localStorage.getItem("token_donor");
  if (!token) {
    toaster.error("Vui lòng đăng nhập tài khoản người hiến máu!");
    return next("/dang-nhap");
  }

  axios
    .get("http://localhost:4000/api/donor/check-token", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.status) {
        localStorage.setItem("ho_ten_donor", res.data.ho_ten);
        localStorage.setItem("email_donor", res.data.email);
        next();
      } else {
        toaster.error(res.data.message || "Phiên đăng nhập hết hạn!");
        next("/dang-nhap");
      }
    })
    .catch(() => {
      toaster.error("Không thể xác thực tài khoản người hiến máu!");
      next("/dang-nhap");
    });
}
