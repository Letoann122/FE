<template>
    <div class="support-page-wrapper">
        <div class="mb-4">
            <h2 class="fw-bold">Tư vấn & Hỗ trợ</h2>
            <p class="text-muted">
                Gửi thông báo, hướng dẫn và cảnh báo sức khỏe đến donor.
            </p>
        </div>
        <div class="row g-4">
            <div class="col-lg-3">
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-body">
                        <h6 class="fw-bold mb-3">Kho hướng dẫn</h6>
                        <div class="guide-card p-3 mb-3 rounded">
                            <div class="d-flex">
                                <div class="fs-2 text-danger me-3">
                                    <i class="bi bi-journal-medical"></i>
                                </div>
                                <div>
                                    <h6 class="fw-bold">Chuẩn bị trước & sau hiến máu</h6>
                                    <p class="small text-muted">Hướng dẫn từ Viện Huyết học.</p>
                                    <a href="https://vienhuyethoc.vn/luu-y-truoc-va-sau-hien-mau/" target="_blank"
                                        class="text-danger fw-semibold small">
                                        Xem bài viết →
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="guide-card p-3 rounded">
                            <div class="d-flex">
                                <div class="fs-2 text-danger me-3">
                                    <i class="bi bi-heart-pulse"></i>
                                </div>
                                <div>
                                    <h6 class="fw-bold">Dinh dưỡng cho người hiến máu</h6>
                                    <p class="small text-muted">Chế độ ăn giúp phục hồi tốt nhất.</p>
                                    <a href="https://www.pharmacity.vn/che-do-an-uong-truoc-va-sau-khi-hien-mau-giup-hoi-phuc-suc-khoe-toi-uu.htm"
                                        target="_blank" class="text-danger fw-semibold small">
                                        Xem bài viết →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card shadow-sm border-0">
                    <div class="card-body text-center">
                        <h6 class="fw-bold mb-2">Hỗ trợ trực tuyến</h6>
                        <p class="text-muted small mb-3">
                            Chat với hỗ trợ viên để được giải đáp nhanh.
                        </p>
                        <button class="btn btn-danger w-100" @click="openTawk">
                            <i class="bi bi-chat-dots me-2"></i>Chat ngay
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-lg-9">
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-body p-4">
                        <h5 class="fw-bold mb-4">
                            <i class="bi bi-megaphone-fill text-danger me-2"></i>
                            Gửi thông báo mới
                        </h5>
                        <form @submit.prevent="submitConsultation">
                            <div class="mb-3">
                                <label class="form-label">Tiêu đề</label>
                                <input type="text" class="form-control" v-model="form.title"
                                    placeholder="Nhập tiêu đề thông báo" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Gửi đến nhóm máu</label>
                                <select class="form-select" v-model="form.recipient">
                                    <option value="all">Tất cả donor</option>
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
                            <div class="form-check form-switch mb-3">
                                <input class="form-check-input" type="checkbox" v-model="form.emergency" />
                                <label class="form-check-label text-danger fw-bold">
                                    Gửi thông báo khẩn cấp (Emergency Alert)
                                </label>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Nội dung</label>
                                <textarea class="form-control" rows="5" v-model="form.content"
                                    placeholder="Nhập nội dung chi tiết..."></textarea>
                            </div>
                            <button class="btn btn-danger px-4" :disabled="sending">
                                <i class="bi bi-send-fill me-2"></i>
                                <span v-if="sending">Đang gửi...</span>
                                <span v-else>Gửi thông báo</span>
                            </button>
                        </form>
                    </div>
                </div>
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                        <h5 class="fw-bold mb-0">
                            <i class="bi bi-mailbox2 me-2"></i>Danh sách đã gửi
                        </h5>
                        <input type="text" class="form-control" style="max-width: 250px" placeholder="Tìm kiếm..." />
                    </div>
                    <div class="card-body">
                        <div v-if="!loaded" class="text-center py-4">
                            <div class="spinner-border text-danger"></div>
                        </div>
                        <div v-else class="table-responsive">
                            <table class="table align-middle table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th>Tiêu đề</th>
                                        <th>Ngày gửi</th>
                                        <th>Người nhận</th>
                                        <th>Trạng thái</th>
                                        <th>Xem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in notifications" :key="item.id">
                                        <td class="fw-semibold">{{ item.title }}</td>
                                        <td>{{ formatDate(item.created_at) }}</td>
                                        <td>{{ item.sent_count }}</td>
                                        <td>
                                            <span class="badge" :class="getStatusClass(item.status)">
                                                {{ getStatusText(item.status) }}
                                            </span>
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-secondary">
                                                <i class="bi bi-eye-fill"></i>
                                            </button>
                                        </td>
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
import baseRequestDoctor from '../../../core/baseRequestDoctor';

