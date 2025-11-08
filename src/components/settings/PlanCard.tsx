type Plan = {
    id: 'basic' | 'standard' | 'premium';
    name: string;
    price: string;
    description: string;
    isCurrent: boolean;
};

type PlanCardProps = {
    plan: Plan;
    onSwitchPlan: (planId: Plan['id']) => void;
};

const PlanCard = ({ plan, onSwitchPlan }: PlanCardProps) => {
    return (
        <div
            className={`relative rounded-lg border-2 p-6 flex flex-col ${
                plan.isCurrent
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-700'
            }`}
        >
            <div className="flex-grow mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {plan.name}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.price}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {plan.description}
                </p>
            </div>

            {plan.isCurrent ? (
                <button
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed dark:bg-dark-600 dark:border-dark-500"
                >
                    CURRENT PLAN
                </button>
            ) : (
                <button
                    onClick={() => onSwitchPlan(plan.id)}
                    className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    SWITCH TO {plan.name.toUpperCase()}
                </button>
            )}
        </div>
    );
};

export default PlanCard;
export type { Plan, PlanCardProps };
