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
        <div class="position-relative">
          <input
            type="text"
            v-model="tim_kiem.noi_dung_tim"
            placeholder="Tìm kiếm người dùng..."
            class="form-control ps-5"
            style="width: 250px;"
          />
          <i class="fas fa-search position-absolute top-50 translate-middle-y start-0 ms-2 text-muted"></i>
        </div>

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
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  class="rounded-circle me-2"
                  width="40"
                  height="40"
                  alt="avatar"
                />
                <span>{{ user.full_name }}</span>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <span v-if="user.role === 'doctor'" class="badge bg-primary">Doctor</span>
              <span v-else-if="user.role === 'donor'" class="badge bg-secondary">Donor</span>
            </td>
            <td>{{ formatDate(user.created_at) }}</td>
            <td class="text-center">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openEditModal(user)"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-danger ms-1"
                data-bs-toggle="modal"
                data-bs-target="#confirmDeleteModal"
                @click="selectedUser = user"
              >
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

    <!-- MODAL UPDATE -->
    <div
      class="modal fade"
      id="editUserModal"
      tabindex="-1"
      aria-labelledby="editUserModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content border-0 shadow">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">
              <i class="fas fa-user-edit me-2"></i> Cập nhật người dùng
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body p-4" v-if="editingUser">
            <form @submit.prevent="saveChanges">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label fw-semibold">Họ và tên</label>
                  <input type="text" class="form-control" v-model="editingUser.full_name" />
                </div>
                <div class="col-12">
                  <label class="form-label fw-semibold">Email</label>
                  <input type="email" class="form-control" v-model="editingUser.email" />
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Vai trò</label>
                  <select class="form-select" v-model="editingUser.role">
                    <option value="doctor">Bác sĩ</option>
                    <option value="donor">Người hiến máu</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Ngày tham gia</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="formatDate(editingUser.created_at)"
                    disabled
                  />
                </div>
              </div>

              <div class="d-flex justify-content-end mt-4">
                <button class="btn btn-outline-secondary me-2" data-bs-dismiss="modal">
                  Hủy
                </button>
                <button class="btn btn-primary" type="submit">
                  <i class="fas fa-save me-1"></i> Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL XÓA -->
    <div
      class="modal fade"
      id="confirmDeleteModal"
      tabindex="-1"
      aria-labelledby="confirmDeleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">Xác nhận xóa</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            Bạn có chắc chắn muốn xóa người dùng
            <strong>{{ selectedUser?.full_name }}</strong> không?
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
            <button class="btn btn-danger" @click="confirmDelete">Xóa</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as bootstrap from "bootstrap";

export default {
  name: "UserManagement",

  data() {
    return {
      users: [],
      selectedUser: null,
      editingUser: null,
      editModalInstance: null,
      deleteModalInstance: null,
      tim_kiem: { noi_dung_tim: "", vai_tro: "" },
      pagination: { currentPage: 1, totalPages: 1, totalItems: 0, limit: 5 },
    };
  },

  mounted() {
    this.loadData();
    const editEl = document.getElementById("editUserModal");
    const deleteEl = document.getElementById("confirmDeleteModal");
    if (editEl) this.editModalInstance = new bootstrap.Modal(editEl);
    if (deleteEl) this.deleteModalInstance = new bootstrap.Modal(deleteEl);
  },

  methods: {
    loadData() {
      const token = localStorage.getItem("token_admin");
      if (!token) return this.$toast?.error("Bạn chưa đăng nhập!");
      axios
        .get("http://localhost:4000/api/admin/users", {
          params: {
            page: this.pagination.currentPage,
            limit: this.pagination.limit,
            search: this.tim_kiem.noi_dung_tim.trim(),
            role: this.tim_kiem.vai_tro,
          },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.data) {
            this.users = res.data.data;
            this.pagination.totalItems = res.data.totalItems;
            this.pagination.totalPages = res.data.totalPages;
          }
        })
        .catch(() => this.$toast?.error("Không thể tải danh sách người dùng!"));
    },

    openEditModal(user) {
      this.editingUser = { ...user };
      this.editModalInstance?.show();
    },

    saveChanges() {
      const token = localStorage.getItem("token_admin");
      if (!this.editingUser) return;
      axios
        .put(`http://localhost:4000/api/admin/users/${this.editingUser.id}`, this.editingUser, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.status) {
            this.$toast?.success("Cập nhật người dùng thành công!");
            this.editModalInstance?.hide();
            this.loadData();
          } else {
            this.$toast?.error(res.data.message || "Không thể cập nhật!");
          }
        })
        .catch(() => this.$toast?.error("Lỗi khi cập nhật người dùng!"));
    },

    confirmDelete() {
      const token = localStorage.getItem("token_admin");
      if (!this.selectedUser) return;
      axios
        .delete(`http://localhost:4000/api/admin/users/${this.selectedUser.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.status) {
            this.$toast?.success("Đã xóa người dùng!");
            this.deleteModalInstance?.hide();
            this.loadData();
          } else {
            this.$toast?.error(res.data.message || "Xóa thất bại!");
          }
        })
        .catch(() => this.$toast?.error("Lỗi khi xóa người dùng!"));
    },

    formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("vi-VN");
    },
  },

  watch: {
    "tim_kiem.noi_dung_tim"() {
      this.loadData();
    },
    "tim_kiem.vai_tro"() {
      this.loadData();
    },
  },
};
</script>

<style scoped>
.active {
  background-color: #0d6efd;
  color: #fff;
}
.modal-content {
  border-radius: 12px;
}
.modal-header {
  border-bottom: none;
  padding: 16px 24px;
}
.modal-body {
  background-color: #f8f9fa;
  border-radius: 0 0 12px 12px;
}
.form-label {
  font-weight: 600;
  color: #333;
}
.btn-primary {
  background-color: #0d6efd;
  border: none;
}
.btn-primary:hover {
  background-color: #0b5ed7;
}
</style>
