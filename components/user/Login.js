'use client'
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
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useApplication } from "@/store/applicationContext"
import { useEffect } from "react"
import { loginStudent } from "@/store/actions/studentAction"


export function LoginForm({searchParams}) {
  const router = useRouter()  
  const {state, dispatch} = useApplication()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {   
      data.dispatch = dispatch;

    loginStudent(data)
  };

console.log(state?.errorMsg);
  useEffect(() => {
    if(state?.student) {
      router.refresh()
      router.push(`/app/dashboard?service=${searchParams?.service}`)
    }
  }, [state?.student, router, searchParams?.service])

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your details to Login.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input {...register('email', { required: true })} type='email' required id="email" placeholder="Enter your Email" />
              {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input {...register('password', { required: true })}  type='password' id="password" placeholder="Enter your password" />
              {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            </div>
          </div>
          <Button disable={state?.isLoading ? true : false} className='mt-2 hover:bg-green-300'>Login</Button>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Link className="text-xs no-underline text-gray-950" href={'/app/register'}>Register Account</Link>
        <Link className="text-xs no-underline text-gray-950" href={'/app/forget-password'}>Forget Password</Link>
      </CardFooter>
    </Card>
  )
}
