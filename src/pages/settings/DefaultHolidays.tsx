import { useState } from 'react';
import PageMeta from '../../components/common/PageMeta';

type DayOfWeek = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

const DefaultHolidays = () => {
    const [weeklyHolidays, setWeeklyHolidays] = useState<Record<DayOfWeek, boolean>>({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
    });

    const [hasChanges, setHasChanges] = useState(false);

    const toggleDay = (day: DayOfWeek) => {
        setWeeklyHolidays(prev => ({
            ...prev,
            [day]: !prev[day]
        }));
        setHasChanges(true);
    };

    const saveChanges = () => {
        console.log('Saving weekly holidays:', weeklyHolidays);
        setHasChanges(false);
        // Here you would typically make an API call to save the changes
    };

    const days: { id: DayOfWeek; label: string }[] = [
        { id: 'sunday', label: 'Sunday' },
        { id: 'monday', label: 'Monday' },
        { id: 'tuesday', label: 'Tuesday' },
        { id: 'wednesday', label: 'Wednesday' },
        { id: 'thursday', label: 'Thursday' },
        { id: 'friday', label: 'Friday' },
        { id: 'saturday', label: 'Saturday' },
    ];

    return (
        <>
            <PageMeta
                title="Default Holidays - School Management"
                description="Configure weekly default holidays for the school"
            />
            <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Weekly Default Holidays</h2>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Select the days of the week that are typically considered holidays for the school. These settings can be overridden by specific holiday entries.
                </p>
            </div>

            {/* Days List */}
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 overflow-hidden">
                <ul className="divide-y divide-gray-200 dark:divide-dark-700">
                    {days.map((day) => (
                        <li key={day.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                            <div className="flex items-center justify-between">
                                <span className="text-base font-medium text-gray-900 dark:text-white">
                                    {day.label}
                                </span>
                                <button
                                    type="button"
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${weeklyHolidays[day.id] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'}`}
                                    role="switch"
                                    aria-checked={weeklyHolidays[day.id]}
                                    onClick={() => toggleDay(day.id)}
                                >
                                    <span className="sr-only">Toggle {day.label}</span>
                                    <span
                                        aria-hidden="true"
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${weeklyHolidays[day.id] ? 'translate-x-5' : 'translate-x-0'}`}
                                    />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Action Button */}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={saveChanges}
                    disabled={!hasChanges}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${hasChanges ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    SAVE CHANGES
                </button>
            </div>
        </div>
        </>
    );
};

export default DefaultHolidays;
