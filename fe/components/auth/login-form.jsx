// components/auth/login-form.jsx
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function LoginForm({ defaultEmail = "" }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email" className="font-normal ">
        Email Address
      </Label>
      <Input
        id="email"
        name="email"
        className=" text-md md:text-sm"
        type="email"
        placeholder="user@mail.com"
        autoComplete="email"
        required
        defaultValue={defaultEmail}
      />
      <Label htmlFor="password" className="font-normal ">
        Password
      </Label>
      <Input
        id="password"
        name="password"
        className="text-md md:text-sm"
        type="password"
        required
      />
    </div>
  );
}
