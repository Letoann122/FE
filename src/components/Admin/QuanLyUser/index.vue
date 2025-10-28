<template>
  <div class="container-fluid um py-4">
    <!-- Header -->
    <div class="mb-4 border-bottom pb-3">
      <h3 class="fw-bold text-primary">
        <i class="bi bi-people me-2"></i> Quản lý Người dùng
      </h3>
      <p class="text-muted mb-0">
        Quản lý tài khoản và quyền hạn người dùng trong hệ thống hiến máu.
      </p>
    </div>

    <!-- Controls -->
    <div class="d-flex flex-wrap gap-3 align-items-center justify-content-between border-bottom pb-3 mb-4">
      <div class="d-flex flex-wrap gap-3 align-items-center">
        <div class="position-relative">
          <input type="text" placeholder="Tìm kiếm người dùng..." class="form-control ps-5" style="width: 250px;">
          <i class="bi bi-search position-absolute top-50 translate-middle-y start-0 ms-2 text-muted"></i>
        </div>
        <select class="form-select" style="width: auto;">
          <option>Vai trò</option>
          <option>Doctor</option>
          <option>Donor</option>
        </select>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-danger">
          <i class="bi bi-trash me-1"></i> Xóa đã chọn
        </button>
        <button class="btn btn-primary">
          <i class="bi bi-person-plus me-1"></i> Thêm người dùng
        </button>
      </div>
    </div>

    <!-- User Table -->
    <div class="table-responsive bg-white rounded shadow-sm">
      <table class="table align-middle table-hover mb-0">
        <thead class="table-light">
          <tr>
            <th style="width: 40px;"><input type="checkbox" class="form-check-input" /></th>
            <th style="width: 25%">Họ và Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Ngày tham gia</th>
            <th class="text-center" style="width: 140px;">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="checkbox" class="form-check-input" /></td>
            <td>
              <div class="d-flex align-items-center">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" class="rounded-circle me-2" width="40" height="40" />
                <span>John Smith</span>
              </div>
            </td>
            <td>john.smith@gmail.com</td>
            <td><span class="badge bg-primary">Doctor</span></td>
            <td>12/03/2023</td>
            <td class="text-center">
              <button class="btn btn-sm btn-outline-primary me-1"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" class="form-check-input" /></td>
            <td>
              <div class="d-flex align-items-center">
                <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face" class="rounded-circle me-2" width="40" height="40" />
                <span>Olivia Bennett</span>
              </div>
            </td>
            <td>olivia.bennett@gmail.com</td>
            <td><span class="badge bg-secondary">Donor</span></td>
            <td>27/06/2022</td>
            <td class="text-center">
              <button class="btn btn-sm btn-outline-primary me-1"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" class="form-check-input" /></td>
            <td>
              <div class="d-flex align-items-center">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" class="rounded-circle me-2" width="40" height="40" />
                <span>Daniel Warren</span>
              </div>
            </td>
            <td>dwarren3@gmail.com</td>
            <td><span class="badge bg-secondary">Donor</span></td>
            <td>08/01/2024</td>
            <td class="text-center">
              <button class="btn btn-sm btn-outline-primary me-1"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" class="form-check-input" /></td>
            <td>
              <div class="d-flex align-items-center">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" class="rounded-circle me-2" width="40" height="40" />
                <span>Chloe Hayes</span>
              </div>
            </td>
            <td>chloehiye@gmail.com</td>
            <td><span class="badge bg-primary">Doctor</span></td>
            <td>05/10/2021</td>
            <td class="text-center">
              <button class="btn btn-sm btn-outline-primary me-1"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" class="form-check-input" /></td>
            <td>
              <div class="d-flex align-items-center">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face" class="rounded-circle me-2" width="40" height="40" />
                <span>Marcus Reed</span>
              </div>
            </td>
            <td>reeds777@gmail.com</td>
            <td><span class="badge bg-secondary">Donor</span></td>
            <td>19/02/2023</td>
            <td class="text-center">
              <button class="btn btn-sm btn-outline-primary me-1"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center mt-4">
      <p class="mb-0 text-muted small">Hiển thị 1–5 của 5 người dùng</p>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-outline-secondary btn-sm">
          <i class="bi bi-chevron-left"></i>
        </button>
        <button class="btn btn-outline-secondary btn-sm active">1</button>
        <button class="btn btn-outline-secondary btn-sm">2</button>
        <button class="btn btn-outline-secondary btn-sm">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
