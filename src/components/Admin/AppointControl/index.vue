<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold text-primary mb-0">
        <i class="bi bi-calendar-check-fill me-2 text-danger"></i>
        Quản Lý Lịch Hẹn Hiến Máu
      </h3>
      <button class="btn btn-success rounded-3 px-3" @click="openAddModal">
        <i class="bi bi-plus-circle me-1"></i> Thêm Lịch Hẹn
      </button>
    </div>

    <div class="card shadow-sm border-0 rounded-4">
      <div class="card-body p-3">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-primary text-center">
            <tr>
              <th>STT</th>
              <th>Tên Sự Kiện</th>
              <th>Ngày Diễn Ra</th>
              <th>Địa Điểm</th>
              <th>Đơn Vị Tổ Chức</th>
              <th>Trạng Thái</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in appointments" :key="item.id">
              <td class="text-center">{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.location }}</td>
              <td>{{ item.organizer }}</td>
              <td>
                <span
                  :class="{
                    'badge bg-success': item.status === 'Đã duyệt',
                    'badge bg-warning text-dark': item.status === 'Chờ duyệt',
                    'badge bg-danger': item.status === 'Từ chối',
                  }"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="text-center">
                <button class="btn btn-outline-success btn-sm me-1" @click="approve(item)">
                  <i class="bi bi-check-circle"></i>
                </button>
                <button class="btn btn-outline-danger btn-sm me-1" @click="reject(item)">
                  <i class="bi bi-x-circle"></i>
                </button>
                <button class="btn btn-outline-primary btn-sm me-1" @click="edit(item)">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-outline-secondary btn-sm" @click="remove(item.id)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="appointments.length === 0">
              <td colspan="7" class="text-center text-muted py-3">
                Chưa có lịch hẹn nào.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      class="modal fade"
      id="appointmentModal"
      tabindex="-1"
      aria-labelledby="appointmentModalLabel"
      aria-hidden="true"
      ref="appointmentModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4 shadow">
          <div class="modal-header bg-primary text-white rounded-top-4">
            <h5 class="modal-title" id="appointmentModalLabel">
              {{ isEdit ? "Chỉnh Sửa Lịch Hẹn" : "Thêm Lịch Hẹn Mới" }}
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="save">
              <div class="mb-3">
                <label class="form-label fw-semibold">Tên Sự Kiện</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="form-control"
                  placeholder="Nhập tên sự kiện"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Ngày Diễn Ra</label>
                <input v-model="form.date" type="date" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Địa Điểm</label>
                <input
                  v-model="form.location"
                  type="text"
                  class="form-control"
                  placeholder="Nhập địa điểm tổ chức"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Đơn Vị Tổ Chức</label>
                <input
                  v-model="form.organizer"
                  type="text"
                  class="form-control"
                  placeholder="Nhập tên đơn vị tổ chức"
                  required
                />
              </div>
              <div class="text-end">
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">
                  Hủy
                </button>
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-save me-1"></i> Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseRequestAdmin from "../../../core/baseRequestAdmin";
import axios from "axios";

export default {
  name: "AppointmentControl",
  data() {
    return {
      appointments: [],
      isEdit: false,
      form: {
        id: null,
        name: "",
        date: "",
        location: "",
        organizer: "",
      },
      modalInstance: null,
    };
  },
  mounted() {
    this.fetchAppointments();
  },
  methods: {
    openAddModal() {
      this.isEdit = false;
      this.form = { id: null, name: "", date: "", location: "", organizer: "" };
      this.modalInstance.show();
    },
    edit(item) {
      this.isEdit = true;
      this.form = { ...item };
      this.modalInstance.show();
    },
    save() {
      if (this.isEdit) {
        const index = this.appointments.findIndex((a) => a.id === this.form.id);
        if (index !== -1) {
          this.appointments[index] = { ...this.form, status: this.appointments[index].status };
        }
      } else {
        this.appointments.push({
          ...this.form,
          id: Date.now(),
          status: "Chờ duyệt",
        });
      }
    },

    remove(id) {
      const confirmDelete = confirm(
        "⚠️ Bạn có chắc chắn muốn xóa lịch hẹn này không?"
      );
      if (!confirmDelete) return;
      this.appointments = this.appointments.filter((a) => a.id !== id);
      //this.appointments = this.appointments.filter((a) => a.id !== id);
    },

    async approve(id) {
      try {
        const res = await baseRequestAdmin.put(`/admin/appointments/${id}/approve`);
        if (res.data.status) {
          this.$toast.success("Duyệt lịch hẹn thành công!");
          this.fetchAppointments();
        }
      } catch (err) {
        console.error(err);
        this.$toast.error("Không thể duyệt lịch hẹn!");
      }

    },

    async reject(id) {
      try {
        const res = await baseRequestAdmin.put(`/admin/appointments/${id}/reject`);
        if (res.data.status) {
          this.$toast.info("Đã từ chối lịch hẹn.");
          this.fetchAppointments();
        }
      } catch (err) {
        console.error(err);
        this.$toast.error("Không thể từ chối lịch hẹn!");
      }
    },

    displayStatus(status) {
      if (status === "approved") return "Đã duyệt";
      if (status === "pending") return "Chờ duyệt";
      if (status === "rejected") return "Từ chối";
      return status;
    },

    statusClass(status) {
      return {
        "badge bg-success": status === "approved",
        "badge bg-warning text-dark": status === "pending",
        "badge bg-danger": status === "rejected",
      };
    },

    formatDate(dateStr) {
      return dateStr ? new Date(dateStr).toLocaleDateString("vi-VN") : "-";
    },
  },
};
</script>

<style scoped>
.table thead {
  background: linear-gradient(to right, #007bff, #17a2b8);
  color: white;
}
</style>
