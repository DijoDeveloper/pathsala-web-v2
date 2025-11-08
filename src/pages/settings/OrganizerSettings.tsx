import { useState } from 'react';
import DynamicForm from '../../components/common/DynamicForm';
import DataTable from '../../components/common/DataTable';
import PageMeta from '../../components/common/PageMeta';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const tabs = [
    'ACADEMIC SESSION',
    'CLASS',
    'SECTION',
    'SUBJECT',
    'CLASS SUBJECT',
    'EXAM TYPE',
    'EXAM',
    'EXAM SUBJECT',
    'ACADEMIC YEAR',
    'CLASS ROUTINE',
    'ATTENDANCE',
    'GRADE',
    'GRADE SCALE',
    'PROMOTION',
    'NOTICEBOARD',
    'EVENT',
    'HOLIDAY',
];

type FormData = Record<string, string>;

// Common form field configurations
const commonFields = [
    { name: 'code', label: 'Code', type: 'text' as const, required: true },
    { name: 'name', label: 'Name', type: 'text' as const, required: true },
    { name: 'description', label: 'Description', type: 'textarea' as const },
];

const classFields = [
    { name: 'name', label: 'Name', type: 'text' as const, required: true },
    { name: 'numericName', label: 'Numeric Name', type: 'number' as const, required: true },
    { name: 'section', label: 'Section', type: 'text' as const },
];

const formConfigs: Record<string, { fields: any[]; initialData: Record<string, string> }> = {
    'ACADEMIC SESSION': {
        fields: commonFields,
        initialData: { code: '', name: '', description: '' },
    },
    'CLASS': {
        fields: classFields,
        initialData: { name: '', numericName: '', section: '' },
    },
    'SECTION': {
        fields: commonFields,
        initialData: { code: '', name: '', description: '' },
    },
    'SUBJECT': {
        fields: commonFields,
        initialData: { code: '', name: '', description: '' },
    },
    'CLASS SUBJECT': {
        fields: [
            { name: 'class', label: 'Class', type: 'text' as const, required: true },
            { name: 'subject', label: 'Subject', type: 'text' as const, required: true },
            { name: 'teacher', label: 'Teacher', type: 'text' as const },
        ],
        initialData: { class: '', subject: '', teacher: '' },
    },
    'EXAM TYPE': {
        fields: commonFields,
        initialData: { code: '', name: '', description: '' },
    },
    'EXAM': {
        fields: [
            { name: 'name', label: 'Exam Name', type: 'text' as const, required: true },
            { name: 'type', label: 'Exam Type', type: 'text' as const, required: true },
            { name: 'startDate', label: 'Start Date', type: 'date' as const, required: true },
            { name: 'endDate', label: 'End Date', type: 'date' as const, required: true },
        ],
        initialData: { name: '', type: '', startDate: '', endDate: '' },
    },
    'EXAM SUBJECT': {
        fields: [
            { name: 'exam', label: 'Exam', type: 'text' as const, required: true },
            { name: 'subject', label: 'Subject', type: 'text' as const, required: true },
            { name: 'date', label: 'Date', type: 'date' as const, required: true },
            { name: 'time', label: 'Time', type: 'time' as const, required: true },
        ],
        initialData: { exam: '', subject: '', date: '', time: '' },
    },
    'ACADEMIC YEAR': {
        fields: [
            { name: 'name', label: 'Year Name', type: 'text' as const, required: true },
            { name: 'startDate', label: 'Start Date', type: 'date' as const, required: true },
            { name: 'endDate', label: 'End Date', type: 'date' as const, required: true },
            {
                name: 'isCurrent', label: 'Is Current Year', type: 'select' as const, options: [
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                ]
            },
        ],
        initialData: { name: '', startDate: '', endDate: '', isCurrent: 'no' },
    },
    'CLASS ROUTINE': {
        fields: [
            { name: 'class', label: 'Class', type: 'text' as const, required: true },
            { name: 'section', label: 'Section', type: 'text' as const, required: true },
            { name: 'subject', label: 'Subject', type: 'text' as const, required: true },
            { name: 'day', label: 'Day', type: 'text' as const, required: true },
            { name: 'startTime', label: 'Start Time', type: 'time' as const, required: true },
            { name: 'endTime', label: 'End Time', type: 'time' as const, required: true },
        ],
        initialData: { class: '', section: '', subject: '', day: '', startTime: '', endTime: '' },
    },
    'ATTENDANCE': {
        fields: [
            { name: 'date', label: 'Date', type: 'date' as const, required: true },
            { name: 'class', label: 'Class', type: 'text' as const, required: true },
            { name: 'section', label: 'Section', type: 'text' as const, required: true },
            { name: 'subject', label: 'Subject', type: 'text' as const, required: true },
        ],
        initialData: { date: '', class: '', section: '', subject: '' },
    },
    'GRADE': {
        fields: commonFields,
        initialData: { code: '', name: '', description: '' },
    },
    'GRADE SCALE': {
        fields: [
            { name: 'name', label: 'Scale Name', type: 'text' as const, required: true },
            { name: 'gradePoints', label: 'Grade Points', type: 'number' as const, required: true },
            { name: 'minimumMarks', label: 'Minimum Marks', type: 'number' as const, required: true },
            { name: 'maximumMarks', label: 'Maximum Marks', type: 'number' as const, required: true },
        ],
        initialData: { name: '', gradePoints: '', minimumMarks: '', maximumMarks: '' },
    },
    'PROMOTION': {
        fields: [
            { name: 'fromClass', label: 'From Class', type: 'text' as const, required: true },
            { name: 'toClass', label: 'To Class', type: 'text' as const, required: true },
            { name: 'academicYear', label: 'Academic Year', type: 'text' as const, required: true },
        ],
        initialData: { fromClass: '', toClass: '', academicYear: '' },
    },
    'NOTICEBOARD': {
        fields: [
            { name: 'title', label: 'Title', type: 'text' as const, required: true },
            { name: 'notice', label: 'Notice', type: 'textarea' as const, required: true },
            { name: 'date', label: 'Date', type: 'date' as const, required: true },
        ],
        initialData: { title: '', notice: '', date: '' },
    },
    'EVENT': {
        fields: [
            { name: 'title', label: 'Event Title', type: 'text' as const, required: true },
            { name: 'description', label: 'Description', type: 'textarea' as const },
            { name: 'startDate', label: 'Start Date', type: 'datetime-local' as const, required: true },
            { name: 'endDate', label: 'End Date', type: 'datetime-local' as const, required: true },
        ],
        initialData: { title: '', description: '', startDate: '', endDate: '' },
    },
    'HOLIDAY': {
        fields: [
            { name: 'title', label: 'Holiday Name', type: 'text' as const, required: true },
            { name: 'description', label: 'Description', type: 'textarea' as const },
            { name: 'startDate', label: 'Start Date', type: 'date' as const, required: true },
            { name: 'endDate', label: 'End Date', type: 'date' as const, required: true },
        ],
        initialData: { title: '', description: '', startDate: '', endDate: '' },
    },
};

