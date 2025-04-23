import { API } from "@/api";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FirebaseAuthService } from "@/lib/firebase/FirebaseAuthSevice";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  if(loading){
    return <>Loading</>
  }

  

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {

    setLoading(true)

    const { email, password} = values;

    const user = await firebaseAuthService.loginWithEmailAndPassword({ email, password })
    
    await API.METHODS.Post(API.ENDPOINTS.user.login, { token: await user.getIdToken() ,...values } ,
      { 
        onSuccess: (message) => { 
          console.log("Successfully Logged In", message) 
          navigate('/dashboard')

        },
        onError: (data: any) => { console.log(data) }
      }
    )

    setLoading(false)

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