"use client";
import { auth_service, useAppData } from "@/components/context/AppContext";
import axios from "axios";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Biohazard,
  Briefcase,
  File,
  Lock,
  Mail,
  PersonStanding,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputField from "@/components/shared/input/InputField";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [resume, setResume] = useState<any | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const { isAuth, setUser, loading, setIsAuth } = useAppData();

  if (isAuth) return redirect("/");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoading(true);

    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);

    if (role == "jobseeker") {
      formData.append("bio", bio);
      if (resume) formData.append("file", resume);
    }

    try {
      const { data } = await axios.post(
        `${auth_service}/api/auth/register`,
        formData
      );

      toast.success(data.message);

      Cookies.set("token", data.token, {
        expires: 15,
        secure: true,
        path: "/",
      });

      setUser(data.registeredUser);
      setIsAuth(true);
    } catch (error: any) {
      toast.error(error.response.data.message);
      setIsAuth(false);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Join HireHeaven</h1>
          <p className="text-sm opacity-70">
            Create your account to start a new journey
          </p>
        </div>
        <div className="border border-gray-400 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
          <form onSubmit={submitHandler} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                I want to
              </Label>
              <div className="relative">
                <Briefcase className="icon-style" />
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 border-2 border-gray-300 rounded-md bg-transparent"
                  required
                >
                  <option value="">Select your role</option>
                  <option value="jobseeker">Find a Job</option>
                  <option value="recruiter">Hire Talent</option>
                </select>
              </div>
            </div>

            {role && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <InputField
                  onChange={(e) => setName(e.target.value)}
                  label="Full name"
                  icon={PersonStanding}
                  placeholder="John Doe"
                  value={name}
                  isRequired={true}
                />

                <InputField
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email address"
                  icon={Mail}
                  placeholder="you@gmail.com"
                  value={email}
                  isRequired={true}
                />

                <InputField
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  icon={Lock}
                  placeholder="**********"
                  value={password}
                  isRequired={true}
                  type="password"
                />

                <InputField
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  label="Phone Number"
                  icon={Phone}
                  placeholder="0102030405"
                  value={phoneNumber}
                  isRequired={true}
                />

                {role == "jobseeker" && (
                  <>
                    <div className="space-y-5 pt-4 border-t border-gray-400">
                      <InputField
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setResume(e.target.files[0]);
                          }
                        }}
                        label="Resume (PDF)"
                        icon={File}
                        type="file"
                        className="h-11 pl-10 cursor-pointer"
                      />
                    </div>{" "}
                    <InputField
                      onChange={(e) => setBio(e.target.value)}
                      label="Bio"
                      icon={Biohazard}
                      placeholder="Tell us about yourself..."
                      isRequired={true}
                    />
                  </>
                )}

                <div className="flex items-center justify-end">
                  <Link
                    href={"/forgot"}
                    className="text-sm text-blue-500 hover:underline transition-all"
                  >
                    Forgot Password
                  </Link>
                </div>

                <Button disabled={btnLoading} className="w-full">
                  {btnLoading ? "Please wait......" : "Register"}{" "}
                  <ArrowRight size={18} />
                </Button>
              </div>
            )}
          </form>
          <hr className="my-3" />
          Already have an account{" "}
          <Link
            href={"/login"}
            className="text-sm text-blue-500 hover:underline transition-all"
          >
            Login now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
