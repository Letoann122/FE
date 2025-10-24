<template>
  <div class="container my-4">
    <div class="row mb-3">
      <div class="col">
        <a href="#" class="btn btn-outline-secondary me-2">
          <i class="bi bi-arrow-left"></i>
        </a>
        <span class="h4 fw-bold">Chi tiết Donor</span>
      </div>
      <div class="col text-end">
        <button class="btn btn-outline-secondary me-2">
          <i class="bi bi-pencil-square me-1"></i> Cập nhật thông tin
        </button>
        <button class="btn btn-danger">
          <i class="bi bi-lock-fill me-1"></i> Khóa tài khoản
        </button>
      </div>
    </div>

    <div class="row g-4">
      <!-- Cột trái: Thông tin donor -->
      <div class="col-lg-4">
        <div class="card text-center">
          <div class="bg-danger text-white p-3">
            <img
              src="https://via.placeholder.com/100"
              class="rounded-circle border border-3 border-white mb-2"
              alt="avatar"
            />
            <h5 class="fw-bold mb-0">Nguyễn Văn A</h5>
            <p class="mb-0 small">ID: 00123</p>
            <span class="badge bg-light text-danger">O+</span>
          </div>

          <div class="card-body text-start">
            <h6 class="text-secondary text-uppercase mb-2">Thông tin cá nhân</h6>
            <ul class="list-unstyled small">
              <li><i class="bi bi-calendar-event me-2"></i> Ngày sinh: 12/03/1998</li>
              <li><i class="bi bi-gender-ambiguous me-2"></i> Giới tính: Nam</li>
              <li><i class="bi bi-telephone me-2"></i> SĐT: 0912 345 678</li>
              <li><i class="bi bi-envelope me-2"></i> Email: a.nguyen@example.com</li>
              <li><i class="bi bi-geo-alt me-2"></i> Địa chỉ: Đà Nẵng</li>
              <li><i class="bi bi-person-badge me-2"></i> CCCD: 123456789</li>
            </ul>
            <hr />
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-muted small">Trạng thái</span>
              <span class="badge bg-success">Hoạt động</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Cột phải -->
      <div class="col-lg-8">
        <!-- Lịch sử hiến máu -->
        <div class="card mb-4">
          <div class="card-header bg-white">
            <h6 class="fw-bold mb-0">
              <i class="bi bi-calendar-heart-fill text-danger me-2"></i>Lịch sử hiến máu
            </h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped table-hover align-middle">
                <thead class="table-light">
                  <tr>
                    <th>Ngày hiến</th>
                    <th>Địa điểm</th>
                    <th>Số lượng</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>12/09/2024</td>
                    <td>Bệnh viện Đà Nẵng</td>
                    <td>350 ml</td>
                    <td><span class="badge bg-success">Hoàn thành</span></td>
                  </tr>
                  <tr>
                    <td>08/05/2024</td>
                    <td>TT Hiến máu Huế</td>
                    <td>350 ml</td>
                    <td><span class="badge bg-warning text-dark">Đang xử lý</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Ghi chú y tế -->
        <div class="card">
          <div class="card-header bg-white">
            <h6 class="fw-bold mb-0">
              <i class="bi bi-file-earmark-medical-fill text-danger me-2"></i>Ghi chú y tế
            </h6>
          </div>
          <div class="card-body">
            <div class="alert alert-success">
              <i class="bi bi-check-circle-fill me-2"></i> Đủ điều kiện hiến máu.
            </div>
            <ul class="list-group list-group-flush small">
              <li class="list-group-item d-flex justify-content-between">
                <strong>Lần kiểm tra gần nhất:</strong> 10/10/2024
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Huyết áp:</strong> 120/80 mmHg
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Cân nặng:</strong> 65 kg
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DonorDetail",
};
</script>
