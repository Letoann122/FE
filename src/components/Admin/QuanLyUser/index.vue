<template>
  <div class="container-fluid um py-4">
    <!-- Tiêu đề -->
    <div class="mb-4 border-bottom pb-3">
      <h3 class="fw-bold text-primary">
        <i class="fas fa-users me-2"></i> Quản lý Người dùng
      </h3>
      <p class="text-muted mb-0">
        Quản lý tài khoản và quyền hạn người dùng trong hệ thống hiến máu.
      </p>
    </div>

    <!-- Thanh tìm kiếm và lọc -->
    <div class="d-flex flex-wrap gap-3 align-items-center justify-content-between border-bottom pb-3 mb-4">
      <div class="d-flex flex-wrap gap-3 align-items-center">
        <!-- Ô tìm kiếm -->
        <div class="position-relative">
          <input type="text" v-model="tim_kiem.noi_dung_tim" placeholder="Tìm kiếm người dùng..."
            class="form-control ps-5" style="width: 250px;" />
          <i class="fas fa-search position-absolute top-50 translate-middle-y start-0 ms-2 text-muted"></i>
        </div>

        <!-- Lọc vai trò -->
        <select class="form-select" style="width: auto;" v-model="tim_kiem.vai_tro">
          <option value="">Tất cả vai trò</option>
          <option value="doctor">Bác sĩ</option>
          <option value="donor">Người hiến máu</option>
        </select>
      </div>
    </div>

    <!-- Bảng người dùng -->
    <div class="table-responsive bg-white rounded shadow-sm">
      <table class="table align-middle table-hover mb-0">
        <thead class="table-light">
          <tr>
            <th style="width: 25%">Họ và Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Ngày tham gia</th>
            <th class="text-center" style="width: 140px;">Thao tác</th>
          </tr>
        </thead>

        <tbody v-if="users.length > 0">
          <tr v-for="user in users" :key="user.id">
            <td>
              <div class="d-flex align-items-center">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  class="rounded-circle me-2" width="40" height="40" alt="avatar" />
                <span>{{ user.full_name }}</span>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <span v-if="user.role === 'doctor'" class="badge bg-primary">
                Doctor
              </span>
              <span v-else-if="user.role === 'donor'" class="badge bg-secondary">
                Donor
              </span>
            </td>
            <td>{{ formatDate(user.created_at) }}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-outline-primary me-1">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="deleteUser(user)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="5" class="text-center py-4 text-muted">
              Không có người dùng nào được tìm thấy.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Phân trang -->
    <div class="d-flex justify-content-between align-items-center mt-4">
      <p class="mb-0 text-muted small">
        Hiển thị {{ users.length }} / {{ pagination.totalItems }} người dùng
      </p>
      <div class="d-flex align-items-center gap-2" v-if="pagination.totalPages > 1">
        <button class="btn btn-outline-secondary btn-sm" :disabled="pagination.currentPage === 1"
          @click="changePage(pagination.currentPage - 1)">
          <i class="fas fa-chevron-left"></i>
        </button>

        <button v-for="page in pagination.totalPages" :key="page" class="btn btn-outline-secondary btn-sm"
          :class="{ active: page === pagination.currentPage }" @click="changePage(page)">
          {{ page }}
        </button>

        <button class="btn btn-outline-secondary btn-sm" :disabled="pagination.currentPage === pagination.totalPages"
          @click="changePage(pagination.currentPage + 1)">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserManagement",

  data() {
    return {
      users: [],
      tim_kiem: {
        noi_dung_tim: "",
        vai_tro: "",
      },
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        limit: 5,
      },
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      const token = localStorage.getItem("token_admin");
      if (!token) {
        this.$toast?.error("Bạn chưa đăng nhập với quyền Admin!");
        return;
      }

      const params = {
        page: this.pagination.currentPage,
        limit: this.pagination.limit,
        search: this.tim_kiem.noi_dung_tim.trim(),
        role: this.tim_kiem.vai_tro,
      };

      axios
        .get("http://localhost:4000/api/admin/users", {
          params,
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.data) {
            this.users = res.data.data;
            this.pagination.totalItems = res.data.totalItems;
            this.pagination.totalPages = res.data.totalPages;
            this.pagination.currentPage = res.data.currentPage;
          } else {
            this.$toast?.error("Không thể tải danh sách người dùng!");
          }
        })
        .catch(() => {
          this.$toast?.error("Lỗi kết nối khi tải người dùng!");
        });
    },

    deleteUser(user) {
      if (!confirm(`Bạn có chắc chắn muốn xóa người dùng ${user.full_name}?`)) {
        return;
      }

      const token = localStorage.getItem("admin_token");
      if (!token) {
        this.$toast?.error("Bạn chưa đăng nhập Admin!");
        return;
      }

      axios
        .delete(`http://localhost:4000/api/admin/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.status) {
            this.$toast?.success("Xóa người dùng thành công!");
            this.loadData();
          } else {
            this.$toast?.error(res.data.message || "Xóa thất bại!");
          }
        })
        .catch(() => {
          this.$toast?.error("Lỗi kết nối khi xóa người dùng!");
        });
    },

    handleFilterChange() {
      this.pagination.currentPage = 1;
      this.loadData();
    },

    changePage(page) {
      if (page > 0 && page <= this.pagination.totalPages) {
        this.pagination.currentPage = page;
        this.loadData();
      }
    },

    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN");
    },
  },

  watch: {
    "tim_kiem.noi_dung_tim": function () {
      this.handleFilterChange();
    },
    "tim_kiem.vai_tro": function () {
      this.handleFilterChange();
    },
  },
};
</script>

<style scoped>
.active {
  background-color: #0d6efd;
  color: #fff;
}
</style>
