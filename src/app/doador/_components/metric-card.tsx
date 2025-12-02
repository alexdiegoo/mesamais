import { Card, CardContent } from "@/components/ui/card";

export function MetricCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="py-6">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
