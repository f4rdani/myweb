// src/Api/admin.js
const BASE_URL = 'http://localhost:5000';

// Custom error class untuk API errors
class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const adminService = {
  // Fungsi untuk login admin
  async adminLogin(email, password) {
    const response = await fetch(`${BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    return await handleResponse(response);
  },
  
  // Fungsi untuk logout admin
  async adminLogout() {
    try {
      const response = await fetch(`${BASE_URL}/admin/logout`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error) {
      throw new ApiError('Failed to logout as admin', 500, error);
    }
  },

  // Fungsi untuk mengambil semua data Art (CRUD)
  async getArtworks() {
    try {
      const response = await fetch(`${BASE_URL}/art`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error) {
      throw new ApiError('Failed to fetch artworks', 500, error);
    }
  },

  async getArtworksGalery() {
    try {
      const response = await fetch(`${BASE_URL}/art_galery`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error) {
      throw new ApiError('Failed to fetch artworks', 500, error);
    }
  },
  
  async addArtwork(formData) {
    try {
      if (!(formData instanceof FormData)) {
        throw new ApiError('Invalid form data', 400);
      }
      const response = await fetch(`${BASE_URL}/art`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error) {
      throw new ApiError('Failed to add artwork', 500, error);
    }
  },

  async updateArtwork(id, formData) {
    try {
      if (!id) throw new ApiError('Artwork ID is required', 400);
      if (!(formData instanceof FormData)) {
        throw new ApiError('Invalid form data', 400);
      }
      const response = await fetch(`${BASE_URL}/art/${id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error) {
      throw new ApiError('Failed to update artwork', 500, error);
    }
  },

  async deleteArtwork(id) {
    try {
      if (!id) throw new ApiError('Artwork ID is required', 400);
      const response = await fetch(`${BASE_URL}/art/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error) {
      throw new ApiError('Failed to delete artwork', 500, error);
    }
  },



  // === Fungsi CRUD untuk Users (akses khusus admin) ===

  // Get all users
  async getUsers() {
    try {
      const response = await fetch(`${BASE_URL}/admin/users`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error) {
      throw new ApiError('Failed to fetch users', 500, error);
    }
  },

  // Get a single user by ID
  async getUser(id) {
    try {
      if (!id) throw new ApiError('User ID is required', 400);
      const response = await fetch(`${BASE_URL}/admin/users/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error) {
      throw new ApiError('Failed to fetch user', 500, error);
    }
  },

  // Add a new user
  async addUser(userData) {
    try {
      // Asumsikan userData adalah objek JSON yang berisi: name, email, password, dll.
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });
      return await handleResponse(response);
    } catch (error) {
      throw new ApiError('Failed to add user', 500, error);
    }
  },

  // Update user yang sudah ada
  async updateUser(id, userData) {
    try {
      if (!id) throw new ApiError('User ID is required', 400);
      const response = await fetch(`${BASE_URL}/admin/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });
      return await handleResponse(response);
    } catch (error) {
      throw new ApiError('Failed to update user', 500, error);
    }
  },

  // Delete user
  async deleteUser(id) {
    try {
      if (!id) throw new ApiError('User ID is required', 400);
      const response = await fetch(`${BASE_URL}/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error) {
      throw new ApiError('Failed to delete user', 500, error);
    }
  },
};





async function handleResponse(response) {
  // Ambil header content-type
  const contentType = response.headers.get('content-type');
  let data;
  
  // Jika respons bertipe JSON, coba parsing JSON-nya
  if (contentType && contentType.includes('application/json')) {
    data = await response.json().catch(() => null);
  } else {
    // Jika bukan JSON, ambil sebagai text
    data = await response.text();
  }
  
  // Jika respons tidak ok, bangun pesan error dari data
  if (!response.ok) {
    // Jika data adalah objek dan memiliki properti message, gunakan pesan itu.
    const errorMessage =
      data && typeof data === 'object' && data.message
        ? data.message
        : data || 'Server error';
    throw new ApiError(errorMessage, response.status, data);
  }
  
  return data;
}

export default adminService;
