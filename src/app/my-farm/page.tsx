
'use client';

import React from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  HouseIcon,
  MapTrifoldIcon,
  CameraIcon,
  PresentationChartIcon,
  UserIcon,
} from '@/components/icons';
import FarmField3D from '@/components/farm-field-3d';

export default function MyFarmPage() {
  return (
    <div className="relative mx-auto flex size-full min-h-screen max-w-sm flex-col bg-background font-body text-foreground">
      <header className="absolute top-0 z-10 flex w-full items-center justify-between p-4 bg-transparent">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeftIcon className="h-6 w-6 text-white" />
          </Link>
        </Button>
        <h1 className="flex-1 text-center text-lg font-bold tracking-tight text-white">
          My Farm
        </h1>
        <div className="w-12" />
      </header>
      <main className="absolute inset-0 h-full w-full">
        <FarmField3D />
      </main>
    </div>
  );
}
