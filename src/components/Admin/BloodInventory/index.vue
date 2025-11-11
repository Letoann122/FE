<template>
  <div class="container-fluid py-3 blood-inventory-page">
    <!-- Header -->
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h5 class="mb-0">Tồn kho máu</h5>
      <div class="d-flex gap-2">
        <button class="btn btn-primary">
          <i class="bx bx-refresh"></i> Làm mới
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="card mb-3">
      <div class="card-body">
        <div class="row g-3 align-items-end">
          <div class="col-12 col-md-4">
            <label class="form-label">Mã túi</label>
            <input type="text" class="form-control" placeholder="Nhập mã túi" />
          </div>
          <div class="col-6 col-md-2">
            <label class="form-label">Nhóm máu (ABO)</label>
            <select class="form-select">
              <option>Tất cả</option>
              <option>A</option>
              <option>B</option>
              <option>AB</option>
              <option>O</option>
            </select>
          </div>
          <div class="col-6 col-md-2">
            <label class="form-label">Rh</label>
            <select class="form-select">
              <option>Tất cả</option>
              <option>+</option>
              <option>-</option>
            </select>
          </div>
          <div class="col-12 col-md-4">
            <label class="form-label">Trạng thái</label>
            <select class="form-select">
              <option>Tất cả</option>
              <option>Có sẵn</option>
              <option>Giữ chỗ</option>
              <option>Cấp phát</option>
              <option>Di chuyển</option>
              <option>Hủy</option>
            </select>
          </div>
          <div class="col-12 text-end">
            <button class="btn btn-outline-secondary me-2">Đặt lại</button>
            <button class="btn btn-primary">Áp dụng</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart + Summary -->
    <div class="row g-3">
      <div class="col-12 col-lg-6">
        <div class="card h-100">
          <div class="card-header bg-transparent">
            <h6 class="mb-0">Phân bố tồn kho theo nhóm máu (ABO+/-)</h6>
          </div>
          <div class="card-body">
            <canvas height="220" style="width: 100%"></canvas>
            <div class="legend mt-2">
              <div class="legend-item"><span class="legend-swatch" style="background:#17a2b8"></span><span class="legend-label">A+ (0)</span></div>
              <div class="legend-item"><span class="legend-swatch" style="background:#6610f2"></span><span class="legend-label">A- (0)</span></div>
              <div class="legend-item"><span class="legend-swatch" style="background:#28a745"></span><span class="legend-label">B+ (0)</span></div>
              <div class="legend-item"><span class="legend-swatch" style="background:#6f42c1"></span><span class="legend-label">B- (0)</span></div>
              <div class="legend-item"><span class="legend-swatch" style="background:#ffc107"></span><span class="legend-label">AB+ (0)</span></div>
              <div class="legend-item"><span class="legend-swatch" style="background:#e83e8c"></span><span class="legend-label">AB- (0)</span></div>
              <div class="legend-item"><span class="legend-swatch" style="background:#fd7e14"></span><span class="legend-label">O+ (0)</span></div>
              <div class="legend-item"><span class="legend-swatch" style="background:#dc3545"></span><span class="legend-label">O- (0)</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card h-100">
          <div class="card-body">
            <div class="row row-cols-2 row-cols-md-4 g-3 status-row">
              <div class="col">
                <div class="status-card">
                  <div class="label">Có sẵn</div>
                  <div class="value">0</div>
                  <span class="badge bg-success">Có sẵn</span>
                </div>
              </div>
              <div class="col">
                <div class="status-card">
                  <div class="label">Giữ chỗ</div>
                  <div class="value">0</div>
                  <span class="badge bg-warning text-dark">Giữ chỗ</span>
                </div>
              </div>
              <div class="col">
                <div class="status-card">
                  <div class="label">Cấp phát</div>
                  <div class="value">0</div>
                  <span class="badge bg-primary">Cấp phát</span>
                </div>
              </div>
              <div class="col">
                <div class="status-card">
                  <div class="label">Hủy</div>
                  <div class="value">0</div>
                  <span class="badge bg-danger">Hủy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="card mt-3">
      <div class="card-body">
        <!-- Actions -->
        <div class="d-flex flex-wrap gap-2 mb-3 justify-content-end">
          <div class="btn-group">
            <button class="btn btn-success btn-sm">Có sẵn</button>
            <button class="btn btn-warning btn-sm">Giữ chỗ</button>
            <button class="btn btn-primary btn-sm">Cấp phát</button>
            <button class="btn btn-danger btn-sm">Hủy</button>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-striped align-middle">
            <thead>
              <tr>
                <th>Mã túi</th>
                <th>Nhóm</th>
                <th>Rh</th>
                <th>Thể tích (ml)</th>
                <th>Ngày thu</th>
                <th>Hạn dùng</th>
                <th>Trạng thái</th>
                <th class="text-end">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="8" class="text-center text-muted py-4">Không có dữ liệu</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./blood-inventory.css"></style>
