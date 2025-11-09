<template>
  <section class="position-relative align-items-center justify-content-center text-center d-flex">
    <img src="../../../assets/img/banner2.jpg" alt="hình ảnh hiến máu"
      style="height: 500px; width: 100vw; opacity: 0.5" />
    <div class="position-absolute">
      <h2 class="fw-bold display-5">Tin tức & Chiến dịch Hiến Máu</h2>
      <p class="text-dark fw-semibold">Cập nhật nhanh các hoạt động hiến máu, sự kiện và thông báo quan trọng</p>
    </div>
  </section>

  <div>
    <div class="row p-4 g-4">
      <div class="col-md-3 bg-light p-3" style="width: 300px; height: 230px; border-radius: 10px">
        <div class="row">
          <div class="col-12 mb-3 p-3 bg-white rounded shadow-sm">
            <h6>Bộ lọc</h6>
            <label class="mb-2">Loại nội dung</label>
            <select class="form-select mb-2">
              <option>Tất cả</option>
              <option>Bài viết</option>
              <option>Video</option>
            </select>
            <label class="m-2">Thời gian</label>
            <select class="form-select">
              <option>Hôm nay</option>
              <option>Tuần này</option>
              <option>Tất cả</option>
            </select>
          </div>

          <div class="col-12 p-3 bg-white rounded shadow-sm">
            <h6>Sự kiện nổi bật</h6>
            <div>
              <i class="bi bi-building-check text-danger m-2"></i>
              <label style="font-weight: bold; font-size: 15px">Ngày hiến máu thế giới</label>
              <label class="mb-2">14/06/2025 </label>
            </div>
            <div>
              <i class="bi bi-heart-fill text-danger m-2"></i>
              <label class="" style="font-weight: bold; font-size: 15px">Ngày hiến máu thế giới</label>
              <label>14/06/2025 </label>
            </div>
          </div>

          <button class="btn btn-danger w-100 mt-2" @click="fetchNews(1)">
            <i class="bi bi-funnel me-1"></i> Lọc tin
          </button>
          <button class="btn btn-outline-secondary w-100 mt-2" @click="clearFilter">
            <i class="bi bi-x-circle me-1"></i> Xóa lọc
          </button>
        </div>
      </div>

      <div class="col-md-9 bg-light">
        <div class="row">
          <div class="col-12 mb-4">
            <div class="d-flex align-items-center">
              <i class="bi bi-newspaper text-danger fs-4"></i>
              <h3 class="m-2">Tin tức mới nhất</h3>
            </div>
            <div class="row g-4">
              <div class="col-md-4" v-for="(news, index) in Data" :key="index">
                <div class="card h-90 border-0 shadow-sm rounded-3 overflow-hidden">
                  <div class="p-3">
                    <div class="news-image mb-3">
                      <img :src="news.image" alt="news image" class="img-fluid rounded" />
                    </div>

                    <div class="news-content">
                      <h6 class="fw-bold">{{ news.title }}</h6>
                      <p class="text-muted small mb-1">{{ news.date }}</p>
                      <p class="text-secondary small">{{ news.desc }}</p>
                      <p>
                        <a href="#" class="text-danger fw-bold small">Xem chi tiết</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Không có dữ liệu -->
            <div v-if="newsList.length === 0" class="text-center text-muted my-5">
              <i class="bi bi-journal-x fs-3"></i>
              <p class="mt-2">Không có tin tức nào trong khoảng thời gian này.</p>
            </div>
          </div>

          <!-- Phân trang -->
          <nav class="mt-4" v-if="totalPages > 1">
            <ul class="pagination justify-content-center mb-0">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="fetchNews(currentPage - 1)">«</a>
              </li>
              <li
                v-for="page in totalPages"
                :key="page"
                class="page-item"
                :class="{ active: currentPage === page }"
              >
                <a class="page-link" href="#" @click.prevent="fetchNews(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="fetchNews(currentPage + 1)">»</a>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Chiến dịch -->
        <div class="card border-0 bg-white mt-4 shadow-sm">
          <div class="card-header bg-danger text-white fw-bold">
            <i class="bi bi-heart-pulse me-2"></i>Chiến dịch hiến máu
          </div>
          <div class="card-body">
            <div class="list-group">
              <div
                v-for="(event, i) in campaigns"
                :key="i"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h6 class="fw-bold mb-1">{{ event.title }}</h6>
                  <div><i class="bi bi-geo-alt-fill text-danger"></i> {{ event.location }}</div>
                  <div><i class="bi bi-clock-fill text-danger"></i> {{ event.time }}</div>
                  <span class="badge bg-danger mt-2">{{ event.status }}</span>
                </div>
                <a href="#" class="btn btn-danger btn-sm">Đăng ký tham gia</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="cta-section text-center p-5 rounded shadow-sm bg-light">
    <h4 class="fw-bold mb-3">Hãy cùng chúng tôi chung tay vì sự sống</h4>
    <p class="text-muted mb-4">
      Mỗi giọt máu hiến tặng là một cơ hội cứu sống. Hãy tham gia cộng đồng hiến
      máu ngay hôm nay!
    </p>
    <router-link
  to="/register"
  class="btn btn-danger btn-lg rounded-pill text-decoration-none d-inline-block"
>
  ❤️ Đăng ký hiến máu ngay
</router-link>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newsList: [],
      currentPage: 1,
      totalPages: 1,
      dateStart: "",
      dateEnd: "",
      defaultImage: new URL("../../../assets/img/hienmau.jpg", import.meta.url).href,
      campaigns: [
        { title: "Chiến dịch hiến máu mùa thu 2025", location: "BV Đa Khoa Đà Nẵng", time: "20/09/2025 - 8:00-17:00", status: "Đang diễn ra" },
        { title: "Chiến dịch cứu người - Mùa hè 2025", location: "BV Chợ Rẫy - TPHCM", time: "10/08/2025 - 8:00-17:00", status: "Đang diễn ra" },
        { title: "Ngày hiến máu toàn quốc", location: "Trung tâm Huyết học - TPHCM", time: "01/07/2025 - 8:00-17:00", status: "Đã kết thúc" },
      ],
    };
  },

  methods: {
    async fetchNews(page = 1) {
      try {
        const params = { page, limit: 8 };
        if (this.dateStart) params.start = this.dateStart;
        if (this.dateEnd) params.end = this.dateEnd;

        const res = await axios.get("http://localhost:4000/api/news", { params });

        if (res.data.status) {
          this.newsList = res.data.data;
          this.currentPage = res.data.currentPage;
          this.totalPages = res.data.totalPages;
        }
      } catch (err) {
        console.error("❌ Lỗi tải tin tức:", err);
        this.$toast?.error("Không thể tải tin tức!");
      }
    },

    clearFilter() {
      this.dateStart = "";
      this.dateEnd = "";
      this.fetchNews(1);
    },

    truncate(text, length) {
      if (!text) return "";
      return text.length > length ? text.substring(0, length) + "..." : text;
    },

    formatDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleDateString("vi-VN");
    },
  },

  mounted() {
    this.fetchNews();
  },
};
</script>
