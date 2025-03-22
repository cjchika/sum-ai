import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { plans } from "@/utils/constants";

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden ">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center w-full">
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
            Pricing
          </h2>
        </div>

        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300"
            >
              <div
                className={cn(
                  "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-2xl border-[1px] border-gray-500/20",
                  plan.id === "pro" && "border-rose-500 gap-5 border-2"
                )}
              >
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <p className="text-lg lg:text-xl font-bold capitalize">
                      {plan.name}
                    </p>
                    <p className="text-base-content/80 mt-2">
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <p className="text-5xl tracking-tight font-extrabold">
                    {plan.price}
                  </p>
                  <div className="flex flex-col justify-end mb-[4px]">
                    <p className="text-xs uppercase font-semibold">USD</p>
                    <p className="text-xs">/month</p>
                  </div>
                </div>

                <div className="space-y-2.5 leading-relaxed text-base flex-1 ">
                  {plan.items?.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckIcon size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </div>

                <div className="space-y-2 flex justify-center w-full">
                  <Link
                    className={cn(
                      "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-red-500 hover:to-rose-800 text-white border-2 py-2",
                      plan.id === "pro"
                        ? "border-rose-900"
                        : "border-rose-100 from-rose-400 to-rose-500"
                    )}
                    href={plan.paymentLink}
                  >
                    Buy Now <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
