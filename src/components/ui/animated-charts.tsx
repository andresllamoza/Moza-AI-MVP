import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { cn } from '@/lib/utils';

// Competitor Comparison Chart with Animated Bars
interface CompetitorComparisonChartProps {
  data: Array<{
    name: string;
    score: number;
    color?: string;
  }>;
  className?: string;
}

export const CompetitorComparisonChart: React.FC<CompetitorComparisonChartProps> = ({
  data,
  className
}) => {
  const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('glass-card rounded-xl p-6', className)}
    >
      <h3 className="text-lg font-semibold mb-4">Competitor Analysis</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <div className="w-24 text-sm font-medium text-muted-foreground">
              {item.name}
            </div>
            <div className="flex-1 relative">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color || colors[index % colors.length] }}
                />
              </div>
            </div>
            <div className="w-12 text-sm font-semibold text-right">
              {item.score}%
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Review Sentiment Donut Chart with Gradient Fills
interface SentimentDonutChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  className?: string;
  size?: number;
}

export const SentimentDonutChart: React.FC<SentimentDonutChartProps> = ({
  data,
  className,
  size = 200
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cn('glass-card rounded-xl p-6', className)}
    >
      <h3 className="text-lg font-semibold mb-4 text-center">Review Sentiment</h3>
      <div className="flex items-center justify-center">
        <ResponsiveContainer width={size} height={size}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={size * 0.3}
              outerRadius={size * 0.4}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [`${value}`, 'Reviews']} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center space-x-2"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-muted-foreground">
              {item.name} ({((item.value / total) * 100).toFixed(1)}%)
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Time-series Revenue Impact Graph
interface RevenueImpactChartProps {
  data: Array<{
    date: string;
    revenue: number;
    impact: number;
  }>;
  className?: string;
}

export const RevenueImpactChart: React.FC<RevenueImpactChartProps> = ({
  data,
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('glass-card rounded-xl p-6', className)}
    >
      <h3 className="text-lg font-semibold mb-4">Revenue Impact</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-lg)'
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#4F46E5"
            strokeWidth={3}
            dot={{ fill: '#4F46E5', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#4F46E5', strokeWidth: 2 }}
            name="Revenue"
          />
          <Line
            type="monotone"
            dataKey="impact"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            name="Impact"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

// Alert Indicator with Pulse Animation
interface AlertIndicatorProps {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  count?: number;
  className?: string;
  onClick?: () => void;
}

export const AlertIndicator: React.FC<AlertIndicatorProps> = ({
  type,
  message,
  count,
  className,
  onClick
}) => {
  const typeConfig = {
    success: {
      color: '#10B981',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      textColor: 'text-success'
    },
    warning: {
      color: '#F59E0B',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      textColor: 'text-warning'
    },
    error: {
      color: '#EF4444',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20',
      textColor: 'text-error'
    },
    info: {
      color: '#4F46E5',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      textColor: 'text-primary'
    }
  };

  const config = typeConfig[type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'glass-card rounded-lg p-4 cursor-pointer relative overflow-hidden',
        config.bgColor,
        config.borderColor,
        'border',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <motion.div
          className={cn('w-3 h-3 rounded-full', config.textColor)}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ backgroundColor: config.color }}
        />
        
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{message}</p>
        </div>
        
        {count !== undefined && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={cn(
              'px-2 py-1 rounded-full text-xs font-semibold',
              config.bgColor,
              config.textColor
            )}
          >
            {count}
          </motion.div>
        )}
      </div>
      
      {/* Pulse Effect */}
      <motion.div
        className={cn('absolute inset-0 rounded-lg opacity-0', config.bgColor)}
        animate={{
          opacity: [0, 0.3, 0],
          scale: [1, 1.1, 1.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

// Metric Trend Chart
interface MetricTrendChartProps {
  data: Array<{
    period: string;
    value: number;
    target?: number;
  }>;
  title: string;
  className?: string;
}

export const MetricTrendChart: React.FC<MetricTrendChartProps> = ({
  data,
  title,
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('glass-card rounded-xl p-6', className)}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
          <XAxis 
            dataKey="period" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-lg)'
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#4F46E5"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
          {data[0]?.target && (
            <Line
              type="monotone"
              dataKey="target"
              stroke="#10B981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
