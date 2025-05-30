import type { Item } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteItem } from "@/queries/useMutItem";
interface ItemListProps {
  items: Item[];
}

const ItemList = ({ items }: ItemListProps) => {
  const deleteItem = useDeleteItem();
  const handleDelete = (itemId: number) => {
    deleteItem.mutate({ itemId: itemId });
  };

  if (items.length === 0) {
    return (
      <div className="p-4 text-center">
        <div className="text-4xl mb-2">📦</div>
        <h2 className="text-lg font-semibold">No items</h2>
        <p className="text-muted-foreground mb-4">This bin is empty.</p>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item: Item) => (
              <TableRow key={item.id} className="transition hover:bg-muted/50">
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive/90"
                  >
                    🗑️
                    <span className="sr-only">Delete item</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ItemList;
