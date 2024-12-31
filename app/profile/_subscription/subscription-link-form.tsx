"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Subscription } from "@prisma/client";
import { SubscriptionList } from "./subscription-link-list";
import { format } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface SubscriptionLinkFormProps {
  userId: string;
  subscriptions?: Subscription[];
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Enter a valid URL"),
  category: z.string().optional(),
  dateOfSubscription: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  endOfSubscription: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  cardUsed: z.string().min(1, "Card information is required"),
  amount: z.preprocess((value) => parseFloat(value as string), z.number().positive("Amount must be positive")),
});

export const SubscriptionLinkForm = ({
  userId,
  subscriptions = [],
}: SubscriptionLinkFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [subscriptionId, setEditingSubscriptionId] = useState<string | null>(null);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
    setEditMode(false);
    form.reset();
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setEditingSubscriptionId(null);
    form.reset();
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      platform: "",
      url: "",
      category: "",
      dateOfSubscription: format(new Date(), "yyyy-MM-dd"),
      endOfSubscription: format(new Date(), "yyyy-MM-dd"),
      cardUsed: "",
      amount: 0,
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;
  const watchedValues = form.watch();
  const isFormComplete = Object.values(watchedValues).every((value) => value);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const transformedValues = {
      ...values,
      dateOfSubscription: new Date(values.dateOfSubscription),
      endOfSubscription: new Date(values.endOfSubscription),
    };
    try {
      await axios.post(`/api/users/${userId}/subscriptions`, transformedValues);
      toast.success("Subscription added");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onSave = async (values: z.infer<typeof formSchema>) => {
    if (!subscriptionId) return;

    const transformedValues = {
      ...values,
      dateOfSubscription: new Date(values.dateOfSubscription),
      endOfSubscription: new Date(values.endOfSubscription),
    };
    try {
      setIsUpdating(true);
      await axios.patch(`/api/users/${userId}/subscriptions/${subscriptionId}`, transformedValues);
      toast.success("Subscription updated");
      setEditMode(false);
      setEditingSubscriptionId(null);
      form.reset();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/users/${userId}/subscriptions/reorder`, { list: updateData });
      toast.success("Subscriptions reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    const subscriptionToEdit = subscriptions.find((sub) => sub.id === id);
    if (subscriptionToEdit) {
      setEditMode(true);
      setEditingSubscriptionId(id);
      form.setValue("name", subscriptionToEdit.name);
      form.setValue("platform", subscriptionToEdit.platform);
      form.setValue("url", subscriptionToEdit.url);
      form.setValue("category", subscriptionToEdit.category || "");
      form.setValue("dateOfSubscription", format(new Date(subscriptionToEdit.dateOfSubscription), "yyyy-MM-dd"));
      form.setValue("endOfSubscription", format(new Date(subscriptionToEdit.endOfSubscription), "yyyy-MM-dd"));
      form.setValue("cardUsed", subscriptionToEdit.cardUsed);
      form.setValue("amount", subscriptionToEdit.amount);
    }
  };

  const onDelete = async (subscriptionId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/users/${userId}/subscriptions/${subscriptionId}`);
      toast.success("Subscription deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative mt-6 border border-[#94a3b8] bg-gray-700 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between text-white/90">
        Subscriptions
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" /> Add Subscription
            </>
          )}
        </Button>
      </div>
      {(isCreating || editMode) && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(editMode ? onSave : onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isUpdating}
                      placeholder="Subscription Name"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isUpdating}
                      placeholder="Platform (e.g., YouTube)"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isUpdating}
                      placeholder="Subscription URL"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isUpdating}
                      placeholder="Category (optional)"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfSubscription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="date"
                      disabled={isSubmitting || isUpdating}
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endOfSubscription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="date"
                      disabled={isSubmitting || isUpdating}
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardUsed"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isUpdating}
                      placeholder="Card Used (e.g., **** **** **** 1234)"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      disabled={isSubmitting || isUpdating}
                      placeholder="Subscription Amount"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2">
              <Button disabled={!isFormComplete || isSubmitting || isUpdating} type="submit">
                {editMode ? "Save" : "Create"}
              </Button>
              {editMode && (
                <Button variant="outline" onClick={cancelEditMode} disabled={isSubmitting || isUpdating} className="text-black">
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}
      {!isCreating && !editMode && (
        <div
          className={cn(
            "text-sm mt-2",
            subscriptions.length === 0 && "text-cyan-500 italic font-semibold"
          )}
        >
          {subscriptions.length === 0 && "No subscriptions"}
          {subscriptions.length > 0 && (
            <SubscriptionList onEdit={onEdit} onReorder={onReorder} onDelete={onDelete} items={subscriptions} />
          )}
        </div>
      )}
      {!isCreating && !editMode && (
        <p className="text-xs text-white/90 mt-4">
          Drag and drop to reorder subscriptions
        </p>
      )}
    </div>
  );
};
