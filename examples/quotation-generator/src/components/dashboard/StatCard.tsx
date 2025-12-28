/**
 * Statistics card component for dashboard
 */

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    label: string;
  };
  color?: 'primary' | 'success' | 'warning' | 'info';
}

const colorStyles = {
  primary: 'bg-[#8b4513]',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
};

export function StatCard({ title, value, icon, trend, color = 'primary' }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.value >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${colorStyles[color]} flex items-center justify-center text-white text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
