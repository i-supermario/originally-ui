import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please provide a valid email address"
  }),
  password: z.string().min(8,
    {
      message: "Password must be atleast 8 characters"
    }
  ),

})

export default function SignUp(){

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values)
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