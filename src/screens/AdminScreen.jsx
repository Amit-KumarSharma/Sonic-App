import { useState } from 'react';
import './AdminScreen.css';
import { Shield, ShieldAlert, Users, Trash2, Ban, Eye, CheckCircle } from 'lucide-react';

export default function AdminScreen({ goBack }) {
  const [activeTab, setActiveTab] = useState('reports');

  const reports = [
    { id: 1, type: 'Hate Speech', target: 'Comment: "U guys suck"', reportedBy: 'Alex', status: 'Pending' },
    { id: 2, type: 'Spam', target: 'User: @bot_music123', reportedBy: 'System', status: 'Pending' },
    { id: 3, type: 'Inappropriate Content', target: 'Playlist Cover', reportedBy: 'User99', status: 'Reviewed' },
  ];

  return (
    <div className="admin-screen format-slide-in">
      <header className="admin-header glass-panel">
        <div className="admin-title-row">
          <Shield color="#FF4500" size={24} />
          <h2>Moderator Panel</h2>
        </div>
        <button className="cancel-text-btn" onClick={goBack}>Exit</button>
      </header>

      <div className="admin-dashboard">
        <div className="admin-stats glass-panel">
          <div className="a-stat">
            <span className="a-num">12</span>
            <span className="a-label">Active Reports</span>
          </div>
          <div className="a-stat">
            <span className="a-num">4</span>
            <span className="a-label">Bans Today</span>
          </div>
          <div className="a-stat">
            <span className="a-num">99%</span>
            <span className="a-label">System Health</span>
          </div>
        </div>

        <div className="admin-tabs mt-20">
          <button className={`admin-tab ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>Reports</button>
          <button className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>Users</button>
          <button className={`admin-tab ${activeTab === 'system' ? 'active' : ''}`} onClick={() => setActiveTab('system')}>System</button>
        </div>

        <div className="admin-content mt-15">
          {activeTab === 'reports' && (
            <div className="reports-list">
              {reports.map(report => (
                <div key={report.id} className="report-card glass-panel">
                  <div className="report-header">
                    <span className="r-type"><ShieldAlert size={14}/> {report.type}</span>
                    <span className={`r-status ${report.status.toLowerCase()}`}>{report.status}</span>
                  </div>
                  <div className="report-body">
                    <p><strong>Target:</strong> {report.target}</p>
                    <p><strong>Reported by:</strong> {report.reportedBy}</p>
                  </div>
                  <div className="report-actions">
                    <button className="r-btn resolve"><CheckCircle size={16}/> Resolve</button>
                    <button className="r-btn delete"><Trash2 size={16}/> Delete Content</button>
                    <button className="r-btn ban"><Ban size={16}/> Ban User</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="empty-state">
              <Users size={48} color="var(--text-muted)" />
              <p>User management dashboard</p>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="empty-state">
              <Eye size={48} color="var(--text-muted)" />
              <p>System monitoring logs</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
