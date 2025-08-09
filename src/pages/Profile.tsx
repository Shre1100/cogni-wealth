import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit3,
  Camera,
  Shield,
  CreditCard,
  Bell,
  Eye,
  EyeOff,
  Check,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock user data - Replace with API call
const mockUserData = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  dateOfBirth: '1990-05-15',
  joinDate: '2023-01-15',
  avatarUrl: '',
  isEmailVerified: true,
  isPhoneVerified: false,
  riskTolerance: 'Moderate',
  investmentExperience: 'Intermediate',
  preferredCurrency: 'USD'
};

const Profile = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [emailVerificationPending, setEmailVerificationPending] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);

  const handleSave = () => {
    // TODO: Connect to database to save user profile
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    // Reset form data
    setIsEditing(false);
  };

  const handleEmailChange = (newEmail: string) => {
    if (newEmail !== userData.email) {
      setEmailVerificationPending(true);
      toast({
        title: "Email Verification Required",
        description: "Please check your new email for verification link.",
        variant: "default",
      });
    }
    setUserData(prev => ({ ...prev, email: newEmail }));
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background pt-4">
      <div className="container mx-auto px-4 space-y-8 max-w-4xl">
        {/* Profile Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <User className="w-8 h-8 text-primary" />
            Profile Settings
          </h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card className="financial-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>

              {/* Avatar Section */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={userData.avatarUrl} />
                    <AvatarFallback className="text-lg bg-primary/20">
                      {userData.firstName[0]}{userData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 rounded-full">
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{userData.firstName} {userData.lastName}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-success/30 text-success bg-success/10">
                      <Check className="w-3 h-3 mr-1" />
                      Verified Account
                    </Badge>
                    <Badge variant="outline">Member since {new Date(userData.joinDate).getFullYear()}</Badge>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={userData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={userData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      disabled={!isEditing}
                      className={emailVerificationPending ? "border-warning" : ""}
                    />
                    {userData.isEmailVerified && !emailVerificationPending ? (
                      <Badge variant="outline" className="border-success/30 text-success bg-success/10">
                        <Check className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : emailVerificationPending ? (
                      <Badge variant="outline" className="border-warning/30 text-warning bg-warning/10">
                        Pending
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-decline/30 text-decline bg-decline/10">
                        <X className="w-3 h-3 mr-1" />
                        Unverified
                      </Badge>
                    )}
                  </div>
                  {emailVerificationPending && (
                    <p className="text-xs text-warning">New email requires verification</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="phone"
                      value={userData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                    {userData.isPhoneVerified ? (
                      <Badge variant="outline" className="border-success/30 text-success bg-success/10">
                        <Check className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-decline/30 text-decline bg-decline/10">
                        <X className="w-3 h-3 mr-1" />
                        Unverified
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={userData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={userData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 mt-8">
                  <Button onClick={handleSave} className="btn-financial">
                    <Check className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="financial-card p-6">
              <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-medium">Password</h3>
                    <p className="text-sm text-muted-foreground">Last updated 30 days ago</p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-medium">Login Sessions</h3>
                    <p className="text-sm text-muted-foreground">Manage your active sessions</p>
                  </div>
                  <Button variant="outline">View Sessions</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card className="financial-card p-6">
              <h2 className="text-xl font-semibold mb-6">Investment Preferences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                  <Input
                    id="riskTolerance"
                    value={userData.riskTolerance}
                    onChange={(e) => handleInputChange('riskTolerance', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Investment Experience</Label>
                  <Input
                    id="experience"
                    value={userData.investmentExperience}
                    onChange={(e) => handleInputChange('investmentExperience', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Preferred Currency</Label>
                  <Input
                    id="currency"
                    value={userData.preferredCurrency}
                    onChange={(e) => handleInputChange('preferredCurrency', e.target.value)}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="financial-card p-6">
              <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-medium">Profile Visibility</h3>
                    <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                  </div>
                  <Button variant="outline" onClick={() => setShowPersonalInfo(!showPersonalInfo)}>
                    {showPersonalInfo ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                    {showPersonalInfo ? 'Public' : 'Private'}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-medium">Data Export</h3>
                    <p className="text-sm text-muted-foreground">Download your data</p>
                  </div>
                  <Button variant="outline">Export Data</Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-decline/30 rounded-lg bg-decline/5">
                  <div className="space-y-1">
                    <h3 className="font-medium text-decline">Delete Account</h3>
                    <p className="text-sm text-muted-foreground">Permanently delete your account</p>
                  </div>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;