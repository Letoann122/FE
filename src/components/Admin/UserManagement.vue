<template>
    <div class="p-6 bg-gray-100 min-h-screen">
      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Title -->
        <h2 class="text-2xl font-semibold text-gray-800">User Management</h2>
        <p class="text-gray-500 text-sm mb-6"></p>
  
        <!-- Filters -->
        <div class="flex flex-wrap gap-3 mb-4">
          <!-- Search -->
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search"
            class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500"
          />
  
          <!-- Role filter -->
          <select v-model="selectedRole" class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700">
            <option value="">All Roles</option>
            <option>Admin</option>
            <option>User</option>
            <option>Moderator</option>
            <option>Guest</option>
          </select>
  
          <!-- Status filter -->
          <select v-model="selectedStatus" class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700">
            <option value="">All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Banned</option>
            <option>Pending</option>
            <option>Suspended</option>
          </select>
  
          <!-- Date filter -->
          <select v-model="selectedDate" class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700">
            <option value="">Date</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="lastActive">Last Active</option>
          </select>
  
          <div class="flex-grow"></div>
  
          <button
            class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <i class="fa-solid fa-download text-blue-500"></i> Export
          </button>
          <button class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900">
            + Add User
          </button>
        </div>
  
        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th class="p-2"><input type="checkbox" /></th>
                <th class="text-left p-2">Full Name</th>
                <th class="text-left p-2">Email</th>
                <th class="text-left p-2">Username</th>
                <th class="text-left p-2">Status</th>
                <th class="text-left p-2">Role</th>
                <th class="text-left p-2">Joined Date</th>
                <th class="text-left p-2">Last Active</th>
                <th class="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, i) in paginatedUsers"
                :key="i"
                class="border-b hover:bg-gray-50"
              >
                <td class="p-2"><input type="checkbox" /></td>
                <td class="flex items-center gap-2 p-2">
                  <img class="w-8 h-8 rounded-full" :src="user.avatar" alt="avatar" />
                  {{ user.name }}
                </td>
                <td class="p-2">{{ user.email }}</td>
                <td class="p-2">{{ user.username }}</td>
                <td class="p-2">
                  <span class="status-badge" :class="'status-' + user.status.toLowerCase()">
                    {{ user.status }}
                  </span>
                </td>
                <td class="p-2">{{ user.role }}</td>
                <td class="p-2">{{ user.joined }}</td>
                <td class="p-2">{{ user.lastActive }}</td>
                <td class="p-2 flex gap-3">
                  <i class="fa-solid fa-pen text-gray-600 cursor-pointer"></i>
                  <i class="fa-solid fa-trash text-red-500 cursor-pointer hover:text-red-700"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Pagination -->
        <div class="flex justify-between items-center mt-4">
          <!-- Rows per page -->
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <span>Rows per page</span>
            <select
              v-model="itemsPerPage"
              @change="changePerPage"
              class="border rounded px-2 py-1 text-sm"
            >
              <option v-for="opt in perPageOptions" :key="opt" :value="opt">
                {{ opt }}
              </option>
            </select>
            <span>of {{ filteredUsers.length }} rows</span>
          </div>
  
          <!-- Page numbers -->
          <div class="flex items-center gap-2">
            <!-- Previous -->
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-2 py-1 text-gray-500 disabled:opacity-50"
            >
              ‹
            </button>
  
            <!-- Page buttons -->
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              class="px-3 py-1 rounded"
              :class="currentPage === page ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-200'"
            >
              {{ page }}
            </button>
  
            <!-- Next -->
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-2 py-1 text-gray-500 disabled:opacity-50"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  const searchQuery = ref("");
  const selectedRole = ref("");
  const selectedStatus = ref("");
  const selectedDate = ref("");
  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  const perPageOptions = [5, 10, 20, 50];
  
  // Đổi rows per page -> reset về page 1
  function changePerPage(event) {
    itemsPerPage.value = parseInt(event.target.value);
    currentPage.value = 1;
  }
  
  const users = [
    {
      name: "John Smith",
      email: "john.smith@gmail.com",
      username: "jonny77",
      status: "Active",
      role: "Admin",
      joined: "March 12, 2023",
      lastActive: "1 minute ago",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      name: "Daniel Warren",
      email: "dwarren3@gmail.com",
      username: "dwarren3",
      status: "Banned",
      role: "User",
      joined: "January 8, 2024",
      lastActive: "4 days ago",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
      name: "Marcus Reed",
      email: "reeds777@gmail.com",
      username: "reeds7",
      status: "Suspended",
      role: "User",
      joined: "February 19, 2023",
      lastActive: "3 months ago",
      avatar: "https://i.pravatar.cc/40?img=5",
    },
    {
      name: "Isabelle Clark",
      email: "belleclark@gmail.com",
      username: "bellecl",
      status: "Active",
      role: "Moderator",
      joined: "August 30, 2022",
      lastActive: "1 week ago",
      avatar: "https://i.pravatar.cc/40?img=6",
    },
    {
      name: "Chloe Hayes",
      email: "chloehye@gmail.com",
      username: "chloehh",
      status: "Pending",
      role: "Guest",
      joined: "October 5, 2021",
      lastActive: "10 days ago",
      avatar: "https://i.pravatar.cc/40?img=4",
    },
  ];
  
  // Helpers
  function parseDate(dateStr) {
    return new Date(dateStr);
  }
  function parseLastActive(lastActive) {
    const [num] = lastActive.split(" ");
    const n = parseInt(num);
    const now = Date.now();
    if (lastActive.includes("minute")) return now - n * 60 * 1000;
    if (lastActive.includes("hour")) return now - n * 60 * 60 * 1000;
    if (lastActive.includes("day")) return now - n * 24 * 60 * 60 * 1000;
    if (lastActive.includes("week")) return now - n * 7 * 24 * 60 * 60 * 1000;
    if (lastActive.includes("month")) return now - n * 30 * 24 * 60 * 60 * 1000;
    if (lastActive.includes("year")) return now - n * 365 * 24 * 60 * 60 * 1000;
    return now;
  }
  
  // Filter
  const filteredUsers = computed(() => {
    let result = users.filter((user) => {
      const matchesSearch =
        !searchQuery.value ||
        [user.name, user.email, user.username].some((val) =>
          String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
        );
  
      const matchesRole = !selectedRole.value || user.role === selectedRole.value;
      const matchesStatus =
        !selectedStatus.value || user.status === selectedStatus.value;
  
      return matchesSearch && matchesRole && matchesStatus;
    });
  
    if (selectedDate.value === "newest") {
      result = [...result].sort(
        (a, b) => parseDate(b.joined) - parseDate(a.joined)
      );
    } else if (selectedDate.value === "oldest") {
      result = [...result].sort(
        (a, b) => parseDate(a.joined) - parseDate(b.joined)
      );
    } else if (selectedDate.value === "lastActive") {
      result = [...result].sort(
        (a, b) => parseLastActive(b.lastActive) - parseLastActive(a.lastActive)
      );
    }
  
    return result;
  });
  
  // Pagination
  const totalPages = computed(() =>
    Math.ceil(filteredUsers.value.length / itemsPerPage.value)
  );
  
  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredUsers.value.slice(start, start + itemsPerPage.value);
  });
  
  function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++;
  }
  function prevPage() {
    if (currentPage.value > 1) currentPage.value--;
  }
  </script>
  
  <style scoped>
  /* Badge base */
  .status-badge {
    display: inline-block;
    padding: 0.25rem 0.6rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
    transition: all 0.2s ease-in-out;
    cursor: default;
  }
  .status-active {
    background-color: #d1fae5;
    color: #065f46;
  }
  .status-active:hover {
    background-color: #a7f3d0;
  }
  .status-inactive {
    background-color: #e5e7eb;
    color: #374151;
  }
  .status-inactive:hover {
    background-color: #d1d5db;
  }
  .status-banned {
    background-color: #fee2e2;
    color: #b91c1c;
  }
  .status-banned:hover {
    background-color: #fecaca;
  }
  .status-pending {
    background-color: #1e40af;
    color: #fff;
  }
  .status-pending:hover {
    background-color: #1d4ed8;
  }
  .status-suspended {
    background-color: #ffedd5;
    color: #c2410c;
  }
  .status-suspended:hover {
    background-color: #fed7aa;
  }
  /* Fix input/select color */
  input,
  select,
  textarea {
    color: #374151 !important;
    background-color: #ffffff !important;
  }
  option {
    color: #374151 !important;
    background-color: #ffffff !important;
  }
  </style>
  