import { useState } from "react";
import { Modal, FormField, Button } from "@/components/ui";

export default function CreatePathModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [plannedModules, setPlannedModules] = useState(4);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, category, plannedModules });
  }

  return (
    <Modal title="Create a learning path" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          label="Path title"
          placeholder="e.g. Backend Engineering with Node.js"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FormField
          as="select"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Web Development</option>
          <option>Data Science</option>
          <option>DevOps</option>
          <option>Mobile Development</option>
          <option>Career &amp; Soft Skills</option>
        </FormField>

        <FormField
          type="number"
          label="Planned modules"
          min="1"
          max="20"
          value={plannedModules}
          onChange={(e) => setPlannedModules(Number(e.target.value))}
        />

        <div className="flex gap-3 pt-1">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            Create path
          </Button>
        </div>
      </form>
    </Modal>
  );
}