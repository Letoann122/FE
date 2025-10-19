<template>
    <div v-if="isLoading" class="text-center p-5">
        <div class="spinner-border text-danger" role="status"></div>
        <p class="mt-2">Đang tải dữ liệu donor...</p>
    </div>

    <div v-else-if="!donor" class="alert alert-danger">
        Không tìm thấy thông tin cho donor này.
    </div>

    <div v-else class="donor-detail-wrapper">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <a href="#" @click.prevent="$router.go(-1)" class="btn btn-light border">
                <i class="bi bi-arrow-left"></i>
            </a>
            <h2 class="fw-bold mb-0 mx-3 flex-grow-1">Chi tiết Donor</h2>
            <div>
                <button class="btn btn-outline-secondary me-2"><i class="bi bi-pencil-square me-2"></i>Cập nhật thông tin</button>
                <button class="btn btn-danger"><i class="bi bi-lock-fill me-2"></i>Khóa tài khoản</button>
            </div>
        </div>

        <div class="row g-4">
            <div class="col-lg-4">
                <div class="card shadow-sm border-0">
                    <div class="profile-header">
                        <img :src="donor.avatar" class="avatar">
                        <h4 class="fw-bold mt-3 mb-0">{{ donor.name }}</h4>
                        <p class="text-white-50">ID: {{ donor.id }}</p>
                        <span class="badge bg-white text-danger">{{ donor.bloodType }}</span>
                    </div>
                    <div class="card-body">
                        <h6 class="text-muted fw-bold text-uppercase small mb-3">Thông tin cá nhân</h6>
                        <ul class="list-unstyled info-list">
                            <li><i class="bi bi-calendar-event"></i><span><strong>Ngày sinh:</strong> {{ donor.dob }}</span></li>
                            <li><i class="bi bi-gender-ambiguous"></i><span><strong>Giới tính:</strong> {{ donor.gender }}</span></li>
                            <li><i class="bi bi-telephone"></i><span><strong>Số điện thoại:</strong> {{ donor.phone }}</span></li>
                            <li><i class="bi bi-envelope"></i><span><strong>Email:</strong> {{ donor.email }}</span></li>
                            <li><i class="bi bi-geo-alt"></i><span><strong>Địa chỉ:</strong> {{ donor.address }}</span></li>
                            <li><i class="bi bi-person-badge"></i><span><strong>CCCD/CMND:</strong> {{ donor.nationalId }}</span></li>
                        </ul>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="text-muted mb-0 small">Trạng thái</h6>
                            <span class="badge status-badge" :class="donor.status === 'Hoạt động' ? 'status-active' : 'status-inactive'">{{ donor.status }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-8">
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-header bg-white py-3">
                        <h5 class="fw-bold mb-0"><i class="bi bi-calendar-heart-fill me-2"></i>Lịch sử hiến máu</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-borderless history-table">
                                <thead>
                                    <tr>
                                        <th>Ngày hiến</th>
                                        <th>Địa điểm</th>
                                        <th>Số lượng</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in donor.donationHistory" :key="index">
                                        <td><i class="bi bi-calendar-check text-danger me-2"></i>{{ item.date }}</td>
                                        <td>{{ item.location }}</td>
                                        <td>{{ item.volume }}</td>
                                        <td><span class="badge status-badge status-active">{{ item.status }}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                </div>

                <div class="card shadow-sm border-0">
                     <div class="card-header bg-white py-3">
                        <h5 class="fw-bold mb-0"><i class="bi bi-file-earmark-medical-fill me-2"></i>Ghi chú y tế</h5>
                    </div>
                    <div class="card-body">
                        <div class="alert alert-success-light mb-4">
                            <i class="bi bi-check-circle-fill me-2"></i> {{ donor.medicalNotes.mainNote }}
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between"><strong>Lần kiểm tra gần nhất:</strong> {{ donor.medicalNotes.lastCheckup }}</li>
                            <li class="list-group-item d-flex justify-content-between"><strong>Huyết áp:</strong> {{ donor.medicalNotes.bloodPressure }}</li>
                            <li class="list-group-item d-flex justify-content-between"><strong>Cân nặng:</strong> {{ donor.medicalNotes.weight }} kg</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getDonorById } from '@/services/donorService.js';

export default {
    name: 'DonorDetailView',
    data() {
        return {
            isLoading: true,
            donor: null,
        }
    },
    created() {
        const donorId = this.$route.params.id;
        this.donor = getDonorById(donorId);
        this.isLoading = false;
    }
}
</script>

<style scoped>
.profile-header {
    background-color: #dc3545;
    color: white;
    padding: 1.5rem;
    text-align: center;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
}
.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #fff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.info-list li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 0.9rem;
}
.info-list i {
    font-size: 1.2rem;
    color: #6c757d;
    width: 30px;
    text-align: center;
    margin-right: 1rem;
}
.status-badge {
    padding: 0.5em 1em;
    font-weight: 600;
    border-radius: 20px;
}
.status-active { background-color: #d1e7dd; color: #198754; }
.status-inactive { background-color: #fff3cd; color: #664d03; }
.alert-success-light { background-color: #d1e7dd; color: #198754; border: none; }
.history-table th { font-weight: 500; color: #6c757d; }
.history-table td { color: #212529; }
</style>