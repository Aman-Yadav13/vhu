"use client";

import * as z from "zod";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FileUpload } from "@/components/file-upload";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { GenderType, MedicalSymptoms } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateDoctorSignInModal } from "@/components/modals/doctor-sign-in-modal";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  fathername: z.string().nonempty(),
  gender: z.nativeEnum(GenderType),
  medicalreport: z.string().min(1, {
    message: "Submit your latest medical report",
  }),
  medicalsymptoms: z.nativeEnum(MedicalSymptoms),
  address: z.string(),
  userId: z.string(),
  doctorId: z.string(),
});

const RegisterPatient = () => {
  const router = useRouter();
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: GenderType.OTHER,
      fathername: "",
      address: "",
      medicalsymptoms: MedicalSymptoms.Cold,
      medicalreport: "",
      userId: params?.customerId as string,
      doctorId: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios
        .post(`/api/customers/${params?.customerId}/registration`, values)
        .then((patient) => {
          router.push(`/patient/schedule-appointment/${patient?.data?.userId}`);
        });
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-4">
        <div className="bg-[#fcfcfc] rounded-md max-w-[620px]">
          <div className="text-black text-3xl font-semibold text-center mt-2">
            Patient Form
          </div>
          <p className="text-indigo-400 text-center text-md">
            Find and choose the best doctors for your medical condition, you are
            just one form away
          </p>
          <ScrollArea className="space-y-12 px-6 pb-16 h-[600px] max-w-[600px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fathername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Father name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter your father's name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(GenderType).map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              className="capitalize"
                            >
                              {type.toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="medicalsymptoms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical Symptoms</FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                            <SelectValue placeholder="Select the biggest symptom you are feeling" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(MedicalSymptoms).map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              className="capitalize"
                            >
                              {type.toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Residential address
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter your complete address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="medicalreport"
                    render={({ field }) => (
                      <FormItem>
                        <div className="w-[550px] flex items-center justify-center">
                          <FormControl>
                            <FileUpload
                              endpoint="medicalReport"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <Separator className="h-[2px] w-full mt-4" />
                <div className="flex items-center  mt-4">
                  <Button variant="primary" disabled={isLoading}>
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </ScrollArea>
        </div>
      </div>
      <CreateDoctorSignInModal />
    </>
  );
};

export default RegisterPatient;
