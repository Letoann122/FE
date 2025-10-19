<template>
    <div>
        <div class="container-fluid mt-4">
            <div class="row">
                <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                    <div class="position-sticky pt-3">
                        <h6 class="sidebar-heading px-3 mt-4 mb-2 text-muted text-uppercase">
                            <span><i class="bi bi-funnel-fill me-2"></i>Bộ lọc nhanh</span>
                        </h6>
                        <ul class="nav flex-column">
                            <li class="nav-item px-3 py-2">
                                <label for="blood-type" class="form-label small">Nhóm máu</label>
                                <div class="d-flex flex-wrap">
                                    <button v-for="group in bloodGroups" :key="group" class="btn btn-sm btn-outline-secondary me-2 mb-2 px-3">{{ group }}</button>
                                </div>
                            </li>
                            <li class="nav-item px-3 py-2">
                                <label for="last-donation" class="form-label small">Ngày hiến gần nhất</label>
                                <select class="form-select form-select-sm" id="last-donation">
                                    <option selected>Tất cả</option>
                                    <option value="1">1 tháng trước</option>
                                    <option value="3">3 tháng trước</option>
                                </select>
                            </li>
                        </ul>

                        <h6 class="sidebar-heading px-3 mt-4 mb-2 text-muted text-uppercase">
                            <span><i class="bi bi-star-fill me-2"></i>Donor nổi bật</span>
                        </h6>
                        <ul class="nav flex-column mb-2">
                            <li v-for="donor in featuredDonors" :key="donor.id" class="nav-item">
                                <a class="nav-link text-dark" href="#">
                                    <div class="d-flex align-items-center">
                                        <img :src="donor.avatar" class="rounded-circle me-3" width="40" height="40" alt="Avatar">
                                        <div>
                                            <div class="fw-bold">{{ donor.name }}</div>
                                            <small class="text-muted">{{ donor.details }}</small>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>

                        <div class="card text-center bg-light border-0 m-3 mt-4">
                            <div class="card-body">
                                <h5 class="card-title text-danger fs-2 fw-bold">1,247</h5>
                                <p class="card-text text-muted">Người đăng ký</p>
                            </div>
                        </div>
                    </div>
                </nav>

                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div class="card border-0">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3">
                                <h5 class="card-title mb-0"><i class="bi bi-search me-2"></i>Tìm kiếm & Bộ lọc</h5>
                                <button class="btn btn-danger">
                                    <i class="bi bi-plus-lg me-2"></i>Thêm donor mới
                                </button>
                            </div>
                            <form class="row g-3 align-items-center">
                                <div class="col-md-6">
                                    <input type="text" class="form-control" placeholder="Tìm kiếm theo tên hoặc số điện thoại...">
                                </div>
                                <div class="col-md-3">
                                    <select class="form-select">
                                        <option selected>Tất cả nhóm máu</option>
                                        <option v-for="group in bloodGroups" :key="group" :value="group">{{ group }}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <button type="submit" class="btn btn-danger w-100">
                                        <i class="bi bi-funnel me-2"></i>Lọc dữ liệu
                                    </button>
                                </div>
                            </form>

                            <div class="mt-4">
                                <h6 class="mb-3"><i class="bi bi-card-list me-2"></i>Danh sách Donor</h6>
                                <div class="table-responsive">
                                    <table class="table table-hover align-middle">
                                        <thead class="table-light">
                                            <tr>
                                                <th scope="col"><input class="form-check-input" type="checkbox"></th>
                                                <th scope="col">Tên Donor</th>
                                                <th scope="col">Nhóm máu</th>
                                                <th scope="col">Địa chỉ</th>
                                                <th scope="col">Thông tin liên hệ</th>
                                                <th scope="col">Số lần hiến</th>
                                                <th scope="col">Lần hiến cuối</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="donor in donors" :key="donor.id">
                                                <td><input class="form-check-input" type="checkbox"></td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <img :src="donor.avatar" class="rounded-circle me-3" width="40" height="40" alt="Avatar">
                                                        <div>
                                                            <div class="fw-bold">{{ donor.name }}</div>
                                                            </div>
                                                    </div>
                                                </td>
                                                <td><span class="badge bg-danger-light text-danger p-2">{{ donor.bloodType }}</span></td>
                                                
                                                <td>{{ donor.address }}</td>

                                                <td>
                                                    <div>{{ donor.phone }}</div>
                                                    <small class="text-muted">{{ donor.email }}</small>
                                                </td>
                                                <td>{{ donor.age }}</td>
                                                <td>{{ donor.lastDonation }}</td>
                                                <td>
                                                    <span :class="['badge rounded-pill', donor.status === 'Hoạt động' ? 'bg-success-light text-success' : 'bg-warning-light text-warning']">{{ donor.status }}</span>
                                                </td>
                                                <td>
                                                    <button class="btn btn-sm btn-outline-danger">Xem chi tiết</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <nav class="d-flex justify-content-between align-items-center mt-3">
                                    <span class="text-muted small">Hiển thị 1-10 của 1,247 donor</span>
                                    <ul class="pagination mb-0">
                                        <li class="page-item disabled">
                                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Trước</a>
                                        </li>
                                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item">
                                            <a class="page-link" href="#">Sau</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>

        <div class="container-fluid bg-light-red py-5 mt-5">
            <div class="container text-center">
                <h2 class="fw-bold">Quản lý và phát triển cộng đồng người hiến máu</h2>
                <p class="lead text-muted mb-4">Thêm mới người hiến máu, cập nhật thông tin và duy trì dữ liệu chính xác để hệ thống hoạt động hiệu quả</p>
                <button class="btn btn-danger btn-lg"><i class="bi bi-droplet-half me-2"></i>Thêm donor mới</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QuanLyDonor',
    data() {
        return {
            bloodGroups: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
            featuredDonors: [
                { id: 1, name: 'Nguyễn Văn A', details: 'O+, 28 tuổi', avatar: 'https://i.pravatar.cc/150?img=1' },
                { id: 2, name: 'Trần Thị B', details: 'A+, 32 tuổi', avatar: 'https://i.pravatar.cc/150?img=2' },
                { id: 3, name: 'Lê Văn C', details: 'B+, 25 tuổi', avatar: 'https://i.pravatar.cc/150?img=3' },
            ],
            donors: [
                {
                    id: 1,
                    name: 'Nguyễn Văn A',
                    address: 'Hà Nội',
                    bloodType: 'A+',
                    phone: '0987654321',
                    email: 'nguyenvana@email.com',
                    age: 28,
                    lastDonation: '15/04/2025',
                    status: 'Hoạt động',
                    avatar: 'https://i.pravatar.cc/150?img=1'
                },
                {
                    id: 2,
                    name: 'Trần Thị B',
                    address: 'TP. HCM',
                    bloodType: 'O-',
                    phone: '0123456789',
                    email: 'tranthib@email.com',
                    age: 32,
                    lastDonation: '04/02/2025',
                    status: 'Hoạt động',
                    avatar: 'https://i.pravatar.cc/150?img=2'
                },
                {
                    id: 3,
                    name: 'Lê Minh C',
                    address: 'Đà Nẵng',
                    bloodType: 'B+',
                    phone: '0912345678',
                    email: 'leminhc@email.com',
                    age: 25,
                    lastDonation: '10/01/2025',
                    status: 'Tạm ngừng',
                    avatar: 'https://i.pravatar.cc/150?img=3'
                },
            ]
        }
    }
}
</script>

<style scoped>
body {
    background-color: #f8f9fa;
    font-family: 'Public Sans', sans-serif;
}

.sidebar {
    height: 100vh;
}

.page-item.active .page-link {
    background-color: #dc3545;
    border-color: #dc3545;
}

.page-link {
    color: #dc3545;
}

.page-link:hover {
    color: #a71d2a;
}

.bg-light-red {
    background-color: #fef2f2;
}

.badge.bg-danger-light {
    background-color: #fde2e2 !important;
    color: #c81e1e !important;
    font-weight: 500;
}

.badge.bg-success-light {
    background-color: #def7ec !important;
    color: #03543f !important;
    font-weight: 500;
}

.badge.bg-warning-light {
    background-color: #fdf3e2 !important;
    color: #723b13 !important;
    font-weight: 500;
}
</style>