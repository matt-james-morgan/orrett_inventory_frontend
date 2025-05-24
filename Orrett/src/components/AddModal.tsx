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

interface AddBinModalProps {
  handleSubmit: (name: string, description: string, bin_id?: string) => void;
  title: string;
  labelName: string;
  buttonTitle: string;
  binName?: boolean;
}

const AddModal: React.FC<AddBinModalProps> = ({
  buttonTitle = "Button Title",
  title = "Title",
  labelName = "Name",
  binName,
  handleSubmit,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [binIdentifier, setBinIdentifier] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmitClick = () => {
    handleSubmit(name, description, binIdentifier || undefined);
    setName("");
    setDescription("");
    setBinIdentifier("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white">{buttonTitle}</Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              {labelName}
            </Label>
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
        {binName && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="binIdentifier" className="text-right">
              Bin Name
            </Label>
            <Input
              onChange={(e) => {
                setBinIdentifier(e.target.value);
              }}
              id="binIdentifier"
              value={binIdentifier}
              className="col-span-3"
            />
          </div>
        )}
        <DialogFooter>
          <Button type="submit" onClick={handleSubmitClick}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
