<template>
  <div class="container-fluid py-3 blood-inventory-page">
    <!-- Header -->
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h5 class="mb-0">Tồn kho máu</h5>
      <div class="d-flex gap-2">
        <button @click="fetchInventory" class="btn btn-primary">
          <i class="bx bx-refresh"></i> Làm mới
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="card mb-3">
      <div class="card-body">
        <div class="row g-3 align-items-end">
          <div class="col-12 col-md-3">
            <label class="form-label">Mã túi</label>
            <input 
              v-model="search" 
              type="text" 
              class="form-control" 
              placeholder="Nhập mã túi" 
            />
          </div>
          <div class="col-6 col-md-2">
            <label class="form-label">Nhóm máu (ABO)</label>
            <select v-model="blood_type" class="form-select">
              <option value="">Tất cả</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>
          </div>
          <div class="col-6 col-md-2">
            <label class="form-label">Rh</label>
            <select v-model="rh_factor" class="form-select">
              <option value="">Tất cả</option>
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
          </div>
          <div class="col-12 col-md-3">
            <label class="form-label">Trạng thái</label>
            <select v-model="status" class="form-select">
              <option value="">Tất cả</option>
              <option value="available">Có sẵn</option>
              <option value="reserved">Giữ chỗ</option>
              <option value="issued">Cấp phát</option>
              <option value="moved">Di chuyển</option>
              <option value="canceled">Hủy</option>
            </select>
          </div>
          <div class="col-12 text-end">
            <button @click="resetFilters" class="btn btn-outline-secondary me-2">
              Đặt lại
            </button>
            <button @click="applyFilters" class="btn btn-primary">
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart + Summary -->
    <div class="row g-3">
      <div class="col-12 col-lg-6">
        <div class="card h-100">
          <div class="card-header bg-transparent">
            <h6 class="mb-0">Phân bố tồn kho theo nhóm máu (ABO+/-)</h6>
          </div>
          <div class="card-body">
            <canvas ref="chartCanvas" height="220" style="width: 100%"></canvas>
            <div class="legend mt-3">
              <div class="legend-item">
                <span class="legend-swatch" style="background:#17a2b8"></span>
                <span class="legend-label">A+ ({{ getBloodTypeCount('A', '+') }})</span>
              </div>
              <div class="legend-item">
                <span class="legend-swatch" style="background:#6610f2"></span>
                <span class="legend-label">A- ({{ getBloodTypeCount('A', '-') }})</span>
              </div>
              <div class="legend-item">
                <span class="legend-swatch" style="background:#28a745"></span>
                <span class="legend-label">B+ ({{ getBloodTypeCount('B', '+') }})</span>
              </div>
              <div class="legend-item">
                <span class="legend-swatch" style="background:#6f42c1"></span>
                <span class="legend-label">B- ({{ getBloodTypeCount('B', '-') }})</span>
              </div>
              <div class="legend-item">
                <span class="legend-swatch" style="background:#ffc107"></span>
                <span class="legend-label">AB+ ({{ getBloodTypeCount('AB', '+') }})</span>
              </div>
              <div class="legend-item">
                <span class="legend-swatch" style="background:#e83e8c"></span>
                <span class="legend-label">AB- ({{ getBloodTypeCount('AB', '-') }})</span>
              </div>
              <div class="legend-item">
                <span class="legend-swatch" style="background:#fd7e14"></span>
                <span class="legend-label">O+ ({{ getBloodTypeCount('O', '+') }})</span>
              </div>
              <div class="legend-item">
                <span class="legend-swatch" style="background:#dc3545"></span>
                <span class="legend-label">O- ({{ getBloodTypeCount('O', '-') }})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card h-100">
          <div class="card-body">
            <div class="row row-cols-2 row-cols-md-3 g-3 status-row">
              <div class="col">
                <div class="status-card">
                  <div class="label">Có sẵn</div>
                  <div class="value">{{ getStatusCount('available') }}</div>
                  <span class="badge bg-success">Có sẵn</span>
                </div>
              </div>
              <div class="col">
                <div class="status-card">
                  <div class="label">Giữ chỗ</div>
                  <div class="value">{{ getStatusCount('reserved') }}</div>
                  <span class="badge bg-warning text-dark">Giữ chỗ</span>
                </div>
              </div>
              <div class="col">
                <div class="status-card">
                  <div class="label">Cấp phát</div>
                  <div class="value">{{ getStatusCount('issued') }}</div>
                  <span class="badge bg-primary">Cấp phát</span>
                </div>
              </div>
              <div class="col">
                <div class="status-card">
                  <div class="label">Di chuyển</div>
                  <div class="value">{{ getStatusCount('moved') }}</div>
                  <span class="badge bg-secondary">Di chuyển</span>
                </div>
              </div>
              <div class="col">
                <div class="status-card">
                  <div class="label">Hủy</div>
                  <div class="value">{{ getStatusCount('canceled') }}</div>
                  <span class="badge bg-danger">Hủy</span>
                </div>
              </div>
              <div class="col">
                <div class="status-card">
                  <div class="label">Tổng cộng</div>
                  <div class="value">{{ inventories.length }}</div>
                  <span class="badge bg-dark">Tất cả</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="card mt-3">
      <div class="card-body">
        <!-- Actions -->
        <div class="d-flex flex-wrap gap-2 mb-3 justify-content-end">
          <div class="btn-group">
            <button 
              @click="updateSelectedStatus('available')" 
              class="btn btn-success btn-sm"
              :disabled="selectedItems.length === 0"
            >
              Có sẵn
            </button>
            <button 
              @click="updateSelectedStatus('reserved')" 
              class="btn btn-warning btn-sm"
              :disabled="selectedItems.length === 0"
            >
              Giữ chỗ
            </button>
            <button 
              @click="updateSelectedStatus('issued')" 
              class="btn btn-primary btn-sm"
              :disabled="selectedItems.length === 0"
            >
              Cấp phát
            </button>
            <button 
              @click="updateSelectedStatus('canceled')" 
              class="btn btn-danger btn-sm"
              :disabled="selectedItems.length === 0"
            >
              Hủy
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-striped align-middle">
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox" 
                    @change="toggleAllCheckbox"
                    :checked="isAllSelected"
                  />
                </th>
                <th>Mã túi</th>
                <th>Nhóm</th>
                <th>Rh</th>
                <th>Thể tích (ml)</th>
                <th>Ngày thu</th>
                <th>Hạn dùng</th>
                <th>Trạng thái</th>
                <th class="text-end">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="inventories.length === 0">
                <td colspan="9" class="text-center text-muted py-4">
                  Không có dữ liệu
                </td>
              </tr>

              <tr v-for="item in inventories" :key="item.id">
                <td>
                  <input 
                    type="checkbox" 
                    :value="item.id"
                    v-model="selectedItems"
                  />
                </td>
                <td>
                  <span class="badge bg-light text-dark">{{ item.blood_bag_id }}</span>
                </td>
                <td>{{ item.blood_type }}</td>
                <td>{{ item.rh_factor }}</td>
                <td>{{ item.volume_ml }}</td>
                <td>{{ formatDate(item.collected_date) }}</td>
                <td>
                  <span :class="isExpired(item.expiry_date) ? 'text-danger fw-bold' : ''">
                    {{ formatDate(item.expiry_date) }}
                  </span>
                </td>
                <td>
                  <span :class="statusClass(item.status)">
                    {{ displayStatus(item.status) }}
                  </span>
                </td>
                <td class="text-end">
                  <button 
                    @click="viewDetail(item.id)" 
                    class="btn btn-sm btn-outline-primary me-2"
                  >
                    Chi tiết
                  </button>
                  <div class="btn-group btn-group-sm" role="group">
                    <button 
                      @click="updateStatus(item.id, 'available')" 
                      class="btn btn-success"
                      title="Có sẵn"
                    >
                      <i class="bx bx-check"></i>
                    </button>
                    <button 
                      @click="updateStatus(item.id, 'reserved')" 
                      class="btn btn-warning"
                      title="Giữ chỗ"
                    >
                      <i class="bx bx-time"></i>
                    </button>
                    <button 
                      @click="updateStatus(item.id, 'canceled')" 
                      class="btn btn-danger"
                      title="Hủy"
                    >
                      <i class="bx bx-x"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-3">
          <div>
            <select v-model.number="limit" @change="fetchInventory" class="form-select" style="width: auto;">
              <option value="10">10 dòng</option>
              <option value="20">20 dòng</option>
              <option value="50">50 dòng</option>
              <option value="100">100 dòng</option>
            </select>
          </div>
          <span>Trang {{ page }} / {{ totalPages }}</span>
          <div class="btn-group">
            <button 
              @click="page--; fetchInventory()" 
              class="btn btn-outline-primary"
              :disabled="page <= 1"
            >
              <i class="bx bx-chevron-left"></i> Trước
            </button>
            <button 
              @click="page++; fetchInventory()" 
              class="btn btn-outline-primary"
              :disabled="page >= totalPages"
            >
              Sau <i class="bx bx-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseRequestAdmin from "../../../core/baseRequestAdmin";
