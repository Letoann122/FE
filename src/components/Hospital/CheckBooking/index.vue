<template>
  <div class="container-fluid py-4">
    <div class="row g-4">
      <!-- Bộ lọc -->
      <div class="col-lg-3">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body">
            <h5 class="mb-3 fw-bold text-danger">
              <i class="bi bi-search-heart me-2"></i> Tìm lịch hiến máu
            </h5>

            <div class="mb-3">
              <label class="form-label small">Mã lịch hiến máu</label>
              <input type="text" class="form-control" v-model="filters.appointment_code"
                placeholder="Nhập mã lịch hiến máu" />
            </div>

            <div class="mb-3">
              <label class="form-label small">Ngày hiến từ</label>
              <input type="date" class="form-control" v-model="filters.from_date" />
            </div>

            <div class="mb-3">
              <label class="form-label small">Ngày hiến đến</label>
              <input type="date" class="form-control" v-model="filters.to_date" />
            </div>

            <div class="d-flex justify-content-end">
              <button class="btn btn-danger mt-2" @click="applyFilter">
                Lọc dữ liệu
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Danh sách -->
      <div class="col-lg-9">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-header bg-white border-0">
            <h5 class="mb-0 fw-bold text-danger">
              <i class="bi bi-droplet-half me-2"></i> Danh sách lịch hiến máu
            </h5>
          </div>

          <div class="card-body p-0">
            <div v-if="!loadingList && paginatedAppointments.length === 0" class="p-4 text-center text-muted">
              <i class="bi bi-inbox me-1"></i> Không có lịch hiến máu nào phù hợp.
            </div>

            <div v-else-if="loadingList" class="p-4 text-center text-muted">
              <div class="spinner-border text-danger"></div>
              <div class="mt-2 small">Đang tải dữ liệu...</div>
            </div>

            <div v-else class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th style="width: 70px">STT</th>
                    <th>Mã lịch</th>
                    <th>Người hiến máu</th>
                    <th>Ngày hiến</th>
                    <th>SĐT</th>
                    <th>Trạng thái</th>
                    <th class="text-end">Thao tác</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(item, index) in paginatedAppointments" :key="item.id">
                    <td>{{ rowNumber(index) }}</td>
                    <td>{{ item.appointment_code }}</td>
                    <td>{{ item.donor_name }}</td>
                    <td>{{ item.scheduled_date }}</td>
                    <td>{{ item.donor_phone }}</td>
                    <td class="text-center">
                      <button v-if="item.status === 'REQUESTED'" class="btn btn-warning btn-sm w-100" type="button">
                        Chờ duyệt
                      </button>
                      <span v-else class="badge bg-secondary">-</span>
                    </td>
                    <td class="text-end">
                      <button type="button" class="btn btn-sm btn-outline-primary" @click="openDetail(item)">
                        <i class="bi bi-eye me-1"></i> Chi tiết
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Pagination -->
              <div class="d-flex align-items-center justify-content-end px-3 py-3 border-top">
                <nav aria-label="Pagination">
                  <ul class="pagination mb-0">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                      <button type="button" class="page-link" @click="goToPage(currentPage - 1)"
                        :disabled="currentPage === 1">
                        ‹
                      </button>
                    </li>

                    <li v-for="p in pageNumbers" :key="String(p)" class="page-item"
                      :class="{ active: p === currentPage, disabled: p === '...' }">
                      <button v-if="p !== '...'" type="button" class="page-link" @click="goToPage(p)">
                        {{ p }}
                      </button>
                      <span v-else class="page-link">...</span>
                    </li>

                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                      <button type="button" class="page-link" @click="goToPage(currentPage + 1)"
                        :disabled="currentPage === totalPages">
                        ›
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              <!-- /Pagination -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL CHI TIẾT (Bootstrap Modal) -->
    <div class="modal fade" id="detailModal" tabindex="-1" aria-hidden="true" ref="detailModalEl">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">
              <i class="bi bi-droplet-half text-danger me-2"></i>
              Chi tiết lịch hiến máu
            </h5>
            <button type="button" class="btn-close" aria-label="Close" @click="hideDetailModal"></button>
          </div>

          <div class="modal-body" v-if="selected">
            <div class="row g-3">
              <div class="col-lg-6">
                <p class="mb-2">
                  <strong>Mã lịch:</strong> {{ selected.appointment_code }}
                </p>

                <p v-if="selected.is_campaign" class="mb-2">
                  <strong>Chiến dịch:</strong>
                  {{ selected.campaign_title || "Không rõ" }}
                </p>

                <p><strong>Người hiến:</strong> {{ selected.donor_name }}</p>
                <p><strong>SĐT:</strong> {{ selected.donor_phone }}</p>
                <p><strong>Email:</strong> {{ selected.donor_email }}</p>
                <p><strong>Nhóm máu:</strong> {{ selected.blood_group }}</p>
              </div>

              <div class="col-lg-6">
                <p><strong>Ngày hiến:</strong> {{ selected.scheduled_date }}</p>
                <p><strong>Khung giờ:</strong> {{ selected.time_range }}</p>

                <p>
                  <strong>Địa điểm:</strong>
                  {{ selected.location_display || selected.donation_site_name || "" }}
                </p>

                <p>
                  <strong>Bệnh viện:</strong>
                  <span v-if="selected.is_campaign && selected.campaign_locate_type === 'custom'">
                    Tự chọn
                  </span>
                  <span v-else>
                    {{ selected.hospital_display || selected.hospital_name || "" }}
                  </span>
                </p>

                <p>
                  <strong>Lượng máu dự kiến:</strong>
                  {{ selected.preferred_volume_ml }} ml
                </p>
              </div>

              <div class="col-12 mt-2">
                <p>
                  <strong>Ghi chú:</strong>
                  {{ selected.notes || "Không có" }}
                </p>
              </div>
            </div>
          </div>

          <div class="modal-footer" v-if="selected">
            <button v-if="selected.status === 'REQUESTED'" type="button" class="btn btn-success"
              @click="approveSelected" :disabled="actionLoading">
              <span v-if="actionLoading" class="spinner-border spinner-border-sm me-1"></span>
              Duyệt
            </button>

            <button v-if="selected.status === 'REQUESTED'" type="button" class="btn btn-danger"
              @click="openRejectFromDetail" :disabled="actionLoading">
              Từ chối
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL TỪ CHỐI (Bootstrap Modal) -->
    <div class="modal fade" id="rejectModal" tabindex="-1" aria-hidden="true" ref="rejectModalEl">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold text-danger">
              <i class="bi bi-x-circle me-1"></i> Từ chối lịch hiến máu
            </h5>
            <button type="button" class="btn-close" aria-label="Close" @click="hideRejectModal"
              :disabled="actionLoading"></button>
          </div>

          <div class="modal-body">
            <label class="form-label">Lý do từ chối</label>
            <textarea v-model="rejectReason" class="form-control" rows="3"
              placeholder="Nhập lý do từ chối..."></textarea>
            <div class="small text-muted mt-1">Bắt buộc nhập lý do.</div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideRejectModal" :disabled="actionLoading">
              Đóng
            </button>
            <button type="button" class="btn btn-danger" @click="confirmReject" :disabled="actionLoading">
              <span v-if="actionLoading" class="spinner-border spinner-border-sm me-1"></span>
              Xác nhận từ chối
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- /modals -->
  </div>
