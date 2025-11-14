<template>
  <div class="container py-4">
    <div class="row g-4">
      <div class="col-lg-4">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body">
            <h5 class="mb-3 fw-bold text-danger">
              <i class="bi bi-search-heart me-2"></i>
              Tìm lịch hiến máu
            </h5>
            <div class="mb-3">
              <label class="form-label small">Mã lịch hiến máu</label>
              <input type="text" class="form-control" v-model="filters.appointment_code" placeholder="Nhập mã lịch hiến máu..." />
            </div>
            <div class="mb-3">
              <label class="form-label small">Ngày hiến máu</label>
              <input type="date" class="form-control" v-model="filters.date" />
            </div>
            <button class="btn btn-danger w-100" @click="applyFilter" :disabled="loadingList">
              <span v-if="loadingList" class="spinner-border spinner-border-sm me-1"></span>
              <i v-else class="bi bi-funnel me-1"></i>
              Lọc lịch hiến máu
            </button>
            <hr />
            <p class="small text-muted mb-1">
              Tổng số lịch hiến máu:
              <strong>{{ totalAppointments }}</strong>
            </p>
            <p class="small text-muted mb-0">
              Đang hiển thị:
              <strong>{{ appointments.length }}</strong> lịch
            </p>
          </div>
        </div>
      </div>

      <div class="col-lg-8">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center">
            <div>
              <h5 class="mb-0 fw-bold text-danger">
                <i class="bi bi-droplet-half me-2"></i>
                Danh sách lịch hiến máu
              </h5>
              <small class="text-muted">
                Chọn "Xem chi tiết" để phê duyệt hoặc từ chối.
              </small>
            </div>
          </div>
          <div class="card-body p-0">
            <div v-if="!loadingList && appointments.length === 0" class="p-4 text-center text-muted">
              <i class="bi bi-inbox me-1"></i>
              Không có lịch hiến máu nào phù hợp.
            </div>
            <div v-else-if="loadingList" class="p-4 text-center text-muted">
              <div class="spinner-border text-danger"></div>
              <div class="mt-2 small">Đang tải dữ liệu...</div>
            </div>
            <div v-else class="table-responsive table-wrapper">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th style="width: 70px">STT</th>
                    <th>Mã lịch</th>
                    <th>Người hiến máu</th>
                    <th>Số điện thoại</th>
                    <th>Trạng thái</th>
                    <th class="text-end">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in appointments" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.appointment_code }}</td>
                    <td>{{ item.donor_name }}</td>
                    <td>{{ item.donor_phone }}</td>
                    <td class="text-center">
                      <button v-if="item.status === 'REQUESTED'" class="btn btn-warning btn-sm w-100">
                        Chờ duyệt
                      </button>
                      <button v-else-if="item.status === 'APPROVED'" class="btn btn-success btn-sm w-100">
                        Đã duyệt
                      </button>
                      <button v-else-if="item.status === 'REJECTED'" class="btn btn-secondary btn-sm w-100">
                        Đã từ chối
                      </button>
                      <button v-else-if="item.status === 'CANCELLED'" class="btn btn-dark btn-sm w-100">
                        Đã hủy
                      </button>
                      <button v-else-if="item.status === 'BOOKED'" class="btn btn-info btn-sm w-100">
                        Đã đặt
                      </button>
                      <button v-else class="btn btn-light btn-sm w-100">
                        {{ item.status }}
                      </button>
                    </td>
                    <td class="text-end">
                      <button class="btn btn-sm btn-outline-primary" @click="openDetail(item)">
                        <i class="bi bi-eye me-1"></i>
                        Xem chi tiết
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

    <div v-if="selectedAppointment" class="custom-modal-backdrop">
      <div class="custom-modal">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 class="fw-bold mb-1">
              <i class="bi bi-droplet-half text-danger me-2"></i>
              Chi tiết lịch hiến máu
            </h5>
            <small class="text-muted">
              Mã lịch:
              <strong>{{ selectedAppointment.appointment_code }}</strong>
            </small>
          </div>
          <button class="btn btn-sm btn-outline-secondary" @click="closeModal" :disabled="actionLoading">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <div class="mb-3">
          <button v-if="selectedAppointment.status === 'REQUESTED'" class="btn btn-warning btn-sm">
            Chờ duyệt
          </button>
          <button v-else-if="selectedAppointment.status === 'APPROVED'" class="btn btn-success btn-sm">
            Đã duyệt
          </button>
          <button v-else-if="selectedAppointment.status === 'REJECTED'" class="btn btn-secondary btn-sm">
            Đã từ chối
          </button>
          <button v-else-if="selectedAppointment.status === 'CANCELLED'" class="btn btn-dark btn-sm">
            Đã hủy
          </button>
          <button v-else-if="selectedAppointment.status === 'BOOKED'" class="btn btn-info btn-sm">
            Đã đặt
          </button>
          <button v-else class="btn btn-light btn-sm">
            {{ selectedAppointment.status }}
          </button>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <div class="mb-2">
              <small class="text-muted">Người hiến máu</small>
              <div class="fw-semibold">
                <i class="bi bi-person-heart me-1"></i>
                {{ selectedAppointment.donor_name }}
              </div>
            </div>
            <div class="mb-2 d-flex justify-content-between">
              <div>
                <small class="text-muted">Số điện thoại</small>
                <div class="fw-semibold">
                  {{ selectedAppointment.donor_phone }}
                </div>
              </div>
              <div>
                <small class="text-muted">Nhóm máu</small>
                <div class="fw-semibold">
                  {{ selectedAppointment.blood_group }}
                </div>
              </div>
            </div>
            <div class="mb-2">
              <small class="text-muted">Email</small>
              <div>
                {{ selectedAppointment.donor_email }}
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="mb-2">
              <small class="text-muted">Ngày hiến máu</small>
              <div class="fw-semibold">
                <i class="bi bi-calendar-event me-1"></i>
                {{ selectedAppointment.scheduled_date }}
              </div>
            </div>
            <div class="mb-2">
              <small class="text-muted">Khung giờ</small>
              <div class="fw-semibold">
                <i class="bi bi-clock-history me-1"></i>
                {{ selectedAppointment.time_range }}
              </div>
            </div>
            <div class="mb-2">
              <small class="text-muted">Điểm hiến máu</small>
              <div class="fw-semibold">
                {{ selectedAppointment.donation_site_name }}
              </div>
              <div class="small text-muted">
                {{ selectedAppointment.hospital_name }}
              </div>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <small class="text-muted">Số lượng hiến dự kiến</small>
          <div>{{ selectedAppointment.preferred_volume_ml }} ml</div>
        </div>

        <div class="mb-3">
          <small class="text-muted">Ghi chú</small>
          <div>
            {{ selectedAppointment.notes || "Không có ghi chú" }}
          </div>
        </div>

        <div v-if="showRejectReason" class="mb-3">
          <label class="form-label small">Lý do từ chối</label>
          <textarea v-model="rejectReason" rows="3" class="form-control" placeholder="Nhập lý do từ chối..."></textarea>
        </div>

        <div class="d-flex justify-content-between align-items-center mt-3">
          <small class="text-muted">
            Bác sĩ phụ trách:
            <strong>{{ selectedAppointment.doctor_name }}</strong>
          </small>
          <div class="d-flex gap-2">
            <button v-if="selectedAppointment.status === 'REQUESTED'" class="btn btn-success btn-sm" @click="approveSelected" :disabled="actionLoading">
              <span v-if="actionLoading && actionType === 'approve'" class="spinner-border spinner-border-sm me-1"></span>
              <i class="bi bi-check2-circle me-1"></i>
              Duyệt
            </button>
            <button v-if="selectedAppointment.status === 'REQUESTED'" class="btn btn-outline-danger btn-sm" @click="toggleReject" :disabled="actionLoading">
              <i class="bi bi-x-circle me-1"></i>
              Từ chối
            </button>
            <button v-if="selectedAppointment.status === 'REQUESTED' && showRejectReason" class="btn btn-danger btn-sm" @click="submitReject" :disabled="actionLoading">
              <span v-if="actionLoading && actionType === 'reject'" class="spinner-border spinner-border-sm me-1"></span>
              Xác nhận từ chối
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseRequestDoctor from '../../../core/baseRequestDoctor';

