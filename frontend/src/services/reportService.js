// reportService.js - Handles all report-related API calls

// Mock data for development
const mockReports = [
  { 
    id: 1, 
    title: 'Inappropriate content in resource', 
    item: 'React Performance Optimization', 
    reportedBy: 'User123', 
    time: '2h ago',
    status: 'Under review',
    color: 'red'
  },
  { 
    id: 2, 
    title: 'Spam in discussion', 
    item: 'JavaScript Fundamentals thread', 
    reportedBy: 'User456', 
    time: '5h ago',
    status: 'Under review',
    color: 'yellow'
  },
  { 
    id: 3, 
    title: 'Plagiarism in learning path', 
    item: 'Full Stack MERN Roadmap', 
    reportedBy: 'User789', 
    time: '1d ago',
    status: 'Under review',
    color: 'purple'
  },
  { 
    id: 4, 
    title: 'Harassment in comments', 
    item: 'Node.js Backend Path thread', 
    reportedBy: 'User221', 
    time: '2d ago',
    status: 'Under review',
    color: 'orange'
  },
];

// Get all reports
export const getReports = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: mockReports, success: true };
  } catch (error) {
    return { data: [], success: false, error: error.message };
  }
};

// Get report by ID
export const getReportById = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const report = mockReports.find(r => r.id === id);
    if (report) {
      return { data: report, success: true };
    }
    return { data: null, success: false, error: 'Report not found' };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

// Create new report
export const createReport = async (reportData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newReport = {
      id: mockReports.length + 1,
      ...reportData,
      time: 'Just now',
      status: 'Under review'
    };
    mockReports.push(newReport);
    return { data: newReport, success: true };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

// Resolve report
export const resolveReport = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    const report = mockReports.find(r => r.id === id);
    if (report) {
      report.status = 'Resolved';
      return { data: report, success: true };
    }
    return { data: null, success: false, error: 'Report not found' };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

// Reject report
export const rejectReport = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    const report = mockReports.find(r => r.id === id);
    if (report) {
      report.status = 'Rejected';
      return { data: report, success: true };
    }
    return { data: null, success: false, error: 'Report not found' };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

// Delete report
export const deleteReport = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockReports.findIndex(r => r.id === id);
    if (index !== -1) {
      mockReports.splice(index, 1);
      return { success: true };
    }
    return { success: false, error: 'Report not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get report statistics
export const getReportStats = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const total = mockReports.length;
    const underReview = mockReports.filter(r => r.status === 'Under review').length;
    const resolved = mockReports.filter(r => r.status === 'Resolved').length;
    const rejected = mockReports.filter(r => r.status === 'Rejected').length;
    
    return {
      data: { total, underReview, resolved, rejected },
      success: true
    };
  } catch (error) {
    return { data: null, success: false, error: error.message };
  }
};

export default {
  getReports,
  getReportById,
  createReport,
  resolveReport,
  rejectReport,
  deleteReport,
  getReportStats
};