import Chart from 'chart.js/auto';

export default {
  name: "BloodInventoryPage",
  data() {
    return {
      inventories: [],
      page: 1,
      limit: 10,
      totalPages: 1,

      // Filters
      search: "",
      blood_type: "",
      rh_factor: "",
      status: "",

      // Selection
      selectedItems: [],

      // Chart
      chart: null,
    };
  },

  computed: {
    isAllSelected() {
      return this.inventories.length > 0 && 
             this.selectedItems.length === this.inventories.length;
    }
  },

  mounted() {
    this.fetchInventory();
  },

  methods: {
    async fetchInventory() {
      try {
        const res = await baseRequestAdmin.get("/admin/inventory", {
          params: {
            page: this.page,
            limit: this.limit,
            search: this.search || "",
            blood_type: this.blood_type || "",
            rh_factor: this.rh_factor || "",
            status: this.status || "",
            t: new Date().getTime(),
          },
        });

        if (res.data.status) {
          this.inventories = res.data.data;
          this.totalPages = res.data.totalPages;
          this.selectedItems = [];

          // Update chart
          this.$nextTick(() => {
            if (this.chart) this.chart.destroy();
            this.initChart();
          });
        }
      } catch (err) {
        console.error("Lỗi tải tồn kho:", err);
        this.$toast.error("Không thể tải tồn kho!");
      }
    },

    resetFilters() {
      this.search = "";
      this.blood_type = "";
      this.rh_factor = "";
      this.status = "";
      this.page = 1;
      this.fetchInventory();
    },

    applyFilters() {
      this.page = 1;
      this.fetchInventory();
    },

    initChart() {
      const ctx = this.$refs.chartCanvas?.getContext('2d');
      if (!ctx) return;

      const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
      const counts = bloodTypes.map(type => {
        const [blood, rh] = type.length === 2 
          ? [type[0], type[1]] 
          : [type.slice(0, 2), type[2]];
        return this.getBloodTypeCount(blood, rh);
      });

      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: bloodTypes,
          datasets: [{
            data: counts,
            backgroundColor: [
              '#17a2b8', '#6610f2', '#28a745', '#6f42c1',
              '#ffc107', '#e83e8c', '#fd7e14', '#dc3545'
            ],
            borderColor: '#fff',
            borderWidth: 2,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            }
          }
        }
      });
    },

    getBloodTypeCount(bloodType, rhFactor) {
      return this.inventories.filter(
        item => item.blood_type === bloodType && item.rh_factor === rhFactor
      ).length;
    },

    getStatusCount(status) {
      return this.inventories.filter(item => item.status === status).length;
    },

    displayStatus(status) {
      const statusMap = {
        'available': 'Có sẵn',
        'reserved': 'Giữ chỗ',
        'issued': 'Cấp phát',
        'moved': 'Di chuyển',
        'canceled': 'Hủy'
      };
      return statusMap[status] || status;
    },

    statusClass(status) {
      return {
        'badge bg-success': status === 'available',
        'badge bg-warning text-dark': status === 'reserved',
        'badge bg-primary': status === 'issued',
        'badge bg-secondary': status === 'moved',
        'badge bg-danger': status === 'canceled',
      };
    },

    formatDate(dateStr) {
      return dateStr
        ? new Date(dateStr).toLocaleDateString("vi-VN")
        : "-";
    },

    isExpired(dateStr) {
      if (!dateStr) return false;
      return new Date(dateStr) < new Date();
    },

    async viewDetail(id) {
      try {
        const res = await baseRequestAdmin.get(`/admin/inventory/${id}`);
        if (res.data.status) {
          this.$router.push(`/admin/inventory/${id}`);
        }
      } catch (err) {
        this.$toast.error("Không thể tải chi tiết!");
      }
    },

    async updateStatus(id, newStatus) {
      if (!confirm(`Bạn muốn cập nhật trạng thái sang "${this.displayStatus(newStatus)}"?`)) {
        return;
      }

      try {
        const res = await baseRequestAdmin.put(`/admin/inventory/${id}/status`, { status: newStatus });
        if (res.data.status) {
          this.$toast.success("Cập nhật trạng thái thành công!");
          this.fetchInventory();
        }
      } catch (err) {
        console.error(err);
        this.$toast.error("Không thể cập nhật trạng thái!");
      }
    },

    toggleAllCheckbox() {
      if (this.isAllSelected) {
        this.selectedItems = [];
      } else {
        this.selectedItems = this.inventories.map(item => item.id);
      }
    },

    async updateSelectedStatus(newStatus) {
      if (this.selectedItems.length === 0) {
        this.$toast.warning("Vui lòng chọn ít nhất một túi máu!");
        return;
      }

      const statusName = this.displayStatus(newStatus);
      if (!confirm(`Bạn muốn cập nhật ${this.selectedItems.length} túi máu sang "${statusName}"?`)) {
        return;
      }

      try {
        for (const id of this.selectedItems) {
          await baseRequestAdmin.put(`/admin/inventory/${id}/status`, { status: newStatus });
        }
        this.$toast.success("Cập nhật trạng thái thành công!");
        this.fetchInventory();
      } catch (err) {
        console.error(err);
        this.$toast.error("Không thể cập nhật trạng thái!");
      }
    },
  },
};
</script>

