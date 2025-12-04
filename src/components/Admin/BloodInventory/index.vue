<template>
  <div class="container-fluid py-4 blood-admin-dashboard">

    <!-- ===================== HEADER ===================== -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 class="fw-bold mb-1">
          🩸 Quản lý kho máu (Admin)
        </h3>
        <p class="text-muted mb-0">Tổng quan kho máu toàn hệ thống · Heatmap · Biểu đồ · Lịch sử giao dịch</p>
      </div>
      <button class="btn btn-outline-secondary" @click="reload">
        <i class="bi bi-arrow-clockwise me-1"></i> Tải lại
      </button>
    </div>


    <!-- ===================== TOP CARDS ===================== -->
    <div class="row g-3 mb-4">
      <div class="col-lg-3 col-md-6" v-for="card in topCards" :key="card.title">
        <div class="card shadow-sm border-0 rounded-4 p-3">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h6 class="text-muted">{{ card.title }}</h6>
              <h3 class="fw-bold">{{ card.value }}</h3>
            </div>
            <div class="fs-1">{{ card.icon }}</div>
          </div>
        </div>
      </div>
    </div>


    <!-- ===================== HEATMAP ===================== -->
    <div class="card shadow-sm border-0 rounded-4 mb-4">
      <div class="card-header bg-white py-3">
        <h5 class="fw-bold mb-0"><i class="bi bi-grid-3x3-gap me-2"></i>Heatmap tồn kho theo nhóm máu</h5>
      </div>
      <div class="card-body">
        <table class="table text-center align-middle heatmap">
          <thead>
            <tr>
              <th>Nhóm</th>
              <th>Positive</th>
              <th>Negative</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in bloodHeatmap" :key="b.group">
              <th class="fw-bold">{{ b.group }}</th>
              <td>
                <span class="heat-box" :class="getHeatClass(b.pos)">
                  {{ b.pos }}
                </span>
              </td>
              <td>
                <span class="heat-box" :class="getHeatClass(b.neg)">
                  {{ b.neg }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!-- ===================== BIỂU ĐỒ NHẬP - XUẤT ===================== -->
    <div class="card shadow-sm border-0 rounded-4 mb-4">
      <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h5 class="fw-bold mb-0"><i class="bi bi-graph-up me-2"></i>Biểu đồ nhập - xuất máu</h5>
        <div>
          <button class="btn btn-sm" :class="range === 7 ? 'btn-danger' : 'btn-outline-secondary'" @click="setRange(7)">7 ngày</button>
          <button class="btn btn-sm ms-1" :class="range === 30 ? 'btn-danger' : 'btn-outline-secondary'" @click="setRange(30)">30 ngày</button>
        </div>
      </div>
      <div class="card-body">
        <Line :data="chartData" :options="chartOptions" height="100" />
      </div>
    </div>


    <!-- ===================== BẢNG LÔ MÁU ===================== -->
    <div class="card shadow-sm border-0 rounded-4 mb-4">
      <div class="card-header bg-white py-3">
        <h5 class="fw-bold mb-0"><i class="bi bi-droplet-half me-2"></i>Danh sách lô máu mới nhập</h5>
      </div>
      <div class="card-body p-0">
        <table class="table table-hover mb-0 align-middle">
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Nhóm máu</th>
              <th>Số lượng</th>
              <th>Ngày nhập</th>
              <th>Hạn sử dụng</th>
              <th>Tình trạng</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="batch in latestBatches" :key="batch.id">
              <td>{{ batch.id }}</td>
              <td>{{ batch.type }}</td>
              <td>{{ batch.quantity }} túi</td>
              <td>{{ formatDate(batch.import_date) }}</td>
              <td>{{ formatDate(batch.expiry_date) }}</td>
              <td>
                <span
                  class="badge rounded-pill px-3"
                  :class="batch.status === 'good' ? 'bg-success' :
                          batch.status === 'warning' ? 'bg-warning text-dark' :
                          'bg-danger'"
                >
                  {{ renderStatus(batch.status) }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-outline-primary">Xem</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


  </div>
</template>


<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  components: { Line },

  data() {
    return {
      range: 7,

      // ================= TOP CARDS =================
      topCards: [
        { title: "Tổng túi máu", value: 44, icon: "🩸" },
        { title: "Nhập trong tuần", value: 12, icon: "📥" },
        { title: "Xuất trong tuần", value: 5, icon: "📤" },
        { title: "Sắp hết hạn", value: 3, icon: "⏳" },
      ],

      // ================= HEATMAP =================
      bloodHeatmap: [
        { group: "A", pos: 12, neg: 4 },
        { group: "B", pos: 8, neg: 3 },
        { group: "O", pos: 20, neg: 6 },
        { group: "AB", pos: 7, neg: 2 },
      ],

      // ================= CHART =================
      chartData: {
        labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
        datasets: [
          {
            label: "Nhập kho",
            data: [5, 3, 4, 6, 2, 1, 3],
          },
          {
            label: "Xuất kho",
            data: [2, 1, 3, 2, 4, 1, 2],
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },

      // ================= LATEST BATCHES =================
      latestBatches: [
        { id: "BL00153", type: "A+", quantity: 1, import_date: "2026-01-11", expiry_date: "2026-02-22", status: "warning" },
        { id: "BL00149", type: "A+", quantity: 1, import_date: "2025-11-28", expiry_date: "2026-01-09", status: "good" },
        { id: "BL00148", type: "A+", quantity: 1, import_date: "2025-11-28", expiry_date: "2025-12-29", status: "danger" },
      ]
    };
  },

  methods: {
    setRange(r) {
      this.range = r;
    },

    reload() {
      console.log("Reloading data...");
    },

    getHeatClass(v) {
      if (v >= 10) return "good";
      if (v >= 5) return "medium";
      return "low";
    },

    formatDate(d) {
      const date = new Date(d);
      return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
    },

    renderStatus(s) {
      if (s === "good") return "Đủ";
      if (s === "warning") return "Sắp hết";
      return "Hết hạn";
    }
  }
};
</script>


<style scoped>
.heat-box {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 600;
  color: white;
}
.good {
  background-color: #28a745;
}
.medium {
  background-color: #ffc107;
  color: #333;
}
.low {
  background-color: #dc3545;
}
</style>
