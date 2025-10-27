<template>
  <!-- Banner -->
  <section class="position-relative text-center d-flex align-items-center justify-content-center">
    <img src="../../../assets/img/banner2.jpg" alt="Banner hiến máu" class="w-100" style="height: 500px; opacity: 0.5" />
    <div class="position-absolute">
      <h2 class="fw-bold display-5">Tin tức & Chiến dịch Hiến Máu</h2>
      <p class="text-dark fw-semibold">Cập nhật nhanh các hoạt động hiến máu, sự kiện và thông báo quan trọng</p>
    </div>
  </section>

  <!-- Content -->
  <div class="container-fluid my-5">
    <div class="row g-4">
      <!-- Bộ lọc -->
      <div class="col-lg-2">
        <div class="bg-white p-3 rounded shadow-sm border">
          <h6 class="fw-bold mb-3">Bộ lọc theo thời gian</h6>

          <div class="mb-3">
            <label class="form-label">Từ ngày</label>
            <input type="date" class="form-control" v-model="dateStart" />
          </div>
          <div class="mb-3">
            <label class="form-label">Đến ngày</label>
            <input type="date" class="form-control" v-model="dateEnd" />
          </div>

          <button class="btn btn-danger w-100 mt-2" @click="fetchNews(1)">
            <i class="bi bi-funnel me-1"></i> Lọc tin
          </button>
          <button class="btn btn-outline-secondary w-100 mt-2" @click="clearFilter">
            <i class="bi bi-x-circle me-1"></i> Xóa lọc
          </button>
        </div>
      </div>

      <!-- Danh sách tin -->
      <div class="col-lg-10">
        <div class="card border-0 bg-light p-3">
          <div class="d-flex align-items-center mb-3">
            <i class="bi bi-newspaper text-danger fs-4"></i>
            <h3 class="ms-2 mb-0">Tin tức mới nhất</h3>
          </div>

          <!-- Grid tin -->
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            <div v-for="(news, index) in newsList" :key="index">
              <div class="card h-100 shadow-sm">
                <img
                  :src="news.image_url || defaultImage"
                  alt="news"
                  class="card-img-top"
                  style="height: 160px; object-fit: cover"
                />
                <div class="card-body d-flex flex-column">
                  <h6 class="fw-bold text-truncate" :title="news.title">{{ news.title }}</h6>
                  <small class="text-muted mb-2">{{ formatDate(news.published_date) }}</small>
                  <p class="card-text flex-grow-1 text-secondary small mb-3">
                    {{ truncate(news.content, 80) }}
                  </p>
                  <router-link
                    :to="`/news/${news.id}`"
                    class="btn btn-outline-danger btn-sm mt-auto align-self-start"
                  >
                    Xem chi tiết
                  </router-link>
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
