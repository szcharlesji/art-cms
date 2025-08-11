import { PageHeader } from "@/app/admin/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader 
        title="Blog" 
        description="Manage your blog posts"
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Blog Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Blog management functionality will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}