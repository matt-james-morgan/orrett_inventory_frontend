import { useGetTotalItems } from "../queries/useGetTotalItems";
import { useMutBin } from "../queries/useMutBins";
import { useMutItem } from "@/queries/useMutItem";
import type { Bin } from "../types";
import AddModal from "./AddModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BinListProps {
  bins: Bin[];
}

const Header = ({ bins }: BinListProps) => {
  const { data: totalItems } = useGetTotalItems();
  const { mutate: binMutate } = useMutBin();
  const { mutate: itemMutate } = useMutItem();

  const handleBinSubmit = (name: string, description: string) => {
    binMutate({ binName: name, description });
  };

  const handleItemSubmit = (
    name: string,
    description: string,
    binId?: string
  ) => {
    itemMutate({ itemName: name, description, binId: binId || "" });
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
          <div className="text-2xl font-bold">{totalItems?.totalItems}</div>
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
