import SignupCard from "../components/SignupCard";

export default function Signin(){
    return(
        <div>
            <div className="flex w-full h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-5">
                <div className="shadow-2xl rounded-xl">
                    <SignupCard type="signin" />
                </div>
            </div>
        </div>
    )
}