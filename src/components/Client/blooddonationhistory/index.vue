<template>
  <div class="container my-5">
    <div class="row d-flex align-items-stretch">
      <div class="col-md-3" >
        <div class="sidebar bg-white border rounded-4 shadow-sm p-4 h-100">
          <router-link
            v-for="(item, index) in menu"
            :key="index"
            :to="item.route"
            class="menu-item d-flex align-items-center px-3 py-2 rounded mb-2 text-decoration-none"
            :class="{ active: $route.path === item.route }"
          >
            <i :class="item.icon" class="me-2"></i>
            <span>{{ item.label }}</span>
          </router-link>
        </div>
      </div>

      <div class="col-md-9">
        <div class="card shadow-sm border-0 rounded-4 bg-white p-4 h-100">
          <div class="mb-3">
            <i class="bi bi-arrow-counterclockwise fs-3 text-danger"></i>
            <h5 class="d-inline ms-2 fw-bold">Lịch sử hiến máu</h5>
            <p class="text-muted mb-0">
              Theo dõi toàn bộ hành trình hiến máu của bạn
            </p>
          </div>

          <div class="row g-3 mb-4">
            <div v-for="(item, index) in stats" :key="index" class="col-md-4">
              <div
                class="card border-0 shadow-sm rounded-4 py-3 px-4 d-flex align-items-center"
              >
                <div
                  :class="[
                    'icon-box rounded-circle d-flex align-items-center justify-content-center me-3',
                    item.bg,
                  ]"
                  style="width: 45px; height: 45px"
                >
                  <i :class="item.icon" class="fs-5"></i>
                </div>
                <div>
                  <p class="mb-1 text-muted small">{{ item.label }}</p>
                  <h5 class="fw-bold mb-0">{{ item.value }}</h5>
                </div>
              </div>
            </div>
          </div>

          <div class="card border-0 shadow-sm rounded-4 mb-4 p-3">
            <div class="row g-2 align-items-center">
              <div class="col-md-2">
                <select class="form-select">
                  <option selected>Tất cả năm</option>
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                </select>
              </div>
              <div class="col-md-2">
                <select class="form-select">
                  <option selected>Tất cả tháng</option>
                  <option>Tháng 1</option>
                  <option>Tháng 2</option>
                  <option>Tháng 3</option>
                </select>
              </div>
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Tìm kiếm theo địa điểm..."
                />
              </div>
              <div class="col-md-2 text-end">
                <button class="btn btn-danger w-100" style="height: 40px;">
                  <i class="bi bi-download me-2"></i>Xuất dữ liệu
                </button>
              </div>
            </div>
          </div>

          <div class="card border-0 shadow-sm rounded-4">
            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th><i class="bi bi-calendar3 me-2"></i>Ngày hiến</th>
                    <th><i class="bi bi-geo-alt me-2"></i>Địa điểm</th>
                    <th><i class="bi bi-droplet me-2"></i>Số lượng máu</th>
                    <th><i class="bi bi-chat-square-text me-2"></i>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in donations" :key="index">
                    <td>{{ item.date }}</td>
                    <td>{{ item.location }}</td>
                    <td>
                      <span
                        class="badge bg-light text-danger fw-semibold px-3 py-2"
                        >{{ item.amount }}</span
                      >
                    </td>
                    <td>{{ item.note }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="p-3 text-muted small border-top">
              Hiển thị {{ donations.length }} kết quả
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LichSuHienMau",
  data() {
    return {
      menu: [
        {
          label: "Hồ sơ cá nhân",
          icon: "bi bi-person-fill text-danger",
          route: "/profile",
        },
        {
          label: "Lịch sử hiến máu",
          icon: "bi bi-arrow-counterclockwise text-danger",
          route: "/blood-donation-history",
        },
        {
          label: "Bảo mật tài khoản",
          icon: "bi bi-shield-shaded text-danger",
          route: "/account-security",
        },
      ],

      stats: [
        {
          label: "Tổng số lần hiến",
          value: "12 lần",
          icon: "bi bi-droplet-fill text-danger",
          bg: "bg-light-danger",
        },
        {
          label: "Tổng lượng máu",
          value: "4,200ml",
          icon: "bi bi-beaker-fill text-primary",
          bg: "bg-light-primary",
        },
        {
          label: "Lần hiến gần nhất",
          value: "05/01/2025",
          icon: "bi bi-calendar-check text-success",
          bg: "bg-light-success",
        },
      ],

      donations: [
        {
          date: "05/01/2025",
          location: "Trung tâm Hiến máu Huế",
          amount: "450ml",
          note: "Sức khỏe tốt",
        },
        {
          date: "12/08/2024",
          location: "BV Đa khoa Đà Nẵng",
          amount: "350ml",
          note: "Hiến máu tình nguyện",
        },
        {
          date: "15/06/2024",
          location: "Bệnh viện Chợ Rẫy",
          amount: "400ml",
          note: "Chiến dịch Chủ nhật đỏ",
        },
        {
          date: "20/03/2024",
          location: "Trung tâm Y tế Quận 1",
          amount: "350ml",
          note: "Hiến máu định kỳ",
        },
      ],
    };
  },
};
</script>

<style scoped>
body {
  background-color: #f9fafc;
}

.menu-item {
  display: flex;
  align-items: center;
  color: #333;
  font-weight: 500;
  transition: 0.3s;
}
.menu-item.active {
  background-color: #fff0f0;
  color: #dc3545;
  font-weight: 600;
  border-left: 4px solid #dc3545;
}
.menu-item:hover {
  background-color: #f8f9fa;
}

.bg-light-danger {
  background-color: rgba(255, 99, 132, 0.1);
}
.bg-light-primary {
  background-color: rgba(54, 162, 235, 0.1);
}
.bg-light-success {
  background-color: rgba(75, 192, 192, 0.1);
}

.table th {
  font-weight: 600;
  color: #333;
}
.table td {
  color: #444;
}
.badge {
  border-radius: 12px;
}
</style>
