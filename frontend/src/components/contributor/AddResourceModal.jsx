import { useState } from "react";
import { Modal, FormField, Button } from "@/components/ui";

export default function AddResourceModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Article");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); 
    if (!title.trim()) return; 
    onSubmit({ title, type, url, description });
  }

  return (
    <Modal title="Share a new resource" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          label="Title"
          placeholder="e.g. Mastering Closures in JavaScript"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FormField
          as="select"
          label="Resource type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Video">Video</option>
          <option value="Article">Article</option>
          <option value="Learning Path">Learning Path</option>
        </FormField>

        <FormField
          label="Link"
          placeholder="https://"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <FormField
          as="textarea"
          label="Short description"
          placeholder="What will learners get out of this?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex gap-3 pt-1">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            Submit for review
          </Button>
        </div>
      </form>
    </Modal>
  );
}