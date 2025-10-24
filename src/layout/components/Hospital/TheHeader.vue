<template>
    <header class="main-header py-3 px-4 shadow-sm bg-white d-flex justify-content-between align-items-center">
        <div class="logo-section">
            <h4 class="fw-bold mb-0 d-flex align-items-center">
                <i class="bi bi-heart-pulse-fill text-danger me-2"></i>
                Smart Blood Donation
            </h4>
        </div>
        <nav class="main-nav d-none d-md-block">
            <ul class="nav">
                <li class="nav-item">
                    <router-link to="/Hospital/dashboard" class="nav-link text-dark">Dashboard</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Hospital/blood-inventory" class="nav-link text-dark">Quản lý kho máu</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Hospital/donor-management" class="nav-link text-dark">Quản lý Donor</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Hospital/campaign-management" class="nav-link text-dark">Quản lý chiến dịch</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Hospital/support" class="nav-link text-dark">Tư vấn & Hỗ trợ</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Hospital/report" class="nav-link text-dark">Báo cáo</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Hospital/settings" class="nav-link text-dark">Cài đặt</router-link>
                </li>
                </ul>
        </nav>
        <div class="header-actions">
            <button @click="logout" class="btn btn-danger btn-sm fw-bold">
                <i class="bi bi-box-arrow-right me-2"></i>Đăng xuất
            </button>
        </div>
    </header>
</template>

<script>
export default {
    name: 'TheHeader',
    methods: {
        logout() {
            alert('Đăng xuất!');
        }
    }
}
</script>

<style scoped>
.main-header {
    border-bottom: 1px solid #e9ecef;
}
.nav-link.router-link-exact-active {
    color: #dc3545 !important;
    font-weight: bold;
}
</style>