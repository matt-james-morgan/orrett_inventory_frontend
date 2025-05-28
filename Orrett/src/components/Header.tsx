import { useGetTotalItems } from "../queries/useGetTotalItems";
import type { Bin } from "../types";
import AddBin from "./AddBin";
import AddItem from "./AddItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BinListProps {
  bins: Bin[];
}

const Header = ({ bins }: BinListProps) => {
  const { data: totalItems } = useGetTotalItems();

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
          <AddBin />
          <AddItem />
        </CardContent>
      </Card>
    </div>
  );
};

export default Header;
