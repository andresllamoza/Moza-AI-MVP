import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  Settings, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lock,
  Unlock,
  UserPlus,
  UserMinus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  isGranted: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystemRole: boolean;
  color: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  mfaEnabled: boolean;
  avatar?: string;
}

interface RoleBasedAccessProps {
  isOpen: boolean;
  onClose: () => void;
}

// Permission Categories
const permissionCategories = {
  'Dashboard': [
    { id: 'dashboard.view', name: 'View Dashboard', description: 'Access main dashboard' },
    { id: 'dashboard.export', name: 'Export Data', description: 'Export dashboard data' },
    { id: 'dashboard.customize', name: 'Customize Dashboard', description: 'Customize dashboard layout' }
  ],
  'Competitor Intelligence': [
    { id: 'competitors.view', name: 'View Competitors', description: 'View competitor data' },
    { id: 'competitors.add', name: 'Add Competitors', description: 'Add new competitors' },
    { id: 'competitors.edit', name: 'Edit Competitors', description: 'Edit competitor information' },
    { id: 'competitors.delete', name: 'Delete Competitors', description: 'Remove competitors' }
  ],
  'Review Management': [
    { id: 'reviews.view', name: 'View Reviews', description: 'View customer reviews' },
    { id: 'reviews.respond', name: 'Respond to Reviews', description: 'Respond to customer reviews' },
    { id: 'reviews.moderate', name: 'Moderate Reviews', description: 'Moderate review content' },
    { id: 'reviews.analytics', name: 'Review Analytics', description: 'Access review analytics' }
  ],
  'User Management': [
    { id: 'users.view', name: 'View Users', description: 'View user accounts' },
    { id: 'users.add', name: 'Add Users', description: 'Create new user accounts' },
    { id: 'users.edit', name: 'Edit Users', description: 'Edit user information' },
    { id: 'users.delete', name: 'Delete Users', description: 'Remove user accounts' },
    { id: 'users.roles', name: 'Manage Roles', description: 'Assign and manage user roles' }
  ],
  'System Administration': [
    { id: 'system.settings', name: 'System Settings', description: 'Configure system settings' },
    { id: 'system.integrations', name: 'Manage Integrations', description: 'Configure integrations' },
    { id: 'system.security', name: 'Security Settings', description: 'Manage security settings' },
    { id: 'system.audit', name: 'Audit Logs', description: 'View audit logs' },
    { id: 'system.backup', name: 'Backup & Restore', description: 'Manage data backups' }
  ]
};

// Default Roles
const defaultRoles: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access with all permissions',
    permissions: Object.values(permissionCategories).flat().map(p => p.id),
    userCount: 3,
    isSystemRole: true,
    color: 'red'
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Management access with most permissions',
    permissions: [
      'dashboard.view', 'dashboard.export', 'dashboard.customize',
      'competitors.view', 'competitors.add', 'competitors.edit',
      'reviews.view', 'reviews.respond', 'reviews.analytics',
      'users.view', 'users.add', 'users.edit'
    ],
    userCount: 8,
    isSystemRole: true,
    color: 'blue'
  },
  {
    id: 'analyst',
    name: 'Analyst',
    description: 'Read-only access with analytics permissions',
    permissions: [
      'dashboard.view', 'dashboard.export',
      'competitors.view', 'reviews.view', 'reviews.analytics',
      'users.view'
    ],
    userCount: 15,
    isSystemRole: true,
    color: 'green'
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Basic read-only access',
    permissions: ['dashboard.view', 'competitors.view', 'reviews.view'],
    userCount: 25,
    isSystemRole: true,
    color: 'gray'
  }
];

// Sample Users
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    mfaEnabled: true
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    email: 'mike.rodriguez@company.com',
    role: 'manager',
    status: 'active',
    lastLogin: '2024-01-15T09:15:00Z',
    mfaEnabled: true
  },
  {
    id: '3',
    name: 'Jennifer Park',
    email: 'jennifer.park@company.com',
    role: 'analyst',
    status: 'active',
    lastLogin: '2024-01-14T16:45:00Z',
    mfaEnabled: false
  }
];

export const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'roles' | 'users' | 'permissions'>('roles');
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (color: string) => {
    const colors = {
      red: 'bg-red-100 text-red-700 border-red-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      gray: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700',
      suspended: 'bg-red-100 text-red-700'
    };
    return colors[status as keyof typeof colors] || colors.inactive;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Role-Based Access Control</h1>
                <p className="text-gray-600">Manage user roles and permissions</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XCircle className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-6">
            {[
              { id: 'roles', label: 'Roles', icon: Shield },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'permissions', label: 'Permissions', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'roles' && (
            <div className="space-y-6">
              {/* Search and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search roles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => setShowCreateRole(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Role
                </Button>
              </div>

              {/* Roles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRoles.map((role) => (
                  <motion.div
                    key={role.id}
                    className="glass-card rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedRole(role)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getRoleColor(role.color)}`}>
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{role.name}</h3>
                          <p className="text-sm text-gray-600">{role.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getRoleColor(role.color)}>
                        {role.userCount} users
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Permissions</span>
                        <span className="font-medium text-gray-900">{role.permissions.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Type</span>
                        <span className="font-medium text-gray-900">
                          {role.isSystemRole ? 'System' : 'Custom'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Search and Actions */}
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button
                  onClick={() => setShowUserModal(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>

              {/* Users Table */}
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          MFA
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Login
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline" className={getRoleColor(
                              roles.find(r => r.id === user.role)?.color || 'gray'
                            )}>
                              {roles.find(r => r.id === user.role)?.name || 'Unknown'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user.mfaEnabled ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500" />
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Permission Categories</h3>
                <p className="text-gray-600">
                  Manage permissions across different system modules
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.entries(permissionCategories).map(([category, permissions]) => (
                  <div key={category} className="glass-card rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-blue-600" />
                      {category}
                    </h4>
                    <div className="space-y-3">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{permission.name}</div>
                            <div className="text-sm text-gray-600">{permission.description}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {permission.id}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
