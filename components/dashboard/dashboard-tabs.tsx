"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MyGenerations } from "@/components/dashboard/my-generations";
import { MyMarketplace } from "@/components/dashboard/my-marketplace";
import { MyPurchases } from "@/components/dashboard/my-purchases";
import { Settings } from "@/components/dashboard/settings";

export function DashboardTabs() {
  return (
    <Tabs defaultValue="generations" className="mt-6">
      <TabsList className="h-auto flex-wrap rounded-xl bg-zinc-100/80 p-1 dark:bg-zinc-900/60">
        <TabsTrigger value="generations">Мои генерации</TabsTrigger>
        <TabsTrigger value="marketplace">Мой маркетплейс</TabsTrigger>
        <TabsTrigger value="purchases">Мои покупки</TabsTrigger>
        <TabsTrigger value="settings">Настройки</TabsTrigger>
      </TabsList>

      <TabsContent value="generations">
        <MyGenerations />
      </TabsContent>

      <TabsContent value="marketplace">
        <MyMarketplace />
      </TabsContent>

      <TabsContent value="purchases">
        <MyPurchases />
      </TabsContent>

      <TabsContent value="settings">
        <Settings />
      </TabsContent>
    </Tabs>
  );
}

