"use client"
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import CustomButton from "./CustomButton";


interface EmptyStateProps{
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No matches",
    subtitle="Try adjusting your search to find what you're looking for",
    showReset
}) => {
    const router = useRouter();
  return (
    <div
    className="
    h-[60vh]
    flex
    flex-col
    gap-2
    justify-center
    items-center
    "
    >
        <Heading
        title={title}
        subtitle={subtitle}
        center
        />
        <div className="w-48 mt-4">
            {showReset && (
                <CustomButton
                outline
                label="Remove filters"
                onClick={() => router.push('/')}
                />
            )}
        </div>
    </div>
  )
}

export default EmptyState