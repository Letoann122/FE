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
          style="width: 200px; height: 30px; background-color: antiquewhite"
        >
          <a href="" style="text-decoration: none">
            <i class="bi bi-arrow-counterclockwise text-danger"></i>
            <p class="ms-2 d-inline text-danger">Lịch sử hiến máu</p>
          </a>
        </div>

        <div
          class="mt-3 m-3 shadow-sm d-flex align-items-center justify-content-center"
          style="width: 200px; height: 30px"
        >
          <a href="" style="text-decoration: none">
            <i class="bi bi-shield-shaded"></i>
            <p class="ms-2 d-inline">Bảo mật tài khoản</p>
          </a>
        </div>
      </div>

      <div class="col-md-9 shadow-sm border">
        <div class="ms-4">
          <i class="bi bi-person-fill fs-3 fw-bold text-danger"></i>
          <h5 class="d-inline ms-3">Lịch sử hiến máu</h5>
          <p>Theo dõi toàn bộ hành trình hiến máu thiện nguyện của bạn</p>
        </div>

        <div class="row g-3">
          <div class="col-md-4" v-for="(item, index) in stats" :key="index">
            <div
              class="card shadow-sm border-0 rounded-4 p-3 d-flex align-items-center"
            >
              <div
                class="icon-box d-flex align-items-center justify-content-center me-3 rounded"
                :class="item.bg"
                style="width: 40px; height: 40px"
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

        <div class="container my-4">
         
          <div class="card p-3 mb-4 shadow-sm border-0 rounded-4">
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
                <button class="btn btn-danger" style="height: 40px; width: 200px;">
                  <i class="bi bi-download me-2"></i>Xuất dữ liệu
                </button>
              </div>
            </div>
          </div>

        
          <div class="card shadow-sm border-0 rounded-4">
            <div class="table-responsive">
              <table class="table align-middle mb-0 w-100">
                <thead class="table-light ">
                  <tr>
                    <th><i class="bi bi-calendar3 me-2"></i>Ngày hiến</th>
                    <th><i class="bi bi-geo-alt me-2 "></i>Địa điểm</th>
                    <th><i class="bi bi-droplet me-2 "></i>Số lượng máu</th>
                    <th><i class="bi bi-chat-square-text me-2 "></i>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in donations" :key="index">
                    <td>{{ item.date }}</td>
                    <td>{{ item.location }}</td>
                    <td>
                      <span
                        class="badge bg-light text-danger fw-semibold px-3 py-2"
                      >
                        {{ item.amount }}
                      </span>
                    </td>
                    <td>{{ item.note }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="bottom-info">
              Hiển thị 1 đến 4 của {{ donations.length }} kết quả
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
        { label: "Hồ sơ cá nhân", icon: "bi bi-person-fill", active: false },
        {
          label: "Lịch sử hiến máu",
          icon: "bi bi-arrow-counterclockwise",
          active: true,
        },
        { label: "Bảo mật tài khoản", icon: "bi bi-shield-shaded", active: false },
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
.bg-light-danger {
  background-color: rgba(255, 99, 132, 0.1);
}

.bg-light-primary {
  background-color: rgba(54, 162, 235, 0.1);
}

.bg-light-success {
  background-color: rgba(75, 192, 192, 0.1);
}

.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}

.table td,
.table th {
  vertical-align: middle;
}
.card {
  background-color: #fff;
}
.badge {
  border-radius: 10px;
}

.card .bottom-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 10px 20px;
  border-top: 1px solid #eee;
  color: #6c757d;
  font-size: 0.9rem;
  text-align: center;
}
</style>
