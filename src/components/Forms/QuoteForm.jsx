import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

import Button from "../common/Button";
import Toast from "../common/Toast";

const quoteSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),

  phone: z
    .string()
    .min(10, "Please enter a valid phone number"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  productCategory: z
    .string()
    .min(1, "Please select a product category"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message is too long"),
});

const productCategories = [
  "Construction Hardware",
  "Door Hardware",
  "Cabinet Hardware",
  "Bathroom Hardware",
  "Kitchen Hardware",
  "Tools & Equipment",
  "Fasteners",
  "Safety Equipment",
  "Other",
];

const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await axios.post("/api/v1/quotes", data);

      setToast({
        type: "success",
        message:
          "Your quote request has been submitted successfully.",
      });

      reset();
    } catch (error) {
      setToast({
        type: "error",
        message:
          "Unable to submit your request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all
    ${hasError
      ? "border-red-500 focus:ring-2 focus:ring-red-300"
      : "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
    }`;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Name & Phone */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="John Doe"
              {...register("name")}
              className={inputClass(errors.name)}
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Phone Number <span className="text-red-500">*</span>
            </label>

            <input
              type="tel"
              placeholder="0312-6314045"
              {...register("phone")}
              className={inputClass(errors.phone)}
            />

            {errors.phone && (
              <p className="mt-2 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            placeholder="example@email.com"
            {...register("email")}
            className={inputClass(errors.email)}
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Product Category <span className="text-red-500">*</span>
          </label>

          <select
            {...register("productCategory")}
            className={`${inputClass(
              errors.productCategory
            )} cursor-pointer`}
          >
            <option value="">Select a category</option>

            {productCategories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

          {errors.productCategory && (
            <p className="mt-2 text-sm text-red-500">
              {errors.productCategory.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Project Details <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={6}
            placeholder="Tell us what products you need, required quantity, preferred brand, delivery location, etc."
            {...register("message")}
            className={`${inputClass(
              errors.message
            )} resize-none`}
          />

          {errors.message && (
            <p className="mt-2 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Request a Quote
        </Button>
      </form>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default QuoteForm;
