import { ModelCard, type MarketplaceModelCard } from "@/components/marketplace/model-card";

type Props = {
  models: MarketplaceModelCard[];
};

export function ModelGrid({ models }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {models.map((model) => (
        <ModelCard key={model.id} model={model} />
      ))}
    </div>
  );
}
