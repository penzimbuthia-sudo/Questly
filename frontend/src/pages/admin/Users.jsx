import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Toolbar, Table, Pill, Button } from "@/components/ui";
import { EditStatusModal } from "@/components/admin";
import { getUsers, updateUserStatus } from "@/services/userService";


export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [editingUser, setEditingUser] = useState(null);
  const [draftStatus, setDraftStatus] = useState("");

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
    const updated = await updateUserStatus(editingUser.id, draftStatus);
    setUsers((current) => current.map((u) => (u.id === updated.id ? updated : u)));
    setEditingUser(null);
  }

  const rows = filteredUsers.map((u) => [
    u.name,
    u.email,
    u.role,
    <Pill status={u.status} key={u.id} />,
    <Button variant="ghost" size="sm" onClick={() => openEdit(u)} key={`edit-${u.id}`}>
      <Pencil size={12} /> Edit
    </Button>,
  ]);

  return (
    <div>
      <PageHeader title="Users" subtitle="Accounts across learners, contributors, and admins." />

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
          statusOptions={["Active", "Suspended"]}
          value={draftStatus}
          onChange={setDraftStatus}
          onCancel={() => setEditingUser(null)}
          onSave={saveStatus}
        />
      )}
    </div>
  );
}