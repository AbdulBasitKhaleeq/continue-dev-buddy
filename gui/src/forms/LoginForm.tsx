import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button, Input } from "../components";
import { IdeMessengerContext } from "../context/IdeMessenger";
import { setLoggedInUser } from "../redux/slices/sessionSlice";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  
  const navigate = useNavigate();
  const formMethods = useForm();
  const dispatch = useDispatch();
  const ideMessenger = useContext(IdeMessengerContext);

  async function onSubmit() {
    const formObj = {...formMethods.watch()};
    try {
      const result:any = await ideMessenger.request("auth/login", {
        username: formObj.username,
        password: formObj.password,
      });
      if ( result.status != "error" && result.content?.success) {
        dispatch(setLoggedInUser(result));
        navigate("/index.html");
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="mx-auto max-w-md p-6">
          <h1 className="mb-0 text-center text-2xl">Login SSI Dev Buddy</h1>

          <div className="my-8 flex flex-col gap-6">
            <div>
                <label className="mb-1 block text-sm font-medium">
                  Username
                </label>
                <Input
                  id="username"
                  className="w-full"
                  placeholder={`Enter your username`}
                  {...formMethods.register("username")}
                  required={true}
                />
            </div>

            <div>
              
                <label className="mb-1 block text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  className="w-full"
                  placeholder={`Enter your password`}
                  {...formMethods.register("password")}
                  required={true}
                />
            </div>
          </div>

          <div className="mt-4 w-full">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default LoginForm;
