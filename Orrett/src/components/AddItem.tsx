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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutItem } from "@/queries/useMutItem";

interface AddItemModalProps {
  binName: string;
}

const AddItem: React.FC<AddItemModalProps> = ({ binName }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [open, setOpen] = useState(false);

  const { mutate: itemMutate } = useMutItem();

  const handleItemSubmit = (name: string, binId?: string) => {
    itemMutate({ itemName: name, binId: binId || "" });
  };

  const handleSubmitClick = () => {
    handleItemSubmit(name, binName);
    setName("");
    setDescription("");
    setOpen(false);
  };

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
            <Label htmlFor="name" className="text-right"></Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="binName" className="text-right">
              Description
            </Label>
            <Input
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              id="binName"
              value={description}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="binIdentifier" className="text-right">
            Bin Name
          </Label>
          <div className="col-span-3 px-3 py-2 bg-gray-100 rounded border text-sm">
            {binName || <span className="text-gray-400">No bin name</span>}
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleSubmitClick}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddItem;
