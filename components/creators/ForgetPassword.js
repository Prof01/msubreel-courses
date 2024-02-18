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


export function ForgetPassword() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your details to Reset Password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type='email' required id="email" placeholder="Enter your Email" />
            </div>
          </div>
          <Button className='mt-2 hover:bg-green-300'>Reset Password</Button>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Link className="text-xs no-underline text-gray-950" href={'/admin/signin'}>Login</Link>
      </CardFooter>
    </Card>
  )
}
