// userService.js - Handles all user-related API calls and operations

// Mock data for development
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joined: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Contributor', status: 'Active', joined: '2024-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Learner', status: 'Inactive', joined: '2024-03-01' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Contributor', status: 'Pending', joined: '2024-03-10' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Learner', status: 'Active', joined: '2024-03-15' },
];

// Get all users
export const getUsers = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: mockUsers, success: true };
  } catch (error) {
    return { data: [], success: false, error: error.message };
  }
};

// Get user by ID
export const getUserById = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const user = mockUsers.find(u => u.id === id);
    if (user) {
      return { data: user, success: true };
    }
    return { data: null, success: false, error: 'User not found' };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

// Create new user
export const createUser = async (userData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      joined: new Date().toISOString().split('T')[0]
    };
    mockUsers.push(newUser);
    return { data: newUser, success: true };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

// Update user
export const updateUser = async (id, userData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...userData };
      return { data: mockUsers[index], success: true };
    }
    return { data: null, success: false, error: 'User not found' };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      mockUsers.splice(index, 1);
      return { success: true };
    }
    return { success: false, error: 'User not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update user status
export const updateUserStatus = async (id, status) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    const user = mockUsers.find(u => u.id === id);
    if (user) {
      user.status = status;
      return { data: user, success: true };
    }
    return { data: null, success: false, error: 'User not found' };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

// Get user statistics
export const getUserStats = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const total = mockUsers.length;
    const active = mockUsers.filter(u => u.status === 'Active').length;
    const inactive = mockUsers.filter(u => u.status === 'Inactive').length;
    const pending = mockUsers.filter(u => u.status === 'Pending').length;
    
    const roleStats = {
      Admin: mockUsers.filter(u => u.role === 'Admin').length,
      Contributor: mockUsers.filter(u => u.role === 'Contributor').length,
      Learner: mockUsers.filter(u => u.role === 'Learner').length,
    };
    
    return {
      data: { total, active, inactive, pending, roleStats },
      success: true
    };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
  getUserStats
};
