<template>
  
    

    <main class="dashboard-content p-4">
      <div class="alert alert-danger d-flex align-items-center mb-4 rounded-3 shadow-sm" role="alert">
        <i class="fas fa-bell me-2 fs-5"></i>
        <div>
          Cảnh báo khẩn cấp: 
          Kho máu O- đang thiếu nghiêm trọng. Cần bổ sung gấp!
        </div>
      </div>

      <div class="row g-4 mb-4">
        <div class="col-lg-3 col-md-6">
          <div class="card shadow-sm border-0 h-100 rounded-3 p-3">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <h5 class="card-title text-muted mb-0">Tổng đơn vị máu</h5>
                <span class="fs-4">🩸</span>
              </div>
              <h2 class="card-value fw-bold mb-0">1,247</h2>
              <p class="card-text text-success small">+12% so với tuần trước</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="card shadow-sm border-0 h-100 rounded-3 p-3">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <h5 class="card-title text-muted mb-0">Máu nhập tháng này</h5>
                <span class="fs-4">⬇️</span>
              </div>
              <h2 class="card-value fw-bold mb-0">342</h2>
              <p class="card-text text-success small">+8% so với tháng trước</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="card shadow-sm border-0 h-100 rounded-3 p-3">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <h5 class="card-title text-muted mb-0">Máu xuất tháng này</h5>
                <span class="fs-4">⬆️</span>
              </div>
              <h2 class="card-value fw-bold mb-0">298</h2>
              <p class="card-text text-danger small">+15% so với tháng trước</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="card shadow-sm border-0 h-100 rounded-3 p-3">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <h5 class="card-title text-muted mb-0">Hiệu quả chiến dịch</h5>
                <span class="fs-4">📈</span>
              </div>
              <h2 class="card-value fw-bold mb-0">87%</h2>
              <p class="card-text text-muted small">tham gia cao</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4 mb-4">
        <div class="col-lg-8">
          <div class="card shadow-sm border-0 rounded-3 mb-4">
            <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 class="mb-0 fw-bold">Tổng quan Kho máu</h5>
              <button class="btn btn-sm btn-outline-primary">Xem chi tiết</button>
            </div>
            <div class="card-body">
              <div class="row text-center mb-4">
                <div class="col-3">
                  <div class="blood-group-card p-3 rounded-3" style="background-color: #fcebeb;">
                    <h5 class="fw-bold mb-1">Nhóm A</h5>
                    <p class="fw-bold mb-0 text-danger">156 đơn vị</p>
                    <small class="text-muted">đủ</small>
                  </div>
                </div>
                <div class="col-3">
                  <div class="blood-group-card p-3 rounded-3" style="background-color: #e0f2f7;">
                    <h5 class="fw-bold mb-1">Nhóm B</h5>
                    <p class="fw-bold mb-0 text-info">98 đơn vị</p>
                    <small class="text-muted">thiếu</small>
                  </div>
                </div>
                <div class="col-3">
                  <div class="blood-group-card p-3 rounded-3" style="background-color: #e6e6e6;">
                    <h5 class="fw-bold mb-1">Nhóm AB</h5>
                    <p class="fw-bold mb-0 text-secondary">45 đơn vị</p>
                    <small class="text-muted">đủ</small>
                  </div>
                </div>
                <div class="col-3">
                  <div class="blood-group-card p-3 rounded-3" style="background-color: #fff3e0;">
                    <h5 class="fw-bold mb-1">Nhóm O</h5>
                    <p class="fw-bold mb-0 text-warning">23 đơn vị</p>
                    <small class="text-muted">thiếu</small>
                  </div>
                </div>
              </div>
              <p class="text-muted small text-center">Xu hướng nhập - xuất máu [7 ngày qua]</p>
              <div class="chart-placeholder bg-light p-5 rounded-3 text-center text-muted">
                <p>Biểu đồ đường </p>
              </div>
            </div>
          </div>

          <div class="card shadow-sm border-0 rounded-3 mb-4">
            <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 class="mb-0 fw-bold">Tổng quan Donor</h5>
              <button class="btn btn-sm btn-outline-primary">Xem tất cả</button>
            </div>
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-md-6 text-center">
                  <h3 class="fw-bold mb-1">2,847</h3>
                  <p class="text-muted mb-0">Tổng donor đăng ký</p>
                  <h3 class="fw-bold mt-3 mb-1">1,234</h3>
                  <p class="text-muted mb-0">Donor tích cực</p>
                  <h3 class="fw-bold mt-3 mb-1">156</h3>
                  <p class="text-muted mb-0">Donor tháng này</p>
                </div>
                <div class="col-md-6">
                  <p class="text-center text-muted small mb-3">Phân bổ Donor theo nhóm máu</p>
                  <div class="chart-placeholder bg-light p-5 rounded-3 text-center text-muted">
                    <p>Biểu đồ </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card shadow-sm border-0 rounded-3 mb-4">
            <div class="card-header bg-white py-3">
              <h5 class="mb-0 fw-bold">Chiến dịch sắp tới</h5>
            </div>
            <div class="card-body">
              <div class="campaign-item p-3 mb-3 rounded-3" style="background-color: #e0f2f7;">
                <h6 class="fw-bold mb-1">Hiến máu mùa xuân</h6>
                <p class="small text-muted mb-1">20/01/2024 - Công Viên Thanh Niên </p>
                <span class="badge bg-primary">Sắp diễn ra</span>
              </div>
              <div class="campaign-item p-3 mb-3 rounded-3" style="background-color: #ffe0b2;">
                <h6 class="fw-bold mb-1">Hiến máu Tình nguyện</h6>
                <p class="small text-muted mb-1">02/02/2024 - Trường ĐH Duy Tân</p>
                <span class="badge bg-warning text-dark">Đang chuẩn bị</span>
              </div>
              <div class="campaign-item p-3 mb-3 rounded-3" style="background-color: #e8f5e9;">
                <h6 class="fw-bold mb-1">Chủ nhật đỏ</h6>
                <p class="small text-muted mb-1">10/02/2024 - Bệnh viện Đa Khoa ĐN</p>
                <span class="badge bg-success">Đang lên kế hoạch</span>
              </div>
              <div class="text-center mt-3">
                <button class="btn btn-outline-primary btn-sm">Xem tất cả chiến dịch</button>
              </div>
            </div>
          </div>

          <div class="card shadow-sm border-0 rounded-3 mb-4">
            <div class="card-header bg-white py-3">
              <h5 class="mb-0 fw-bold">Thông báo & Cảnh báo</h5>
            </div>
            <div class="card-body">
              <div class="alert alert-info p-3 mb-3 rounded-3 small">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Thiếu máu O: Chỉ còn 23 đơn vị, cần bổ sung gấp
              </div>
              <div class="alert alert-warning p-3 mb-3 rounded-3 small">
                <i class="fas fa-clock me-2"></i>
                Lô máu sắp hết hạn: 15 đơn vị hết hạn trong 3 ngày
              </div>
              <div class="alert alert-success p-3 rounded-3 small" >
                <i class="fas fa-calendar-alt me-2"></i>
                Lịch hẹn dày đặc: 50 lịch hẹn trong tuần tới
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
   
  
</template>
<script>
export default {

}
</script>
<style scoped>
.dashboard-content {
    max-width: 1300px;
    width: 100%;
    margin: 0 auto;
}

.alert-danger {
  background-color: #ffebee; 
  color: #d32f2f;
  border-color: #ef9a9a; 
}
.alert-danger i {
  color: #d32f2f;
}

.card {
  border-radius: 0.75rem;
}

.card-title {
  font-size: 0.95rem;
}

.card-value {
  font-size: 2.2rem;
}

.blood-group-card {
    border: 1px solid #e0e0e0;
}

.campaign-item {
    border-left: 5px solid;
}
.campaign-item:nth-child(1) { border-color: #2196f3; }
.campaign-item:nth-child(2) { border-color: #ffc107; }
.campaign-item:nth-child(3) { border-color: #28a745; }

.alert-warning {
    background-color: #fff8e1;
    color: #ff9800;
    border-color: #ffecb3;
}
.alert-warning i {
    color: #ff9800;
}

.alert-info {
    background-color: #e1f5fe;
    color: #03a9f4;
    border-color: #b3e5fc;
}
.alert-info i {
    color: #03a9f4;
}

.alert-primary {
    background-color: #e3f2fd;
    color: #2196f3;
    border-color: #90caf9;
}
.alert-primary i {
    color: #2196f3;
}
</style>
