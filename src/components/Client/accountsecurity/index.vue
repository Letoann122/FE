<template>
  <div class="container my-5">
    <div class="row">
      
      <div class="col-md-3">
        <div
          class="sidebar bg-white border rounded-4 shadow-sm py-3"
          style="height: 725px;"
        >
          <router-link
            to="/profile"
            class="menu-item d-flex align-items-center px-3 py-2 rounded mb-2"
            active-class="active-tab"
          >
            <i class="bi bi-person-fill me-2"></i>
            <span>Hồ sơ cá nhân</span>
          </router-link>

          <router-link
            to="/blood-donation-history"
            class="menu-item d-flex align-items-center px-3 py-2 rounded mb-2"
            active-class="active-tab"
          >
            <i class="bi bi-arrow-counterclockwise me-2"></i>
            <span>Lịch sử hiến máu</span>
          </router-link>

          <router-link
            to="/account-security"
            class="menu-item d-flex align-items-center px-3 py-2 rounded mb-2"
            active-class="active-tab"
          >
            <i class="bi bi-shield-shaded me-2"></i>
            <span>Bảo mật tài khoản</span>
          </router-link>
        </div>
      </div>

      
      <div class="col-md-9">
        <div class="shadow-sm border bg-white rounded-4 p-4">
          <h5 class="fw-bold mb-1">Quản lý bảo mật tài khoản</h5>
          <p class="text-muted">
            Quản lý mật khẩu và các thiết lập bảo mật của bạn
          </p>

          
          <div class="card shadow-sm border-0 rounded-4 mb-4 p-4">
            <h6 class="fw-bold text-danger mb-3">
              <i class="bi bi-shield-lock-fill me-2"></i>Xác minh bảo mật
            </h6>

            <div class="row align-items-center mb-3">
              <div class="col">
                <p class="fw-semibold mb-1">Xác minh email</p>
                <p class="text-muted small mb-0">
                  Nhận thông báo qua email khi có hoạt động đăng nhập bất thường.
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

            <div class="row align-items-center">
              <div class="col">
                <p class="fw-semibold mb-1">Xác minh số điện thoại (OTP SMS)</p>
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

          <!-- Khối quản lý thiết bị -->
          <div class="card shadow-sm border-0 rounded-4 p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h6 class="fw-bold text-danger mb-0">
                <i class="bi bi-laptop me-2"></i>Quản lý thiết bị đăng nhập
              </h6>
              <button class="btn btn-danger btn-sm">
                <i class="bi bi-box-arrow-right me-1"></i>Đăng xuất tất cả thiết bị khác
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
  </div>
</template>

<script>
export default {
  name: "BaoMatTaiKhoan",
  data() {
    return {
      verify: { email: false, sms: false },
      devices: [
        {
          name: "Laptop Dell",
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
.sidebar {
  min-height: 100%;
}

.menu-item {
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 8px;
  transition: 0.3s;
  font-weight: 500;
}

.menu-item:hover {
  background-color: #f8f9fa;
}

.active-tab {
  background-color: #fff0f0 !important;
  color: #dc3545 !important;
  font-weight: 600;
  border-left: 4px solid #dc3545;
}


.table td,
.table th {
  vertical-align: middle;
}
.badge {
  font-size: 0.8rem;
  border-radius: 6px;
  padding: 4px 8px;
}
.form-check-input {
  width: 2em;
  height: 1em;
}
</style>
