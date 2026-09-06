import { useState, useEffect } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Toolbar, Table, Pill, Button } from "@/components/ui";
import { EditStatusModal } from "@/components/admin";
import Modal from "@/components/ui/Modal";
import FormField from "@/components/ui/FormField";
import { getUsers, createUser, updateUser, deleteUser } from "@/services/userService";
import { toast } from "sonner";


export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [editingUser, setEditingUser] = useState(null);
  const [draftStatus, setDraftStatus] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "learner" });

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  function openEdit(user) {
    setEditingUser(user);
    setDraftStatus(user.status);
  }

  async function saveStatus() {
    const updated = await updateUser(editingUser.id, { status: draftStatus });
    setUsers((current) => current.map((u) => (u.id === updated.id ? updated : u)));
    setEditingUser(null);
    toast.success("User updated!");
  }

  async function handleCreate(event) {
    event.preventDefault();
    try {
      const created = await createUser(form);
      setUsers((current) => [created, ...current]);
      setForm({ name: "", email: "", password: "", role: "learner" });
      setShowCreate(false);
      toast.success("User added!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleDelete(user) {
    if (!window.confirm(`Delete ${user.name}?`)) return;
    try {
      await deleteUser(user.id);
      setUsers((current) => current.filter((item) => item.id !== user.id));
      toast.success("User deleted!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  const rows = filteredUsers.map((u) => [
    u.name,
    u.email,
    u.role,
    <Pill status={u.status} key={u.id} />,
    <div className="flex gap-2" key={`actions-${u.id}`}>
      <Button variant="ghost" size="sm" onClick={() => openEdit(u)}><Pencil size={12} /> Edit</Button>
      <Button variant="ghost" size="sm" onClick={() => handleDelete(u)}><Trash2 size={12} /> Delete</Button>
    </div>,
  ]);

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle="Accounts across learners, contributors, and admins."
        action={<Button variant="primary" onClick={() => setShowCreate(true)}><Plus size={14} /> Add User</Button>}
      />

      <Toolbar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search users..." />

      {loading ? (
        <p className="text-sm text-fg/50">Loading users...</p>
      ) : (
        <Table
          columns={["Name", "Email", "Role", "Status", ""]}
          rows={rows}
          emptyMessage="No users found"
        />
      )}

      {editingUser && (
        <EditStatusModal
          title={`Edit ${editingUser.name}`}
          subtitle="Update this user's account status."
          statusOptions={["Active", "Inactive", "Pending"]}
          value={draftStatus}
          onChange={setDraftStatus}
          onCancel={() => setEditingUser(null)}
          onSave={saveStatus}
        />
      )}

      <Modal open={showCreate} title="Add user" onClose={() => setShowCreate(false)}>
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <FormField label="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <FormField label="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <FormField label="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          <FormField as="select" label="Role" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
            <option value="learner">Learner</option>
            <option value="contributor">Contributor</option>
            <option value="admin">Admin</option>
          </FormField>
          <Button type="submit" variant="primary">Create user</Button>
        </form>
      </Modal>
    </div>
  );
}