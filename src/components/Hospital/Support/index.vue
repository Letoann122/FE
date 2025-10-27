<template>
    <div class="support-page-wrapper">
        <div class="mb-4">
            <h2 class="fw-bold">Tư vấn & Hỗ trợ</h2>
            <p class="text-muted">Gửi hướng dẫn và tư vấn sức khỏe trực tiếp đến donor.</p>
        </div>

        <div class="row g-4">
            <div class="col-lg-8">
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-body p-4">
                        <h5 class="card-title fw-bold mb-4"><i class="bi bi-send-fill me-2 text-danger"></i>Gửi tư vấn mới</h5>
                        <form @submit.prevent="submitConsultation">
                            <div class="mb-3">
                                <label for="consultTitle" class="form-label">Tiêu đề tư vấn</label>
                                <input type="text" class="form-control" id="consultTitle" placeholder="Nhập tiêu đề ngắn gọn" v-model="newConsultation.title">
                            </div>
                            <div class="mb-3">
                                <label for="consultRecipient" class="form-label">Chọn người nhận</label>
                                <select id="consultRecipient" class="form-select" v-model="newConsultation.recipient">
                                    <option selected value="all">Tất cả donor</option>
                                    <option value="group_a">Donor nhóm A+</option>
                                    <option value="group_a">Donor nhóm A-</option>
                                    <option value="group_a">Donor nhóm B+</option>
                                    <option value="group_a">Donor nhóm B-</option>
                                    <option value="group_a">Donor nhóm AB+</option>
                                    <option value="group_a">Donor nhóm AB-</option>
                                    <option value="group_a">Donor nhóm O+</option>
                                    <option value="group_o">Donor nhóm O-</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="consultContent" class="form-label">Nội dung tư vấn</label>
                                <textarea class="form-control" id="consultContent" rows="5" placeholder="Nhập nội dung tư vấn chi tiết..." v-model="newConsultation.content"></textarea>
                            </div>
                            <div class="mb-4">
                                <label for="formFile" class="form-label">Đính kèm tệp (tùy chọn)</label>
                                <div class="file-drop-zone">
                                    <input class="form-control" type="file" id="formFile" hidden>
                                    <p class="text-muted small">Kéo thả file hoặc <a href="#" onclick="document.getElementById('formFile').click(); return false;">chọn file</a></p>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-danger"><i class="bi bi-send-check-fill me-2"></i>Gửi tư vấn</button>
                        </form>
                    </div>
                </div>

                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                        <h5 class="card-title fw-bold mb-0"><i class="bi bi-mailbox2 me-2"></i>Danh sách tư vấn đã gửi</h5>
                        <input type="text" class="form-control" style="max-width: 250px;" placeholder="Tìm kiếm...">
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover align-middle">
                                <thead class="table-light">
                                    <tr>
                                        <th>Tiêu đề</th>
                                        <th>Ngày gửi</th>
                                        <th>Số lượng donor</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in sentConsultations" :key="item.id">
                                        <td class="fw-bold">{{ item.title }}</td>
                                        <td>{{ item.date }}</td>
                                        <td>{{ item.count }}</td>
                                        <td><span class="badge" :class="item.statusClass">{{ item.status }}</span></td>
                                        <td>
                                            <a href="#" class="btn btn-sm btn-outline-secondary me-1" title="Xem"><i class="bi bi-eye-fill"></i></a>
                                            <a href="#" class="btn btn-sm btn-outline-secondary me-1" title="Sửa"><i class="bi bi-pencil-fill"></i></a>
                                            <a href="#" class="btn btn-sm btn-outline-danger" title="Xóa"><i class="bi bi-trash-fill"></i></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div>
                    <h5 class="fw-bold mb-3"><i class="bi bi-book-half me-2"></i>Kho hướng dẫn</h5>
                    <div class="row">
                        <div v-for="(guide, index) in guides" :key="index" class="col-md-4">
                            <div class="card h-100 shadow-sm border-0">
                                <div class="card-body">
                                    <div class="fs-2 text-danger mb-2"><i :class="guide.icon"></i></div>
                                    <h6 class="card-title fw-bold">{{ guide.title }}</h6>
                                    <p class="small text-muted">{{ guide.description }}</p>
                                    <a href="#" class="btn btn-sm btn-outline-danger me-2"><i class="bi bi-file-earmark-pdf-fill me-1"></i> Tải PDF</a>
                                    <a href="#" class="text-danger small">Xem online</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                 <div class="card shadow-sm border-0 mb-4">
                    <div class="card-body">
                        <h6 class="card-title fw-bold mb-3">Bộ lọc</h6>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="filter1" checked>
                            <label class="form-check-label" for="filter1">Tư vấn sức khỏe</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="filter2">
                            <label class="form-check-label" for="filter2">Hướng dẫn hiến máu</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="filter3">
                            <label class="form-check-label" for="filter3">Thông báo khác</label>
                        </div>
                    </div>
                 </div>

                 <div class="card shadow-sm border-0 mb-4">
                    <div class="card-body">
                        <h6 class="card-title fw-bold mb-3">Tư vấn nổi bật</h6>
                        <ul class="list-unstyled">
                            <li v-for="(item, index) in featuredConsultations" :key="index" class="mb-2">
                                <a href="#" class="text-decoration-none text-dark">{{ item.title }}</a>
                                <p class="text-muted small mb-0">{{ item.views }} lượt xem</p>
                            </li>
                        </ul>
                    </div>
                 </div>

                 <div class="card shadow-sm border-0">
                    <div class="card-body text-center">
                        <h6 class="card-title fw-bold mb-3">Liên hệ nhanh</h6>
                        <p class="text-muted mb-3">Hotline: 5678 1234</p>
                        <button class="btn btn-danger w-100"><i class="bi bi-chat-dots-fill me-2"></i>Chat trực tuyến</button>
                    </div>
                 </div>
            </div>
        </div>
        
        <div class="card shadow-sm mt-4" style="background-color: #fef2f2; border: 1px solid #fde2e2;">
            <div class="card-body text-center py-5">
                <h3 class="fw-bold">Bạn đã sẵn sàng cho các yêu cầu tiếp theo?</h3>
                <p class="lead text-muted my-3">Kiểm tra các yêu cầu tư vấn mới hoặc xem lại các câu hỏi thường gặp để chuẩn bị tốt hơn.</p>
                <button class="btn btn-danger btn-lg">Xem các yêu cầu mới</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SupportView',
    data() {
        return {
            newConsultation: {
                title: '',
                recipient: 'all',
                content: ''
            },
            sentConsultations: [
                { id: 1, title: 'Hướng dẫn chuẩn bị trước hiến máu', date: '15/09/2024', count: "1,234" , status: 'Đã gửi', statusClass: 'badge-green' },
                { id: 2, title: 'Chăm sóc sức khỏe sau hiến máu', date: '12/09/2024', count: 856, status: 'Đang gửi', statusClass: 'badge-yellow' },
            ],
            guides: [
                { icon: 'bi bi-shield-check', title: 'Chuẩn bị trước hiến máu', description: 'Hướng dẫn chi tiết về cách chuẩn bị sức khỏe và tinh thần trước khi hiến máu.' },
                { icon: 'bi bi-bandaid', title: 'Chăm sóc sau hiến máu', description: 'Các bước chăm sóc cần thiết sau khi hiến máu để đảm bảo sức khỏe.' },
                { icon: 'bi bi-graph-up-arrow', title: 'Dinh dưỡng & Tập luyện', description: 'Chế độ dinh dưỡng và tập luyện phù hợp cho người hiến máu.' },
            ],
            featuredConsultations: [
                { title: 'Cách phục hồi sau hiến máu', views: '1,234' },
                { title: 'Chế độ ăn cho người hiến máu', views: '987' },
            ]
        }
    },
    methods: {
        submitConsultation() {
            alert('Gửi tư vấn: ' + JSON.stringify(this.newConsultation));
            this.newConsultation = { title: '', recipient: 'all', content: '' };
        }
    }
}
</script>

<style scoped>
.file-drop-zone {
    border: 2px dashed #dee2e6;
    border-radius: .375rem;
    padding: 2rem;
    text-align: center;
    transition: background-color 0.2s ease-in-out;
}
.file-drop-zone:hover {
    background-color: #f8f9fa;
}
.badge {
    padding: 0.5em 0.75em;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 20px;
}
.badge-green {
    color: #198754;
    background-color: #d1e7dd;
}
.badge-yellow {
    color: #664d03;
    background-color: #fff3cd;
}
</style>