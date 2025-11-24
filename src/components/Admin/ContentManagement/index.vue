<template>
  <div class="container-fluid py-3 content-management-page">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
      <div>
        <h5 class="mb-1">Quản lý nội dung</h5>
        <small class="text-muted">Duyệt / đăng tin tức, bài viết, chiến dịch</small>
      </div>
      <div class="d-flex flex-wrap align-items-center gap-2">
        <button class="btn btn-outline-secondary btn-sm">
          <i class="bx bx-refresh"></i> Làm mới
        </button>
        <div class="btn-group">
          <button class="btn btn-outline-primary btn-sm">
            <i class="bx bx-news"></i> Tin tức
          </button>
          <button class="btn btn-outline-primary btn-sm">
            <i class="bx bx-file"></i> Bài viết
          </button>
          <button class="btn btn-outline-primary btn-sm">
            <i class="bx bx-bullseye"></i> Chiến dịch
          </button>
        </div>
        <button class="btn btn-success btn-sm">
          <i class="bx bx-plus-circle"></i> Tạo mới
        </button>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-body">
        <div class="row g-3 align-items-end">
          <div class="col-12 col-md-3">
            <label class="form-label">Loại nội dung</label>
            <select class="form-select">
              <option>Tất cả</option>
              <option>Tin tức</option>
              <option>Bài viết</option>
              <option>Chiến dịch</option>
            </select>
          </div>
          <div class="col-6 col-md-2">
            <label class="form-label">Trạng thái</label>
            <select class="form-select">
              <option>Tất cả</option>
              <option>Chờ duyệt</option>
              <option>Đã đăng</option>
              <option>Nháp</option>
              <option>Hẹn lịch</option>
            </select>
          </div>
          <div class="col-6 col-md-2">
            <label class="form-label">Ưu tiên</label>
            <select class="form-select">
              <option>Tất cả</option>
              <option>Ngay lập tức</option>
              <option>Thông thường</option>
              <option>Hỗ trợ</option>
            </select>
          </div>
          <div class="col-12 col-md-3">
            <label class="form-label">Tác giả / đơn vị</label>
            <input type="text" class="form-control" placeholder="Tìm theo tên" />
          </div>
          <div class="col-6 col-md-2">
            <label class="form-label">Từ ngày</label>
            <input type="date" class="form-control" />
          </div>
          <div class="col-6 col-md-2">
            <label class="form-label">Đến ngày</label>
            <input type="date" class="form-control" />
          </div>
          <div class="col-12 text-end">
            <button class="btn btn-outline-secondary me-2">Đặt lại</button>
            <button class="btn btn-primary">Áp dụng</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-6 col-lg-3">
        <div class="status-card">
          <div class="d-flex justify-content-between w-100">
            <span class="text-muted small">Chờ duyệt</span>
            <span class="badge bg-warning text-dark">Hàng đợi</span>
          </div>
          <div class="value">--</div>
          <div class="text-muted small">Đang cập nhật</div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="status-card">
          <div class="d-flex justify-content-between w-100">
            <span class="text-muted small">Đã hẹn lịch</span>
            <span class="badge bg-info text-dark">Hẹn giờ</span>
          </div>
          <div class="value">--</div>
          <div class="text-muted small">Đang cập nhật</div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="status-card">
          <div class="d-flex justify-content-between w-100">
            <span class="text-muted small">Đã đăng</span>
            <span class="badge bg-success">Hoạt động</span>
          </div>
          <div class="value">--</div>
          <div class="text-muted small">Đang cập nhật</div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="status-card">
          <div class="d-flex justify-content-between w-100">
            <span class="text-muted small">Cần kiểm tra</span>
            <span class="badge bg-danger">Cân nhắc</span>
          </div>
          <div class="value">--</div>
          <div class="text-muted small">Đang cập nhật</div>
        </div>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-6">
        <div class="card h-100">
          <div class="card-header bg-transparent d-flex align-items-center justify-content-between">
            <div>
              <h6 class="mb-0">Hàng đợi duyệt</h6>
              <small class="text-muted">Tin tức, bài viết đang chờ duyệt</small>
            </div>
            <button class="btn btn-outline-primary btn-sm">Duyệt nhanh</button>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Loại</th>
                    <th>Tiêu đề</th>
                    <th>Tác giả</th>
                    <th>Ngày gửi</th>
                    <th class="text-end">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="5" class="text-center text-muted py-4">
                      Chưa có dữ liệu
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-6">
        <div class="card h-100">
          <div class="card-header bg-transparent d-flex align-items-center justify-content-between">
            <div>
              <h6 class="mb-0">Tin đăng gần nhất</h6>
              <small class="text-muted">Theo dõi bài viết đã đăng</small>
            </div>
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-secondary">Tất cả</button>
              <button class="btn btn-outline-secondary">Tin tức</button>
              <button class="btn btn-outline-secondary">Chiến dịch</button>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-striped align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Tiêu đề</th>
                    <th>Loại</th>
                    <th>Ngày đăng</th>
                    <th>Trạng thái</th>
                    <th class="text-end">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="5" class="text-center text-muted py-4">
                      Chưa có dữ liệu
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header bg-transparent d-flex align-items-center justify-content-between">
        <div>
          <h6 class="mb-0">Bảng lịch đăng</h6>
          <small class="text-muted">Quản lý các lịch hẹn đăng tin</small>
        </div>
        <button class="btn btn-outline-secondary btn-sm">
          <i class="bx bx-calendar"></i> Xem lịch
        </button>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Tiêu đề</th>
                <th>Loại</th>
                <th>Thời gian đăng</th>
                <th>Kênh hiển thị</th>
                <th class="text-end">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="5" class="text-center text-muted py-4">
                  Chưa có dữ liệu
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./content-management.css"></style>
