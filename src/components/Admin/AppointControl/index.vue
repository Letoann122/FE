<template>
  <div class="container py-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold text-primary mb-0">
        <i class="bi bi-calendar-check-fill me-2 text-danger"></i>
        Quản Lý Lịch Hẹn Hiến Máu
      </h3>
      <div class="filter-group d-flex gap-2">
        <select v-model="statusFilter" class="form-select form-select-sm" style="width: 150px">
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ duyệt</option>
          <option value="approved">Đã duyệt</option>
          <option value="rejected">Từ chối</option>
          <option value="completed">Hoàn thành</option>
        </select>
        <input
          v-model="searchTerm"
          type="text"
          class="form-control form-control-sm"
          placeholder="Tìm kiếm..."
          style="width: 200px"
        />
        <button class="btn btn-sm btn-primary" @click="searchAppointments">
          <i class="bi bi-search"></i> Tìm
        </button>
      </div>
    </div>

    <!-- Alert Messages -->
    <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Lỗi!</strong> {{ errorMessage }}
      <button
        type="button"
        class="btn-close"
        @click="errorMessage = ''"
        aria-label="Close"
      ></button>
    </div>

    <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Thành công!</strong> {{ successMessage }}
      <button
        type="button"
        class="btn-close"
        @click="successMessage = ''"
        aria-label="Close"
      ></button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Đang tải dữ liệu...</p>
    </div>

    <!-- Table -->
    <div v-else class="table-responsive">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-primary text-center">
          <tr>
            <th>STT</th>
            <th>Mã Lịch Hẹn</th>
            <th>Tên Người Hiến</th>
            <th>Ngày Diễn Ra</th>
            <th>Địa Điểm</th>
            <th>Trạng Thái</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="appointments.length === 0">
            <td colspan="7" class="text-center text-muted py-3">
              <i class="bi bi-inbox"></i> Không có lịch hẹn nào.
            </td>
          </tr>
          <tr v-for="(item, index) in appointments" :key="item.id">
            <td class="text-center">{{ (page - 1) * limit + index + 1 }}</td>
            <td>
              <span class="badge bg-info">{{ item.appointment_code }}</span>
            </td>
            <td>
              <strong>{{ item.donor?.full_name || 'N/A' }}</strong>
              <br />
              <small class="text-muted">{{ item.donor?.phone }}</small>
            </td>
            <td>{{ formatDate(item.scheduled_at) }}</td>
            <td>
              <div>
                <strong>{{ item.organizer }}</strong>
                <br />
                <small class="text-muted">{{ item.location }}</small>
              </div>
            </td>
            <td class="text-center">
              <span :class="statusClass(item.status)">
                {{ displayStatus(item.status) }}
              </span>
            </td>
            <td class="text-center">
              <div class="btn-group btn-group-sm" role="group">
                <button
                  v-if="item.status === 'pending'"
                  class="btn btn-success"
                  @click="showApproveModal(item)"
                  title="Duyệt"
                >
                  <i class="bi bi-check-circle"></i> Duyệt
                </button>
                <button
                  v-if="item.status === 'pending'"
                  class="btn btn-danger"
                  @click="showRejectModal(item)"
                  title="Từ chối"
                >
                  <i class="bi bi-x-circle"></i> Từ chối
                </button>
                <button
                  class="btn btn-info"
                  @click="showDetailModal(item)"
                  title="Chi tiết"
                >
                  <i class="bi bi-eye"></i> Chi tiết
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 d-flex justify-content-between align-items-center">
      <div>
        <span class="text-muted">Tổng cộng: <strong>{{ totalItems }}</strong> lịch hẹn</span>
      </div>
      <div class="d-flex gap-2">
        <button
          class="btn btn-outline-primary btn-sm"
          :disabled="page <= 1"
          @click="page--; fetchAppointments()"
        >
          <i class="bi bi-chevron-left"></i> Trước
        </button>
        <span class="align-self-center px-3">
          Trang <strong>{{ page }}</strong> / <strong>{{ totalPages }}</strong>
        </span>
        <button
          class="btn btn-outline-primary btn-sm"
          :disabled="page >= totalPages"
          @click="page++; fetchAppointments()"
        >
          Sau <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- Modal: Detail -->
    <div
      v-if="showDetail"
      class="modal d-block"
      style="background: rgba(0, 0, 0, 0.5)"
      @click.self="showDetail = false"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi bi-info-circle me-2"></i>Chi Tiết Lịch Hẹn
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="showDetail = false"
            ></button>
          </div>
          <div class="modal-body" v-if="selectedAppointment">
            <div class="row mb-3">
              <div class="col-md-6">
                <p><strong>Mã lịch hẹn:</strong> {{ selectedAppointment.appointment_code }}</p>
                <p><strong>Người hiến:</strong> {{ selectedAppointment.donor?.full_name }}</p>
                <p><strong>Điện thoại:</strong> {{ selectedAppointment.donor?.phone }}</p>
                <p><strong>Email:</strong> {{ selectedAppointment.donor?.email }}</p>
              </div>
              <div class="col-md-6">
                <p><strong>Nhóm máu:</strong> {{ selectedAppointment.donor?.blood_group }}</p>
                <p><strong>Dự kiến hiến:</strong> {{ selectedAppointment.volume || 450 }} ml</p>
                <p>
                  <strong>Ngày hiến:</strong>
                  {{ formatDate(selectedAppointment.scheduled_at) }}
                </p>
                <p>
                  <strong>Trạng thái:</strong>
                  <span :class="statusClass(selectedAppointment.status)">
                    {{ displayStatus(selectedAppointment.status) }}
                  </span>
                </p>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-12">
                <p><strong>Địa điểm:</strong> {{ selectedAppointment.organizer }}</p>
                <p><strong>Địa chỉ:</strong> {{ selectedAppointment.location }}</p>
                <p><strong>Ghi chú:</strong></p>
                <p class="text-muted">{{ selectedAppointment.notes || 'Không có ghi chú' }}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showDetail = false"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Approve -->
    <div
      v-if="showApprove"
      class="modal d-block"
      style="background: rgba(0, 0, 0, 0.5)"
      @click.self="showApprove = false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">
              <i class="bi bi-check-circle me-2"></i>Duyệt Lịch Hẹn
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              @click="showApprove = false"
            ></button>
          </div>
          <div class="modal-body" v-if="selectedAppointment">
            <p class="mb-3">
              Bạn có chắc chắn muốn <strong>duyệt</strong> lịch hẹn của
              <strong>{{ selectedAppointment.donor?.full_name }}</strong> không?
            </p>
            <div class="alert alert-info">
              <strong>Thông tin:</strong>
              <ul class="mb-0">
                <li>Mã: {{ selectedAppointment.appointment_code }}</li>
                <li>Ngày: {{ formatDate(selectedAppointment.scheduled_at) }}</li>
                <li>Địa điểm: {{ selectedAppointment.organizer }}</li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showApprove = false"
            >
              Hủy
            </button>
            <button
              type="button"
              class="btn btn-success"
              :disabled="approving"
              @click="approve(selectedAppointment.id)"
            >
              <span
                v-if="approving"
                class="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              {{ approving ? 'Đang xử lý...' : 'Duyệt' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Reject -->
    <div
      v-if="showReject"
      class="modal d-block"
      style="background: rgba(0, 0, 0, 0.5)"
      @click.self="showReject = false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">
              <i class="bi bi-x-circle me-2"></i>Từ Chối Lịch Hẹn
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              @click="showReject = false"
            ></button>
          </div>
          <div class="modal-body" v-if="selectedAppointment">
            <p class="mb-3">
              Bạn có chắc chắn muốn <strong>từ chối</strong> lịch hẹn của
              <strong>{{ selectedAppointment.donor?.full_name }}</strong> không?
            </p>
            <div class="mb-3">
              <label for="rejectReason" class="form-label">
                <strong>Lý do từ chối (không bắt buộc):</strong>
              </label>
              <textarea
                id="rejectReason"
                v-model="rejectReason"
                class="form-control"
                rows="3"
                placeholder="Nhập lý do từ chối..."
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showReject = false"
            >
              Hủy
            </button>
            <button
              type="button"
              class="btn btn-danger"
              :disabled="rejecting"
              @click="reject(selectedAppointment.id)"
            >
              <span
                v-if="rejecting"
                class="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              {{ rejecting ? 'Đang xử lý...' : 'Từ Chối' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseRequestAdmin from "../../../core/baseRequestAdmin";

