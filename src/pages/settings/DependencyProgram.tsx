import { useState } from 'react';
import DataTable from '../../components/common/DataTable';
import PageMeta from '../../components/common/PageMeta';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const tabs = [
    'NOTICE TYPE',
    'MESSAGE TYPE',
    'HOLIDAY TYPE',
    'RENEWAL TYPE',
    'HOUSES',
    'NOTIFICATION',
    'CONFIGURATIONS',
];

type FormData = Record<string, string>;

// Common form field configurations
const commonFields = [
    { name: 'code', label: 'Code', type: 'text' as const, required: true },
    { name: 'name', label: 'Name', type: 'text' as const, required: true },
    { name: 'description', label: 'Description', type: 'textarea' as const },
];

const formConfigs: Record<string, { fields: any[]; initialData: Record<string, string> }> = {
    'NOTICE TYPE': {
        fields: commonFields,
        initialData: { code: '', name: '', description: '' },
    },
    'MESSAGE TYPE': {
        fields: commonFields,
        initialData: { code: '', name: '', description: '' },
    },
    'HOLIDAY TYPE': {
        fields: commonFields,
        initialData: { code: '', name: '', description: '' },
    },
    'RENEWAL TYPE': {
        fields: commonFields,
        initialData: { code: '', name: '', description: '' },
    },
    'HOUSES': {
        fields: commonFields,
        initialData: { code: '', name: '', description: '' },
    },
    'NOTIFICATION': {
        fields: commonFields,
        initialData: { code: '', name: '', description: '' },
    },
    'CONFIGURATIONS': {
        fields: commonFields,
        initialData: { code: '', name: '', description: '' },
    },
};

// Sample data for the table
const sampleData = [
    { id: 1, name: 'Primary', code: 'PRI', isCurrent: true },
    { id: 2, name: 'Secondary', code: 'SEC', isCurrent: false },
    { id: 3, name: 'Higher Secondary', code: 'HSC', isCurrent: false },
];

type TableItem = {
    id: number;
    name: string;
    code: string;
    isCurrent: boolean;
};

const DependencyProgram = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [formData, setFormData] = useState<FormData>(formConfigs[tabs[0]].initialData);

    const formatTabName = (name: string) => {
        return name.toLowerCase().split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Here you would typically make an API call to save the form data
    };

    const handleEdit = (item: TableItem) => {
        // Set form data for editing
        setFormData({
            name: item.name,
            code: item.code,
            description: item.isCurrent ? 'Current' : ''
        });
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            console.log('Deleting item with ID:', id);
            // Here you would typically make an API call to delete the item
        }
    };

    const currentConfig = formConfigs[activeTab] || { fields: [], initialData: {} };

    return (
        <>
            <PageMeta
                title="Dependency Program Settings - School Management"
                description="Manage notice types, message types, holiday types, renewal types, houses, notifications and configurations"
            />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Header with Breadcrumb */}
            <div className="col-span-12">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Dependency Program Settings</h1>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="hover:text-primary cursor-pointer">Settings</span>
                        <ChevronRightIcon className="w-4 h-4 mx-1 text-gray-400" />
                        <span className="text-primary">Dependency Program</span>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="col-span-12">
                <div className="border-b border-gray-200 dark:border-dark-700 w-full overflow-hidden">
                    <div className="relative">
                        <div className="flex items-center overflow-x-auto scrollbar-hide -mb-px pb-1">
                            <div className="flex space-x-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => {
                                            setActiveTab(tab);
                                            setFormData(formConfigs[tab]?.initialData || {});
                                        }}
                                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors duration-200 relative group ${
                                            activeTab === tab
                                                ? 'text-primary-700 dark:text-primary-400 font-semibold after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-blue-600 after:rounded-full'
                                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:after:absolute hover:after:left-0 hover:after:right-0 hover:after:bottom-0 hover:after:h-0.5 hover:after:bg-gray-200 dark:hover:after:bg-gray-600 hover:after:rounded-full'
                                        }`}
                                    >
                                        {formatTabName(tab)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent dark:from-gray-900 pointer-events-none"></div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="col-span-12">
                <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    {formatTabName(activeTab)}
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="space-y-4 max-w-2xl">
                        {currentConfig.fields.map((field) => (
                            <div key={field.name} className="space-y-1">
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        id={field.name}
                                        name={field.name}
                                        rows={3}
                                        value={formData[field.name] || ''}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm dark:bg-dark-700 dark:text-white"
                                        required={field.required}
                                    />
                                ) : (
                                    <input
                                        type={field.type}
                                        id={field.name}
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm dark:bg-dark-700 dark:text-white"
                                        required={field.required}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => setFormData(currentConfig.initialData)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-dark-700 dark:border-dark-600 dark:text-gray-200 dark:hover:bg-dark-600"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save {formatTabName(activeTab)}
                        </button>
                    </div>
                </form>

                {/* Table */}
                <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        {formatTabName(activeTab)} List
                    </h3>
                    <DataTable
                        data={sampleData}
                        columns={[
                            { header: 'Name', accessor: 'name' },
                            { header: 'Code', accessor: 'code' },
                            {
                                header: 'Status',
                                cell: (row: TableItem) => (
                                    <span className={`px-2 py-1 text-xs rounded-full ${row.isCurrent
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                                        {row.isCurrent ? 'Active' : 'Inactive'}
                                    </span>
                                )
                            },
                        ]}
                        onEdit={handleEdit}
                        onDelete={(row) => handleDelete(row.id)}
                    />
                </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default DependencyProgram;
