import { CheckIcon, StarIcon } from '@heroicons/react/24/outline';

type Feature = {
    name: string;
    description: string;
    availability: 'included' | 'standard' | 'premium';
};

type FeatureRowProps = {
    feature: Feature;
};

const FeatureRow = ({ feature }: FeatureRowProps) => {
    return (
        <div className="flex items-start justify-between p-4 border border-gray-200 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
            <div className="flex items-start space-x-3">
                {feature.availability === 'included' ? (
                    <CheckIcon className="w-5 h-5 text-green-500" />
                ) : (
                    <StarIcon className="w-5 h-5 text-purple-500" />
                )}
                <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">
                        {feature.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {feature.description}
                    </p>
                </div>
            </div>
            <div className="flex-shrink-0 ml-4">
                {feature.availability === 'included' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Included
                    </span>
                ) : feature.availability === 'standard' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Available in Standard
                    </span>
                ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        <StarIcon className="w-4 h-4" />
                        <span className="ml-1">Premium (Premium)</span>
                    </span>
                )}
            </div>
        </div>
    );
};

export default FeatureRow;
export type { Feature, FeatureRowProps };
