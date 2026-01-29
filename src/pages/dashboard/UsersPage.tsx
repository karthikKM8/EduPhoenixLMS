import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  MoreVertical,
  Mail,
  Trash2,
  UserCircle,
  Shield,
  GraduationCap,
  BookOpen,
  Calendar,
  Users,
  ChevronDown,
  Phone,
  Lock,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

// ✅ NEW IMPORTS (for role based URL filter)
import { useSearchParams } from "react-router-dom";

type UserRole = "admin" | "super_admin" | "instructor" | "student";

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive";
  batch?: string;
  joined: string;
  mobile?: string;
}

const users: User[] = [
  { id: 1, name: "John Smith", email: "john@example.com", role: "instructor", status: "active", joined: "2024-01-15", mobile: "9876543210" },
  { id: 2, name: "Sarah Wilson", email: "sarah@example.com", role: "instructor", status: "active", joined: "2024-02-20", mobile: "9876543222" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "super_admin", status: "active", joined: "2023-11-10", mobile: "9876543333" },
  { id: 4, name: "Emily Brown", email: "emily@example.com", role: "student", status: "active", batch: "2024-A", joined: "2024-03-05", mobile: "9876544444" },
  { id: 5, name: "David Lee", email: "david@example.com", role: "student", status: "inactive", batch: "2024-B", joined: "2024-01-28", mobile: "9876545555" },
  { id: 6, name: "Anna Garcia", email: "anna@example.com", role: "instructor", status: "active", joined: "2023-12-15", mobile: "9876546666" },
  { id: 7, name: "James Wilson", email: "james@example.com", role: "student", status: "active", batch: "2024-A", joined: "2024-04-10", mobile: "9876547777" },
  { id: 8, name: "Lisa Chen", email: "lisa@example.com", role: "student", status: "active", batch: "2023-C", joined: "2023-09-01", mobile: "9876548888" },
  { id: 9, name: "Admin User", email: "admin@example.com", role: "admin", status: "active", joined: "2023-06-15", mobile: "9876549999" },
];

const batches = ["2024-A", "2024-B", "2023-C", "2023-B", "2023-A"];

// Simulating current logged-in user role
const currentUserRole: UserRole = "super_admin";

const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case "super_admin":
      return Shield;
    case "admin":
      return Shield;
    case "instructor":
      return BookOpen;
    case "student":
      return GraduationCap;
    default:
      return UserCircle;
  }
};

