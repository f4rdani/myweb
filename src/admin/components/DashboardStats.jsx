import React, { useState, useEffect, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Users, Clock } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { adminService } from '../../Api/admin';

const DashboardStats = () => {
  const [statsData, setStatsData] = useState({
    visitors: [],
    timeRange: '30d' // default 30 hari
  });
  const [isLoading, setIsLoading] = useState(true);
  const { darkMode } = useContext(ThemeContext);

  const fetchStats = async (timeRange) => {
    setIsLoading(true);
    try {
      // Panggil fungsi getVisitorStats dari adminService
      const response = await adminService.getVisitorStats(timeRange);
      // Asumsikan API mengembalikan data dalam format: { success: true, data: [...] }
      setStatsData(prev => ({
        ...prev,
        visitors: response.data,
        timeRange
      }));
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(statsData.timeRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tentukan key XAxis: gunakan 'hour' untuk 24h, dan 'date' untuk 7d/30d
  const xAxisKey = statsData.timeRange === '24h' ? 'hour' : 'date';

  // StatCard untuk menampilkan statistik dalam card
  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
          <h3 className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );

  // Hitung total pengunjung, pengunjung hari ini, dan peak hours dari data visitor
  const totalVisitors = statsData.visitors.reduce((acc, curr) => acc + curr.count, 0);
  const todayVisitors =
    statsData.visitors.length > 0 ? statsData.visitors[statsData.visitors.length - 1].count : 0;
  const peakHourObj = statsData.visitors.reduce((max, curr) => (curr.count > max.count ? curr : max), { count: 0 });
  const peakHour = peakHourObj.hour !== undefined ? `${peakHourObj.hour}:00` : '00:00';

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex gap-4 mb-6">
        {['24h', '7d', '30d'].map((range) => (
          <button
            key={range}
            onClick={() => fetchStats(range)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              statsData.timeRange === range
                ? 'bg-blue-500 text-white'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {range === '24h' ? 'Hari Ini' : range === '7d' ? '7 Hari' : '30 Hari'}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Pengunjung" value={totalVisitors} icon={Users} color="bg-blue-500" />
        <StatCard title="Pengunjung Hari Ini" value={todayVisitors} icon={Calendar} color="bg-purple-500" />
        <StatCard title="Peak Hours" value={peakHour} icon={Clock} color="bg-orange-500" />
      </div>

      {/* Visitors Chart */}
      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Grafik Pengunjung
        </h3>
        <div className="h-80">
          {isLoading ? (
            <p className={darkMode ? 'text-white' : 'text-gray-900'}>Loading...</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={statsData.visitors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xAxisKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#3B82F6" name="Pengunjung" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
