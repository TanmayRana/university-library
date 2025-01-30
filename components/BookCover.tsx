import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import BookCoverSvg from "./BookCoverSvg";

type BookCoverVariant =
  | "default"
  | "extaSmall"
  | "small"
  | "medium"
  | "regular"
  | "wide";
// type BookCoverVariant = "default" | "small" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extaSmall: "book-cover_extra_small",
  small: "book-cover_small",
  wide: "book-cover_wide",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  default: "book-cover",
};

interface Props {
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
  className?: string;
}

const BookCover = ({
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png",
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      {/* Book side background blur image */}
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{
          left: "12%",
          width: "87.5%",
          height: "88%",
        }}
      >
        <Image
          src={coverImage}
          alt="Book Cover"
          fill
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  );
};

export default BookCover;
