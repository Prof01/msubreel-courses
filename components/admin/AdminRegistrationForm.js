import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"


export function AdminRegistrationForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Register An Account</CardTitle>
        <CardDescription>Enter your details to Register an Account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input type='text' required id="firstName" placeholder="Enter your First Name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input type='text' required id="laststName" placeholder="Enter your Last Name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type='email' required id="email" placeholder="Enter your Email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input type='number' required id="phoneNumber" placeholder="Enter your Phone Number" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input required type='password' id="password" placeholder="Enter your password" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Confirm Password</Label>
              <Input required type='password' id="password" placeholder="Re-Enter your password" />
            </div>
          </div>
          <Button className='mt-2 hover:bg-green-300'>Create Account</Button>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Link className="text-xs no-underline text-gray-950" href={'/admin/signin'}>Login</Link>
      </CardFooter>
    </Card>
  )
}
