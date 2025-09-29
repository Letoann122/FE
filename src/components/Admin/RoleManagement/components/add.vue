<template>
  <div v-if="show" class="modal show d-block" style="background-color: rgba(0,0,0,0.5);" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <i class="bi bi-plus-circle me-2 text-primary"></i>
            Thêm vai trò mới
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <form @submit.prevent="$emit('add-role')">
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Tên vai trò *</label>
                  <input v-model="roleData.name" type="text" required class="form-control" placeholder="VD: Bác sĩ hiến máu">
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Danh mục *</label>
                  <select v-model="roleData.category" required class="form-select">
                    <option value="">Chọn danh mục</option>
                    <option value="Medical">Y tế</option>
                    <option value="Administrative">Hành chính</option>
                    <option value="Technical">Kỹ thuật</option>
                    <option value="Support">Hỗ trợ</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Mô tả</label>
              <textarea v-model="roleData.description" class="form-control" rows="3" 
                        placeholder="Mô tả chi tiết về vai trò này..."></textarea>
            </div>

            <div class="mb-3">
              <label class="form-label">Quyền hạn *</label>
              <div class="row">
                <div class="col-md-6">
                  <div v-for="(permission, index) in availablePermissions.slice(0, Math.ceil(availablePermissions.length / 2))" 
                       :key="permission.id" class="form-check mb-2">
                    <input v-model="roleData.permissions" :value="permission.name" type="checkbox" 
                           class="form-check-input custom-checkbox" :id="'permission-' + permission.id">
                    <label class="form-check-label" :for="'permission-' + permission.id">
                      {{ permission.name }}
                    </label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div v-for="(permission, index) in availablePermissions.slice(Math.ceil(availablePermissions.length / 2))" 
                       :key="permission.id" class="form-check mb-2">
                    <input v-model="roleData.permissions" :value="permission.name" type="checkbox" 
                           class="form-check-input custom-checkbox" :id="'permission-' + permission.id">
                    <label class="form-check-label" :for="'permission-' + permission.id">
                      {{ permission.name }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="$emit('close')" class="btn btn-secondary">Hủy</button>
            <button type="submit" class="btn btn-primary">Thêm vai trò</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  roleData: {
    type: Object,
    required: true
  },
  availablePermissions: {
    type: Array,
    required: true
  }
})

defineEmits(['close', 'add-role'])
</script>

<style scoped>
/* Custom checkbox styles */
.custom-checkbox {
  appearance: none !important;
  -webkit-appearance: none !important;
  width: 18px !important;
  height: 18px !important;
  border: 2px solid #cbd5e1 !important;
  border-radius: 4px !important;
  background-color: #ffffff !important;
  cursor: pointer !important;
  position: relative !important;
  transition: all 0.2s ease !important;
  margin: 0 !important;
  padding: 0 !important;
}

.custom-checkbox:checked {
  background-color: #2563eb !important;
  border-color: #2563eb !important;
}

.custom-checkbox:checked::after {
  content: '✓' !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  color: white !important;
  font-size: 12px !important;
  font-weight: bold !important;
  line-height: 1 !important;
}
</style>
