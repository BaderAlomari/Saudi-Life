"use client";
import { it } from "node:test"
import {GiCamel, GiBoatFishing, GiCampingTent} from 'react-icons/gi'
import { LiaLanguageSolid } from "react-icons/lia";
import {PiCookingPotBold, PiGuitar} from 'react-icons/pi'
import { BiCustomize } from "react-icons/bi";
import CategoryBox from "../CategoryBox"
import Container from "../Container"
import { usePathname, useSearchParams } from "next/navigation";
export const categories =[
    {
        label: 'Art and Culture',
        icon: GiCamel,
        description: 'This activity is about art and culture!'
    },
    {
        label: 'Camping',
        icon: GiCampingTent,
        description: 'This activity is about camping!'
    },{
        label: 'Fishing',
        icon: GiBoatFishing,
        description: 'This activity is about fishing!'
    },{
        label: 'Cooking',
        icon: PiCookingPotBold,
        description: 'This activity is about cooking!'
    },{
        label: 'Music',
        icon: PiGuitar,
        description: 'This activity is about music!'
    },{
        label: 'Language',
        icon: LiaLanguageSolid,
        description: 'This activity is about language learning!'
    },{
        label: 'Custom',
        icon: BiCustomize,
        description: 'This is a custom activity!'
    },
    
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isHome = pathname === '/';
    if(!isHome){
        return null;
    }

  return (
    <Container>
        <div className="
        pt-4
        flex
        flex-grow
        items-center
        justify-between
        overflow-x-auto
        ">
            {categories.map((item) => (
                <CategoryBox
                key={item.label}
                label={item.label}
                selected={category === item.label}
                icon={item.icon}/>
            ))}

        </div>


    </Container>
  )
}

export default Categories