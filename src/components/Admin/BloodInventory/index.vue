<template>
  <div class="container-fluid py-3 blood-inventory-page">
    <!-- Header -->
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
      <div>
        <h5 class="mb-0">Quản lý kho máu (Admin)</h5>
        <div class="text-muted small">Lọc nhanh • Bulk actions • Theo dõi tổng quan theo nhóm máu</div>
      </div>

      <div class="d-flex flex-wrap gap-2">
        <button class="btn btn-outline-secondary" @click="resetFilters">
          <i class="bx bx-eraser me-1"></i> Đặt lại
        </button>
        <button class="btn btn-primary" @click="refresh">
          <i class="bx bx-refresh me-1"></i> Làm mới
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="card mb-3">
      <div class="card-body">
        <div class="row g-3 align-items-end">
          <div class="col-12 col-lg-3">
            <label class="form-label">Mã túi</label>
            <input
              v-model.trim="filters.bag_code"
              type="text"
              class="form-control"
              placeholder="VD: BAG-2025-0001"
              @keyup.enter="applyFilters"
            />
          </div>

          <div class="col-6 col-lg-2">
            <label class="form-label">Nhóm máu (ABO)</label>
            <select class="form-select" v-model="filters.abo" @change="applyFilters">
              <option value="">Tất cả</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>
          </div>

          <div class="col-6 col-lg-2">
            <label class="form-label">Rh</label>
            <select class="form-select" v-model="filters.rh" @change="applyFilters">
              <option value="">Tất cả</option>
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
          </div>

          <div class="col-12 col-lg-3">
            <label class="form-label">Trạng thái</label>
            <select class="form-select" v-model="filters.status" @change="applyFilters">
              <option value="">Tất cả</option>
              <option value="AVAILABLE">Có sẵn</option>
              <option value="RESERVED">Giữ chỗ</option>
              <option value="ISSUED">Cấp phát</option>
              <option value="TRANSFERRED">Di chuyển</option>
              <option value="DISCARDED">Hủy</option>
            </select>
          </div>

          <div class="col-12 col-lg-2">
            <label class="form-label">Từ khóa</label>
            <input
              v-model.trim="filters.q"
              type="text"
              class="form-control"
              placeholder="Mã túi / ghi chú..."
              @keyup.enter="applyFilters"
            />
          </div>

          <div class="col-6 col-lg-2">
            <label class="form-label">HSD từ</label>
            <input v-model="filters.exp_from" type="date" class="form-control" />
          </div>

          <div class="col-6 col-lg-2">
            <label class="form-label">HSD đến</label>
            <input v-model="filters.exp_to" type="date" class="form-control" />
          </div>

          <div class="col-12 col-lg-2">
            <label class="form-label">Số dòng</label>
            <select class="form-select" v-model.number="pagination.limit" @change="applyFilters">
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
            </select>
          </div>

          <div class="col-12 text-end">
            <button class="btn btn-outline-secondary me-2" @click="resetFilters">
              Đặt lại
            </button>
            <button class="btn btn-primary" @click="applyFilters">
              <i class="bx bx-filter-alt me-1"></i> Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart + Summary -->
    <div class="row g-3">
      <div class="col-12 col-lg-6">
        <div class="card h-100">
          <div class="card-header bg-transparent d-flex align-items-center justify-content-between">
            <h6 class="mb-0">Phân bố tồn kho theo nhóm máu (ABO +/-)</h6>
            <span class="text-muted small">Tổng: {{ stats.total_units }}</span>
          </div>

          <div class="card-body">
            <div class="position-relative" style="min-height: 260px">
              <canvas ref="chartEl" height="220" style="width: 100%"></canvas>
              <div v-if="!stats.total_units" class="text-center text-muted py-4">
                Chưa có dữ liệu để hiển thị biểu đồ
              </div>
            </div>

            <div class="legend mt-2">
              <div v-for="it in typeLegend" :key="it.key" class="legend-item">
                <span class="legend-swatch" :style="{ background: it.color }"></span>
                <span class="legend-label">{{ it.label }} ({{ it.value }})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-6">
        <div class="card h-100">
          <div class="card-body">
            <div class="row row-cols-2 row-cols-md-4 g-3 status-row">
              <div class="col">
                <div class="status-card">
                  <div class="label">Có sẵn</div>
                  <div class="value">{{ stats.by_status.AVAILABLE || 0 }}</div>
                  <span class="badge bg-success">AVAILABLE</span>
                </div>
              </div>
              <div class="col">
                <div class="status-card">
                  <div class="label">Giữ chỗ</div>
                  <div class="value">{{ stats.by_status.RESERVED || 0 }}</div>
                  <span class="badge bg-warning text-dark">RESERVED</span>
                </div>
              </div>
              <div class="col">
                <div class="status-card">
                  <div class="label">Cấp phát</div>
                  <div class="value">{{ stats.by_status.ISSUED || 0 }}</div>
                  <span class="badge bg-primary">ISSUED</span>
                </div>
              </div>
              <div class="col">
                <div class="status-card">
                  <div class="label">Hủy</div>
                  <div class="value">{{ stats.by_status.DISCARDED || 0 }}</div>
                  <span class="badge bg-danger">DISCARDED</span>
                </div>
              </div>
              <div class="col">
                <div class="status-card">
                  <div class="label">Di chuyển</div>
                  <div class="value">{{ stats.by_status.TRANSFERRED || 0 }}</div>
                  <span class="badge bg-info text-dark">TRANSFERRED</span>
                </div>
              </div>
              <div class="col">
                <div class="status-card">
                  <div class="label">Sắp hết hạn (≤ 7 ngày)</div>
                  <div class="value">{{ stats.expiring_soon || 0 }}</div>
                  <span class="badge bg-dark">EXPIRING</span>
                </div>
              </div>
              <div class="col">
                <div class="status-card">
                  <div class="label">Tổng thể tích (ml)</div>
                  <div class="value">{{ stats.total_volume_ml || 0 }}</div>
                  <span class="badge bg-secondary">VOLUME</span>
                </div>
              </div>
              <div class="col">
                <div class="status-card">
                  <div class="label">Tổng đơn vị</div>
                  <div class="value">{{ stats.total_units || 0 }}</div>
                  <span class="badge bg-light text-dark border">UNITS</span>
                </div>
              </div>
            </div>

            <div class="mt-3 small text-muted">
              * Summary có thể lấy từ endpoint stats, hoặc tính từ dữ liệu list tuỳ bạn.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="card mt-3">
      <div class="card-body">
        <!-- Bulk actions + selection -->
        <div class="d-flex flex-wrap gap-2 mb-3 justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              class="form-check-input"
              :checked="isAllSelected"
              :disabled="!rows.length"
              @change="toggleSelectAll($event)"
            />
            <span class="text-muted small">
              Chọn tất cả • Đã chọn: <b>{{ selectedIds.length }}</b>
            </span>
            <button class="btn btn-outline-secondary btn-sm" :disabled="!selectedIds.length" @click="clearSelection">
              Bỏ chọn
            </button>
          </div>

          <div class="d-flex flex-wrap gap-2">
            <div class="btn-group">
              <button class="btn btn-success btn-sm" :disabled="!selectedIds.length" @click="bulkSetStatus('AVAILABLE')">
                Có sẵn
              </button>
              <button class="btn btn-warning btn-sm" :disabled="!selectedIds.length" @click="bulkSetStatus('RESERVED')">
                Giữ chỗ
              </button>
              <button class="btn btn-primary btn-sm" :disabled="!selectedIds.length" @click="bulkSetStatus('ISSUED')">
                Cấp phát
              </button>
              <button class="btn btn-info btn-sm" :disabled="!selectedIds.length" @click="bulkSetStatus('TRANSFERRED')">
                Di chuyển
              </button>
              <button class="btn btn-danger btn-sm" :disabled="!selectedIds.length" @click="bulkSetStatus('DISCARDED')">
                Hủy
              </button>
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-striped align-middle">
            <thead>
              <tr>
                <th style="width:44px"></th>
                <th>Mã túi</th>
                <th>Nhóm</th>
                <th>Rh</th>
                <th class="text-end">Thể tích (ml)</th>
                <th>Ngày thu</th>
                <th>Hạn dùng</th>
                <th>Trạng thái</th>
                <th class="text-end">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              <tr v-if="loading">
                <td colspan="9" class="text-center text-muted py-4">Đang tải dữ liệu...</td>
              </tr>

              <tr v-else-if="!rows.length">
                <td colspan="9" class="text-center text-muted py-4">Không có dữ liệu</td>
              </tr>

              <tr v-else v-for="r in rows" :key="r.id">
                <td>
                  <input type="checkbox" class="form-check-input" :value="r.id" v-model="selectedIds" />
                </td>

                <td class="fw-semibold">
                  {{ r.bag_code }}
                  <div class="text-muted small" v-if="r.hospital_name">{{ r.hospital_name }}</div>
                </td>

                <td>{{ r.abo }}</td>
                <td>{{ r.rh }}</td>

                <td class="text-end">{{ r.volume_ml }}</td>

                <td>{{ fmtDate(r.collected_at) }}</td>

                <td>
                  <div class="d-flex align-items-center gap-2">
                    <span>{{ fmtDate(r.expires_at) }}</span>
                    <span v-if="expiryBadge(r)" class="badge" :class="expiryBadge(r).cls">
                      {{ expiryBadge(r).text }}
                    </span>
                  </div>
                </td>

                <td>
                  <span class="badge" :class="statusBadge(r.status).cls">
                    {{ statusBadge(r.status).label }}
                  </span>
                </td>

                <td class="text-end">
                  <div class="btn-group">
                    <button class="btn btn-outline-secondary btn-sm" @click="openDetail(r)" title="Xem">
                      <i class="bx bx-show"></i>
                    </button>
                    <button class="btn btn-success btn-sm" @click="setStatusSingle(r, 'AVAILABLE')" title="Có sẵn">
                      <i class="bx bx-check"></i>
                    </button>
                    <button class="btn btn-warning btn-sm" @click="setStatusSingle(r, 'RESERVED')" title="Giữ chỗ">
                      <i class="bx bx-bookmark"></i>
                    </button>
                    <button class="btn btn-primary btn-sm" @click="setStatusSingle(r, 'ISSUED')" title="Cấp phát">
                      <i class="bx bx-log-out-circle"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" @click="setStatusSingle(r, 'DISCARDED')" title="Hủy">
                      <i class="bx bx-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3">
          <div class="text-muted small">
            Hiển thị <b>{{ rows.length }}</b> / <b>{{ pagination.total }}</b> bản ghi
          </div>

          <div class="d-flex gap-2 align-items-center">
            <button class="btn btn-outline-secondary btn-sm" :disabled="pagination.page <= 1 || loading" @click="gotoPage(pagination.page - 1)">
              <i class="bx bx-chevron-left"></i>
            </button>
            <span class="small">Trang <b>{{ pagination.page }}</b> / <b>{{ pagination.total_pages }}</b></span>
            <button class="btn btn-outline-secondary btn-sm" :disabled="pagination.page >= pagination.total_pages || loading" @click="gotoPage(pagination.page + 1)">
              <i class="bx bx-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div v-if="detailModal.open" class="modal-backdrop-custom">
      <div class="modal-custom">
        <div class="modal-header">
          <h6 class="mb-0">Chi tiết túi máu</h6>
          <button class="btn btn-sm btn-outline-secondary" @click="detailModal.open = false">
            <i class="bx bx-x"></i>
          </button>
        </div>

        <div class="modal-body">
          <div class="row g-2">
            <div class="col-6">
              <div class="text-muted small">Mã túi</div>
              <div class="fw-semibold">{{ detailModal.row?.bag_code }}</div>
            </div>
            <div class="col-3">
              <div class="text-muted small">ABO</div>
              <div class="fw-semibold">{{ detailModal.row?.abo }}</div>
            </div>
            <div class="col-3">
              <div class="text-muted small">Rh</div>
              <div class="fw-semibold">{{ detailModal.row?.rh }}</div>
            </div>
            <div class="col-6">
              <div class="text-muted small">Thể tích</div>
              <div class="fw-semibold">{{ detailModal.row?.volume_ml }} ml</div>
            </div>
            <div class="col-6">
              <div class="text-muted small">Trạng thái</div>
              <span class="badge" :class="statusBadge(detailModal.row?.status).cls">
                {{ statusBadge(detailModal.row?.status).label }}
              </span>
            </div>
            <div class="col-6">
              <div class="text-muted small">Ngày thu</div>
              <div class="fw-semibold">{{ fmtDate(detailModal.row?.collected_at) }}</div>
            </div>
            <div class="col-6">
              <div class="text-muted small">Hạn dùng</div>
              <div class="fw-semibold">{{ fmtDate(detailModal.row?.expires_at) }}</div>
            </div>
            <div class="col-12" v-if="detailModal.row?.note">
              <div class="text-muted small">Ghi chú</div>
              <div>{{ detailModal.row?.note }}</div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-outline-secondary" @click="detailModal.open = false">Đóng</button>
        </div>
      </div>
    </div>

    <!-- Reason Modal (optional) -->
    <div v-if="reasonModal.open" class="modal-backdrop-custom">
      <div class="modal-custom">
        <div class="modal-header">
          <h6 class="mb-0">Lý do bắt buộc</h6>
          <button class="btn btn-sm btn-outline-secondary" @click="closeReasonModal">
            <i class="bx bx-x"></i>
          </button>
        </div>

        <div class="modal-body">
          <div class="mb-2">
            Chuyển trạng thái sang: <b>{{ statusBadge(reasonModal.nextStatus).label }}</b> ({{ reasonModal.ids.length }} túi)
          </div>

          <label class="form-label">Nhập lý do</label>
          <textarea v-model.trim="reasonModal.reason" class="form-control" rows="3" placeholder="VD: Hết hạn / Lỗi xét nghiệm / Di chuyển kho..."></textarea>
          <div class="text-muted small mt-1">* Không để trống.</div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-outline-secondary" @click="closeReasonModal">Hủy</button>
          <button class="btn btn-primary" :disabled="!reasonModal.reason" @click="confirmReasonUpdate">Xác nhận</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "AdminBloodInventoryPage",
  data() {
    return {
      loading: false,

      filters: {
        bag_code: "",
        abo: "",
        rh: "",
        status: "",
        q: "",
        exp_from: "",
        exp_to: "",
      },

      rows: [], // demo data below (bạn thay bằng API)
      selectedIds: [],

      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        total_pages: 1,
      },

      stats: {
        total_units: 0,
        total_volume_ml: 0,
        expiring_soon: 0,
        by_status: {
          AVAILABLE: 0,
          RESERVED: 0,
          ISSUED: 0,
          TRANSFERRED: 0,
          DISCARDED: 0,
        },
        by_type_rh: {
          "A+": 0, "A-": 0,
          "B+": 0, "B-": 0,
          "AB+": 0, "AB-": 0,
          "O+": 0, "O-": 0,
        },
      },

      chart: null,

      detailModal: { open: false, row: null },

      reasonModal: {
        open: false,
        ids: [],
        nextStatus: "",
        reason: "",
      },
    };
  },

  computed: {
    isAllSelected() {
      if (!this.rows.length) return false;
      const ids = this.rows.map((x) => x.id);
      return ids.every((id) => this.selectedIds.includes(id));
    },

    typeLegend() {
      const colors = {
        "A+": "#17a2b8",
        "A-": "#6610f2",
        "B+": "#28a745",
        "B-": "#6f42c1",
        "AB+": "#ffc107",
        "AB-": "#e83e8c",
        "O+": "#fd7e14",
        "O-": "#dc3545",
      };
      const order = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
      return order.map((k) => ({
        key: k,
        label: k,
        value: this.stats.by_type_rh[k] || 0,
        color: colors[k],
      }));
    },
  },

  mounted() {
    // Demo data (bạn thay API)
    this.seedDemo();
    this.computeStatsFromRows();
    this.renderChart();
  },

  beforeUnmount() {
    if (this.chart) this.chart.destroy();
  },

  methods: {
    // ---------------- demo / later replace with API ----------------
    seedDemo() {
      const data = [
        { id: 1, bag_code: "BAG-0001", abo: "A", rh: "+", volume_ml: 350, collected_at: "2025-11-10", expires_at: "2025-12-10", status: "AVAILABLE", hospital_name: "BV A" },
        { id: 2, bag_code: "BAG-0002", abo: "O", rh: "-", volume_ml: 250, collected_at: "2025-11-05", expires_at: "2025-11-30", status: "RESERVED", hospital_name: "BV B" },
        { id: 3, bag_code: "BAG-0003", abo: "B", rh: "+", volume_ml: 450, collected_at: "2025-11-20", expires_at: "2025-12-20", status: "ISSUED", hospital_name: "BV A" },
        { id: 4, bag_code: "BAG-0004", abo: "AB", rh: "+", volume_ml: 350, collected_at: "2025-11-21", expires_at: "2025-11-26", status: "DISCARDED", hospital_name: "BV C", note: "Hết hạn" },
      ];
      this.rows = data;
      this.pagination.total = data.length;
      this.pagination.total_pages = 1;
      this.pagination.page = 1;
    },

    computeStatsFromRows() {
      const byStatus = { AVAILABLE: 0, RESERVED: 0, ISSUED: 0, TRANSFERRED: 0, DISCARDED: 0 };
      const byTypeRh = { "A+": 0, "A-": 0, "B+": 0, "B-": 0, "AB+": 0, "AB-": 0, "O+": 0, "O-": 0 };

      let totalUnits = 0;
      let totalVol = 0;
      let expSoon = 0;

      const now = new Date();
      const addDays = (d, n) => new Date(d.getTime() + n * 86400000);

      for (const r of this.rows) {
        totalUnits += 1;
        totalVol += Number(r.volume_ml || 0);
        byStatus[r.status] = (byStatus[r.status] || 0) + 1;

        const key = `${r.abo}${r.rh}`;
        if (byTypeRh[key] !== undefined) byTypeRh[key] += 1;

        const exp = new Date(r.expires_at);
        if (!Number.isNaN(exp.getTime()) && exp >= now && exp <= addDays(now, 7)) expSoon += 1;
      }

      this.stats.total_units = totalUnits;
      this.stats.total_volume_ml = totalVol;
      this.stats.expiring_soon = expSoon;
      this.stats.by_status = byStatus;
      this.stats.by_type_rh = byTypeRh;

      this.updateChart();
    },

    // ---------------- actions ----------------
    refresh() {
      // sau này: gọi API + cập nhật chart
      this.computeStatsFromRows();
    },

    applyFilters() {
      // sau này: gọi API theo filters
      this.computeStatsFromRows();
    },

    gotoPage(p) {
      this.pagination.page = p;
      this.applyFilters();
    },

    resetFilters() {
      this.filters = { bag_code: "", abo: "", rh: "", status: "", q: "", exp_from: "", exp_to: "" };
      this.selectedIds = [];
      this.applyFilters();
    },

    toggleSelectAll(e) {
      const checked = e?.target?.checked;
      if (!checked) return this.clearSelection();
      this.selectedIds = this.rows.map((r) => r.id);
    },

    clearSelection() {
      this.selectedIds = [];
    },

    bulkSetStatus(nextStatus) {
      if (!this.selectedIds.length) return;

      if (["DISCARDED", "TRANSFERRED"].includes(nextStatus)) {
        this.reasonModal.open = true;
        this.reasonModal.ids = [...this.selectedIds];
        this.reasonModal.nextStatus = nextStatus;
        this.reasonModal.reason = "";
        return;
      }

      this.rows = this.rows.map((r) => (this.selectedIds.includes(r.id) ? { ...r, status: nextStatus } : r));
      this.clearSelection();
      this.computeStatsFromRows();
    },

    setStatusSingle(row, nextStatus) {
      if (!row?.id) return;

      if (["DISCARDED", "TRANSFERRED"].includes(nextStatus)) {
        this.reasonModal.open = true;
        this.reasonModal.ids = [row.id];
        this.reasonModal.nextStatus = nextStatus;
        this.reasonModal.reason = "";
        return;
      }

      this.rows = this.rows.map((r) => (r.id === row.id ? { ...r, status: nextStatus } : r));
      this.computeStatsFromRows();
    },

    closeReasonModal() {
      this.reasonModal.open = false;
      this.reasonModal.ids = [];
      this.reasonModal.nextStatus = "";
      this.reasonModal.reason = "";
    },

    confirmReasonUpdate() {
      const { ids, nextStatus, reason } = this.reasonModal;
      if (!reason) return;

      this.rows = this.rows.map((r) =>
        ids.includes(r.id) ? { ...r, status: nextStatus, note: reason } : r
      );

      this.closeReasonModal();
      this.clearSelection();
      this.computeStatsFromRows();
    },

    openDetail(row) {
      this.detailModal.row = row;
      this.detailModal.open = true;
    },

    // ---------------- UI helpers ----------------
    fmtDate(v) {
      if (!v) return "-";
      const d = new Date(v);
      if (Number.isNaN(d.getTime())) return "-";
      return new Intl.DateTimeFormat("vi-VN").format(d);
    },

    daysToExpire(row) {
      if (!row?.expires_at) return null;
      const exp = new Date(row.expires_at);
      if (Number.isNaN(exp.getTime())) return null;
      const now = new Date();
      return Math.floor((exp.getTime() - now.getTime()) / 86400000);
    },

    expiryBadge(row) {
      const d = this.daysToExpire(row);
      if (d === null) return null;
      if (d < 0) return { text: "Hết hạn", cls: "bg-dark" };
      if (d <= 7) return { text: `Còn ${d}d`, cls: "bg-warning text-dark" };
      return null;
    },

    statusBadge(status) {
      const map = {
        AVAILABLE: { label: "Có sẵn", cls: "bg-success" },
        RESERVED: { label: "Giữ chỗ", cls: "bg-warning text-dark" },
        ISSUED: { label: "Cấp phát", cls: "bg-primary" },
        TRANSFERRED: { label: "Di chuyển", cls: "bg-info text-dark" },
        DISCARDED: { label: "Hủy", cls: "bg-danger" },
      };
      return map[status] || { label: status || "-", cls: "bg-secondary" };
    },

    // ---------------- Chart ----------------
    renderChart() {
      const el = this.$refs.chartEl;
      if (!el) return;

      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }

      const labels = this.typeLegend.map((x) => x.label);
      const values = this.typeLegend.map((x) => x.value);
      const colors = this.typeLegend.map((x) => x.color);

      this.chart = new Chart(el, {
        type: "doughnut",
        data: {
          labels,
          datasets: [{ data: values, backgroundColor: colors, borderWidth: 0 }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          cutout: "60%",
        },
      });
    },

    updateChart() {
      if (!this.chart) return this.renderChart();
      this.chart.data.datasets[0].data = this.typeLegend.map((x) => x.value);
      this.chart.update();
    },
  },
};
</script>

<style scoped>
/* Legend */
.legend {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 12px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.legend-swatch {
  width: 12px;
  height: 12px;
  border-radius: 999px;
}
.status-card {
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 14px;
  padding: 12px;
  background: #fff;
}
.status-card .label {
  font-size: 12px;
  color: #6c757d;
}
.status-card .value {
  font-size: 20px;
  font-weight: 800;
  line-height: 1.1;
  margin: 6px 0;
}

/* Simple modal */
.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 9999;
}
.modal-custom {
  width: min(720px, 100%);
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}
.modal-header,
.modal-footer {
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-bottom: 1px solid #eee;
}
.modal-footer {
  border-top: 1px solid #eee;
  border-bottom: none;
  justify-content: flex-end;
}
.modal-body {
  padding: 14px;
}
</style>