const getRoleBadge = (role: UserRole) => {
  switch (role) {
    case "super_admin":
      return "bg-destructive/10 text-destructive";
    case "admin":
      return "bg-primary/10 text-primary";
    case "instructor":
      return "bg-accent/10 text-accent";
    case "student":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const canDeleteUser = (currentRole: UserRole): boolean => {
  return currentRole === "super_admin" || currentRole === "admin";
};

export default function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>(users);

  // ✅ Add User Modal
  const [openAddUser, setOpenAddUser] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "student" as UserRole,
    mobile: "",
    password: "",
    batch: "all",
  });

  // ✅ Pagination (10 per page)
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // ✅ NEW: Read role from URL and auto-select it
  useEffect(() => {
    const roleFromUrl = searchParams.get("role");

    if (
      roleFromUrl === "admin" ||
      roleFromUrl === "student" ||
      roleFromUrl === "instructor" ||
      roleFromUrl === "super_admin"
    ) {
      setSelectedRole(roleFromUrl);
      setCurrentPage(1);

      // ✅ if not student, clear student filters
      if (roleFromUrl !== "student") {
        setSelectedBatch("all");
        setDateRange({});
      }
    } else {
      // If no role param, show all
      setSelectedRole("all");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const clearStudentFilters = () => {
    setSelectedBatch("all");
    setDateRange({});
    setCurrentPage(1);
  };

  const showStudentFilters = selectedRole === "student";

  const filteredUsers = usersList.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = selectedRole === "all" || user.role === selectedRole;

    // student filters
    let matchesBatch = true;
    let matchesDate = true;

    if (selectedRole === "student") {
      matchesBatch = selectedBatch === "all" || user.batch === selectedBatch;

      if (dateRange.from) {
        const joinedDate = new Date(user.joined);
        matchesDate = joinedDate >= dateRange.from;

        if (dateRange.to) {
          matchesDate = matchesDate && joinedDate <= dateRange.to;
        }
      }
    }

    return matchesSearch && matchesRole && matchesBatch && matchesDate;
  });

  // ✅ Pagination calculated values
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsersList((prev) => prev.filter((u) => u.id !== userToDelete.id));
      toast.success("User deleted successfully");
      setUserToDelete(null);
      setCurrentPage(1);
    }
  };

  const handleAddUser = () => {
    if (!newUser.name.trim()) return toast.error("Enter user name");
    if (!newUser.email.trim()) return toast.error("Enter user email");
    if (!newUser.mobile.trim()) return toast.error("Enter mobile number");
    if (!newUser.password.trim()) return toast.error("Enter password");

    const emailExists = usersList.some((u) => u.email === newUser.email);
    if (emailExists) return toast.error("Email already exists");

    const userToAdd: User = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      joined: new Date().toISOString().split("T")[0],
      mobile: newUser.mobile,
      batch: newUser.role === "student" && newUser.batch !== "all" ? newUser.batch : undefined,
    };

    setUsersList((prev) => [userToAdd, ...prev]);
    toast.success("User added successfully ✅");

    setOpenAddUser(false);
    setNewUser({
      name: "",
      email: "",
      role: "student",
      mobile: "",
      password: "",
      batch: "all",
    });

    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="User Management" subtitle="Manage all users in your institution" />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {["all", "super_admin", "admin", "instructor", "student"].map((role) => (
                  <Button
                    key={role}
                    variant={selectedRole === role ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedRole(role);
                      setCurrentPage(1);

                      // ✅ update URL when clicking role buttons
                      if (role === "all") {
                        setSearchParams({});
                      } else {
                        setSearchParams({ role });
                      }

                      if (role !== "student") {
                        clearStudentFilters();
                      }
                    }}
                    className="capitalize"
                  >
                    {role === "super_admin" ? "Super Admin" : role}
                  </Button>
                ))}
              </div>
            </div>

            <Button variant="phoenix" onClick={() => setOpenAddUser(true)}>
              <Plus size={18} />
              Add User
            </Button>
          </div>

          {/* Student Filters */}
          {showStudentFilters && (
            <div className="flex flex-wrap items-center gap-3 p-4 bg-card rounded-xl border border-border animate-fade-in">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users size={16} />
                <span>Student Filters:</span>
              </div>

              <Select
                value={selectedBatch}
                onValueChange={(val) => {
                  setSelectedBatch(val);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="Select Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Batches</SelectItem>
                  {batches.map((batch) => (
                    <SelectItem key={batch} value={batch}>
                      {batch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 gap-2">
                    <Calendar size={14} />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd")}
                        </>
                      ) : (
                        format(dateRange.from, "MMM dd, yyyy")
                      )
                    ) : (
                      "Join Date"
                    )}
                    <ChevronDown size={14} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="range"
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range) => {
                      setDateRange({ from: range?.from, to: range?.to });
                      setCurrentPage(1);
                    }}
                    numberOfMonths={2}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              {(selectedBatch !== "all" || dateRange.from) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearStudentFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">User</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Role</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  {showStudentFilters && (
                    <th className="text-left p-4 font-medium text-muted-foreground">Batch</th>
                  )}
                  <th className="text-left p-4 font-medium text-muted-foreground">Joined</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedUsers.map((user, index) => {
                  const RoleIcon = getRoleIcon(user.role);

                  return (
                    <tr
                      key={user.id}
                      className="border-b border-border hover:bg-muted/30 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-phoenix flex items-center justify-center text-primary-foreground font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                            getRoleBadge(user.role)
                          )}
                        >
                          <RoleIcon size={14} />
                          {user.role === "super_admin" ? "Super Admin" : user.role}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                            user.status === "active"
                              ? "bg-green-500/10 text-green-600"
                              : "bg-destructive/10 text-destructive"
                          )}
                        >
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              user.status === "active" ? "bg-green-500" : "bg-destructive"
                            )}
                          />
                          {user.status}
                        </span>
                      </td>

                      {showStudentFilters && (
                        <td className="p-4">
                          {user.batch ? (
                            <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-sm">
                              {user.batch}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      )}

                      <td className="p-4 text-muted-foreground">
                        {new Date(user.joined).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Mail size={16} />
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem>
                                <UserCircle size={16} className="mr-2" />
                                View Profile
                              </DropdownMenuItem>

                              <DropdownMenuItem>
                                <Mail size={16} className="mr-2" />
                                Send Email
                              </DropdownMenuItem>

                              {canDeleteUser(currentUserRole) && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                    onClick={() => setUserToDelete(user)}
                                  >
                                    <Trash2 size={16} className="mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ✅ Pagination Footer */}
          {filteredUsers.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{startIndex + 1}</span> -{" "}
                <span className="font-medium text-foreground">
                  {Math.min(endIndex, filteredUsers.length)}
                </span>{" "}
                of <span className="font-medium text-foreground">{filteredUsers.length}</span> users
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={safeCurrentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                >
                  Previous
                </Button>

                <span className="text-sm font-medium">
                  Page {safeCurrentPage} of {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {filteredUsers.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              <Users size={48} className="mx-auto mb-4 opacity-50" />
              <p>No users found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Add User Modal */}
      {openAddUser && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-lg font-semibold">Add New User</h2>
              <Button variant="ghost" size="icon" onClick={() => setOpenAddUser(false)}>
                <X size={18} />
              </Button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">User Name</label>
                <Input
                  placeholder="Enter user name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">User Role</label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({ ...newUser, role: value as UserRole })}
                >
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Enter email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Mobile No</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Enter mobile number"
                    value={newUser.mobile}
                    onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-border flex justify-end gap-3">
              <Button variant="outline" onClick={() => setOpenAddUser(false)}>
                Cancel
              </Button>
              <Button variant="phoenix" onClick={handleAddUser}>
                Add User
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">{userToDelete?.name}</span>? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
