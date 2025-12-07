<template>
  <div class="container-fluid p-4 bg-light min-vh-100">
    
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 class="fw-bold text-dark mb-0">Dashboard Quản Trị</h3>
        <p class="text-muted small mb-0">Tổng quan hoạt động toàn hệ thống Smart Blood Donation</p>
      </div>
      <div class="d-flex gap-2">
        <select class="form-select form-select-sm" v-model="filterTime">
          <option value="today">Hôm nay</option>
          <option value="week">7 ngày qua</option>
          <option value="month">Tháng này</option>
          <option value="year">Năm nay</option>
        </select>
        <button class="btn btn-primary btn-sm" @click="fetchDashboardData">
          <i class="bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-3 h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="text-muted small fw-bold text-uppercase">Tổng User</div>
              <div class="icon-box bg-primary-subtle text-primary rounded-circle p-2">
                <i class="bi bi-people-fill fs-5"></i>
              </div>
            </div>
            <h3 class="fw-bold mb-1">{{ formatNumber(stats.totalUsers) }}</h3>
            <div class="small text-success">
              <i class="bi bi-arrow-up"></i> {{ stats.newUsers }} mới tuần này
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-3 h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="text-muted small fw-bold text-uppercase">Bệnh viện / Cơ sở</div>
              <div class="icon-box bg-success-subtle text-success rounded-circle p-2">
                <i class="bi bi-hospital fs-5"></i>
              </div>
            </div>
            <h3 class="fw-bold mb-1">{{ stats.activeHospitals }}</h3>
            <div class="small text-muted">Đang hoạt động</div>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-3 h-100 border-start border-4 border-warning">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="text-muted small fw-bold text-uppercase">Chờ phê duyệt</div>
              <div class="icon-box bg-warning-subtle text-warning rounded-circle p-2">
                <i class="bi bi-hourglass-split fs-5"></i>
              </div>
            </div>
            <h3 class="fw-bold mb-1">{{ stats.pendingRequests }}</h3>
            <div class="small text-danger fw-bold">Cần xử lý ngay</div>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-3 h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="text-muted small fw-bold text-uppercase">Kho máu toàn quốc</div>
              <div class="icon-box bg-danger-subtle text-danger rounded-circle p-2">
                <i class="bi bi-droplet-fill fs-5"></i>
              </div>
            </div>
            <h3 class="fw-bold mb-1">{{ formatNumber(stats.totalBloodUnits) }}</h3>
            <div class="small text-muted">Đơn vị (túi)</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm rounded-3 h-100">
          <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h6 class="fw-bold m-0">Tăng trưởng người dùng & Lượt hiến</h6>
            <button class="btn btn-sm btn-light text-muted"><i class="bi bi-download"></i></button>
          </div>
          <div class="card-body">
            <div class="chart-container" style="height: 300px;">
              <Line :data="growthChartData" :options="chartOptions" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-3 h-100">
          <div class="card-header bg-white py-3">
            <h6 class="fw-bold m-0">Tỷ lệ nhóm máu hệ thống</h6>
          </div>
          <div class="card-body d-flex flex-column justify-content-center align-items-center">
            <div class="chart-container" style="height: 250px; width: 100%;">
              <Doughnut :data="bloodTypeChartData" :options="pieOptions" />
            </div>
            <div class="mt-3 text-center small text-muted">
              *Dữ liệu tổng hợp từ tất cả bệnh viện
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm rounded-3 h-100">
          <div class="card-header bg-white p-0 border-bottom-0">
            <ul class="nav nav-tabs px-3 pt-3 border-bottom-0" role="tablist">
              <li class="nav-item">
                <button 
                  class="nav-link active fw-bold text-dark" 
                  data-bs-toggle="tab" 
                  data-bs-target="#pending-news"
                >
                  Tin tức <span class="badge bg-danger rounded-pill ms-1">3</span>
                </button>
              </li>
              <li class="nav-item">
                <button 
                  class="nav-link fw-bold text-muted" 
                  data-bs-toggle="tab" 
                  data-bs-target="#pending-campaigns"
                >
                  Chiến dịch <span class="badge bg-warning text-dark rounded-pill ms-1">2</span>
                </button>
              </li>
              <li class="nav-item">
                <button 
                  class="nav-link fw-bold text-muted" 
                  data-bs-toggle="tab" 
                  data-bs-target="#pending-doctors"
                >
                  Bác sĩ mới <span class="badge bg-secondary rounded-pill ms-1">1</span>
                </button>
              </li>
            </ul>
          </div>

          <div class="card-body p-0">
            <div class="tab-content">
              <div class="tab-pane fade show active" id="pending-news">
                <div class="table-responsive">
                  <table class="table table-hover align-middle mb-0">
                    <thead class="bg-light">
                      <tr>
                        <th class="ps-4">Tiêu đề</th>
                        <th>Tác giả</th>
                        <th>Ngày gửi</th>
                        <th class="text-end pe-4">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in pendingNews" :key="item.id">
                        <td class="ps-4 fw-semibold">{{ item.title }}</td>
                        <td>{{ item.author }}</td>
                        <td>{{ item.date }}</td>
                        <td class="text-end pe-4">
                          <button class="btn btn-sm btn-outline-primary me-2">Xem</button>
                          <button class="btn btn-sm btn-success">Duyệt</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="tab-pane fade" id="pending-campaigns">
                <div class="p-4 text-center text-muted">Danh sách chiến dịch chờ duyệt...</div>
              </div>

              <div class="tab-pane fade" id="pending-doctors">
                <div class="p-4 text-center text-muted">Danh sách bác sĩ đăng ký mới...</div>
              </div>
            </div>
          </div>
          
          <div class="card-footer bg-white border-top-0 text-center py-3">
            <router-link to="/admin/content-management" class="text-decoration-none small fw-bold">
              Xem tất cả yêu cầu <i class="bi bi-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-3 h-100">
          <div class="card-header bg-white py-3">
            <h6 class="fw-bold m-0"><i class="bi bi-activity me-2 text-primary"></i>Hoạt động gần đây</h6>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush">
              <div v-for="(log, i) in systemLogs" :key="i" class="list-group-item px-4 py-3">
                <div class="d-flex justify-content-between">
                  <div>
                    <div class="small fw-bold text-dark">{{ log.action }}</div>
                    <div class="text-muted" style="font-size: 0.8rem;">{{ log.user }} - {{ log.role }}</div>
                  </div>
                  <small class="text-muted">{{ log.time }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// Import Chart Components
import { Line, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, ArcElement)

export default {
  name: 'AdminDashboard',
  components: { Line, Doughnut },
  
  data() {
    return {
      filterTime: 'week',
      
      // 1. KPI Stats (Giả lập)
      stats: {
        totalUsers: 12580,
        newUsers: 124,
        activeHospitals: 35,
        pendingRequests: 6, // Tổng pending
        totalBloodUnits: 4520
      },

      // 2. Pending Data (Giả lập cho bảng)
      pendingNews: [
        { id: 1, title: 'Lợi ích hiến máu nhắc lại', author: 'BS. Lê Toàn', date: '07/12/2025' },
        { id: 2, title: 'Thông báo khẩn cấp nhóm O', author: 'BV Đa Khoa', date: '06/12/2025' },
        { id: 3, title: 'Sự kiện Chủ Nhật Đỏ', author: 'Admin Support', date: '06/12/2025' },
      ],

      // 3. Logs (Giả lập)
      systemLogs: [
        { action: 'Đã duyệt chiến dịch Mùa Hè Xanh', user: 'Admin 1', role: 'Admin', time: '5p trước' },
        { action: 'Đăng ký hiến máu mới', user: 'Nguyễn Văn A', role: 'Donor', time: '12p trước' },
        { action: 'Cập nhật kho máu (Nhập)', user: 'BS. Hoa', role: 'Doctor', time: '30p trước' },
        { action: 'Huỷ lịch hẹn #HM001', user: 'Trần B', role: 'Donor', time: '1h trước' },
      ],

      // 4. Chart Data
      growthChartData: {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [
          {
            label: 'Người dùng mới',
            backgroundColor: '#0d6efd',
            borderColor: '#0d6efd',
            data: [10, 25, 15, 30, 45, 50, 65],
            tension: 0.4
          },
          {
            label: 'Lượt hiến máu',
            backgroundColor: '#dc3545',
            borderColor: '#dc3545',
            data: [5, 15, 10, 20, 35, 40, 55],
            tension: 0.4
          }
        ]
      },
      
      bloodTypeChartData: {
        labels: ['O', 'A', 'B', 'AB'],
        datasets: [
          {
            backgroundColor: ['#dc3545', '#ffc107', '#0d6efd', '#198754'],
            data: [45, 25, 20, 10]
          }
        ]
      },

      // Chart Options
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        },
        scales: {
          y: { beginAtZero: true }
        }
      },
      pieOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right' }
        }
      }
    }
  },

  methods: {
    formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    fetchDashboardData() {
      // Gọi API lấy số liệu thật tại đây
      // baseRequestAdmin.get('/admin/dashboard')...
      this.$toast?.success("Đã làm mới dữ liệu!");
    }
  }
}
</script>

<style scoped>
/* Icon box background colors */
.bg-primary-subtle { background-color: #cfe2ff; }
.bg-success-subtle { background-color: #d1e7dd; }
.bg-warning-subtle { background-color: #fff3cd; }
.bg-danger-subtle { background-color: #f8d7da; }

/* Tabs styling tweaks */
.nav-tabs .nav-link {
  border: none;
  border-bottom: 3px solid transparent;
  color: #6c757d;
}
.nav-tabs .nav-link.active {
  border-bottom: 3px solid #0d6efd;
  color: #0d6efd !important;
  background: transparent;
}
.nav-tabs .nav-link:hover {
  border-color: transparent;
  color: #0d6efd;
}
</style>