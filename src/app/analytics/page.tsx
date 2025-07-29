
'use client';

import {
  ArrowLeft,
  ChevronDown,
  Droplets,
  Sprout,
  Sun,
  Thermometer,
  Trees,
} from 'lucide-react';
import Link from 'next/link';
import {
  CameraIcon,
  HouseIcon,
  MapTrifoldIcon,
  PresentationChartIcon,
  UserIcon,
} from '@/components/icons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type AnalyticsData = {
  id: number;
  field_name: string;
  crop_type: string;
  season: string;
  soil_temp: number;
  soil_moisture: number;
  growth_stage: string;
  sunlight: number;
  canopy_cover: number;
  recorded_at: string;
};

type Metric = 'soil_temp' | 'soil_moisture' | 'sunlight' | 'canopy_cover';

const metricDetails: Record<
  Metric,
  { label: string; icon: React.ElementType; unit: string }
> = {
  soil_temp: { label: 'Soil Temp', icon: Thermometer, unit: '°C' },
  soil_moisture: { label: 'Soil Moisture', icon: Droplets, unit: '%' },
  sunlight: { label: 'Sunlight', icon: Sun, unit: 'hr' },
  canopy_cover: { label: 'Canopy Cover', icon: Trees, unit: '%' },
};

const defaultAnalyticsData: Omit<AnalyticsData, 'id'>[] = [
    { field_name: 'Field A', crop_type: 'Corn', season: '2024 Spring', soil_temp: 22.5, soil_moisture: 60, growth_stage: 'Vegetative', sunlight: 8.2, canopy_cover: 30, recorded_at: '2024-05-01' },
    { field_name: 'Field A', crop_type: 'Corn', season: '2024 Spring', soil_temp: 23.1, soil_moisture: 62, growth_stage: 'Vegetative', sunlight: 8.5, canopy_cover: 35, recorded_at: '2024-05-02' },
    { field_name: 'Field A', crop_type: 'Corn', season: '2024 Spring', soil_temp: 21.8, soil_moisture: 58, growth_stage: 'Tasseling', sunlight: 7.9, canopy_cover: 40, recorded_at: '2024-05-03' },
    { field_name: 'Field A', crop_type: 'Corn', season: '2024 Spring', soil_temp: 22.2, soil_moisture: 61, growth_stage: 'Tasseling', sunlight: 8.1, canopy_cover: 42, recorded_at: '2024-05-04' },
    { field_name: 'Field A', crop_type: 'Corn', season: '2024 Spring', soil_temp: 23.5, soil_moisture: 63, growth_stage: 'Silking', sunlight: 8.8, canopy_cover: 48, recorded_at: '2024-05-05' },
    { field_name: 'Field B', crop_type: 'Soybean', season: '2024 Spring', soil_temp: 24.0, soil_moisture: 65, growth_stage: 'Flowering', sunlight: 9.0, canopy_cover: 50, recorded_at: '2024-05-01' },
    { field_name: 'Field B', crop_type: 'Soybean', season: '2024 Spring', soil_temp: 24.5, soil_moisture: 68, growth_stage: 'Flowering', sunlight: 9.2, canopy_cover: 55, recorded_at: '2024-05-02' },
    { field_name: 'Field B', crop_type: 'Soybean', season: '2024 Spring', soil_temp: 23.5, soil_moisture: 63, growth_stage: 'Pod-setting', sunlight: 8.8, canopy_cover: 60, recorded_at: '2024-05-03' },
    { field_name: 'Field B', crop_type: 'Soybean', season: '2024 Spring', soil_temp: 24.8, soil_moisture: 66, growth_stage: 'Pod-setting', sunlight: 9.1, canopy_cover: 62, recorded_at: '2024-05-04' },
    { field_name: 'Field B', crop_type: 'Soybean', season: '2024 Spring', soil_temp: 25.0, soil_moisture: 70, growth_stage: 'Maturing', sunlight: 9.5, canopy_cover: 68, recorded_at: '2024-05-05' },
];


