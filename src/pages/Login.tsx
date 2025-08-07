import { API } from "@/api";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FirebaseAuthService } from "@/lib/firebase/FirebaseAuthSevice";
import { useSession } from "@/providers/SessionProvider";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

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
  )
})

export default function Login(){

  const firebaseAuthService = FirebaseAuthService.getInstance();
  const [loading, setLoading] = useState<boolean>(false);
  const { setSessionId, setUserId, setEmail } = useSession();
  const [progressValue,setProgressValue] = useState<number>(0);

  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  if(loading){
    return <div className="w-screen px-80"><Progress value={progressValue} /></div>
  }

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {

    setLoading(true)
    const { email, password} = values;
    setProgressValue(10);
    try {
      const user = await firebaseAuthService.loginWithEmailAndPassword({ email, password })

      if(!user){
        setLoading(false);
        toast.error("User not found");
        return;
      }
      setProgressValue(50);
      
      await API.METHODS.POST(API.ENDPOINTS.user.login, { token: await user.getIdToken() ,...values } , { withCredentials: true },
        { 
          onSuccess: (message) => { 
            toast.success("Successfully Logged In", message);
            setEmail(message.email);
            setSessionId(message.sessionId);
            setUserId(message.userId)
            navigate(location.state.from || '/groups');
          },
          onError: (data: any) => { toast.error(data.message); }
        }
      )
    } catch (error) {
      toast.error(String(error));
    }
    setProgressValue(90);

    setLoading(false)
    return;

  }



  return (
    <>
      <div className="min-w-80 flex flex-col gap-y-2 border-2 p-12 rounded ">
        <h1 className="text-3xl">Login</h1>
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
              name="email"
              render={({field}) => (

                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input { ...field } />
                  </FormControl>
                  <FormMessage/>
                </FormItem>

              )}

            />

            <FormField
              control={form.control}
              name="password"
              render={({field}) => (

                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input type="password" { ...field } />
                  </FormControl>
                  <FormMessage/>
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