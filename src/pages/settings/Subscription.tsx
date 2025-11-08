import { useState } from 'react';
import PlanCard, { Plan } from '../../components/settings/PlanCard';
import FeatureRow, { Feature } from '../../components/settings/FeatureRow';
import PageMeta from '../../components/common/PageMeta';
import { ChevronRightIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const Subscription = () => {
    const [currentPlan] = useState<'basic' | 'standard' | 'premium'>('basic');

    const plans: Plan[] = [
        {
            id: 'basic',
            name: 'Basic',
            price: '$0/month',
            description: 'Essential features for getting started.',
            isCurrent: currentPlan === 'basic',
        },
        {
            id: 'standard',
            name: 'Standard',
            price: '$29/month',
            description: 'More features for growing schools.',
            isCurrent: currentPlan === 'standard',
        },
        {
            id: 'premium',
            name: 'Premium',
            price: '$79/month',
            description: 'All features for comprehensive school management.',
            isCurrent: currentPlan === 'premium',
        },
    ];

    const features: Feature[] = [
        {
            name: 'Basic Student Management',
            description: 'Manage student profiles and basic information.',
            availability: 'included',
        },
        {
            name: 'Class & Section Management',
            description: 'Organize classes and sections.',
            availability: 'included',
        },
        {
            name: 'Attendance Tracking',
            description: 'Mark and view student attendance.',
            availability: 'included',
        },
        {
            name: 'Notice Board',
            description: 'Publish school-wide notices.',
            availability: 'included',
        },
        {
            name: 'Exam Scheduling',
            description: 'Schedule and manage examinations.',
            availability: 'standard',
        },
        {
            name: 'Online Fee Payment',
            description: 'Collect fees online through integrated gateways.',
            availability: 'standard',
        },
        {
            name: 'Advanced Reporting',
            description: 'Generate detailed academic and administrative reports.',
            availability: 'premium',
        },
        {
            name: 'Parent Communication Module',
            description: 'Direct messaging and chat with parents.',
            availability: 'premium',
        },
    ];

    const handleSwitchPlan = (planId: 'basic' | 'standard' | 'premium') => {
        console.log('Switching to plan:', planId);
        // Here you would typically make an API call to switch the plan
    };

    return (
        <>
            <PageMeta
                title="Subscription Management - School Management"
                description="Manage your school subscription plan and view available features"
            />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Header with Breadcrumb */}
            <div className="col-span-12">
                <div className="mb-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <BriefcaseIcon className="w-6 h-6 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Subscription</h1>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="hover:text-primary cursor-pointer">Settings</span>
                        <ChevronRightIcon className="w-4 h-4 mx-1 text-gray-400" />
                        <span className="text-primary">Subscription</span>
                    </div>
                </div>
            </div>

            {/* Current Plan Section */}
            <div className="col-span-12">
                <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Your Current Plan: <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Basic</span>
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Choose a plan that best suits your school's needs. You can upgrade or downgrade at any time.
                        </p>
                    </div>

                    {/* Plans Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {plans.map((plan) => (
                            <PlanCard
                                key={plan.id}
                                plan={plan}
                                onSwitchPlan={handleSwitchPlan}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Feature Availability Section */}
            <div className="col-span-12">
                <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Feature Availability
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Below is a list of available features. Some features may require an upgrade or an add-on to your current subscription.
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4">
                        {features.map((feature, index) => (
                            <FeatureRow key={index} feature={feature} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Subscription;
