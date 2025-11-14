<template>
  <div class="container py-4">
    <div class="row g-4">
      <!-- 🔍 Cột trái: Tìm kiếm & lọc -->
      <div class="col-lg-4">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h5 class="mb-3 fw-bold text-danger">
              <i class="bi bi-search-heart me-2"></i>
              Tìm lịch đã duyệt
            </h5>

            <div class="mb-3">
              <label class="form-label small">Mã lịch hiến máu</label>
              <input type="text" class="form-control" v-model="filters.appointment_code"
                placeholder="Nhập mã lịch hiến máu..." />
            </div>

            <div class="mb-3">
              <label class="form-label small">Ngày hiến máu</label>
              <input type="date" class="form-control" v-model="filters.date" />
            </div>

            <button class="btn btn-danger w-100" @click="applyFilter">
              <i class="bi bi-funnel me-1"></i>
              Lọc lịch hiến máu
            </button>

            <hr />

            <p class="small text-muted mb-1">
              Tổng lịch (APPROVED):
              <strong>{{ appointments.length }}</strong>
            </p>
            <p class="small text-muted mb-0">
              Đang hiển thị:
              <strong>{{ filteredAppointments.length }}</strong> lịch
            </p>
          </div>
        </div>
      </div>

      <!-- 📋 Cột phải: Danh sách lịch đã duyệt -->
      <div class="col-lg-8">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center">
            <div>
              <h5 class="mb-0 fw-bold text-danger">
                <i class="bi bi-droplet-half me-2"></i>
                Ghi nhận hiến máu
              </h5>
              <small class="text-muted">
                Chỉ hiển thị các lịch đã được bác sĩ duyệt (APPROVED).
              </small>
            </div>
          </div>

          <div class="card-body p-0">
            <div v-if="filteredAppointments.length === 0" class="p-4 text-center text-muted">
              <i class="bi bi-inbox me-1"></i>
              Không có lịch nào phù hợp.
            </div>

            <div v-else class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th style="width: 60px">STT</th>
                    <th>Mã lịch</th>
                    <th>Người hiến máu</th>
                    <th>Ngày / Giờ</th>
                    <th>Trạng thái</th>
                    <th class="text-end">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in filteredAppointments" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <span class="badge bg-light text-dark border">
                        {{ item.appointment_code }}
                      </span>
                    </td>
                    <td>
                      <div class="fw-semibold">{{ item.donor_name }}</div>
                      <div class="small text-muted">{{ item.donor_phone }}</div>
                    </td>
                    <td>
                      <div>{{ item.scheduled_date }}</div>
                      <div class="small text-muted">
                        <i class="bi bi-clock-history me-1"></i>
                        {{ item.time_range }}
                      </div>
                    </td>
                    <td>
                      <span class="badge px-3" :class="statusBadgeClass(item.status)">
                        {{ statusLabel(item.status) }}
                      </span>
                    </td>
                    <td class="text-end">
                      <button class="btn btn-sm btn-outline-success" v-if="item.status === 'APPROVED'"
                        @click="openCompleteModal(item)">
                        <i class="bi bi-check2-circle me-1"></i>
                        Chi tiết
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

    <!-- ✅ Modal: Ghi nhận hiến máu (detail + confirm) -->
    <div v-if="completeAppointment">
      <div class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                <i class="bi bi-check2-circle text-success me-2"></i>
                Ghi nhận hiến máu
              </h5>
              <button type="button" class="btn-close" :disabled="saving" @click="closeCompleteModal"></button>
            </div>

            <div class="modal-body">
              <!-- Thông tin lịch -->
              <div class="mb-3">
                <small class="text-muted">Lịch hiến máu</small>
                <div class="fw-semibold">
                  {{ completeAppointment.donor_name }} –
                  {{ completeAppointment.scheduled_date }}
                  ({{ completeAppointment.time_range }})
                </div>
                <div class="small text-muted">
                  {{ completeAppointment.donation_site_name }} –
                  {{ completeAppointment.hospital_name }}
                </div>
              </div>

              <hr />

              <!-- So sánh đăng ký / thực tế -->
              <div class="row g-3">
                <div class="col-md-6">
                  <h6 class="fw-bold small text-muted">
                    Thông tin đăng ký
                  </h6>
                  <div class="mb-2">
                    <small class="text-muted">Nhóm máu (khai báo)</small>
                    <div>{{ completeAppointment.blood_group }}</div>
                  </div>
                  <div class="mb-2">
                    <small class="text-muted">Số lượng đăng ký</small>
                    <div>{{ completeAppointment.preferred_volume_ml }} ml</div>
                  </div>
                </div>

                <div class="col-md-6">
                  <h6 class="fw-bold small text-muted">
                    Thông tin thực tế
                  </h6>

                  <div class="mb-2">
                    <label class="form-label small">Nhóm máu thực tế *</label>
                    <select class="form-select" v-model="completeForm.blood_group">
                      <option disabled value="">Chọn nhóm máu</option>
                      <option v-for="g in bloodGroups" :key="g" :value="g">
                        {{ g }}
                      </option>
                    </select>
                  </div>

                  <div class="mb-2">
                    <label class="form-label small">Số lượng hiến thực tế (ml) *</label>
                    <input type="number" class="form-control" v-model.number="completeForm.volume_ml" min="50"
                      step="10" />
                  </div>

                  <div class="mb-2">
                    <label class="form-label small">Thời điểm lấy máu *</label>
                    <input type="datetime-local" class="form-control" v-model="completeForm.collected_at" />
                  </div>

                  <div class="form-check mt-2">
                    <input class="form-check-input" type="checkbox" id="screened_ok"
                      v-model="completeForm.screened_ok" />
                    <label class="form-check-label small" for="screened_ok">
                      Đã sàng lọc & đủ điều kiện sử dụng
                    </label>
                  </div>
                </div>
              </div>

              <hr />

              <div class="mb-2">
                <label class="form-label small">Ghi chú thêm (nếu có)</label>
                <textarea class="form-control" rows="2" v-model="completeForm.notes"
                  placeholder="Ví dụ: Lấy được ít hơn do huyết áp thấp..."></textarea>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" :disabled="saving" @click="closeCompleteModal">
                Hủy
              </button>
              <button type="button" class="btn btn-success" :disabled="saving" @click="submitComplete">
                <span v-if="saving" class="spinner-border spinner-border-sm me-1"></span>
                Xác nhận hiến máu thành công
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show"></div>
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
      // 🔹 Fake data: các lịch đã APPROVED
      appointments: [
        {
          id: 8,
          appointment_code: "HM000011",
          status: "APPROVED",
          scheduled_date: "2025-12-11",
          time_range: "07:00 - 09:00",
          donation_site_name: "Điểm hiến máu Quận 1",
          hospital_name: "BV Truyền Máu Huyết Học",
          preferred_volume_ml: 350,
          donor_name: "Nguyễn Văn A",
          donor_phone: "0912 345 678",
          donor_email: "nguyenvana@example.com",
          blood_group: "O+",
          notes: "Đăng ký hiến lần 3.",
          doctor_name: "BS. Lê Hoài Nam",
        },
        {
          id: 9,
          appointment_code: "HM000012",
          status: "APPROVED",
          scheduled_date: "2025-12-12",
          time_range: "09:00 - 11:00",
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
      ],
      filteredAppointments: [],
      completeAppointment: null,
      saving: false,
      completeForm: {
        blood_group: "",
        volume_ml: null,
        collected_at: "",
        screened_ok: true,
        notes: "",
      },
      bloodGroups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
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
        case "COMPLETED":
          return "Đã hiến máu";
        case "REJECTED":
          return "Đã từ chối";
        case "CANCELLED":
          return "Đã hủy";
        case "NO_SHOW":
          return "Không đến";
        case "REQUESTED":
        default:
          return "Chờ duyệt";
      }
    },

    statusBadgeClass(status) {
      switch (status) {
        case "APPROVED":
          return "bg-primary";
        case "COMPLETED":
          return "bg-success";
        case "REJECTED":
          return "bg-secondary";
        case "CANCELLED":
        case "NO_SHOW":
          return "bg-dark";
        case "REQUESTED":
        default:
          return "bg-warning text-dark";
      }
    },

    openCompleteModal(item) {
      this.completeAppointment = { ...item };

      // Prefill form với thông tin đăng ký
      this.completeForm.blood_group = item.blood_group || "";
      this.completeForm.volume_ml = item.preferred_volume_ml || 350;
      this.completeForm.collected_at = this.buildDefaultCollectedAt(
        item.scheduled_date
      );
      this.completeForm.screened_ok = true;
      this.completeForm.notes = "";
    },

    closeCompleteModal() {
      if (this.saving) return;
      this.completeAppointment = null;
      this.completeForm = {
        blood_group: "",
        volume_ml: null,
        collected_at: "",
        screened_ok: true,
        notes: "",
      };
    },

    buildDefaultCollectedAt(dateStr) {
      const now = new Date();
      const [y, m, d] = dateStr.split("-");
      const dt = new Date(
        Number(y),
        Number(m) - 1,
        Number(d),
        now.getHours(),
        now.getMinutes()
      );
      const pad = (n) => (n < 10 ? "0" + n : n);
      return (
        dt.getFullYear() +
        "-" +
        pad(dt.getMonth() + 1) +
        "-" +
        pad(dt.getDate()) +
        "T" +
        pad(dt.getHours()) +
        ":" +
        pad(dt.getMinutes())
      );
    },

    submitComplete() {
      if (!this.completeAppointment) return;

      if (!this.completeForm.blood_group) {
        this.$toast && this.$toast.error("Vui lòng chọn nhóm máu thực tế!");
        return;
      }
      if (!this.completeForm.volume_ml || this.completeForm.volume_ml <= 0) {
        this.$toast &&
          this.$toast.error("Vui lòng nhập số ml hiến thực tế hợp lệ!");
        return;
      }
      if (!this.completeForm.collected_at) {
        this.$toast && this.$toast.error("Vui lòng chọn thời điểm lấy máu!");
        return;
      }

      this.saving = true;

      // TODO: gọi API thực hiện usp_complete_donation / controller BE
      setTimeout(() => {
        const idx = this.appointments.findIndex(
          (a) => a.id === this.completeAppointment.id
        );
        if (idx !== -1) {
          this.appointments[idx].status = "COMPLETED";
        }
        this.applyFilter();

        this.$toast &&
          this.$toast.success("Đã ghi nhận hiến máu thành công!");
        this.saving = false;
        this.closeCompleteModal();
      }, 800);
    },
  },
};
</script>
