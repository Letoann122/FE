<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <div class="card mt-4 h-100">
          <div>
            <h4 class="fw-bold mt-3 ms-3">Đăng ký tài khoản</h4>
          <p class="ms-3">Tham gia cộng đồng hiến máu cứu người</p>
          <div class="d-flex align-item-center ms-3">
            <i class="fa-solid fa-user mt-1" style="color: #ff0000;"></i>
            <p class="ms-2 fw-bold">Thông tin cá nhân</p>
          </div>
          <div class="row">
            <div class="col-lg-6">
            <label class="ms-3">Họ và tên</label>
            <input type="text" class="form-control ms-3 mt-2" placeholder="Nhập họ và tên">
          </div>
          <div class="col-lg-6">
            <label>Họ và tên</label>
            <input type="text" class="form-control mt-2" placeholder="Nhập họ và tên">
          </div>
          <div class="col-lg-6">
            <label class="ms-3 mt-3">Giới tính</label>
            <select class="form-select ms-3 mt-2" aria-label="Default select example">
              <option disabled selected>Vui lòng chọn giới tính</option>
              <option value="1">Nam</option>
              <option value="2">Nữ</option>
            </select>
          </div>
          <div class="col-lg-6">
            <label class="mt-3">Số điện thoại</label>
            <input type="number" class="form-control mt-2" placeholder="0123456789">
          </div>
          <div class="col-lg-12">
            <label class="mt-3 ms-3">Email</label>
            <input type="email" placeholder="example@gmail.com" class="form-control mt-2">
          </div>
          <div class="col-lg-12">
            <label class="ms-3 mt-3">Địa chỉ</label>
            <input type="text" class="form-control" placeholder="Nhập địa chỉ của bạn">
          </div>
          <div class="mt-4 d-flex align-item-center">
            <i class="fa-solid fa-heart-pulse mt-1 ms-3" style="color: #ff0000;"></i>
            <p class="fw-bold ms-2">Thông tin y tế</p>
          </div>
          <div class="col-lg-6">
            <label class="ms-3">Nhóm máu</label>
            <select class="form-select ms-3 mt-1" aria-label="Chọn nhóm máu">
              <option disabled selected>Chọn nhóm máu</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div class="col-lg-6">
            <label>Vai trò</label>
            <select class="form-select mt-1" aria-label="Default select example">
              <option value="1">Người hiến máu</option>
            </select>
          </div>
          <div class="col-lg-12">
            <label class="ms-3 mt-2">Tiền sử bệnh lý</label>
            <input type="text" class="form-control mt-1">
          </div>
          <div class="mt-3 ms-3 d-flex align-item-center">
            <i class="fa-solid fa-lock mt-1" style="color: #ff0000;"></i>
            <p class="fw-bold ms-2">Thông tin tài khoản</p>
          </div>
          <div class="col-lg-6">
            <label class="ms-3">Mật khẩu</label>
            <input type="password" placeholder="Tối thiểu 8 ký tự" class="ms-3 form-control mt-1">
          </div>
          <div class="col-lg-6">
            <label>Xác nhận mật khẩu</label>
            <input type="password" class="form-control mt-1" placeholder="Nhập lại mật khẩu">
          </div>
          <div class="group-input text-end mt-5">
            <button class="btn btn-danger">Đăng ký</button>
            <button class="btn btn-secondary ms-2 me-5">Huỷ</button>
          </div>
          <p class="text-center mt-3">
            Đã có tài khoản?
            <a href="#" class="text-danger fw-bold">Đăng nhập ngay</a>
          </p>
          </div>
          </div>
          
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card h-100 mt-4" style="background-color: #fdecec;">
          <h5 class="fw-bold text-center mt-3">Cùng nhau cứu sống</h5>
          <p class="text-center text-secondary">Mỗi giọt máu bạn hiến có thể cứu sống 3 người</p>
          <img class="img-fluid w-75 mx-auto mb-4" src="https://static.vecteezy.com/system/resources/previews/008/190/897/non_2x/human-blood-donate-on-white-background-free-vector.jpg" alt="">
          <div class="d-flex align-item-center">
            <i class="ms-3 mt-1 fa-solid fa-heart" style="color: #ff0000;"></i>
            <p class="ms-2">Quy trình hiến máu an toàn</p>
          </div>
          <div class="d-flex align-item-center">
            <i class="ms-3 mt-1 fa-solid fa-people-group" style="color: #ff0000;"></i>
            <p class="ms-2">Cộng đồng hiến máu tích cực</p>
          </div>
          <div class="d-flex align-item-center">
            <i class="ms-3 mt-1 fa-solid fa-hospital" style="color: #ff0000;"></i>
            <p class="ms-2">Kết nối với bệnh viện</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
}
</script>
<style>
  
</style>