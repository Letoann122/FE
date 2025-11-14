<template>
  <div class="container py-4">
    <div class="row g-4">
      <!-- 🔍 Cột trái: Tìm kiếm & lọc -->
      <div class="col-lg-4">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body">
            <h5 class="mb-3 fw-bold text-danger">
              <i class="bi bi-search-heart me-2"></i>
              Tìm lịch hiến máu
            </h5>
            <div class="mb-3">
              <label class="form-label small">Mã lịch hiến máu</label>
              <input
                type="text"
                class="form-control"
                v-model="filters.appointment_code"
                placeholder="Nhập mã lịch hiến máu..."
              />
            </div>

            <div class="mb-3">
              <label class="form-label small">Ngày hiến máu</label>
              <input
                type="date"
                class="form-control"
                v-model="filters.date"
              />
            </div>

            <button class="btn btn-danger w-100" @click="applyFilter">
              <i class="bi bi-funnel me-1"></i>
              Lọc lịch hiến máu
            </button>

            <hr />

            <p class="small text-muted mb-1">
              Tổng số lịch hiến máu:
              <strong>{{ appointments.length }}</strong>
            </p>
            <p class="small text-muted mb-0">
              Đang hiển thị:
              <strong>{{ filteredAppointments.length }}</strong> lịch
            </p>
          </div>
        </div>
      </div>

      <!-- 📋 Cột phải: Danh sách lịch hiến máu -->
      <div class="col-lg-8">
        <div class="card shadow-sm border-0 rounded-4">
          <div
            class="card-header bg-white border-0 d-flex justify-content-between align-items-center"
          >
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
            <div
              v-if="filteredAppointments.length === 0"
              class="p-4 text-center text-muted"
            >
              <i class="bi bi-inbox me-1"></i>
              Không có lịch hiến máu nào phù hợp.
            </div>

            <div v-else class="table-responsive table-wrapper">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th style="width: 70px">ID</th>
                    <th>Mã lịch</th>
                    <th>Người hiến máu</th>
                    <th>Số điện thoại</th>
                    <th>Trạng thái</th>
                    <th class="text-end">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in filteredAppointments" :key="item.id">
                    <td>#{{ item.id }}</td>
                    <td>
                      <span class="badge bg-light text-dark border">
                        {{ item.appointment_code }}
                      </span>
                    </td>
                    <td>{{ item.donor_name }}</td>
                    <td>{{ item.donor_phone }}</td>
                    <td>
                      <span
                        class="badge px-3"
                        :class="statusBadgeClass(item.status)"
                      >
                        {{ statusLabel(item.status) }}
                      </span>
                    </td>
                    <td class="text-end">
                      <button
                        class="btn btn-sm btn-outline-primary"
                        @click="openDetail(item)"
                      >
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

    <!-- 🩸 Modal chi tiết lịch hiến máu -->
    <div v-if="selectedAppointment" class="custom-modal-backdrop">
      <div class="custom-modal">
        <div
          class="d-flex justify-content-between align-items-start mb-3"
        >
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
          <button
            class="btn btn-sm btn-outline-secondary"
            @click="closeModal"
            :disabled="actionLoading"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <div class="mb-3">
          <span
            class="badge px-3 py-2"
            :class="statusBadgeClass(selectedAppointment.status)"
          >
            {{ statusLabel(selectedAppointment.status) }}
          </span>
        </div>

        <!-- Thông tin chia cột -->
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

        <!-- Lý do từ chối (chỉ hiện khi bấm Từ chối) -->
        <div v-if="showRejectReason" class="mb-3">
          <label class="form-label small">Lý do từ chối</label>
          <textarea
            v-model="rejectReason"
            rows="3"
            class="form-control"
            placeholder="Nhập lý do từ chối..."
          ></textarea>
        </div>

        <!-- Hành động -->
        <div
          class="d-flex justify-content-between align-items-center mt-3"
        >
          <small class="text-muted">
            Bác sĩ phụ trách:
            <strong>{{ selectedAppointment.doctor_name }}</strong>
          </small>
          <div class="d-flex gap-2">
            <button
              v-if="selectedAppointment.status === 'REQUESTED'"
              class="btn btn-success btn-sm"
              @click="approveSelected"
              :disabled="actionLoading"
            >
              <span
                v-if="actionLoading && actionType === 'approve'"
                class="spinner-border spinner-border-sm me-1"
              ></span>
              <i class="bi bi-check2-circle me-1"></i>
              Duyệt
            </button>

            <button
              v-if="selectedAppointment.status === 'REQUESTED'"
              class="btn btn-outline-danger btn-sm"
              @click="toggleReject"
              :disabled="actionLoading"
            >
              <i class="bi bi-x-circle me-1"></i>
              Từ chối
            </button>

            <button
              v-if="
                selectedAppointment.status === 'REQUESTED' &&
                showRejectReason
              "
              class="btn btn-danger btn-sm"
              @click="submitReject"
              :disabled="actionLoading"
            >
              <span
                v-if="actionLoading && actionType === 'reject'"
                class="spinner-border spinner-border-sm me-1"
              ></span>
              Xác nhận từ chối
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        appointment_code: "",
        date: "",
      },
      // 🔹 Fake data: đã đổi appointment_code & status theo format mới
      appointments: [
        {
          id: 1,
          appointment_code: "HM000001",
          status: "REQUESTED",
          scheduled_date: "2025-11-20",
          time_range: "08:00 - 09:00",
          donation_site_name: "Điểm hiến máu Quận 1",
          hospital_name: "BV Truyền Máu Huyết Học",
          preferred_volume_ml: 350,
          donor_name: "Nguyễn Văn A",
          donor_phone: "0912 345 678",
          donor_email: "nguyenvana@example.com",
          blood_group: "O+",
          notes: "Lần hiến thứ 3 trong năm.",
          doctor_name: "BS. Lê Hoài Nam",
        },
        {
          id: 2,
          appointment_code: "HM000002",
          status: "APPROVED",
          scheduled_date: "2025-11-18",
          time_range: "09:00 - 10:00",
          donation_site_name: "Điểm hiến máu Quận 7",
          hospital_name: "BV Quận 7",
          preferred_volume_ml: 250,
          donor_name: "Trần Thị B",
          donor_phone: "0987 654 321",
          donor_email: "tranthib@example.com",
          blood_group: "A-",
          notes: "",
          doctor_name: "BS. Phạm Minh Tâm",
        },
        {
          id: 3,
          appointment_code: "HM000003",
          status: "REJECTED",
          scheduled_date: "2025-11-19",
          time_range: "13:30 - 14:30",
          donation_site_name: "Điểm hiến máu Thủ Đức",
          hospital_name: "BV Thủ Đức",
          preferred_volume_ml: 300,
          donor_name: "Lê Văn C",
          donor_phone: "0903 123 456",
          donor_email: "levanc@example.com",
          blood_group: "B+",
          notes: "Đang theo dõi huyết áp.",
          doctor_name: "BS. Nguyễn Hữu Long",
        },
      ],
      filteredAppointments: [],
      selectedAppointment: null,
      showRejectReason: false,
      rejectReason: "",
      actionLoading: false,
      actionType: null, // 'approve' | 'reject'
    };
  },
  created() {
    this.filteredAppointments = this.appointments;
  },
  methods: {
    applyFilter() {
      const code = this.filters.appointment_code.trim().toLowerCase();
      const date = this.filters.date;

      this.filteredAppointments = this.appointments.filter((item) => {
        const matchCode = code
          ? item.appointment_code.toLowerCase().includes(code)
          : true;
        const matchDate = date ? item.scheduled_date === date : true;
        return matchCode && matchDate;
      });
    },

    statusLabel(status) {
      switch (status) {
        case "APPROVED":
          return "Đã duyệt";
        case "REJECTED":
          return "Đã từ chối";
        case "CANCELLED":
          return "Đã hủy";
        case "REQUESTED":
        case "pending": // fallback nếu BE lỡ trả "pending"
        default:
          return "Chờ duyệt";
      }
    },

    statusBadgeClass(status) {
      switch (status) {
        case "APPROVED":
          return "bg-success";
        case "REJECTED":
          return "bg-secondary";
        case "CANCELLED":
          return "bg-dark";
        case "REQUESTED":
        case "pending":
        default:
          return "bg-warning text-dark";
      }
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
      if (!this.showRejectReason) {
        this.rejectReason = "";
      }
    },

    approveSelected() {
      if (!this.selectedAppointment) return;
      this.actionLoading = true;
      this.actionType = "approve";

      setTimeout(() => {
        this.selectedAppointment.status = "APPROVED";

        const index = this.appointments.findIndex(
          (a) => a.id === this.selectedAppointment.id
        );
        if (index !== -1) {
          this.appointments[index].status = "APPROVED";
        }
        this.applyFilter();

        this.$toast && this.$toast.success("Duyệt lịch hiến máu thành công!");
        this.actionLoading = false;
        this.actionType = null;
      }, 700);
    },

    submitReject() {
      if (!this.selectedAppointment) return;
      if (!this.rejectReason.trim()) {
        this.$toast && this.$toast.error("Vui lòng nhập lý do từ chối");
        return;
      }
      this.actionLoading = true;
      this.actionType = "reject";

      setTimeout(() => {
        this.selectedAppointment.status = "REJECTED";
        this.selectedAppointment.rejected_reason = this.rejectReason;

        const index = this.appointments.findIndex(
          (a) => a.id === this.selectedAppointment.id
        );
        if (index !== -1) {
          this.appointments[index].status = "REJECTED";
          this.appointments[index].rejected_reason = this.rejectReason;
        }
        this.applyFilter();

        this.$toast && this.$toast.success("Đã từ chối lịch hiến máu");
        this.actionLoading = false;
        this.actionType = null;
        this.closeModal();
      }, 700);
    },
  },
};
</script>

<style scoped>
.table-wrapper {
  max-height: 430px;
  overflow-y: auto;
}

/* Modal custom dùng Bootstrap style nhưng control bằng Vue */
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
