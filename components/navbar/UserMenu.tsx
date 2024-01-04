"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import BurgerMenu from "./BurgerMenu";
import { useCallback, useState } from "react";
import { useRegisterModal } from "@/app/hooks/useRegistedModal";
import { register } from "module";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useBookModal } from "@/app/hooks/onBookModal";
import { useRouter } from "next/navigation";
interface UserMenuProps{
    currentUser?: SafeUser | null;
  }


const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
  const router = useRouter();
    const [isOpened, setIsOpened] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpened((value) => !value);
    },[]);
    
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const bookModal = useBookModal()

    const onBook = useCallback(() => {
      if(!currentUser){
        return loginModal.onOpen();
      }
      bookModal.onOpen();
    },[currentUser, loginModal, bookModal])



  return (
    <div
      className="
    relative
    "
    >
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onBook}
          className="
          hidden
          md:block
          text-sm
          font-semibold
          py-3
          px-4
          rounded-full
          hover:bg-neutral-100
          transition
          cursor-pointer
          
          "
        >
            Saudi Life
        </div>
        <div onClick={toggleOpen}
        className="
        py-4
        md:py-1
        md:px-2
        border-neutral-200
        flex
        flex-row
        items-center
        gap-3
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition
        ">
            <AiOutlineMenu/>
            <div className="hidden md:block">
                <Avatar src={currentUser?.image}  />

            </div>

        </div>
      </div>
        {isOpened && (
            <div className="absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm">
                <div className=" flex flex-col cursor-pointer">

                    {currentUser ? (
                        <>
                        <BurgerMenu
                        onClick={() => {router.push("/settings")}}
                        label="Settings"
                        />
                        <BurgerMenu
                        onClick={() => {router.push("/booking")}}
                        label="My Bookings"
                        />
                           <BurgerMenu
                        onClick={() => {router.push("favorites")}}
                        label="My Favorites"
                        />
                        {currentUser.role === "Local Citizen" && (
                          <>
                          <BurgerMenu
                        onClick={() => {router.push("/reservations")}}
                        label="My Reservations"
                        />

                          <BurgerMenu
                        onClick={() => {router.push("/myActivities")}}
                        label="My activities"
                        />

                        <BurgerMenu
                        onClick={() => {router.push(`/User/${currentUser.id}`)}}
                        label="My profile"
                        />

                          <BurgerMenu
                        onClick={bookModal.onOpen}
                        label="Create Activity"
                        />
                        </>
                        )}
                        <hr/>
                        <BurgerMenu
                        onClick={() => signOut()}
                        label="Logout"
                        />
                        
                        </>

                    ): (
                        <>
                        <BurgerMenu
                        onClick={loginModal.onOpen}
                        label="Login"
                        />
                           <BurgerMenu
                        onClick={registerModal.onOpen}
                        label="Sign up"
                        />
                        </>

                    )}
                   
                  

                </div>
            
            </div>



        )
        
        
        
        }
    </div>
  );
};

export default UserMenu;
