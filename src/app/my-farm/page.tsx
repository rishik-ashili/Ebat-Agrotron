
'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
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

function Terrain() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100, 64, 64]} />
      <meshStandardMaterial color="hsl(var(--primary))" wireframe />
    </mesh>
  );
}

export default function MyFarmPage() {
  return (
    <div className="relative mx-auto flex size-full min-h-screen max-w-sm flex-col bg-background font-body text-foreground">
      <header className="absolute top-0 z-10 flex w-full items-center justify-between p-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="flex-1 text-center text-lg font-bold tracking-tight text-foreground">
          My Farm
        </h1>
        <div className="w-12" />
      </header>
      <main className="flex-1">
        <Canvas camera={{ position: [0, 20, 40], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 20, 10]} intensity={1} />
          <Suspense fallback={null}>
            <Terrain />
            <Text
              position={[0, 0.5, 0]}
              color="white"
              fontSize={2}
              anchorX="center"
              anchorY="middle"
            >
              3D Farm View
            </Text>
          </Suspense>
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Canvas>
      </main>
      <footer className="sticky bottom-0 bg-background">
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
            className="flex flex-1 flex-col items-center justify-end gap-1 text-primary"
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
            href="#"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground"
          >
            <div className="flex h-8 items-center justify-center">
              <PresentationChartIcon className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium">Reports</p>
          </Link>
          <Link
            href="#"
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
