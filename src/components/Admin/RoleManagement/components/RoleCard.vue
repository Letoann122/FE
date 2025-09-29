<template>
  <div class="role-card h-100" :class="getCategoryClass(role.category)">
    <div class="card h-100 border-0 shadow-sm">
      <div class="card-header text-white">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <div class="role-icon me-3">
              <i :class="role.icon" style="font-size: 1.5rem;"></i>
            </div>
            <div>
              <h5 class="mb-0 fw-bold">{{ role.name }}</h5>
              <small class="opacity-75">{{ role.category }}</small>
            </div>
          </div>
          <span class="status-badge" :class="statusClassName(role.status)">
            {{ role.status === 'Active' ? 'Hoạt động' : 'Không hoạt động' }}
          </span>
        </div>
      </div>
      
      <div class="card-body">
        <p class="text-muted mb-3">{{ role.description }}</p>
        
        <!-- Permissions -->
        <div class="mb-3">
          <h6 class="fw-semibold mb-2">
            <i class="bi bi-key me-1"></i>
            Quyền hạn:
          </h6>
          <div class="permissions-list">
            <span v-for="permission in role.permissions.slice(0, 3)" :key="permission" 
                  class="badge bg-light text-dark me-1 mb-1">
              {{ permission }}
            </span>
            <span v-if="role.permissions.length > 3" class="badge bg-secondary">
              +{{ role.permissions.length - 3 }} khác
            </span>
          </div>
        </div>

        <!-- User Count -->
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="d-flex align-items-center">
            <i class="bi bi-people me-2 text-muted"></i>
            <span class="small text-muted">{{ role.userCount }} người dùng</span>
          </div>
          <div class="d-flex align-items-center">
            <i class="bi bi-calendar me-2 text-muted"></i>
            <span class="small text-muted">{{ role.createdDate }}</span>
          </div>
        </div>
      </div>

      <div class="card-footer bg-transparent border-0">
        <div class="d-flex gap-2">
          <button @click="$emit('edit-role', role)" class="btn btn-outline-primary btn-sm flex-fill">
            <i class="bi bi-pencil me-1"></i>
            Chỉnh sửa
          </button>
          <button @click="$emit('assign-users', role)" class="btn btn-outline-success btn-sm flex-fill">
            <i class="bi bi-person-plus me-1"></i>
            Gán người dùng
          </button>
          <button @click="$emit('delete-role', role.id)" class="btn btn-outline-danger btn-sm">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  role: {
    type: Object,
    required: true
  }
})

defineEmits(['edit-role', 'assign-users', 'delete-role'])

const statusClassName = (status) => {
  switch (status) {
    case 'Active':
      return 'status-active';
    case 'Inactive':
      return 'status-inactive';
    default:
      return 'status-inactive';
  }
}

// trả về class màu theo category
const getCategoryClass = (category) => {
  if (category === 'Medical') {
    return 'medical'
  } else if (category === 'Administrative') {
    return 'administrative'
  } else if (category === 'Technical') {
    return 'technical'
  } else if (category === 'Support') {
    return 'support'
  } else {
    return ''
  }
}
</script>

<style scoped>
/* Role card colors - Force override */
.role-card .card-header {
  background: linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%) !important;
}

/* Different colors for different role categories */
.role-card.medical .card-header {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%) !important;
}

.role-card.administrative .card-header {
  background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%) !important;
}

.role-card.technical .card-header {
  background: linear-gradient(135deg, #6f42c1 0%, #5a32a3 100%) !important;
}

.role-card.support .card-header {
  background: linear-gradient(135deg, #fd7e14 0%, #e55a00 100%) !important;
}
</style>