export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState('2024 Spring');
  const [activeMetric, setActiveMetric] = useState<Metric>('soil_temp');

  const { toast } = useToast();

  const fetchAnalyticsData = useCallback(async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast({ variant: 'destructive', title: 'Not authenticated' });
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error fetching analytics',
        description: error.message,
      });
      setAnalyticsData([]);
    } else if (data.length === 0) {
      // No real data, use placeholder data
      toast({
        title: 'Displaying Sample Data',
        description: 'No personal analytics found.',
      });
      const placeholderData = defaultAnalyticsData.map((d, i) => ({ ...d, id: -(i + 1) }));
      setAnalyticsData(placeholderData);
    } else {
      setAnalyticsData(data);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  const filteredData = useMemo(() => {
     return analyticsData.filter(d => 
        (selectedField === 'All' || d.field_name === selectedField) &&
        (selectedCrop === 'All' || d.crop_type === selectedCrop) &&
        (selectedSeason === 'All' || d.season === selectedSeason)
      );
  }, [analyticsData, selectedField, selectedCrop, selectedSeason]);


  const { fields, crops, seasons, latestData } = useMemo(() => {
    const fields = ['All', ...new Set(analyticsData.map((d) => d.field_name))];
    const crops = ['All', ...new Set(analyticsData.map((d) => d.crop_type))];
    const seasons = ['All', ...new Set(analyticsData.map((d) => d.season))];
    const latestData = filteredData[filteredData.length - 1] ?? null;
    return { fields, crops, seasons, latestData };
  }, [analyticsData, filteredData]);

  const chartData = useMemo(() => {
    return filteredData.map((d) => ({
      date: format(new Date(d.recorded_at), 'MMM d'),
      value: d[activeMetric],
    }));
  }, [filteredData, activeMetric]);

  const MetricCard = ({ metric }: { metric: Metric }) => {
    const { label, icon: Icon, unit } = metricDetails[metric];
    const value = latestData ? latestData[metric] : null;
    const isActive = activeMetric === metric;

    return (
      <button
        onClick={() => setActiveMetric(metric)}
        className={cn(
          'flex flex-1 items-center gap-3 rounded-lg border bg-card p-4 transition-all',
          isActive && 'ring-2 ring-primary bg-secondary'
        )}
      >
        <Icon className="h-6 w-6 text-foreground" />
        <div className="text-left">
          <h2 className="text-base font-bold leading-tight text-foreground">
            {label}
          </h2>
          {loading ? (
            <Skeleton className="h-5 w-12 mt-1" />
          ) : (
            <p className="text-sm font-normal text-muted-foreground">
              {value !== null ? `${value} ${unit}` : 'N/A'}
            </p>
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="relative mx-auto flex size-full min-h-screen max-w-sm flex-col justify-between bg-background font-body text-foreground">
      <div>
        <header className="flex items-center justify-between p-4 pb-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-6 w-6" />
            </Link>
          </Button>
          <h1 className="flex-1 text-center text-lg font-bold tracking-tight">
            Analytics
          </h1>
          <div className="w-12" />
        </header>

        <main className="flex-1">
          <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold tracking-tight text-foreground">
            Farm Analytics
          </h2>
          <div className="flex gap-3 overflow-x-auto px-4 pb-3">
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger className="rounded-xl pl-4 pr-2 w-auto gap-1">
                <SelectValue placeholder="Select Field" />
              </SelectTrigger>
              <SelectContent>
                {fields.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="rounded-xl pl-4 pr-2 w-auto gap-1">
                <SelectValue placeholder="Select Crop" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
              <SelectTrigger className="rounded-xl pl-4 pr-2 w-auto gap-1">
                <SelectValue placeholder="Select Season" />
              </SelectTrigger>
              <SelectContent>
                {seasons.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4">
            <MetricCard metric="soil_temp" />
            <MetricCard metric="soil_moisture" />
            <div className="flex flex-1 items-center gap-3 rounded-lg border bg-card p-4">
              <Sprout className="h-6 w-6 text-foreground" />
              <div className="text-left">
                <h2 className="text-base font-bold leading-tight text-foreground">
                  Growth Stage
                </h2>
                {loading ? (
                  <Skeleton className="h-5 w-20 mt-1" />
                ) : (
                   <p className="text-sm font-normal text-muted-foreground">
                    {latestData?.growth_stage || 'N/A'}
                  </p>
                )}
              </div>
            </div>
            <MetricCard metric="sunlight" />
            <MetricCard metric="canopy_cover" />
          </div>

          <div className="h-64 w-full px-4 pt-4">
            {loading ? (
              <Skeleton className="h-full w-full" />
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}${metricDetails[activeMetric].unit}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name={metricDetails[activeMetric].label}
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
               <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <p>No data for selected filters.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <footer className="sticky bottom-0 mt-8 bg-background">
        <div className="flex gap-2 border-t border-border px-4 pb-3 pt-2">
          <Link
            href="/dashboard"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground"
          >
            <div className="flex h-8 items-center justify-center">
              <HouseIcon className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium">Dashboard</p>
          </Link>
          <Link
            href="/my-farm"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground"
          >
            <div className="flex h-8 items-center justify-center">
              <MapTrifoldIcon className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium">My Farm</p>
          </Link>
          <Link
            href="#"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground"
          >
            <div className="flex h-8 items-center justify-center">
              <CameraIcon className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium">Scan</p>
          </Link>
          <Link
            href="/analytics"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-primary"
          >
            <div className="flex h-8 items-center justify-center">
              <PresentationChartIcon className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium">Analytics</p>
          </Link>
          <Link
            href="/profile"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground"
          >
            <div className="flex h-8 items-center justify-center">
              <UserIcon className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium">Profile</p>
          </Link>
        </div>
        <div className="h-5 bg-background"></div>
      </footer>
    </div>
  );
}
