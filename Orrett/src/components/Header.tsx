import { useGetTotalInventory } from "../queries/useGetTotalInventory";
import { useMutBin } from "../queries/useMutBins";
import { useMutItem } from "@/queries/useMutItem";
import type { Bin } from "../types";
import AddModal from "./AddModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BinListProps {
  bins: Bin[];
}

const Header = ({ bins }: BinListProps) => {
  const { data: totalInventory } = useGetTotalInventory();
  const { mutate: binMutate } = useMutBin();
  const { mutate: itemMutate } = useMutItem();

  const handleBinSubmit = (name: string, description: string) => {
    binMutate({ bin_name: name, description });
  };

  const handleItemSubmit = (
    name: string,
    description: string,
    bin_id?: string
  ) => {
    itemMutate({ item_name: name, description, bin_id: bin_id || "" });
  };

  return (
    <div className="flex gap-4 items-stretch">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Total Bins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{bins ? bins.length : 0}</div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Total Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalInventory?.total_inventory
              ? totalInventory.total_inventory
              : 0}
          </div>
        </CardContent>
      </Card>
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <AddModal
            title="Add New Bin"
            buttonTitle="Add Bin"
            labelName="Bin Name"
            handleSubmit={handleBinSubmit}
          />
          <AddModal
            title="Add New Item"
            buttonTitle="Add Item"
            labelName="Item Name"
            handleSubmit={handleItemSubmit}
            binName={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Header;
