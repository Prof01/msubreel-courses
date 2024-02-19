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
import Link from "next/link"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useApplication } from "@/store/applicationContext"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { loginCreator } from "@/store/actions/creatorActions"
import { clearErrors } from "@/store/actions/errorActions"
import { loginValidationSchema } from "../validations/loginValidationSchema"


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
  })

  const onSubmit = (values) => {   
    values.dispatch = dispatch;
    // dispatch(clearErrors())
    console.log(values);
    loginCreator(values)
  };

console.log(state?.errorMsg);
  useEffect(() => {
    if(state?.creator) {
      router.refresh()
      router.push(`/creators/dashboard?service=${searchParams?.service}`)
    }
  }, [state?.creator, router, searchParams?.service])

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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input  placeholder="Enter your Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
            <div className="flex flex-col space-y-1.5">
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input  placeholder="Enter your password" {...field} />
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
                        state?.errorMsg?.msg && state?.errorMsg?.msg != 'Not Allowed Please login' && <small className="text-red-400">{state?.errorMsg?.msg}</small>
                      }
                   </div>
        </form>
      </Form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Link className="text-xs no-underline" href={'/creators/register'}>Register Account</Link>
        <Link className="text-xs no-underline" href={'/creators/forget-password'}>Forget Password</Link>
      </CardFooter>
    </Card>
  )
}
