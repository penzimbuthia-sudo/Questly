import { useState } from "react";
import Modal from "../../components/ui/Modal";
import FormField from "../../components/ui/FormField";
import Button from "../../components/ui/Button";

const SUGGESTED_RESOURCES = [
  { title: "JavaScript Crash Course", type: "Video", url: "https://www.youtube.com/watch?v=hdI2bqOjy3c", description: "A beginner-friendly crash course covering core JavaScript syntax and concepts." },
  { title: "Python for Beginners - Full Course", type: "Video", url: "https://www.youtube.com/watch?v=rfscVS0vtbw", description: "A complete beginner course covering Python fundamentals and practical examples." },
  { title: "Learn React In 30 Minutes", type: "Video", url: "https://www.youtube.com/watch?v=hQAHSlTtcmY", description: "A concise introduction to React components, props, state, and rendering." },
  { title: "Git and GitHub for Beginners", type: "Video", url: "https://www.youtube.com/watch?v=RGOj5yH7evk", description: "Learn the essential Git workflow and how to collaborate with GitHub." },
  { title: "SQL Tutorial - Full Database Course", type: "Video", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY", description: "A practical introduction to SQL, relational databases, and queries." },
  { title: "Flask Tutorial for Beginners", type: "Video", url: "https://www.youtube.com/watch?v=Z1RJmh_OqeA", description: "Build a Flask web application while learning the framework fundamentals." },
  { title: "JavaScript Guide (MDN)", type: "Article", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", description: "The official MDN guide to JavaScript language features and patterns." },
  { title: "Python Official Tutorial", type: "Article", url: "https://docs.python.org/3/tutorial/", description: "The official Python tutorial for learning the language from the ground up." },
  { title: "Understanding React Hooks", type: "Article", url: "https://react.dev/reference/react", description: "Official React reference documentation for hooks and core APIs." },
  { title: "Flask Quickstart", type: "Article", url: "https://flask.palletsprojects.com/en/latest/quickstart/", description: "Official Flask quickstart covering routes, templates, and request handling." },
  { title: "SQLAlchemy ORM Tutorial", type: "Article", url: "https://docs.sqlalchemy.org/en/20/orm/quickstart.html", description: "Official SQLAlchemy ORM quickstart for models, sessions, and queries." },
  { title: "REST API Design Best Practices", type: "Article", url: "https://restfulapi.net/", description: "Practical guidance for designing consistent and maintainable REST APIs." },
];

export default function AddResourceModal({ onClose, onSubmit, error }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Article");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");

  function handleSuggestionChange(e) {
    const suggestion = SUGGESTED_RESOURCES.find((resource) => resource.title === e.target.value);
    if (!suggestion) return;
    setTitle(suggestion.title);
    setType(suggestion.type);
    setUrl(suggestion.url);
    setDescription(suggestion.description);
    setValidationError("");
  }

  async function handleSubmit(e) {
    e.preventDefault(); 
    if (!title.trim() || !url.trim() || !description.trim()) {
      setValidationError("Add a title, link, and short description before submitting.");
      return;
    }

    try {
      const parsedUrl = new URL(url.trim());
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error();
    } catch {
      setValidationError("Enter a complete web link starting with https://.");
      return;
    }

    setValidationError("");
    setIsSubmitting(true);
    try {
      await onSubmit({ title: title.trim(), type, url: url.trim(), description: description.trim() });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal open={true} title="Share a new resource" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {(validationError || error) && (
          <p className="rounded-lg border border-danger/20 bg-danger/5 px-3 py-2 text-xs text-danger">
            {validationError || error}
          </p>
        )}
        <FormField
          as="select"
          label="Suggested resource"
          defaultValue=""
          onChange={handleSuggestionChange}
        >
          <option value="">Choose a starter link (optional)</option>
          {SUGGESTED_RESOURCES.map((resource) => (
            <option key={resource.url} value={resource.title}>{resource.title}</option>
          ))}
        </FormField>
        <p className="-mt-2 text-xs text-fg/45">Choose a starter link or enter your own below.</p>
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
          type="url"
          placeholder="https://example.com/your-resource"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <p className="-mt-2 text-xs text-fg/45">
          Paste the full URL learners should open, such as a YouTube video, article, or documentation page.
        </p>

        <FormField
          as="textarea"
          label="Short description"
          placeholder="What will learners get out of this?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex gap-3 pt-1">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit for review"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}