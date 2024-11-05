import { KeyIcon, CheckCircleIcon, ChartBarIcon } from '@heroicons/react/24/solid';

export default function StatsCards({ apiKeys }) {
  const stats = [
    {
      name: 'Total API Keys',
      value: apiKeys.length,
      icon: KeyIcon,
    },
    {
      name: 'Active Keys',
      value: apiKeys.filter(key => !key.disabled).length,
      icon: CheckCircleIcon,
    },
    {
      name: 'Total Usage',
      value: apiKeys.reduce((acc, key) => acc + (key.usage || 0), 0),
      icon: ChartBarIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 