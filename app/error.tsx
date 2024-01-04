"use client"
import EmptyState from "@/components/EmptyState"
import { useEffect } from "react"

interface ErrorStateProps{
    error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({
    error
}) => {
    useEffect(() => {
        console.error(error)
    }, [error])
    return(
        <EmptyState
        title="There seems to be an error"
        subtitle="Somthing went wrong, please try again later"
        />
    
    )
}


export default ErrorState