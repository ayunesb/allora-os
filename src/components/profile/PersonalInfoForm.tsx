import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  AtSign,
  Building,
  Briefcase,
  Phone,
  MapPin,
  Globe,
  Calendar,
} from "lucide-react";
const PersonalInfoForm = ({ register, errors, userCreatedAt }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Personal Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="Your full name"
            {...register("name", { required: "Name is required" })}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <AtSign className="h-4 w-4" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Your email address"
            disabled
            {...register("email")}
          />
          <p className="text-xs text-muted-foreground">
            Email cannot be changed
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Company
          </Label>
          <Input
            id="company"
            placeholder="Your company name"
            {...register("company")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Job Title
          </Label>
          <Input id="role" placeholder="Your job title" {...register("role")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone Number
          </Label>
          <Input
            id="phone"
            placeholder="Your phone number"
            {...register("phone")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </Label>
          <Input
            id="location"
            placeholder="City, Country"
            {...register("location")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Website
          </Label>
          <Input
            id="website"
            placeholder="https://example.com"
            {...register("website")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="joinDate" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Joined
          </Label>
          <Input
            id="joinDate"
            value={
              userCreatedAt
                ? new Date(userCreatedAt).toLocaleDateString()
                : "N/A"
            }
            disabled
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Bio
        </Label>
        <Textarea
          id="bio"
          placeholder="Tell us a bit about yourself"
          {...register("bio")}
          rows={4}
        />
        <p className="text-xs text-muted-foreground">
          This will be displayed on your public profile
        </p>
      </div>
    </div>
  );
};
export default PersonalInfoForm;
