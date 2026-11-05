import {ProfileCategoriesBlock} from "@/pages/profile/components/ProfileCategoriesBlock";
import {AppHeading} from "@/shared/ui/AppHeading/AppHeading";

export const ProfilePage = () => (
	<>
		<AppHeading className="mb-24">Profile</AppHeading>
		<ProfileCategoriesBlock />
	</>
);
