import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Camera,
  Eye,
  EyeOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import api from "@/lib/axios";

interface UserSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserSettingsModal = ({ open, onOpenChange }: UserSettingsModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    phone: string;
    address: string;
    bio: string;
    avatar: string;
  }>({
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, State 12345",
    bio: "Loving pet parent with 2 wonderful pets",
    avatar: "",
  });

  const [notifications, setNotifications] = useState({
    emailReminders: true,
    pushNotifications: true,
    smsAlerts: false,
    marketingEmails: false,
  });

  const handleSaveProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await api.put(
        "/auth/update",
        {
          name: profile.name,
          email: profile.email,
          address: profile.address,
          phoneNumber: profile.phone,
          bio: profile.bio,
          avatar: profile.avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully",
      });

      onOpenChange(false);
    } catch (err: any) {
      toast({
        title: "Update Failed",
        description: err.response?.data?.msg || "Something went wrong",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved",
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const user = JSON.parse(stored);
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        address: user.address || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
      });
    }
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("cloud_name", "dbl9y4zkr"); // Your cloud name
    formData.append("upload_preset", "upload-preset "); // No preset used (you can leave this blank or set it to null)

    // Set other custom parameters directly
    formData.append("public_id", "user_avatar"); // Set custom public_id if needed
    formData.append("folder", "avatars/"); // Set folder for organization

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dbl9y4zkr/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setProfile((prev) => ({ ...prev, avatar: data.secure_url }));
        toast({
          title: "Avatar Uploaded",
          description: "Your profile photo has been updated.",
          // status: "success",
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Upload Failed",
        description: "Unable to upload avatar.",
        // status: "error",
        variant: "destructive",
      });
    }
  };

  const handlePasswordUpdate = async () => {
    console.log("update in process");

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast({
        title: "Missing Fields",
        description: "All password fields are required.",
        variant: "destructive",
      });
    }

    if (newPassword !== confirmPassword) {
      return toast({
        title: "Password Mismatch",
        description: "New passwords do not match.",
        variant: "destructive",
      });
    }

    const token = localStorage.getItem("token");

    try {
      const res = await api.put(
        "/auth/update-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Password Updated",
        description: res.data.msg || "Your password has been changed.",
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      toast({
        title: "Update Failed",
        description: err.response?.data?.msg || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[90vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-blue-500" />
            <span>Account Settings</span>
          </DialogTitle>
          <DialogDescription>
            Manage your account settings and preferences
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full h-[60vh]">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            {/* <TabsTrigger value="billing">Billing</TabsTrigger> */}
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Avatar className="w-16 h-16">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="avatar"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <AvatarFallback className="text-lg">
                    {profile.name
                      ? profile.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                      : "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <label htmlFor="avatar-upload">
                  <Button variant="outline" size="sm" asChild>
                    <span className="cursor-pointer">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </span>
                  </Button>
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <p className="text-sm text-gray-600 mt-1">
                  JPG, PNG or GIF. Max size 2MB
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                rows={3}
              />
            </div>
            <Button onClick={handleSaveProfile}>
              {" "}
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Reminders</h4>
                  <p className="text-sm text-gray-600">
                    Get reminded about upcoming appointments
                  </p>
                </div>
                <Switch
                  checked={notifications.emailReminders}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      emailReminders: checked,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-gray-600">
                    Receive notifications in the app
                  </p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      pushNotifications: checked,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">SMS Alerts</h4>
                  <p className="text-sm text-gray-600">
                    Get text messages for urgent updates
                  </p>
                </div>
                <Switch
                  checked={notifications.smsAlerts}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, smsAlerts: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Marketing Emails</h4>
                  <p className="text-sm text-gray-600">
                    Receive promotional content and tips
                  </p>
                </div>
                <Switch
                  checked={notifications.marketingEmails}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      marketingEmails: checked,
                    })
                  }
                />
              </div>
            </div>
            <Button onClick={handleSaveNotifications}>Save Preferences</Button>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="current-password"
                  className="text-sm font-medium text-gray-700"
                >
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Enter your previous password"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="new-password"
                  className="text-sm font-medium text-gray-700"
                >
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirm-password"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
              <Button onClick={handlePasswordUpdate}>
                <Shield className="w-4 h-4 mr-2" fill="white" />
                Update Password
              </Button>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600 mb-3">
                Add an extra layer of security to your account
              </p>
              <Button variant="outline" className=" cursor-not-allowed">
                Enable 2FA
              </Button>
            </div>
          </TabsContent>

          {/* <TabsContent value="billing" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Current Plan</h4>
                <p className="text-sm text-gray-600">
                  Free Plan - Basic features included
                </p>
                <Button variant="outline" className="mt-2">
                  Upgrade Plan
                </Button>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Payment Method</h4>
                <div className="p-3 border rounded flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5" />
                    <span>•••• •••• •••• 1234</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
              <Button variant="outline">Add Payment Method</Button>
            </div>
          </TabsContent> */}
        </Tabs>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserSettingsModal;
