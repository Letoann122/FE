<template>
  <div class="nav-container primary-menu">
    <div class="mobile-topbar-header">
      <div>
        <img src="../../../assets/images/logo-icon.png" class="logo-icon" alt="logo icon" />
      </div>
      <div>
        <h4 class="logo-text">Admin</h4>
      </div>
      <div class="toggle-icon ms-auto"><i class="bx bx-arrow-to-left"></i></div>
    </div>
    <nav class="navbar navbar-expand-xl w-100">
      <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
        <li class="nav-item">
          <router-link to="/admin/dashboard" class="nav-link">
            <div class="parent-icon"><i class="bx bx-home-circle"></i></div>
            <div class="menu-title">Dashboard</div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/content-management" class="nav-link">
            <div class="parent-icon"><i class="fa-solid fa-newspaper"></i></div>
            <div class="menu-title">Nội dung & tin tức</div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/doctor-approve" class="nav-link">
            <div class="parent-icon"><i class="fa-solid fa-newspaper"></i></div>
            <div class="menu-title">Xét duyệt bác sĩ</div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/create-campaign" class="nav-link">
            <div class="parent-icon"><i class="fa-solid fa-newspaper"></i></div>
            <div class="menu-title">Chiến dịch</div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/user-management" class="nav-link">
            <div class="parent-icon"><i class="fa-solid fa-newspaper"></i></div>
            <div class="menu-title">Quản lý người dùng</div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/blood-inventory" class="nav-link">
            <div class="parent-icon"><i class="fa-solid fa-newspaper"></i></div>
            <div class="menu-title">Quản lý kho máu</div>
          </router-link>
        </li>
        <!-- <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="parent-icon"><i class="fa-solid fa-shield"></i></div>
            <div class="menu-title">Phân quyền</div>
          </a>
        </li> -->
        <!-- <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="parent-icon"><i class="bx bx-bar-chart"></i></div>
            <div class="menu-title">Thống kê & Báo cáo</div>
          </a>
          <ul class="dropdown-menu">
            <li class="nav-item">
              <router-link to="/admin/thong-ke/lich-hen-chuyen-khoa" class="nav-link">
                <div class="parent-icon"><i class="bx bx-calendar"></i></div>
                <div class="menu-title">Lịch hẹn theo bác sĩ</div>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/thong-ke/lich-hen-bac-si" class="nav-link">
                <div class="parent-icon"><i class="bx bx-calendar"></i></div>
                <div class="menu-title">Lịch hẹn theo người hiến</div>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/thong-ke/benh-nhan-chuyen-khoa" class="nav-link">
                <div class="parent-icon"><i class="bx bx-calendar"></i></div>
                <div class="menu-title">Số lượng người hiến</div>
              </router-link>
            </li>
          </ul>
        </li> -->
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/appoint-control">
            <i class="bi bi-calendar-check me-1"></i> Quản lý lịch hẹn
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "MenuRocker",
};
</script>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: #6c757d;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #0d6efd;
  background: rgba(13, 110, 253, 0.1);
}

.parent-icon {
  font-size: 20px;
  line-height: 1;
  margin-right: 10px;
}

.menu-title {
  font-size: 14px;
}

.dropdown-menu {
  border: none;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0;
}

.dropdown-menu .nav-link {
  padding: 0.5rem 1rem;
}
</style>