// Sample data for the table
const sampleData = [
    { id: 1, name: '2023-2024', code: '2023-24', isCurrent: true },
    { id: 2, name: '2022-2023', code: '2022-23', isCurrent: false },
    { id: 3, name: '2021-2022', code: '2021-22', isCurrent: false },
];

interface TableItem {
    id: number;
    name: string;
    code: string;
    isCurrent: boolean;
}

const OrganizerSettings = () => {
    const [activeTab, setActiveTab] = useState('ACADEMIC SESSION');
    const [formData, setFormData] = useState<FormData>(
        formConfigs['ACADEMIC SESSION'].initialData
    );
    const [tableData, setTableData] = useState<TableItem[]>(sampleData);

    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Form submitted for ${activeTab}:`, formData);
        // For demo purposes, just show an alert
        alert('Form submitted successfully!');
    };

    const handleEdit = (row: TableItem) => {
        // Set form data for editing
        setFormData({
            name: row.name,
            code: row.code,
            description: row.isCurrent ? 'Current Session' : ''
        });
    };

    const handleDelete = (row: TableItem) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setTableData(tableData.filter(item => item.id !== row.id));
        }
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        // Reset form data when changing tabs
        setFormData(formConfigs[tab as keyof typeof formConfigs]?.initialData || {});
    };

    return (
        <>
            <PageMeta
                title="Organizer Settings - School Management"
                description="Manage academic sessions, classes, sections, subjects, exams and other organizational settings"
            />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Header with Breadcrumb */}
            <div className="col-span-12">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Organiser Settings</h1>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="hover:text-primary cursor-pointer">Settings</span>
                        <ChevronRightIcon className="w-4 h-4 mx-1 text-gray-400" />
                        <span className="text-primary">Organiser Settings</span>
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
                                        onClick={() => handleTabChange(tab)}
                                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors duration-200 relative group ${activeTab === tab
                                                ? 'text-primary-700 dark:text-primary-400 font-semibold after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-blue-600 after:rounded-full'
                                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:after:absolute hover:after:left-0 hover:after:right-0 hover:after:bottom-0 hover:after:h-0.5 hover:after:bg-gray-200 dark:hover:after:bg-gray-600 hover:after:rounded-full'
                                            }`}
                                    >
                                        {tab}
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
                        {activeTab === 'ACADEMIC SESSION' ? 'Manage Academic Session' : `Manage ${activeTab}`}
                    </h2>

                    {formConfigs[activeTab as keyof typeof formConfigs] && (
                        <DynamicForm
                            fields={formConfigs[activeTab as keyof typeof formConfigs].fields}
                            formData={formData}
                            onChange={handleInputChange}
                            onSubmit={handleSubmit}
                            submitButtonText={`Save ${activeTab}`}
                        />
                    )}

                    {/* Data Table */}
                    <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            {activeTab} List
                        </h3>
                        <DataTable
                            data={tableData}
                            columns={[
                                { header: 'Name', accessor: 'name' },
                                { header: 'Code', accessor: 'code' },
                                {
                                    header: 'Status',
                                    cell: (row: TableItem) => (
                                        <span className={`px-2 py-1 text-xs rounded-full ${row.isCurrent
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                            }`}>
                                            {row.isCurrent ? 'Current' : 'Inactive'}
                                        </span>
                                    )
                                },
                            ]}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            showActions={true}
                            searchable={true}
                            initialPageSize={5}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default OrganizerSettings;
