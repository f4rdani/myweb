//auth.jsx
export const authService = {
    async login(formData) {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return handleResponse(response);
    },
  
    async register(formData) {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      return handleResponse(response)
    },
    // Tambahkan method forgotPassword
    async forgotPassword(email) {
      try {
        console.log('Sending forgot password request for email:', email);
        const response = await fetch('http://localhost:5000/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email })
        });
        const data = await response.json();
        console.log('Forgot password response:', data);
        if (!response.ok) {
          throw new Error(data.message || 'Failed to process request');
        }
        return data;
      } catch (error) {
        console.error('Forgot password error:', error);
        throw error;
      }
    },
   async logout() {
    const response = await fetch('http://localhost:5000/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    return handleResponse(response);
  },
  // Tambahkan fungsi untuk konfirmasi email
  async confirmEmail(token) {
    const response = await fetch('http://localhost:5000/confirm-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token })
    });
    return handleResponse(response);
  },
  async verifyResetToken(token) {
    const response = await fetch('http://localhost:5000/verify-reset-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    return handleResponse(response);
  },
  async resetPassword(token, newPassword) {
    const response = await fetch('http://localhost:5000/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });
    return handleResponse(response);
  },
};
  


async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Request failed');
  }
  return data;
}

export default authService;