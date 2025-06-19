import { useEffect, useState } from "react";
import type { Bin } from "@/types";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Package } from "lucide-react";
import ItemList from "../components/ItemList";
import { useUserContext } from "@/context/UserContext";
import { useGetBins } from "@/queries/useGetBins";
import EmptyState from "@/components/EmptyState";
import { QRCodeCanvas } from "qrcode.react";

const BinDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { auth } = useUserContext();
  const [bin, setBin] = useState<Bin>();
  const { data } = useGetBins({ enabled: auth });

  useEffect(() => {
    if (data && id) {
      setBin(data.find((b) => b.id === Number(id)));
    }
  }, [data, id]);

  if (!bin) {
    return (
      <div className="container py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate("/")} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Bin Not Found</h1>
        </div>
        <EmptyState
          title="Bin not found"
          description="The bin you're looking for doesn't exist or may have been deleted."
          actionLabel="Go Back Home"
          onAction={() => navigate("/")}
          icon={<Package className="h-12 w-12 text-muted-foreground" />}
        />
      </div>
    );
  }

  return (
    <>
      <div className="container py-8 print:hidden">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate("/")} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-6 w-6 text-inventory-blue" />
              <h1 className="text-2xl font-bold">{bin.name}</h1>
            </div>
            {bin.description && (
              <p className="text-muted-foreground">{bin.description}</p>
            )}
          </div>
        </div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Bin Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Items
                </p>
                <p className="text-2xl font-bold">{bin.items.length}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Status
                </p>
                <p className="text-sm">
                  {bin.items.length === 0 ? "Empty" : "Contains Items"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div>
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4">Items in this bin</h2>
            <Button onClick={() => window.print()}>Print</Button>
          </div>
          <ItemList items={bin.items} />
        </div>
      </div>
      <div className="hidden print:flex print:flex-col print:items-center print:p-8">
        <h1 className="text-5xl font-bold mb-4">{bin.name}</h1>
        <QRCodeCanvas
          value={`${window.location.origin}/bin/${bin.id}`}
          size={400}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
        />
      </div>
    </>
  );
};

export default BinDetailsPage;
