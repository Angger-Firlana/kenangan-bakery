// src/modules/services/authService.js
export const authService = {
  login: async (email, password) => {
    // Implementasi login
    return { success: true, user: { email, fullName: 'User' } };
  },
  
  register: async (userData) => {
    // Implementasi register
    return { success: true, user: userData };
  },
  
  logout: () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  }
};