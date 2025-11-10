<template>
  <section class="position-relative align-items-center justify-content-center text-center d-flex">
    <img src="../../../assets/img/banner2.jpg" alt="banner hiến máu"
      style="height: 500px; width: 100vw; opacity: 0.5" />
    <div class="position-absolute">
      <h2 class="fw-bold display-5">Tin tức & Chiến dịch Hiến Máu</h2>
      <p class="text-dark fw-semibold">
        Cập nhật nhanh các hoạt động hiến máu, sự kiện và thông báo quan trọng
      </p>
    </div>
  </section>

  <div class="container-fluid py-5">
    <div class="row g-4">
      <div class="col-lg-3">
        <div class="bg-white rounded shadow-sm p-3">
          <h5 class="fw-bold mb-3 text-danger">
            <i class="bi bi-funnel me-2"></i>Bộ lọc
          </h5>

          <label class="form-label">Từ ngày</label>
          <input type="date" class="form-control mb-3" v-model="dateStart" />

          <label class="form-label">Đến ngày</label>
          <input type="date" class="form-control mb-3" v-model="dateEnd" />

          <button class="btn btn-danger w-100 mt-2" @click="fetchNews(1)">
            <i class="bi bi-search me-1"></i> Lọc tin
          </button>
          <button class="btn btn-outline-secondary w-100 mt-2" @click="clearFilter">
            <i class="bi bi-x-circle me-1"></i> Xóa lọc
          </button>
        </div>

        <div class="bg-white rounded shadow-sm p-3 mt-4">
          <h6 class="fw-bold mb-3 text-danger">
            <i class="bi bi-calendar-event me-2"></i> Sự kiện nổi bật
          </h6>
          <div v-for="(event, i) in campaigns" :key="i" class="mb-3">
            <i class="bi bi-heart-fill text-danger me-2"></i>
            <strong>{{ event.title }}</strong>
            <div class="small text-muted">
              <i class="bi bi-geo-alt-fill me-1"></i> {{ event.location }}
            </div>
            <div class="small text-muted">
              <i class="bi bi-clock-fill me-1"></i> {{ event.time }}
            </div>
            <span class="badge mt-2" :class="event.status === 'Đang diễn ra' ? 'bg-danger' : 'bg-secondary'">
              {{ event.status }}
            </span>
          </div>
        </div>
      </div>

      <div class="col-lg-9">
        <div class="d-flex align-items-center mb-3">
          <i class="bi bi-newspaper text-danger fs-4"></i>
          <h3 class="m-2">Tin tức mới nhất</h3>
        </div>

        <div class="row g-4">
          <div v-for="(news, index) in newsList" :key="index" class="col-md-4">
            <div class="card h-100 border-0 shadow-sm rounded overflow-hidden">
              <img :src="news.image_url || defaultImage" alt="news" class="img-fluid"
                style="height: 180px; object-fit: cover" />
              <div class="p-3">
                <h6 class="fw-bold">{{ truncate(news.title, 60) }}</h6>
                <p class="text-muted small">{{ formatDate(news.published_date) }}</p>
                <p class="text-secondary small mb-2">
                  {{ truncate(news.content, 80) }}
                </p>
                <router-link :to="`/tin-tuc/${news.id}`" class="text-danger fw-bold small">
                  Xem chi tiết →
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div v-if="newsList.length === 0" class="text-center text-muted my-5">
          <i class="bi bi-journal-x fs-3"></i>
          <p class="mt-2">Không có tin tức nào trong khoảng thời gian này.</p>
        </div>

        <nav class="mt-4" v-if="totalPages > 1">
          <ul class="pagination justify-content-center mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="fetchNews(currentPage - 1)">«</a>
            </li>
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
              <a class="page-link" href="#" @click.prevent="fetchNews(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="fetchNews(currentPage + 1)">»</a>
            </li>
          </ul>
        </nav>

        <div class="card border-0 bg-white mt-5 shadow-sm">
          <div class="card-header bg-danger text-white fw-bold">
            <i class="bi bi-heart-pulse me-2"></i> Chiến dịch hiến máu
          </div>
          <div class="card-body">
            <div v-for="(event, i) in campaigns" :key="i"
              class="list-group-item d-flex justify-content-between align-items-center border-bottom py-3">
              <div>
                <h6 class="fw-bold mb-1">{{ event.title }}</h6>
                <div class="text-muted small">
                  <i class="bi bi-geo-alt-fill text-danger me-1"></i> {{ event.location }}
                </div>
                <div class="text-muted small">
                  <i class="bi bi-clock-fill text-danger me-1"></i> {{ event.time }}
                </div>
                <span class="badge mt-2" :class="event.status === 'Đang diễn ra' ? 'bg-danger' : 'bg-secondary'">
                  {{ event.status }}
                </span>
              </div>
              <button class="btn btn-outline-danger btn-sm">
                Đăng ký tham gia
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="cta-section text-center p-5 rounded shadow-sm bg-light mt-4">
    <h4 class="fw-bold mb-3">Hãy cùng chúng tôi chung tay vì sự sống</h4>
    <p class="text-muted mb-4">
      Mỗi giọt máu hiến tặng là một cơ hội cứu sống. Hãy tham gia cộng đồng hiến
      máu ngay hôm nay!
    </p>
    <router-link to="/dang-ky-hien-mau" class="btn btn-danger btn-lg rounded-pill">
      ❤️ Đăng ký hiến máu ngay
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewsPage",
  data() {
    return {
      newsList: [],
      currentPage: 1,
      totalPages: 1,
      dateStart: "",
      dateEnd: "",
      defaultImage: new URL("../../../assets/img/hienmau.jpg", import.meta.url).href,
      campaigns: [
        {
          title: "Chiến dịch hiến máu mùa thu 2025",
          location: "BV Đa Khoa Đà Nẵng",
          time: "20/09/2025 - 8:00-17:00",
          status: "Đang diễn ra",
        },
        {
          title: "Chiến dịch cứu người - Mùa hè 2025",
          location: "BV Chợ Rẫy - TPHCM",
          time: "10/08/2025 - 8:00-17:00",
          status: "Đang diễn ra",
        },
        {
          title: "Ngày hiến máu toàn quốc",
          location: "Trung tâm Huyết học - TPHCM",
          time: "01/07/2025 - 8:00-17:00",
          status: "Đã kết thúc",
        },
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
        console.error(" Lỗi tải tin tức:", err);
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

<style scoped>
.page-item.active .page-link {
  background-color: #dc3545;
  border-color: #dc3545;
}
</style>