export default {
  name: "AppointmentControl",
  data() {
    return {
      appointments: [],
      page: 1,
      limit: 10,
      totalPages: 1,
      totalItems: 0,
      loading: false,
      approving: false,
      rejecting: false,
      statusFilter: "",
      searchTerm: "",
      errorMessage: "",
      successMessage: "",
      showDetail: false,
      showApprove: false,
      showReject: false,
      selectedAppointment: null,
      rejectReason: "",
    };
  },
  mounted() {
    this.fetchAppointments();
    // Refresh every 30 seconds
    setInterval(() => {
      this.fetchAppointments();
    }, 30000);
  },
  methods: {
    async fetchAppointments() {
      try {
        this.loading = true;
        this.errorMessage = "";

        const params = {
          page: this.page,
          limit: this.limit,
          t: new Date().toISOString(),
        };

        if (this.statusFilter) {
          params.status = this.statusFilter;
        }

        if (this.searchTerm) {
          params.search = this.searchTerm;
        }

        const res = await baseRequestAdmin.get("/admin/appointments", { params });

        if (res.data.status) {
          this.appointments = res.data.data;
          this.totalPages = res.data.totalPages || 1;
          this.totalItems = res.data.totalItems || 0;
        } else {
          this.errorMessage = res.data.message || "Không thể tải dữ liệu";
        }
      } catch (err) {
        console.error("Lỗi tải lịch hẹn:", err);
        this.errorMessage =
          err.response?.data?.message || "Lỗi khi tải danh sách lịch hẹn";
      } finally {
        this.loading = false;
      }
    },

    searchAppointments() {
      this.page = 1;
      this.fetchAppointments();
    },

    showApproveModal(appointment) {
      this.selectedAppointment = appointment;
      this.showApprove = true;
    },

    showRejectModal(appointment) {
      this.selectedAppointment = appointment;
      this.rejectReason = "";
      this.showReject = true;
    },

    showDetailModal(appointment) {
      this.selectedAppointment = appointment;
      this.showDetail = true;
    },

    async approve(id) {
      try {
        this.approving = true;
        const res = await baseRequestAdmin.put(`/admin/appointments/${id}/approve`);

        if (res.data.status) {
          this.successMessage = "Duyệt lịch hẹn thành công!";
          this.showApprove = false;
          this.fetchAppointments();
          setTimeout(() => {
            this.successMessage = "";
          }, 3000);
        } else {
          this.errorMessage = res.data.message || "Không thể duyệt lịch hẹn";
        }
      } catch (err) {
        console.error("Lỗi duyệt lịch hẹn:", err);
        this.errorMessage =
          err.response?.data?.message || "Lỗi khi duyệt lịch hẹn";
      } finally {
        this.approving = false;
      }
    },

    async reject(id) {
      try {
        this.rejecting = true;
        const res = await baseRequestAdmin.put(`/admin/appointments/${id}/reject`, {
          reason: this.rejectReason,
        });

        if (res.data.status) {
          this.successMessage = "Từ chối lịch hẹn thành công!";
          this.showReject = false;
          this.rejectReason = "";
          this.fetchAppointments();
          setTimeout(() => {
            this.successMessage = "";
          }, 3000);
        } else {
          this.errorMessage = res.data.message || "Không thể từ chối lịch hẹn";
        }
      } catch (err) {
        console.error("Lỗi từ chối lịch hẹn:", err);
        this.errorMessage =
          err.response?.data?.message || "Lỗi khi từ chối lịch hẹn";
      } finally {
        this.rejecting = false;
      }
    },

    displayStatus(status) {
      const statusMap = {
        approved: " Đã duyệt",
        pending: " Chờ duyệt",
        rejected: " Từ chối",
        completed: " Hoàn thành",
        no_show: " Không tham dự",
      };
      return statusMap[status] || status;
    },

    statusClass(status) {
      const classMap = {
        approved: "badge bg-success",
        pending: "badge bg-warning text-dark",
        rejected: "badge bg-danger",
        completed: "badge bg-info",
        no_show: "badge bg-secondary",
      };
      return classMap[status] || "badge bg-light";
    },

    formatDate(dateStr) {
      if (!dateStr) return "-";
      const date = new Date(dateStr);
      return date.toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
.table thead {
  background: linear-gradient(to right, #007bff, #17a2b8);
  color: white;
}

.table tbody tr:hover {
  background-color: #f5f5f5;
}

.modal {
  display: block;
}

.modal-dialog {
  margin: 1.75rem auto;
}

.filter-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

@media (max-width: 768px) {
  .filter-group {
    flex-direction: column;
    width: 100%;
  }

  .table {
    font-size: 0.875rem;
  }

  .btn-group-sm > .btn {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }
}
</style>