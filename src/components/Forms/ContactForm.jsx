import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

import Button from "../common/Button";
import Toast from "../common/Toast";

const contactSchema = z.object({
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

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message is too long"),
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await axios.post("/api/v1/contact", data);

      setToast({
        type: "success",
        message:
          "Thank you! Your message has been sent successfully.",
      });

      reset();
    } catch (error) {
      setToast({
        type: "error",
        message:
          "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Name + Phone */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Full Name <span className="text-red-500">*</span>
            </label>

            <input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register("name")}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition-all
              ${errors.name
                  ? "border-red-500 focus:ring-2 focus:ring-red-300"
                  : "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                }`}
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>

            <input
              id="phone"
              type="tel"
              placeholder="0312-6314045"
              {...register("phone")}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition-all
              ${errors.phone
                  ? "border-red-500 focus:ring-2 focus:ring-red-300"
                  : "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                }`}
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
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Email Address <span className="text-red-500">*</span>
          </label>

          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            {...register("email")}
            className={`w-full rounded-xl border px-4 py-3 outline-none transition-all
            ${errors.email
                ? "border-red-500 focus:ring-2 focus:ring-red-300"
                : "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              }`}
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Message <span className="text-red-500">*</span>
          </label>

          <textarea
            id="message"
            rows={6}
            placeholder="Write your message..."
            {...register("message")}
            className={`w-full rounded-xl border px-4 py-3 outline-none transition-all resize-none
            ${errors.message
                ? "border-red-500 focus:ring-2 focus:ring-red-300"
                : "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              }`}
          />

          {errors.message && (
            <p className="mt-2 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Send Message
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

export default ContactForm;
