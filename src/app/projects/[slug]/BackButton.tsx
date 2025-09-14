"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import styles from "./Project.module.scss";

export default function BackButton() {
  const router = useRouter();
  return (
    <div className={styles.backRow}>
      <button
        type="button"
        aria-label="Go back"
        className={styles.backBtn}
        onClick={() => router.back()}
      >
        <ArrowLeft size={16} aria-hidden />
        <span>Back</span>
      </button>
    </div>
  );
}
