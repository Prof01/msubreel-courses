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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useApplication } from "@/store/applicationContext"
import { useEffect } from "react"
import { resetStudentPassword } from "@/store/actions/studentAction"
import { Loader } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { submitNewPasswordValidationSchema } from "../validations/submitNewPasswordValidationSchema"

export function ResetUserPasswordForm({searchParams, params}) {
  const router = useRouter()  
  const {state, dispatch} = useApplication()
  const form = useForm({
    resolver: zodResolver(submitNewPasswordValidationSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
      password1: "",
    },
  });

  const onSubmit = (values) => {   
    values.dispatch = dispatch;
    values.resetCode = params.id
    console.log(values);
    resetStudentPassword(values)
  };

console.log(params);
  useEffect(() => {
    if(state?.student) {
      router.refresh()
      router.push(`/app/dashboard?service=${searchParams?.service}`)
    }
  }, [state?.student, router, searchParams?.service])

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create New Password</CardTitle>
        <CardDescription>Enter your details to update your password.</CardDescription>
      </CardHeader>
      <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">New Password</FormLabel>
                    <FormControl>
                      <Input  placeholder="Enter your new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
            <FormField
                control={form.control}
                name="password1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password1">Confirm Password</FormLabel>
                    <FormControl>
                      <Input  placeholder="Re-Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" disable={state?.isLoading ? 'true' : 'false'} className='mt-2 hover:bg-green-300'>{state?.isLoading ? <Loader /> : 'Login'} </Button>
          <div>
              {
                state?.errorMsg?.msg && state.errorMsg?.msg != 'Not Allowed Please login' && <small className="text-red-400">{state?.errorMsg?.mg}</small>
              }
            </div>
        </form>
      </Form>
      </CardContent>
    </Card>
  )
}
