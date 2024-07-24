import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup, login, forgetPassword, getQuestion, resetPassword } from '../api/auth';

export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : signup,
    onSuccess : (data) => {
      console.log("signUp succesfull", data)
      queryClient.setQueryData('user' , data)
    },
    onError : err => {
      console.log(err)
    }
  });
};

export const useLogin = (useMutationOptions) => {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn : login,
      ...useMutationOptions

    });
};

export const useForgetPassword = (useMutationOptions) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : forgetPassword,
    onError : error => {
      console.log(error)
    }, ...useMutationOptions
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn : resetPassword,
    onError : error => {
      console.log(error)
    },
    onSuccess : data => {
      console.log("reset sucessfull")
    }
  })
}

// export const useGetQuestion =()=> {
//   return useMutation({
//     mutationFn : getQuestion,
//     onSuccess: data => {

//     }
//   })
// }
