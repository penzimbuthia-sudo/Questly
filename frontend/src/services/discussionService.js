// discussionService.js - Handles all discussion-related API calls

// Mock data for development
const mockDiscussions = [
  { 
    id: 1, 
    title: "What's the best way to handle state management in React?", 
    learningPath: 'React Developer Path', 
    replies: 23, 
    likes: 128, 
    status: 'Clear',
    author: 'John Doe'
  },
  { 
    id: 2, 
    title: 'How do I optimize my JavaScript code?', 
    learningPath: 'JavaScript Fundamentals', 
    replies: 31, 
    likes: 94, 
    status: 'Clear',
    author: 'Jane Smith'
  },
  { 
    id: 3, 
    title: 'Anyone have starter templates for Express?', 
    learningPath: 'Node.js Backend Path', 
    replies: 9, 
    likes: 40, 
    status: 'Clear',
    author: 'Bob Johnson'
  },
  { 
    id: 4, 
    title: 'This looks like a copy-pasted answer', 
    learningPath: 'Full Stack MERN Roadmap', 
    replies: 4, 
    likes: 2, 
    status: 'Flagged',
    author: 'Alice Brown'
  },
];

// Get all discussions
export const getDiscussions = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: mockDiscussions, success: true };
  } catch (error) {
    return { data: [], success: false, error: error.message };
  }
};

// Get discussion by ID
export const getDiscussionById = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const discussion = mockDiscussions.find(d => d.id === id);
    if (discussion) {
      return { data: discussion, success: true };
    }
    return { data: null, success: false, error: 'Discussion not found' };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

// Create new discussion
export const createDiscussion = async (discussionData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newDiscussion = {
      id: mockDiscussions.length + 1,
      ...discussionData,
      replies: 0,
      likes: 0,
      status: 'Clear'
    };
    mockDiscussions.push(newDiscussion);
    return { data: newDiscussion, success: true };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

// Update discussion
export const updateDiscussion = async (id, discussionData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockDiscussions.findIndex(d => d.id === id);
    if (index !== -1) {
      mockDiscussions[index] = { ...mockDiscussions[index], ...discussionData };
      return { data: mockDiscussions[index], success: true };
    }
    return { data: null, success: false, error: 'Discussion not found' };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

// Delete discussion
export const deleteDiscussion = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockDiscussions.findIndex(d => d.id === id);
    if (index !== -1) {
      mockDiscussions.splice(index, 1);
      return { success: true };
    }
    return { success: false, error: 'Discussion not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update discussion status (Clear/Flagged)
export const updateDiscussionStatus = async (id, status) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    const discussion = mockDiscussions.find(d => d.id === id);
    if (discussion) {
      discussion.status = status;
      return { data: discussion, success: true };
    }
    return { data: null, success: false, error: 'Discussion not found' };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

// Add reply to discussion
export const addReply = async (discussionId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    const discussion = mockDiscussions.find(d => d.id === discussionId);
    if (discussion) {
      discussion.replies += 1;
      return { data: { replies: discussion.replies }, success: true };
    }
    return { data: null, success: false, error: 'Discussion not found' };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

// Like discussion
export const likeDiscussion = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const discussion = mockDiscussions.find(d => d.id === id);
    if (discussion) {
      discussion.likes += 1;
      return { data: { likes: discussion.likes }, success: true };
    }
    return { data: null, success: false, error: 'Discussion not found' };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

// Get discussion statistics
export const getDiscussionStats = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const total = mockDiscussions.length;
    const clear = mockDiscussions.filter(d => d.status === 'Clear').length;
    const flagged = mockDiscussions.filter(d => d.status === 'Flagged').length;
    const totalReplies = mockDiscussions.reduce((sum, d) => sum + d.replies, 0);
    const totalLikes = mockDiscussions.reduce((sum, d) => sum + d.likes, 0);
    
    return {
      data: { total, clear, flagged, totalReplies, totalLikes },
      success: true
    };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

export default {
  getDiscussions,
  getDiscussionById,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  updateDiscussionStatus,
  addReply,
  likeDiscussion,
  getDiscussionStats
};
