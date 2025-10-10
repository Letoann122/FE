<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-3 shadow-sm border">
        <div
          class="mt-3 m-3 shadow-sm d-flex align-items-center justify-content-center"
          style="width: 200px; height: 30px"
        >
          <a href="" style="text-decoration: none">
            <i class="bi bi-person-fill"></i>
            <p class="ms-2 d-inline">Hồ sơ cá nhân</p>
          </a>
        </div>

        <div
          class="mt-3 m-3 shadow-sm d-flex align-items-center justify-content-center"
          style="width: 200px; height: 30px"
        >
          <a href="" style="text-decoration: none">
            <i class="bi bi-arrow-counterclockwise"></i>
            <p class="ms-2 d-inline">Lịch sử hiến máu</p>
          </a>
        </div>

        <div
          class="mt-3 m-3 shadow-sm d-flex align-items-center justify-content-center"
          style="width: 200px; height: 30px; background-color: antiquewhite"
        >
          <a href="" style="text-decoration: none">
            <i class="bi bi-shield-shaded text-danger"></i>
            <p class="ms-2 d-inline text-danger">Bảo mật tài khoản</p>
          </a>
        </div>
      </div>

      <div class="col-md-9 shadow-sm border">
        <div class="ms-4 mt-3">
          <h5 class="d-inline fw-bold">Quản lý bảo mật tài khoản</h5>
          <p>Quản lý mật khẩu và các thiết lập bảo mật của bạn</p>
        </div>

        <div>
          <div class="card shadow-sm border-0 rounded-4 mb-4 p-4">
            <h5 class="mb-3 text-danger">
              <i class="bi bi-shield-lock-fill me-2"></i>Xác minh bảo mật
            </h5>

            <div class="row align-items-center mb-3 ms-3">
              <div class="col">
                <label class="fw-semibold" for="emailVerification">
                  Xác minh email
                </label>
                <p class="text-muted small mb-0">
                  Nhận thông báo qua email khi có hoạt động đăng nhập bất
                  thường.
                </p>
              </div>
              <div class="col-auto">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="emailVerification"
                    v-model="verify.email"
                  />
                </div>
              </div>
            </div>

            <div class="row align-items-center ms-3">
              <div class="col">
                <label class="fw-semibold" for="smsVerification">
                  Xác minh số điện thoại (OTP SMS)
                </label>
                <p class="text-muted small mb-0">
                  Nhận mã OTP qua SMS để xác thực đăng nhập.
                </p>
              </div>
              <div class="col-auto">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="smsVerification"
                    v-model="verify.sms"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card shadow-sm border-0 rounded-4 p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="text-danger mb-0">
              <i class="bi bi-laptop me-2"></i>Quản lý thiết bị đăng nhập
            </h5>
            <button class="btn btn-danger btn-sm">
              <i class="bi bi-box-arrow-right me-1"></i>Đăng xuất tất cả thiết
              bị khác
            </button>
          </div>

          <div class="table-responsive">
            <table class="table align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Thiết bị</th>
                  <th>Hệ điều hành</th>
                  <th>Địa điểm</th>
                  <th>Lần đăng nhập cuối</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(device, index) in devices" :key="index">
                  <td>
                    <i
                      class="bi bi-laptop me-2"
                      v-if="device.type === 'Laptop'"
                    ></i>
                    <i class="bi bi-phone me-2" v-else></i>
                    {{ device.name }}
                    <span
                      v-if="device.current"
                      class="badge bg-success bg-opacity-10 text-success ms-2"
                    >
                      Hiện tại
                    </span>
                  </td>
                  <td>{{ device.os }}</td>
                  <td>{{ device.location }}</td>
                  <td>{{ device.lastLogin }}</td>
                  <td>
                    <span v-if="device.current" class="text-muted small">
                      Thiết bị hiện tại
                    </span>
                    <button
                      v-else
                      class="btn btn-outline-secondary btn-sm"
                      @click="logoutDevice(device)"
                    >
                      Đăng xuất
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaoMat",
  data() {
    return {
      verify: {
        email: false,
        sms: false,
      },
      devices: [
        {
          name: "Laptop Acer",
          type: "Laptop",
          os: "Windows 11",
          location: "Đà Nẵng, VN",
          lastLogin: "12/09/2025 - 09:15",
          current: true,
        },
        {
          name: "iPhone 13",
          type: "Phone",
          os: "iOS 18",
          location: "Huế, VN",
          lastLogin: "11/09/2025 - 21:40",
          current: false,
        },
      ],
    };
  },
  methods: {
    logoutDevice(device) {
      alert(`Đăng xuất thiết bị: ${device.name}`);
    },
  },
};
</script>

<style scoped>
.badge {
  font-size: 0.8rem;
  border-radius: 6px;
  padding: 4px 8px;
}
.form-check-input {
  width: 2em;
  height: 1em;
}
.table td,
.table th {
  vertical-align: middle;
}
</style>
