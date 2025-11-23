"use client";

import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { UserModal } from "./user-modal";
import { supabase } from "../lib/supabaseClient";

interface User {
  id: number | string;
  name: string;
  email: string;
  role: string;
  joinedDate: string;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchUsers = async () => {
      setLoading(true);
      try {
         
        const { data, error } = await supabase
          .from("users")
          .select("*")
        if (!mounted) return;
        if (error) {
          console.error("Error fetching users:", error);
          setUsers([]);
        } else if (data) {
          const mapped = data.map((r: any) => ({
            id: r.id,
            name: r.name ?? "",
            email: r.email ?? "",
            role: r.role ?? "client",
            joinedDate: r.created_at
              ? new Date(r.created_at).toISOString().split("T")[0]
              : "",
          }));
          setUsers(mapped);
        }
      } catch (err) {
        console.error("Unexpected error fetching users:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUsers();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAdd = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleDelete = (id: number | string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    (async () => {
      try {
        // Delete row from your user table (this does not delete auth.user)
        const { error } = await supabase.from("users").delete().eq("id", id);
        if (error) throw error;
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user. Check console for details.");
      }
    })();
  };

  const handleSave = (user: User) => {
    (async () => {
      try {
        if (editingUser) {
          // Update existing
          const { error } = await supabase
            .from("users")
            .update({ name: user.name, email: user.email, role: user.role })
            .eq("id", user.id);
          if (error) throw error;
          setUsers((prev) =>
            prev.map((u) => (u.id === user.id ? { ...u, ...user } : u)),
          );  
        } else {
          // Create new row in users table
          const { data, error } = await supabase
            .from("users")
            .insert({ name: user.name, email: user.email, role: user.role })
            .select()
            .single();
          if (error) throw error;
          const newUser: User = {
            id: data.id,
            name: data.name ?? "",
            email: data.email ?? "",
            role: data.role ?? "Client",
            joinedDate: data.created_at
              ? new Date(data.created_at).toISOString().split("T")[0]
              : "",
          };
          setUsers((prev) => [newUser, ...prev]);
        }
        setModalOpen(false);
      } catch (err) {
        console.error("Error saving user:", err);
        alert("Failed to save user. Check console for details.");
      }
    })();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-foreground">
            User Management
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your team members and their roles
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card className="p-6 shadow-md">
        <div className="mb-6 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left text-sm font-semibold text-foreground">
                  Name
                </th>
                <th className="pb-3 text-left text-sm font-semibold text-foreground">
                  Email
                </th>
                <th className="pb-3 text-left text-sm font-semibold text-foreground">
                  Role
                </th>
                <th className="pb-3 text-left text-sm font-semibold text-foreground">
                  Joined
                </th>
                <th className="pb-3 text-right text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-4 text-sm text-foreground">{user.name}</td>
                  <td className="py-4 text-sm text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="py-4">
                    <span className="inline-flex rounded-full bg-secondary/20 px-3 py-1 text-xs font-medium text-secondary">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-muted-foreground">
                    {user.joinedDate}
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(user)}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(user.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <UserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        user={editingUser}
      />
    </div>
  );
}