</template>

<script>
import baseRequestDoctor from "../../../core/baseRequestDoctor";
import { Modal } from "bootstrap";

export default {
  data() {
    return {
      filters: {
        appointment_code: "",
        from_date: "",
        to_date: "",
      },
      appointments: [],
      loadingList: false,
      totalAppointments: 0,

      pageSize: 15,
      currentPage: 1,

      selected: null,
      rejectReason: "",
      actionLoading: false,

      lastParams: {},

      // Bootstrap instances
      detailModal: null,
      rejectModal: null,

      // flag để chuyển modal mượt (detail -> reject)
      switchingToReject: false,
    };
  },

  computed: {
    totalPages() {
      const n = Math.ceil((this.totalAppointments || 0) / this.pageSize);
      return n <= 0 ? 1 : n;
    },

    paginatedAppointments() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.appointments.slice(start, start + this.pageSize);
    },

    pageNumbers() {
      const total = this.totalPages;
      const cur = this.currentPage;

      if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

      const pages = new Set([1, 2, total - 1, total, cur - 1, cur, cur + 1]);
      const arr = [...pages]
        .filter((p) => p >= 1 && p <= total)
        .sort((a, b) => a - b);

      const out = [];
      for (let i = 0; i < arr.length; i++) {
        out.push(arr[i]);
        if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) out.push("...");
      }
      return out;
    },
  },

  mounted() {
    // Init bootstrap modals (ONLY bootstrap)
    const detailEl = this.$refs.detailModalEl;
    const rejectEl = this.$refs.rejectModalEl;

    this.detailModal = new Modal(detailEl, { backdrop: true, keyboard: true });
    this.rejectModal = new Modal(rejectEl, { backdrop: true, keyboard: true });

    // Cleanup state sau khi modal đóng hẳn
    detailEl.addEventListener("hidden.bs.modal", () => {
      if (this.switchingToReject) return; // đang chuyển qua reject thì đừng clear selected
      this.selected = null;
      this.rejectReason = "";
    });

    rejectEl.addEventListener("hidden.bs.modal", () => {
      this.rejectReason = "";
      this.actionLoading = false;
    });

    // Khi detail đóng xong để mở reject
    detailEl.addEventListener("hidden.bs.modal", () => {
      if (!this.switchingToReject) return;
      this.switchingToReject = false;
      this.rejectModal?.show();
    });

    this.loadAppointments({});
  },

  beforeUnmount() {
    try {
      this.detailModal?.dispose?.();
      this.rejectModal?.dispose?.();
    } catch (_) { }
  },

  methods: {
    rowNumber(indexInPage) {
      return (this.currentPage - 1) * this.pageSize + indexInPage + 1;
    },

    goToPage(p) {
      if (p === "...") return;
      const page = Number(p);
      if (Number.isNaN(page)) return;
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    loadAppointments(params = {}) {
      this.loadingList = true;
      this.lastParams = { ...params };

      baseRequestDoctor
        .get("doctor/donation-appointments", { params })
        .then((res) => {
          if (res.data?.status) {
            const list = (res.data.data || []).filter((x) => x.status === "REQUESTED");
            this.appointments = list;
            this.totalAppointments = list.length;

            if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
            if (this.currentPage < 1) this.currentPage = 1;
          }
        })
        .finally(() => {
          this.loadingList = false;
        });
    },

    applyFilter() {
      const params = {};
      if (this.filters.appointment_code) params.appointment_code = this.filters.appointment_code;
      if (this.filters.from_date) params.from_date = this.filters.from_date;
      if (this.filters.to_date) params.to_date = this.filters.to_date;

      this.currentPage = 1;
      this.loadAppointments(params);
    },

    // ===== Bootstrap Modal control (programmatic) =====
    openDetail(item) {
      this.selected = item;
      this.rejectReason = "";
      this.detailModal?.show();
    },

    hideDetailModal() {
      this.switchingToReject = false;
      this.detailModal?.hide();
    },

    openRejectFromDetail() {
      // reset lý do + chuyển modal mượt
      this.rejectReason = "";
      this.switchingToReject = true;
      this.detailModal?.hide();
    },

    hideRejectModal() {
      this.rejectModal?.hide();
    },

    // ===== Actions =====
    approveSelected() {
      if (!this.selected) return;
      this.actionLoading = true;

      baseRequestDoctor
        .post("doctor/donation-appointments/approve", { id: this.selected.id })
        .then((res) => {
          if (res.data?.status) {
            this.$toast?.success?.("Duyệt thành công!");
            // đóng modal bằng bootstrap => luôn consistent local/server
            this.detailModal?.hide();
            this.loadAppointments(this.lastParams);
          } else {
            this.$toast?.error?.(res.data?.message || "Duyệt thất bại!");
          }
        })
        .catch(() => this.$toast?.error?.("Lỗi server!"))
        .finally(() => {
          this.actionLoading = false;
        });
    },

    confirmReject() {
      if (!this.selected) return;

      const reason = (this.rejectReason || "").trim();
      if (!reason) {
        this.$toast?.error?.("Vui lòng nhập lý do từ chối!");
        return;
      }

      this.actionLoading = true;

      baseRequestDoctor
        .post("doctor/donation-appointments/reject", {
          id: this.selected.id,
          rejected_reason: reason,
        })
        .then((res) => {
          if (res.data?.status) {
            this.$toast?.success?.("Từ chối thành công!");
            // đóng reject modal bằng bootstrap
            this.rejectModal?.hide();

            // clear + reload list
            this.selected = null;
            this.rejectReason = "";
            this.loadAppointments(this.lastParams);
          } else {
            this.$toast?.error?.(res.data?.message || "Từ chối thất bại!");
          }
        })
        .catch(() => this.$toast?.error?.("Lỗi server!"))
        .finally(() => {
          this.actionLoading = false;
        });
    },
  },
};
</script>

<style scoped></style>
