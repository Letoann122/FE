<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-3 shadow-sm border">
        <div
          class="mt-3 m-3 shadow-sm d-flex align-items-center justify-content-center"
          style="width: 200px; height: 30px; background-color: antiquewhite"
        >
          <a href="" style="text-decoration: none">
            <i class="bi bi-person-fill text-danger"></i>
            <p class="ms-2 d-inline text-danger">Hồ sơ cá nhân</p>
          </a>
        </div>

        <div
          class="mt-3 m-3 shadow-sm d-flex align-items-center justify-content-center"
          style="width: 200px; height: 30px"
        >
          <a href="" style="text-decoration: none">
            <i class="bi bi-arrow-counterclockwise"></i>
            <p class="ms-2 d-inline">Lịch sử hiến máu</p>
          </a>
        </div>

        <div
          class="mt-3 m-3 shadow-sm d-flex align-items-center justify-content-center"
          style="width: 200px; height: 30px"
        >
          <a href="" style="text-decoration: none">
            <i class="bi bi-shield-shaded"></i>
            <p class="ms-2 d-inline">Bảo mật tài khoản</p>
          </a>
        </div>
      </div>

      <div class="col-md-9 shadow-sm border">
        <div class="ms-4">
          <i class="bi bi-person-fill fs-3 fw-bold text-danger"></i>
          <h5 class="d-inline ms-3">Hồ sơ cá nhân</h5>
          <p>Cập nhật hồ sơ cá nhân của bạn</p>
        </div>

        <div class="row">
          <div
            class="col-md-4 d-flex flex-column align-items-center justify-content-center">
            <img
              class="rounded-circle mb-3"
              src="../../../assets/img/hienmau.png"
              alt="avata"
              style="height: 200px; width: 200px"
            />
            <div class="d-flex flex-column align-items-center">
              <div class="input-group" style="width: 180px">
                <span class="input-group-text bg-white border-end-0">
                  <i class="bi bi-arrow-bar-up fs-5 text-danger"></i>
                </span>
                <input
                  type="file"
                  accept="image/*" p
                  class="form-control rounded-pill border-start-0"
                  style="width: 120px"
                />
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Họ và tên *</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Ngày sinh *</label>
                <input type="date" class="form-control" required />
              </div>
              <div class="col-md-12">
                <label class="form-label mb-0">Địa chỉ</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="40 Nguyễn Hữu Thọ, Hải Châu, Đà Nẵng"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Nhóm máu *</label>
                <select class="form-select" required>
                  <option value="">Chọn nhóm máu</option>
                  <option>A</option>
                  <option>B</option>
                  <option>AB</option>
                  <option>O</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">Số điện thoại *</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="0123456789"
                  required
                />
              </div>
              <div class="col-md-12">
                <label class="form-label">Tiền sử y tế</label>
                <textarea
                  type="text"
                  class="form-control"
                  placeholder="Không có tiền sử bệnh lý đặc biệt"
                  rows="4"
                ></textarea>
              </div>

              <div class="col-md-12">
                <button
                  class="rounded"
                  type="button"
                  style="margin-right: 10px; background-color: red"
                >
                  <i class="bi bi-save-fill"></i>
                  Lưu thay đổi
                </button>
                <button type="button" class="mb-3 rounded">
                  <i class="bi bi-tools"></i>
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
