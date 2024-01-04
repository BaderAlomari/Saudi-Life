"use client"
import useSearchModal from "@/app/hooks/useSearchModal"
import Modal from "./Modal"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import CitySelect, { CitySelectValue } from "../CitySelect"
import qs from "query-string"
import Heading from "../Heading"
import Counter from "../Counter"


enum STEPS{
    LOCATION = 0,
    INFO = 1
}

const SearchModal = () => {
    const searchModal = useSearchModal()
    const router = useRouter()
    const params = useSearchParams()
    const[step, setStep] = useState(0) 
    const[guestCount, setGuestCount] = useState(1)
    const [location, setLocation] = useState<CitySelectValue>()

    const Map = useMemo(() => dynamic(() => import('../Map'), {ssr: false}), [location])

    const onBack = useCallback(() => {
        setStep((value) => value - 1)
    }, [])

    const onNext = useCallback(() => {
        setStep((value) => value + 1)
    }, [])

    const onSubmit = useCallback(async () => {
        if(step !== STEPS.INFO){
            return onNext()
        }
        let currentQuery = {}

        if(params){
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {
            skipNull: true
        })

        setStep(STEPS.LOCATION)
        searchModal.onClose()
        router.push(url)

    },[ step, searchModal, location, router, guestCount, onNext, params])

    const actionLabel = useMemo(() => {
        if(step === STEPS.INFO){
            return 'Search'
        }
        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.LOCATION){
            return undefined
        }
        return 'Back'
    }, [step])

    let bodyContent = (
        <div className=" flex flex-col gap-8">
            <Heading
            title="Where are you going?"
            subtitle="Find your location"
            />
            <CitySelect
            value={location}
            onChange={(value) => setLocation(value as CitySelectValue)}
            />
            <hr/>
            <Map center={location?.latlng}/>

        </div>
    )
    if(step === STEPS.INFO){
         bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="Guests"
                subtitle="How many guests can you bring?"
                />
                <Counter
                title="Guests"
                subtitle=""
                value={guestCount}
                onChange={(value) => setGuestCount(value)}
                />

            </div>
        )
    }

  return (
    <Modal
    isOpen={searchModal.isOpen}
    onClose={searchModal.onClose}
    onSubmit={onSubmit}
    title="Filter Activities"
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    body={bodyContent}
    />
  )
}

export default SearchModal