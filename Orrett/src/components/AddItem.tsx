import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import type { Bin } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateItem } from "@/queries/useMutItem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useGetBins } from "@/queries/useGetBins";
import { useUserContext } from "@/context/UserContext";

interface AddItemModalProps {
  bin?: Bin;
}

const AddItem: React.FC<AddItemModalProps> = ({ bin }) => {
  const [name, setName] = useState("");

  const { auth } = useUserContext();

  const { data: bins = [], isLoading } = useGetBins({
    enabled: auth,
  });

  const [open, setOpen] = useState(false);
  const [binSelect, setBinSelect] = useState(bin?.name || "");
  const [binId, setBinId] = useState<number | undefined>(bin?.id);

  const createItemMutation = useCreateItem();

  const handleItemSubmit = () => {
    if (!binId) {
      // You can either warn the user or handle the error gracefully
      console.error("No bin selected");
      return;
    }
    createItemMutation.mutate({ itemName: name, binId: binId });
    setOpen(false);
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white">Add Item</Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Item Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="binIdentifier" className="text-right">
            Bin Name
          </Label>
          <div className="col-span-3 px-3 py-2 rounded border text-sm">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button className="btn">{binSelect || "Select Bin"}</button>
                  <ChevronDown />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {bins.map((bin: Bin) => (
                  <DropdownMenuItem
                    key={bin.id}
                    onClick={() => {
                      setBinSelect(bin.name ?? "");
                      setBinId(bin.id!);
                    }}
                  >
                    {bin.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={() => handleItemSubmit()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddItem;
