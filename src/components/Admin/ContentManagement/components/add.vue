<template>
  <div v-if="show" class="cm modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">
          <i class="fas fa-plus text-danger me-2"></i>
          Thêm nội dung mới
        </h3>
        <button class="btn-close" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-form">
        <div class="modal-body">
          <!-- Basic Information -->
          <div class="form-section">
            <h5 class="section-title">
              <i class="fas fa-info-circle text-primary me-2"></i>
              Thông tin cơ bản
            </h5>
            
            <div class="row">
              <div class="col-md-8">
                <div class="form-group">
                  <label class="form-label required">Tiêu đề</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.title"
                    placeholder="Nhập tiêu đề nội dung..."
                    required
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="form-label required">Loại nội dung</label>
                  <select class="form-select" v-model="formData.type" required>
                    <option value="">Chọn loại nội dung</option>
                    <option value="news">📰 Tin tức</option>
                    <option value="article">📝 Bài viết</option>
                    <option value="campaign">🩸 Chiến dịch</option>
                    <option value="notification">📢 Thông báo</option>
                    <option value="event">🎉 Sự kiện</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label required">Danh mục</label>
                  <select class="form-select" v-model="formData.category" required>
                    <option value="">Chọn danh mục</option>
                    <option value="Chiến dịch">Chiến dịch</option>
                    <option value="Sức khỏe">Sức khỏe</option>
                    <option value="Thông báo">Thông báo</option>
                    <option value="Sự kiện">Sự kiện</option>
                    <option value="Tin tức">Tin tức</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label required">Tác giả</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.author"
                    placeholder="Nhập tên tác giả..."
                    required
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Tóm tắt</label>
              <textarea
                class="form-control"
                v-model="formData.excerpt"
                placeholder="Nhập tóm tắt nội dung..."
                rows="3"
              ></textarea>
            </div>
          </div>

          <!-- Content -->
          <div class="form-section">
            <h5 class="section-title">
              <i class="fas fa-edit text-success me-2"></i>
              Nội dung chính
            </h5>
            
            <div class="form-group">
              <label class="form-label required">Nội dung</label>
              <textarea
                class="form-control content-editor"
                v-model="formData.content"
                placeholder="Nhập nội dung chi tiết..."
                rows="10"
                required
              ></textarea>
            </div>
          </div>

          <!-- Tags and Images -->
          <div class="form-section">
            <h5 class="section-title">
              <i class="fas fa-images text-warning me-2"></i>
              Hình ảnh
            </h5>
            
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">Hình ảnh</label>
                  
                  <!-- Upload từ máy local -->
                  <div class="upload-section mb-3">
                    <input
                      type="file"
                      ref="fileInput"
                      class="form-control"
                      accept="image/*"
                      multiple
                      @change="handleFileUpload"
                      style="display: none;"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm"
                      @click="$refs.fileInput.click()"
                    >
                      <i class="fas fa-upload me-2"></i>
                      Chọn ảnh từ máy
                    </button>
                  </div>

                  <!-- Thêm từ URL -->
                  <div class="url-section mb-3">
                    <div class="input-group">
                      <input
                        type="url"
                        class="form-control"
                        v-model="imageInput"
                        placeholder="Nhập URL hình ảnh..."
                        @keyup.enter="addImageFromUrl"
                      />
                      <button
                        type="button"
                        class="btn btn-outline-success"
                        @click="addImageFromUrl"
                        :disabled="!imageInput.trim()"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  <!-- Preview hình ảnh -->
                  <div class="images-preview" v-if="formData.images.length > 0">
                    <div 
                      v-for="(image, index) in formData.images" 
                      :key="index"
                      class="image-item"
                    >
                      <img :src="image.url || image" :alt="`Image ${index + 1}`" />
                      <div class="image-info">
                        <span class="image-name">{{ image.name || `Hình ${index + 1}` }}</span>
                        <span class="image-type">{{ image.type || 'URL' }}</span>
                      </div>
                      <button type="button" class="image-remove" @click="removeImage(index)">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          

          <!-- Publishing Options -->
          <div class="form-section">
            <h5 class="section-title">
              <i class="fas fa-cog text-secondary me-2"></i>
              Tùy chọn xuất bản
            </h5>
            
            <div class="row">
              <div class="col-md-6">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="isPublished"
                    v-model="formData.isPublished"
                  />
                  <label class="form-check-label" for="isPublished">
                    Xuất bản ngay
                  </label>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="isFeatured"
                    v-model="formData.isFeatured"
                  />
                  <label class="form-check-label" for="isFeatured">
                    Nội dung nổi bật
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            <i class="fas fa-times me-2"></i>
            Hủy
          </button>
          <button type="submit" class="btn btn-danger">
            <i class="fas fa-save me-2"></i>
            Lưu nội dung
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  contentData: {
    type: Object,
    default: () => ({})
  },
  availableTags: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'add-content'])

const formData = ref({
  title: '',
  type: '',
  category: '',
  content: '',
  excerpt: '',
  tags: [],
  images: [],
  author: '',
  isPublished: false,
  isFeatured: false,
  
})

const imageInput = ref('')
const fileInput = ref(null)

// Watch for contentData changes
watch(() => props.contentData, (newData) => {
  if (newData && Object.keys(newData).length > 0) {
    formData.value = { ...newData }
  }
}, { immediate: true })

const closeModal = () => {
  emit('close')
  resetForm()
}

const resetForm = () => {
  formData.value = {
    title: '',
    type: '',
    category: '',
    content: '',
    excerpt: '',
    tags: [],
    images: [],
    author: '',
    isPublished: false,
    isFeatured: false,
  
  }
  imageInput.value = ''
}



const handleFileUpload = (event) => {
  const files = event.target.files
  if (files && files.length > 0) {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageData = {
            name: file.name,
            type: 'Local',
            url: e.target.result,
            file: file
          }
          formData.value.images.push(imageData)
        }
        reader.readAsDataURL(file)
      }
    })
    // Reset input để có thể chọn lại file cùng tên
    event.target.value = ''
  }
}

const addImageFromUrl = () => {
  const imageUrl = imageInput.value.trim()
  if (imageUrl && !formData.value.images.some(img => (img.url || img) === imageUrl)) {
    const imageData = {
      name: `URL Image ${formData.value.images.length + 1}`,
      type: 'URL',
      url: imageUrl
    }
    formData.value.images.push(imageData)
    imageInput.value = ''
  }
}

const removeImage = (index) => {
  formData.value.images.splice(index, 1)
}

const handleSubmit = () => {
  // Validate required fields
  if (!formData.value.title || !formData.value.type || !formData.value.category || !formData.value.author || !formData.value.content) {
    alert('Vui lòng điền đầy đủ các trường bắt buộc')
    return
  }

  emit('add-content', { ...formData.value })
  closeModal()
}
</script>

