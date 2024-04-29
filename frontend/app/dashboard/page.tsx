"use client";

import GuidelinesUpload from "@/components/guidelines-upload";
import MedicalRecordUpload from "@/components/medical-record-upload";
import CaseSubmitButton from "@/components/case-submit-button";
import { useRouter } from "next/navigation";

export const revalidate = 0;

export default async function DashboardRoot() {
	const router = useRouter();
	const CASE_ID = "case_891a_6fbl_87d1_4326";

	const handleContinue = () => {
		router.push(`/dashboard/case/${CASE_ID}`)
	}

	return (
		<div className="w-full flex flex-col justify-center items-center h-screen">
			<div className="w-full flex flex-row gap-2 items-center">
				<MedicalRecordUpload />
				<GuidelinesUpload />
			</div>
			<div className="w-full py-4 flex flex-row justify-center">
				<CaseSubmitButton handleContinue={handleContinue} />
			</div>
		</div>
	)
}
