import { useEffect, useState } from "react";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { getCommunityDiscussions, createDiscussion, likeDiscussion } from "../../services/discussionService";
import { toast } from "sonner";

export default function Community() {
  const [discussions, setDiscussions] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => { getCommunityDiscussions().then(setDiscussions); }, []);

  async function handleCreate(event) {
    event.preventDefault();
    try {
      const created = await createDiscussion(form);
      setDiscussions((current) => [{ ...created, author: "You", likes: 0, comment_count: 0 }, ...current]);
      setForm({ title: "", content: "" });
      toast.success("Discussion posted!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleLike(discussionId) {
    const result = await likeDiscussion(discussionId);
    setDiscussions((current) => current.map((item) => item.id === discussionId ? { ...item, likes: result.likes } : item));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Community</h1>
        <p className="mt-1 text-sm text-neutral-500">Discussions, questions, and insights from fellow learners.</p>
      </div>

      <form onSubmit={handleCreate} className="rounded-2xl border border-black/5 bg-white p-6">
        <h2 className="font-semibold text-neutral-900">Start a discussion</h2>
        <input className="mt-4 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" placeholder="Title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
        <textarea className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" placeholder="What would you like to ask?" value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} />
        <button type="submit" className="mt-3 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white">Post discussion</button>
      </form>

      {discussions.length === 0 ? <p className="text-sm text-neutral-500">No discussions have been posted yet.</p> : discussions.map((discussion) => (
        <article key={discussion.id} className="rounded-2xl border border-black/5 bg-white p-6">
          <p className="text-sm font-semibold text-neutral-900">{discussion.title}</p>
          <p className="mt-2 text-sm text-neutral-600">{discussion.content}</p>
          <div className="mt-4 flex gap-4 text-sm text-neutral-500">
            <span>{discussion.author}</span>
            <span className="inline-flex items-center gap-1"><MessageCircle size={15} /> {discussion.comment_count ?? 0}</span>
            <button type="button" onClick={() => handleLike(discussion.id)} className="inline-flex items-center gap-1"><ThumbsUp size={15} /> {discussion.likes ?? 0}</button>
          </div>
        </article>
      ))}

    </div>
  );
}
