import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '../../icons';

interface PermissionItem {
    name: string;
    permissions: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
    };
}

interface AccordionSection {
    title: string;
    items: PermissionItem[];
    isOpen: boolean;
}

const RoleManagement: React.FC = () => {
    const [selectedRole, setSelectedRole] = useState('Administrator');
    const [sections, setSections] = useState<AccordionSection[]>([
        {
            title: 'Registration',
            isOpen: true,
            items: [
                {
                    name: 'Student Registration',
                    permissions: { create: true, read: true, update: true, delete: true },
                },
                {
                    name: 'Bulk Student Registration',
                    permissions: { create: true, read: true, update: true, delete: true },
                },
                {
                    name: 'Staff Registration',
                    permissions: { create: true, read: true, update: true, delete: true },
                },
                {
                    name: 'Bulk Staff Registration',
                    permissions: { create: true, read: true, update: true, delete: true },
                },
                {
                    name: 'App User Registration',
                    permissions: { create: true, read: true, update: true, delete: true },
                },
            ],
        },
        {
            title: 'Settings',
            isOpen: false,
            items: [
                {
                    name: 'Organizer Settings',
                    permissions: { create: false, read: true, update: false, delete: false },
                },
                {
                    name: 'Role Management',
                    permissions: { create: true, read: true, update: true, delete: false },
                },
            ],
        },
        // Add more sections as needed
    ]);

    const roles = ['Administrator', 'Teacher', 'Student', 'Parent'];

    const toggleSection = (index: number) => {
        const newSections = [...sections];
        newSections[index].isOpen = !newSections[index].isOpen;
        setSections(newSections);
    };

    const handlePermissionChange = (
        sectionIndex: number,
        itemIndex: number,
        permission: 'create' | 'read' | 'update' | 'delete'
    ) => {
        const newSections = [...sections];
        newSections[sectionIndex].items[itemIndex].permissions[permission] =
            !newSections[sectionIndex].items[itemIndex].permissions[permission];
        setSections(newSections);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Role Management</h1>

            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Select Role</label>
                <select
                    className="w-full p-2 border rounded"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                >
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
            </div>

            <div className="bg-white rounded shadow">
                <h2 className="text-lg font-semibold p-4 border-b">
                    Permissions for {selectedRole}
                </h2>

                <div className="divide-y">
                    {sections.map((section, sectionIndex) => (
                        <div key={section.title} className="border-b">
                            <button
                                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50"
                                onClick={() => toggleSection(sectionIndex)}
                            >
                                <span className="font-medium">{section.title}</span>
                                {section.isOpen ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                            </button>

                            {section.isOpen && (
                                <div className="p-4 bg-gray-50">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left text-gray-600 text-sm">
                                                <th className="pb-2">Features</th>
                                                <th className="text-center">Create</th>
                                                <th className="text-center">Read</th>
                                                <th className="text-center">Update</th>
                                                <th className="text-center">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {section.items.map((item, itemIndex) => (
                                                <tr key={item.name} className="border-t">
                                                    <td className="py-3">{item.name}</td>
                                                    {(['create', 'read', 'update', 'delete'] as const).map((permission) => (
                                                        <td key={permission} className="text-center">
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    className="sr-only peer"
                                                                    checked={item.permissions[permission]}
                                                                    onChange={() =>
                                                                        handlePermissionChange(sectionIndex, itemIndex, permission)
                                                                    }
                                                                />
                                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                            </label>
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default RoleManagement;
