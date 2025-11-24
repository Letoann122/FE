<template>
  <div class="container py-4">
    <h3 class="fw-bold text-primary mb-3">
      <i class="bi bi-calendar-check-fill me-2 text-danger"></i>
      Quản Lý Lịch Hẹn Hiến Máu
    </h3>

    <table class="table table-hover align-middle mb-0">
      <thead class="table-primary text-center">
        <tr>
          <th>STT</th>
          <th>Tên Sự Kiện</th>
          <th>Ngày Diễn Ra</th>
          <th>Địa Điểm</th>
          <th>Đơn Vị Tổ Chức</th>
          <th>Trạng Thái</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="appointments.length === 0">
          <td colspan="7" class="text-center text-muted py-3">
            Không có lịch hẹn nào.
          </td>
        </tr>
        <tr v-for="(item, index) in appointments" :key="item.id">
          <td class="text-center">{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ formatDate(item.scheduled_at) }}</td>
          <td>{{ item.location }}</td>
          <td>{{ item.organizer }}</td>
          <td>
            <span :class="statusClass(item.status)">
              {{ displayStatus(item.status) }}
            </span>
          </td>
          <td class="text-center">
            <button
              v-if="item.status === 'pending'"
              class="btn btn-sm btn-success me-2"
              @click="approve(item.id)"
            >
              Duyệt
            </button>
            <button
              v-if="item.status === 'pending'"
              class="btn btn-sm btn-danger"
              @click="reject(item.id)"
            >
              Từ chối
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="mt-3 d-flex justify-content-between align-items-center">
      <button
        class="btn btn-outline-primary"
        :disabled="page <= 1"
        @click="page--; fetchAppointments()"
      >
        Trước
      </button>
      <span>Trang {{ page }} / {{ totalPages }}</span>
      <button
        class="btn btn-outline-primary"
        :disabled="page >= totalPages"
        @click="page++; fetchAppointments()"
      >
        Sau
      </button>
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
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  },
  mounted() {
    this.fetchAppointments();
  },
  methods: {
    async fetchAppointments() {
      try {
        const res = await baseRequestAdmin.get("/admin/appointments", {

          params: { page: this.page, limit: this.limit, t:new Date().toISOString() },

        });
        if (res.data.status) {
          this.appointments = res.data.data;
          this.totalPages = res.data.totalPages || 1;
        }
      } catch (err) {
        console.error("Lỗi tải lịch hẹn:", err);
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
