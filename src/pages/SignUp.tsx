import { API } from "@/api";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FirebaseAuthService } from "@/lib/firebase/FirebaseAuthService";
import { useSession } from "@/providers/SessionProvider";
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { DatePicker } from "@/components/datepicker";


const FormSchema = z.object({
  email: z.string({
    required_error: "A email address is required"
  }).email({
    message: "Please provide a valid email address"
  }),
  password: z.string({
    required_error: "A password is required"
  }).min(8,
    {
      message: "Password must be atleast 8 characters"
    }
  ),
  firstName: z.string({
    required_error: "first name is required"
  }),
  lastName: z.string({
    required_error: "last name is required"
  }),
  dob: z.date({
    required_error: "Date of Birth is required"
  }).max(new Date()),
  phoneNo: z.string({
    required_error: "Phone no is required"
  }).min(10),

})

export default function SignUp() {

  const firebaseAuthService = FirebaseAuthService.getInstance();

  const navigate = useNavigate();
  const { email, setEmail, isLoading: isSessionLoading } = useSession();
  const [loading, setLoading] = useState<boolean>(false || isSessionLoading);
  const [progressValue, setProgressValue] = useState<number>(0);

  useEffect(() => {
    setLoading(isSessionLoading);
  }, [isSessionLoading])

  // If active session found, navigate to dashboard
  useEffect(() => {
    if (email) navigate('/groups')
  }, [email])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dob: new Date(),
      phoneNo: "",
    }
  })

  if (loading) {
    return <div className="w-screen px-80"><Progress value={progressValue} /></div>
  }



  const onSubmit = async (values: z.infer<typeof FormSchema>) => {

    setLoading(true)
    setProgressValue(10);

    const { email, password } = values;
    setProgressValue(25);

    try {
      const user = await firebaseAuthService.signUpUserWithEmailAndPassword({ email, password })
      if (!user) {
        setLoading(false);
        setProgressValue(0);
        toast.error("User not found")
        return;
      }
      setProgressValue(65);
      await API.METHODS.POST(API.ENDPOINTS.user.signup, { token: await user.getIdToken(), ...values }, { withCredentials: true },
        {
          onSuccess: (message) => {
            toast.success("Successfully Signed In", message)
            setEmail(message.email);
            // setSession({ email: message.email, sessionId: message.sessionId })
            navigate('/groups')
          },
          onError: (data: any) => { console.log(data) }
        }
      )
    } catch (error: unknown) {
      toast.error(String(error));
    }

    setProgressValue(100);
    setLoading(false)

  }



  return (
    <>
      <div className="min-w-80 flex flex-col gap-y-2 border-2 p-12 rounded ">
        <h1 className="text-3xl">Sign Up</h1>
        <Form {...form} >
          <form
            className="flex flex-col gap-y-4"
            onSubmit={
              form.handleSubmit(
                onSubmit,
                (e) => console.error(e)
              )
            }
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (

                <FormItem>
                  <FormLabel>first name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )}

            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (

                <FormItem>
                  <FormLabel>last name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )}

            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birthday</FormLabel>
                  <FormControl>
                    <DatePicker
                      onDateSelect={(date) => field.onChange(date)}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (

                <FormItem>
                  <FormLabel>phone no</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )}

            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (

                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )}

            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (

                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )}

            />
            <Button variant="outline" className="cursor-pointer" type="submit" >Submit</Button>
          </form>

        </Form>
      </div>

    </>
  )

}
