import { PageHeader } from "@/app/admin/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FilesPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Files"
        description="Manage your media files and uploads"
      />

      <Card>
        <CardHeader>
          <CardTitle>File Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            File management functionality will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
