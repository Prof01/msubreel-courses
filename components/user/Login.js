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
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useApplication } from "@/store/applicationContext"
import { useEffect } from "react"
import { loginStudent } from "@/store/actions/studentAction"
import { Loader } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { loginValidationSchema, LoginFormValues } from "../loginValidationSchema"


export function LoginForm({searchParams}) {
  const router = useRouter()  
  const {state, dispatch} = useApplication()
  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {   
    values.dispatch = dispatch;

    console.log(values);
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input {...register('email', { required: true })} type='email' required id="email" placeholder="Enter your Email" />
              {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}


<FormField
  control={control}
  name="username"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input  placeholder="shadcn" {...field} />
      </FormControl>
      <FormDescription>This is your public display name.</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>

            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input {...register('password', { required: true })}  type='password' id="password" placeholder="Enter your password" />
              {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            </div>
          </div>
          <Button disable={state?.isLoading ? true : false} className='mt-2 hover:bg-green-300'>{state?.isLoading ? <Loader /> : 'Login'} </Button>
        </form>
      </Form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Link className="text-xs no-underline" href={'/app/register'}>Register Account</Link>
        <Link className="text-xs no-underline" href={'/app/forget-password'}>Forget Password</Link>
      </CardFooter>
    </Card>
  )
}
