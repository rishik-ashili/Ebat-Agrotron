
'use client';

import {
  ArrowLeft,
  ArrowRight,
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

export default function AnalyticsPage() {
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
            <Button variant="secondary" className="rounded-xl pl-4 pr-2">
              All Fields <ChevronDown className="h-5 w-5" />
            </Button>
            <Button variant="secondary" className="rounded-xl pl-4 pr-2">
              All Crops <ChevronDown className="h-5 w-5" />
            </Button>
            <Button variant="secondary" className="rounded-xl pl-4 pr-2">
              This Season <ChevronDown className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4">
            <div className="flex items-stretch justify-between gap-4 rounded-xl">
              <div className="flex flex-[2_2_0px] flex-col justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-base font-bold leading-tight text-foreground">
                    Current Conditions
                  </p>
                  <p className="text-sm font-normal leading-normal text-muted-foreground">
                    Live status of your farm
                  </p>
                </div>
                <Button
                  variant="secondary"
                  className="h-8 w-fit justify-center rounded-xl px-2 pr-2 text-sm"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-[18px] w-[18px]" />
                </Button>
              </div>
              <div className="relative flex-1">
                <Image
                  src="https://placehold.co/400x300.png"
                  alt="Current farm conditions"
                  data-ai-hint="farm aerial"
                  width={400}
                  height={300}
                  className="aspect-video w-full rounded-xl bg-cover bg-center object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
            <div className="flex flex-1 items-center gap-3 rounded-lg border bg-card p-4">
              <Thermometer className="h-6 w-6 text-foreground" />
              <h2 className="text-base font-bold leading-tight text-foreground">
                Soil Temp
              </h2>
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-lg border bg-card p-4">
              <Droplets className="h-6 w-6 text-foreground" />
              <h2 className="text-base font-bold leading-tight text-foreground">
                Soil Moisture
              </h2>
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-lg border bg-card p-4">
              <Sprout className="h-6 w-6 text-foreground" />
              <h2 className="text-base font-bold leading-tight text-foreground">
                Growth Stage
              </h2>
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-lg border bg-card p-4">
              <Sun className="h-6 w-6 text-foreground" />
              <h2 className="text-base font-bold leading-tight text-foreground">
                Sunlight
              </h2>
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-lg border bg-card p-4">
              <Trees className="h-6 w-6 text-foreground" />
              <h2 className="text-base font-bold leading-tight text-foreground">
                Canopy Cover
              </h2>
            </div>
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
