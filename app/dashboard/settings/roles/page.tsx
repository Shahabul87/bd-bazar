"use client"

import { useState } from "react"
import { ArrowLeft, Users, Shield, Eye, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Permission {
  id: string
  name: string
  description: string
  enabled: boolean
}

interface Role {
  id: string
  name: string
  description: string
  users: number
  permissions: Permission[]
}

export default function RolesSettingsPage() {
  const router = useRouter()
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "admin",
      name: "Administrator",
      description: "Full access to all features",
      users: 2,
      permissions: [
        { id: "orders_view", name: "View Orders", description: "Can view all orders", enabled: true },
        { id: "orders_edit", name: "Edit Orders", description: "Can edit and update orders", enabled: true },
        { id: "products_manage", name: "Manage Products", description: "Can manage products", enabled: true },
        { id: "users_manage", name: "Manage Users", description: "Can manage user accounts", enabled: true },
        { id: "settings_edit", name: "Edit Settings", description: "Can modify system settings", enabled: true }
      ]
    },
    {
      id: "manager",
      name: "Store Manager",
      description: "Can manage products and orders",
      users: 4,
      permissions: [
        { id: "orders_view", name: "View Orders", description: "Can view all orders", enabled: true },
        { id: "orders_edit", name: "Edit Orders", description: "Can edit and update orders", enabled: true },
        { id: "products_manage", name: "Manage Products", description: "Can manage products", enabled: true },
        { id: "users_manage", name: "Manage Users", description: "Can manage user accounts", enabled: false },
        { id: "settings_edit", name: "Edit Settings", description: "Can modify system settings", enabled: false }
      ]
    }
  ])

  const togglePermission = (roleId: string, permissionId: string) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        return {
          ...role,
          permissions: role.permissions.map(perm => 
            perm.id === permissionId ? { ...perm, enabled: !perm.enabled } : perm
          )
        }
      }
      return role
    }))
  }

  return (
    <div className="p-6 space-y-6 bg-gray-800 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-700 rounded-full transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">User Roles & Permissions</h1>
            <p className="text-gray-400">Manage access control and permissions</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Users className="h-4 w-4" />
          Add New Role
        </button>
      </div>

      {/* Roles List */}
      <div className="space-y-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-900/50 rounded-lg">
                    <Shield className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{role.name}</h3>
                    <p className="text-gray-400 mt-1">{role.description}</p>
                    <p className="text-sm text-gray-500 mt-2">{role.users} users with this role</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-gray-300">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-800 rounded-lg text-red-400 hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Permissions Grid */}
            <div className="p-6">
              <h4 className="font-medium mb-4">Permissions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {role.permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-start justify-between p-4 bg-gray-800 rounded-lg"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <p className="font-medium">{permission.name}</p>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{permission.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={permission.enabled}
                        onChange={() => togglePermission(role.id, permission.id)}
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 