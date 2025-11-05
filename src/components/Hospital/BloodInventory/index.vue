<template>
  <div class="container-fluid py-4 min-vh-100">
    <div class="row gx-4">
      <!-- Cột Bộ lọc (nhỏ bên trái) -->
      <div class="col-xl-3 col-lg-4">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h5 class="fw-bold mb-3">
              <i class="bi bi-filter-circle-fill me-2 text-danger"></i>Bộ lọc
            </h5>

            <h6 class="text-muted small fw-bold">Nhóm máu</h6>
            <div class="d-flex flex-wrap gap-2 mb-3">
              <button class="btn btn-danger btn-sm">Tất cả</button>
              <button class="btn btn-outline-secondary btn-sm">A+</button>
              <button class="btn btn-outline-secondary btn-sm">A-</button>
              <button class="btn btn-outline-secondary btn-sm">B+</button>
              <button class="btn btn-outline-secondary btn-sm">B-</button>
              <button class="btn btn-outline-secondary btn-sm">AB+</button>
              <button class="btn btn-outline-secondary btn-sm">AB-</button>
              <button class="btn btn-outline-secondary btn-sm">O+</button>
              <button class="btn btn-outline-secondary btn-sm">O-</button>
            </div>

            <h6 class="text-muted small fw-bold">Trạng thái</h6>
            <div class="form-check mb-1">
              <input class="form-check-input" type="radio" name="statusFilter" id="statusAll" checked>
              <label class="form-check-label" for="statusAll">Tất cả</label>
            </div>
            <div class="form-check mb-1">
              <input class="form-check-input" type="radio" name="statusFilter" id="statusInStock">
              <label class="form-check-label" for="statusInStock">Còn hạn</label>
            </div>
            <div class="form-check mb-1">
              <input class="form-check-input" type="radio" name="statusFilter" id="statusExpiring">
              <label class="form-check-label" for="statusExpiring">Sắp hết hạn</label>
            </div>
          </div>
        </div>
      </div>

      <!-- Cột nội dung chính (rộng bên phải) -->
      <div class="col-xl-9 col-lg-8">
        <!-- Form thêm lô máu -->
        <div class="card shadow-sm border-0 mb-4">
          <div class="card-body">
            <h5 class="fw-bold mb-3">
              <i class="bi bi-plus-circle-fill text-danger me-2"></i>Nhập lô máu mới
            </h5>

            <form class="row g-3 align-items-end">
              <div class="col-md-3">
                <label class="form-label small">Nhóm máu</label>
                <select class="form-select">
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>

              <div class="col-md-3">
                <label class="form-label small">Ngày hiến máu</label>
                <input type="date" class="form-control">
              </div>

              <div class="col-md-3">
                <label class="form-label small">Hạn sử dụng</label>
                <input type="date" class="form-control">
              </div>

              <div class="col-md-2">
                <label class="form-label small">Số lượng (túi)</label>
                <input type="number" class="form-control" min="1">
              </div>

              <div class="col-auto">
                <button type="submit" class="btn btn-danger fw-bold">
                  <i class="bi bi-save2 me-2"></i>Thêm
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Bảng tồn kho -->
        <div class="card shadow-sm border-0">
          <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 class="mb-0 fw-bold">
              <i class="bi bi-archive-fill text-danger me-2"></i>Tồn kho máu
            </h5>
            <div class="input-group" style="max-width: 250px;">
              <span class="input-group-text bg-light border-0">
                <i class="bi bi-search"></i>
              </span>
              <input type="text" class="form-control bg-light border-0" placeholder="Tìm kiếm...">
            </div>
          </div>

          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th>ID Lô Máu</th>
                    <th>Nhóm máu</th>
                    <th>Số lượng</th>
                    <th>Ngày nhập</th>
                    <th>Hạn sử dụng</th>
                    <th class="text-center">Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="fw-bold">BL2024001</td>
                    <td class="fw-bold text-danger">A+</td>
                    <td>120 túi</td>
                    <td>05/10/2025</td>
                    <td>15/11/2025</td>
                    <td class="text-center"><span class="badge bg-success rounded-pill">Đầy đủ</span></td>
                    <td><button class="btn btn-sm btn-outline-primary">Xem chi tiết</button></td>
                  </tr>
                  <tr>
                    <td class="fw-bold">BL2024005</td>
                    <td class="fw-bold text-danger">AB+</td>
                    <td>15 túi</td>
                    <td>25/09/2025</td>
                    <td>05/11/2025</td>
                    <td class="text-center"><span class="badge bg-warning text-dark rounded-pill">Sắp hết hạn</span></td>
                    <td><button class="btn btn-sm btn-outline-primary">Xem chi tiết</button></td>
                  </tr>
                  <tr>
                    <td class="fw-bold">BL2024006</td>
                    <td class="fw-bold text-danger">O-</td>
                    <td>8 túi</td>
                    <td>20/09/2025</td>
                    <td>01/11/2025</td>
                    <td class="text-center"><span class="badge bg-danger rounded-pill">Nguy cấp</span></td>
                    <td><button class="btn btn-sm btn-outline-primary">Xem chi tiết</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BloodInventoryView",
};
</script>