export default {
    data() {
        return {
            loaded: false,
            sending: false,
            form: {
                title: "",
                recipient: "all",
                emergency: false,
                content: "",
            },
            notifications: [],
        };
    },
    mounted() {
        this.loadNotifications();
    },
    methods: {
        async loadNotifications() {
            this.loaded = false;
            try {
                const res = await baseRequestDoctor.get("/doctor/support/notifications");
                if (res.data.status) {
                    this.notifications = res.data.data || [];
                }
            } catch (e) {
                this.$toast?.error("Không thể tải danh sách thông báo!");
            } finally {
                this.loaded = true;
            }
        },
        async submitConsultation() {
            if (!this.form.title || !this.form.content) {
                return this.$toast.error("Tiêu đề và nội dung không được để trống!");
            }
            this.sending = true;
            try {
                const res = await baseRequestDoctor.post(
                    "/doctor/support/notifications",
                    this.form
                );
                if (res.data.status) {
                    this.$toast.success("Gửi thông báo thành công!");
                    this.loadNotifications();
                    this.form = {
                        title: "",
                        recipient: "all",
                        emergency: false,
                        content: "",
                    };
                } else {
                    this.$toast.error(res.data.message || "Gửi thông báo thất bại!");
                }
            } catch (err) {
                this.$toast?.error("Lỗi server khi gửi thông báo!");
            } finally {
                this.sending = false;
            }
        },
        openTawk() {
            if (window.Tawk_API) window.Tawk_API.maximize();
            else this.$toast.error("Tawk.to chưa tải!");
        },
        formatDate(d) {
            return new Date(d).toLocaleDateString("vi-VN");
        },
        getStatusClass(status) {
            switch (status) {
                case "sent":
                    return "badge-green";
                case "sending":
                    return "badge-yellow";
                default:
                    return "badge-yellow";
            }
        },
        getStatusText(status) {
            switch (status) {
                case "sent":
                    return "Đã gửi";
                case "sending":
                    return "Đang gửi";
                default:
                    return "Khác";
            }
        },
        async submitConsultation() {
    if (!this.form.title || !this.form.content) {
        return this.$toast.error("Tiêu đề và nội dung không được để trống!");
    }

    this.sending = true;

    try {
        // Nếu tick KHẨN CẤP → gọi API tạo alert
        if (this.form.emergency) {
            const res = await baseRequestDoctor.post("/doctor/emergency-alert", {
                title: this.form.title,
                content: this.form.content,
            });

            if (res.data.status) {
                this.$toast.success("Đã tạo cảnh báo khẩn cấp!");
            } else {
                this.$toast.error("Không thể tạo cảnh báo khẩn cấp!");
            }

        } else {
            // Nếu không khẩn cấp → gửi thông báo bình thường
            const res = await baseRequestDoctor.post(
                "/doctor/support/notifications",
                this.form
            );

            if (res.data.status) {
                this.$toast.success("Gửi thông báo thành công!");
            } else {
                this.$toast.error(res.data.message || "Gửi thông báo thất bại!");
            }
        }

        this.loadNotifications();
        this.form = {
            title: "",
            recipient: "all",
            emergency: false,
            content: "",
        };
    } catch (err) {
        this.$toast.error("Lỗi server!");
    } finally {
        this.sending = false;
    }
}

    },
};
</script>

<style scoped>
.badge {
    padding: 0.45em 0.75em;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 20px;
}

.badge-green {
    background: #d1e7dd;
    color: #198754;
}

.badge-yellow {
    background: #fff3cd;
    color: #664d03;
}

.guide-card:hover {
    background: #fff7f7;
}
</style>
