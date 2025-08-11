import { PageHeader } from "@/app/admin/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ArtworksPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader 
        title="Artworks" 
        description="Manage your artwork collection"
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Artwork Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Artwork management functionality will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}