'use client'

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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useApplication } from "@/store/applicationContext"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { changePasswordValidationSchema } from "../validations/changePasswordValidationSchema"
import { updateDetailsValidationSchema } from "../validations/updateDetailsValidationSchema"
import { changeCreatorPassword, updateCreatorInfo } from "@/store/actions/creatorActions"

export function EditCreatorInfoForm() {
  const router = useRouter()  
  const {state, dispatch} = useApplication()
  const passwordForm = useForm({
    resolver: zodResolver(changePasswordValidationSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
      password1: "",
      password2: "",
    },
  });
  
  const detailsForm = useForm({
    resolver: zodResolver(updateDetailsValidationSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  const onSubmitDetailsChange = (values) => {   
    values.dispatch = dispatch;

    console.log(values);
    updateCreatorInfo(values)
  };

  const onSubmitPasswordChange = (values) => {   
    values.dispatch = dispatch;

    console.log(values);
    changeCreatorPassword(values)
  };

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <Form {...detailsForm}>
        <form onSubmit={detailsForm.handleSubmit(onSubmitDetailsChange)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <FormField
                control={detailsForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <FormControl>
                      <Input  placeholder="Enter your First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <FormField
                control={detailsForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <FormControl>
                      <Input  placeholder="Enter your Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <FormField
                control={detailsForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                    <FormControl>
                      <Input type='number'  placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            </div>
              <CardFooter>
                <Button type="submit" disable={state?.isLoading ? 'true' : 'false'} className='mt-2 hover:bg-green-300'>{state?.isLoading ? <Loader /> : 'Save changes'} </Button>
          <div>
              {
                state?.errorMsg?.msg && state.errorMsg?.msg != 'Not Allowed Please login' && <small className="text-red-400">{state?.errorMsg?.mg}</small>
              }
            </div>
              </CardFooter>
            </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <Form {...passwordForm}>
        <form onSubmit={passwordForm.handleSubmit(onSubmitPasswordChange)}>
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <FormField
                control={passwordForm.control}
                name="password1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password1">Current Password</FormLabel>
                    <FormControl>
                      <Input  placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          <div className="flex flex-col space-y-1.5">
            <FormField
                control={passwordForm.control}
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
                control={passwordForm.control}
                name="password2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password2">Confirm Password</FormLabel>
                    <FormControl>
                      <Input  placeholder="Re-Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            </div>
              <Button type="submit" disable={state?.isLoading ? 'true' : 'false'} className='mt-2 hover:bg-green-300'>{state?.isLoading ? <Loader /> : 'Save password'} </Button>
            <div>
                {
                  state?.errorMsg?.msg && state.errorMsg?.msg != 'Not Allowed Please login' && <small className="text-red-400">{state?.errorMsg?.mg}</small>
                }
              </div>
            </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