export default {
  data() {
    return {
      filters: {
        appointment_code: "",
        date: "",
      },
      appointments: [],
      totalAppointments: 0,
      loadingList: false,
      selectedAppointment: null,
      showRejectReason: false,
      rejectReason: "",
      actionLoading: false,
      actionType: null,
    };
  },
  mounted() {
    this.loadAppointments(); // load all
  },
  methods: {
    // load danh sách, có thể truyền param filter
    loadAppointments(params = {}) {
      this.loadingList = true;
      baseRequestDoctor
        .get("doctor/donation-appointments", { params })
        .then((res) => {
          if (res.data && res.data.status) {
            const rows = res.data.data || [];
            this.appointments = rows;
            this.totalAppointments = rows.length;
          } else if (res.data && res.data.message) {
            this.$toast && this.$toast.error(res.data.message);
          }
        })
        .catch((err) => {
          const list = Object.values(err.response?.data?.errors || {});
          list.forEach((v) => this.$toast && this.$toast.error(v[0]));
        })
        .finally(() => {
          this.loadingList = false;
        });
    },

    applyFilter() {
      const params = {};
      if (this.filters.appointment_code) {
        params.appointment_code = this.filters.appointment_code;
      }
      if (this.filters.date) {
        params.date = this.filters.date;
      }
      this.loadAppointments(params);
    },

    openDetail(item) {
      this.selectedAppointment = { ...item };
      this.showRejectReason = false;
      this.rejectReason = "";
      this.actionLoading = false;
      this.actionType = null;
    },

    closeModal() {
      if (this.actionLoading) return;
      this.selectedAppointment = null;
      this.showRejectReason = false;
      this.rejectReason = "";
    },

    toggleReject() {
      this.showRejectReason = !this.showRejectReason;
      if (!this.showRejectReason) this.rejectReason = "";
    },

    approveSelected() {
      if (!this.selectedAppointment) return;
      this.actionLoading = true;
      this.actionType = "approve";
      const payload = { id: this.selectedAppointment.id };

      baseRequestDoctor
        .post("doctor/donation-appointments/approve", payload)
        .then((res) => {
          if (res.data && res.data.status) {
            this.$toast && this.$toast.success(res.data.message);
            this.loadAppointments();
            this.selectedAppointment.status = "APPROVED";
          } else if (res.data && res.data.message) {
            this.$toast && this.$toast.error(res.data.message);
          }
        })
        .catch((err) => {
          const list = Object.values(err.response?.data?.errors || {});
          list.forEach((v) => this.$toast && this.$toast.error(v[0]));
        })
        .finally(() => {
          this.actionLoading = false;
          this.actionType = null;
        });
    },

    submitReject() {
      if (!this.selectedAppointment) return;
      if (!this.rejectReason.trim()) {
        this.$toast && this.$toast.error("Vui lòng nhập lý do từ chối");
        return;
      }
      this.actionLoading = true;
      this.actionType = "reject";
      const payload = {
        id: this.selectedAppointment.id,
        rejected_reason: this.rejectReason,
      };

      baseRequestDoctor
        .post("doctor/donation-appointments/reject", payload)
        .then((res) => {
          if (res.data && res.data.status) {
            this.$toast && this.$toast.success(res.data.message);
            this.loadAppointments();
            this.closeModal();
          } else if (res.data && res.data.message) {
            this.$toast && this.$toast.error(res.data.message);
          }
        })
        .catch((err) => {
          const list = Object.values(err.response?.data?.errors || {});
          list.forEach((v) => this.$toast && this.$toast.error(v[0]));
        })
        .finally(() => {
          this.actionLoading = false;
          this.actionType = null;
        });
    },
  },
};
</script>


<style scoped>
.table-wrapper {
  max-height: 430px;
  overflow-y: auto;
}
.custom-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}
.custom-modal {
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem 1.75rem;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25);
}
</style>
  