<style scoped>
.blood-inventory-page {
  background-color: #f8f9fa;
}

.card {
  border: none;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.card-header {
  border-bottom: 1px solid #e9ecef;
}

.legend {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.legend-swatch {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-label {
  color: #495057;
  font-weight: 500;
}

.status-row {
  margin-top: 0.5rem;
}

.status-card {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 1.25rem;
  border-radius: 0.5rem;
  text-align: center;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s, box-shadow 0.2s;
}

.status-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.status-card .label {
  font-size: 0.875rem;
  color: #495057;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.status-card .value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #007bff;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.table {
  margin-bottom: 0;
}

.table thead {
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
}

.table thead th {
  color: #495057;
  font-weight: 600;
  padding: 1rem 0.75rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table tbody td {
  padding: 0.875rem 0.75rem;
  vertical-align: middle;
}

.table tbody tr:hover {
  background-color: #f8f9fa;
}

.badge {
  font-weight: 500;
  padding: 0.4rem 0.8rem;
  font-size: 0.75rem;
  white-space: nowrap;
}

.btn-group-sm .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.btn-outline-primary {
  --bs-btn-color: #0d6efd;
  --bs-btn-border-color: #0d6efd;
}

.btn-outline-primary:hover {
  transform: translateY(-1px);
}

@media (max-width: 992px) {
  .legend {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }

  .status-card {
    min-height: 120px;
    padding: 1rem;
  }

  .status-card .value {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .status-card {
    min-height: auto;
    padding: 0.75rem;
  }

  .status-card .label {
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }

  .status-card .value {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  .table {
    font-size: 0.8rem;
  }

  .table thead th {
    padding: 0.5rem 0.25rem;
    font-size: 0.7rem;
  }

  .table tbody td {
    padding: 0.5rem 0.25rem;
  }

  .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.65rem;
  }

  .btn-group-sm .btn {
    padding: 0.2rem 0.4rem;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeIn 0.3s ease-in-out;
}

/* Checkbox styling */
input[type="checkbox"] {
  cursor: pointer;
  accent-color: #0d6efd;
}

/* Scrollbar styling */
.table-responsive::-webkit-scrollbar {
  height: 8px;
}

.table-responsive::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.table-responsive::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.table-responsive::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>