import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { FaCircleCheck } from "react-icons/fa6";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { FaGem } from "react-icons/fa";

const GemPurchaseCard = ({
  title,
  features,
  subtitle,
  cost,
  gemCount,
  disabled,
  center,
}: {
  title: string;
  features: string[];
  subtitle: string;
  cost: number;
  gemCount: number;
  disabled: boolean;
  center?: boolean;
}) => {
  return (
    <div
      style={{
        margin: center ? "0 auto" : "",
      }}
      className="flex flex-col rounded-lg border border-gray-200 bg-white md:w-96 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="grid gap-4 p-8">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm leading-6 text-gray-600">{subtitle}</p>
        <div className="text-5xl font-extrabold text-gray-900">${cost}</div>
        <div className="grid gap-4 text-base text-gray-700">
          {features.map((feature: string) => (
            <div key={feature} className="flex items-center gap-4">
              <FaCircleCheck className="h-6 w-6 text-green-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 border-t grid gap-3 bg-gray-50">
        {
            disabled ? (
                <RegisterLink
                    className={
                        buttonVariants({
                            variant: "default",
                            className: "w-full py-3"
                        })
                    }
                >
                    Create Account First
                </RegisterLink>
            ) : (<Link
                href="/checkout"
                className={
                     buttonVariants({
                        variant: "default",
                        className: "w-full py-3"
                     })
                }
            >
                <FaGem className="h-6 w-6 mr-2" />
                Purchase {gemCount} Gems
            </Link>)
        }
        </div>
    </div>
  );
};

export default GemPurchaseCard;
